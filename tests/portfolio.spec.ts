import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = [
  'interview-ai',
  'krish-fx-swing-lab',
  'krish-fx-swing-lab-platform',
  'krish-fx-swing-lab-landing-page',
  'campusmate',
  'ai-resume-analyzer',
  'magic-hand-studio',
  'lucky-travel',
  'bird-smash',
  'wattdeal',
  'cinema-crowd-prediction',
  'botcalm',
];

test('home, themes, skill tabs, project filters and navigation', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page).toHaveTitle(
    'Sahan Sudeepa Gunawardhana | Software Engineer & Full-Stack Developer'
  );
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SAHAN');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.getByRole('tab', { name: /Backend/ }).click();
  await expect(page.getByRole('tabpanel')).toContainText('FastAPI');
  await page.getByRole('tab', { name: /Backend/ }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: /Database/ })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('PostgreSQL');
  await page.getByRole('button', { name: 'AI & Data', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Interactive', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(
    page.locator('.project-card').filter({ hasText: 'Bird Smash' })
  ).toHaveCount(1);
  await page.getByRole('button', { name: /All work/ }).click();
  await expect(page.locator('.project-card')).toHaveCount(12);
  await page
    .getByRole('link', { name: 'View AI Resume Analyzer case study' })
    .click();
  await expect(page).toHaveURL(/projects\/ai-resume-analyzer/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'AI Resume Analyzer'
  );
  await page.getByRole('link', { name: 'Back to selected work' }).click();
  await expect(page).toHaveURL(/#projects$/);
  expect(errors).toEqual([]);
});

test('all project pages, SEO and route responses', async ({ page }) => {
  for (const slug of slugs) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('.case-section')).toHaveCount(9);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`/projects/${slug}$`)
    );
    await expect(
      page.getByRole('navigation', { name: 'Case study sections' })
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true);
  }
  for (const [slug, image] of [
    ['krish-fx-swing-lab-platform', '/images/krish-fx-login.png'],
    ['krish-fx-swing-lab-landing-page', '/images/krish-fx-landing.png'],
  ] as const) {
    await page.goto(`/projects/${slug}`);
    await expect(page.locator('.project-screenshot')).toHaveAttribute(
      'src',
      new RegExp(image.split('/').pop()!.replace('.', '\\.'), 'i')
    );
  }
});

test('metadata endpoints, missing routes and homepage anchors', async ({
  page,
  request,
}) => {
  for (const route of [
    '/robots.txt',
    '/sitemap.xml',
    '/icon.svg',
    '/opengraph-image',
  ])
    expect((await request.get(route)).status()).toBe(200);
  expect((await request.get('/projects/not-a-real-project')).status()).toBe(
    404
  );
  await page.goto('/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    /Sahan Sudeepa/
  );
  const anchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')!));
  for (const href of new Set(anchors))
    expect(
      await page.locator(href).count(),
      `Missing anchor ${href}`
    ).toBeGreaterThan(0);
});

test('mobile menu, keyboard focus, reduced motion and responsive widths', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      ),
      `Overflow at ${width}px`
    ).toBe(true);
    await expect(page.locator('.scroll-hero h1')).toBeVisible();
    if (width < 1050) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page
        .getByRole('button', { name: 'Close navigation' })
        .press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Open navigation' })
      ).toBeFocused();
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page
        .getByRole('navigation', { name: 'Mobile navigation' })
        .getByRole('link', { name: /Projects/ })
        .click();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(page).toHaveURL(/#projects$/);
    }
  }
  await expect(page.locator('.custom-cursor')).not.toBeVisible();
});

test('contact validation and honest delivery states', async ({
  page,
  request,
}) => {
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.locator('#name-error')).toBeVisible();
  await expect(page.locator('#email-error')).toBeVisible();
  await expect(page.locator('#message-error')).toBeVisible();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page
    .getByLabel('What do you have in mind?')
    .fill('A sample message for a browser test.');
  // Intercept delivery so automated tests never contact an external recipient.
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({
        error:
          'Message delivery is not available yet. Please connect with me on LinkedIn.',
      }),
    })
  );
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByRole('status')).toContainText(
    'Message delivery is not available yet'
  );
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  );
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByRole('status')).toContainText(
    'Your message has been sent'
  );
  await expect(page.getByLabel('Your name')).toHaveValue('');
  const invalid = await request.post('/api/contact', {
    data: { name: '', email: 'invalid', message: '' },
  });
  expect(invalid.status()).toBe(400);
  const crossOrigin = await request.post('/api/contact', {
    headers: { origin: 'https://untrusted.example' },
    data: {},
  });
  expect(crossOrigin.status()).toBe(403);
  await expect(
    page.getByRole('button', { name: 'Download Resume' })
  ).toBeDisabled();
  await expect(
    page.getByRole('button', { name: 'View Resume', exact: true })
  ).toBeDisabled();
});

test('accessible desktop and mobile themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    for (const theme of ['dark', 'light']) {
      if (theme === 'light')
        await page
          .getByRole('button', { name: 'Switch to light theme' })
          .click();
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }))
      ).toEqual([]);
    }
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  }
  await page.goto('/projects/ai-resume-analyzer');
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    }))
  ).toEqual([]);
});

test('design review screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: 'test-results/desktop-dark.png',
    fullPage: true,
    animations: 'disabled',
  });
  await page.screenshot({
    path: 'test-results/hero-desktop.png',
    animations: 'disabled',
  });
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.screenshot({
    path: 'test-results/desktop-light.png',
    fullPage: true,
    animations: 'disabled',
  });
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.screenshot({
    path: 'test-results/hero-mobile.png',
    animations: 'disabled',
  });
  await page.screenshot({
    path: 'test-results/mobile-dark.png',
    fullPage: true,
    animations: 'disabled',
  });
});
