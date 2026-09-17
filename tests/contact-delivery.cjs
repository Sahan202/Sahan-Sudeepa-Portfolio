const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const code = ts.transpileModule(
  fs.readFileSync('src/app/api/contact/route.ts', 'utf8'),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }
).outputText;

function handler(env, send) {
  const context = {
    exports: {},
    require: (module) => {
      if (module === 'next/server') return { NextResponse: Response };
      if (module === '@emailjs/nodejs')
        return { __esModule: true, default: { send } };
      throw new Error(`Unexpected module: ${module}`);
    },
    process: { env },
    AbortSignal,
  };
  vm.runInNewContext(code, context);
  return context.exports.POST;
}
function request() {
  const value = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Visitor',
      email: 'visitor@example.com',
      message: 'Hello, let us build a website together.',
    }),
  });
  value.nextUrl = new URL(value.url);
  return value;
}
const env = {
  EMAILJS_SERVICE_ID: 'service_test',
  EMAILJS_TEMPLATE_ID: 'template_test',
  EMAILJS_PUBLIC_KEY: 'public-test',
  EMAILJS_PRIVATE_KEY: 'private-test',
};

test('sends full message to owner with visitor reply-to', async () => {
  let call;
  const post = handler(env, async (...args) => {
    call = args;
  });
  assert.equal((await post(request())).status, 200);
  assert.equal(call[0], 'service_test');
  assert.equal(call[1], 'template_test');
  assert.equal(call[3].publicKey, 'public-test');
  assert.equal(call[3].privateKey, 'private-test');
  assert.equal(call[2].to_email, 'sahansudeepa589@gmail.com');
  assert.equal(call[2].reply_to, 'visitor@example.com');
  assert.equal(typeof call[2].time, 'string');
  assert.match(call[2].message, /Hello, let us build a website together\./);
});
test('does not report success without credentials', async () => {
  assert.equal(
    (await handler({}, () => assert.fail('Must not send'))(request())).status,
    503
  );
});
test('provider failures and timeouts remain errors', async () => {
  for (const send of [
    async () => {
      throw new Error('rejected');
    },
    async () => {
      throw new Error('timeout');
    },
  ]) {
    assert.equal((await handler(env, send)(request())).status, 502);
  }
});
