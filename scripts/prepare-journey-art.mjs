// Build distinct local line sculptures. Only the lightweight outputs ship.
// Sources and licenses: public/models/credits.txt.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import {
  Box3,
  Vector3,
  Group,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  TorusKnotGeometry,
  CylinderGeometry,
  TorusGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  WireframeGeometry,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const out = 'public/models';
await mkdir(out, { recursive: true });
function part(group, geo, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const item = new Mesh(geo);
  item.position.set(...position);
  item.rotation.set(...rotation);
  group.add(item);
  return item;
}
async function exportArt(name, object, maxSegments = 8000) {
  object.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(object);
  const center = bounds.getCenter(new Vector3());
  const size = bounds.getSize(new Vector3());
  const scale = 2.8 / Math.max(size.x, size.y, size.z);
  const source = [];
  object.traverse((mesh) => {
    if (!mesh.isMesh) return;
    const geometry = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
    const wire = new WireframeGeometry(geometry);
    const array = wire.attributes.position.array;
    for (let i = 0; i < array.length; i += 3) {
      source.push(
        (array[i] - center.x) * scale,
        (array[i + 1] - center.y) * scale,
        (array[i + 2] - center.z) * scale
      );
    }
    wire.dispose();
    geometry.dispose();
  });
  const segments = Math.min(maxSegments, source.length / 6);
  const lines = [];
  for (let i = 0; i < segments; i++) {
    const offset = Math.floor((i / segments) * (source.length / 6)) * 6;
    for (let j = 0; j < 6; j++) lines.push(source[offset + j]);
  }
  await writeFile(
    `${out}/${name}.bin`,
    Buffer.from(new Float32Array(lines).buffer)
  );
  const paths = [];
  for (let i = 0; i < lines.length; i += 6) {
    const project = (x, y, z) => [
      320 + (x * Math.cos(-0.42) + z * Math.sin(-0.42)) * 190,
      320 - (y * 0.97 - z * 0.24) * 190,
    ];
    paths.push(
      `M${project(...lines.slice(i, i + 3))
        .map((n) => n.toFixed(1))
        .join(',')}L${project(...lines.slice(i + 3, i + 6))
        .map((n) => n.toFixed(1))
        .join(',')}`
    );
  }
  await writeFile(
    `${out}/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="${paths.join('')}" fill="none" stroke="#e9b783" stroke-width="0.7"/></svg>`
  );
  console.log(`${name}: ${segments} segments / ${lines.length * 4} bytes`);
}
async function imported(file) {
  const bytes = await readFile(file);
  let json;
  if (file.endsWith('.glb')) {
    const length = bytes.readUInt32LE(12);
    json = JSON.parse(bytes.subarray(20, 20 + length).toString());
    json.buffers[0].uri = `data:application/octet-stream;base64,${bytes.subarray(28 + length).toString('base64')}`;
  } else {
    json = JSON.parse(bytes.toString());
    for (const buffer of json.buffers)
      buffer.uri = `data:application/octet-stream;base64,${(await readFile(path.join(path.dirname(file), buffer.uri))).toString('base64')}`;
  }
  delete json.images;
  delete json.textures;
  delete json.materials;
  delete json.extensionsUsed;
  delete json.extensionsRequired;
  for (const mesh of json.meshes)
    for (const primitive of mesh.primitives) delete primitive.material;
  globalThis.ProgressEvent ??= class ProgressEvent {};
  return (await new GLTFLoader().parseAsync(JSON.stringify(json), '')).scene;
}

// Two sourced models: an analog radio and an aviator's helmet.
const radio = await imported('.artwork-sources/boombox.glb');
await exportArt('radio', radio, 12000);
const helmet = await imported('.artwork-sources/helmet.gltf');
await exportArt('aviator', helmet, 14000);

// Connected ideas: a continuous mathematical knot.
const knot = new Group();
part(knot, new TorusKnotGeometry(0.78, 0.24, 110, 12, 2, 3));
await exportArt('knot', knot);

// Product building: a laptop with individual keys and a screen grid.
const laptop = new Group();
part(laptop, new BoxGeometry(2.3, 0.09, 1.45, 22, 1, 14), [0, -0.57, 0.28]);
part(
  laptop,
  new BoxGeometry(2.3, 1.42, 0.07, 22, 14, 1),
  [0, 0.15, -0.51],
  [-0.18, 0, 0]
);
part(
  laptop,
  new BoxGeometry(2.05, 1.17, 0.04, 16, 9, 1),
  [0, 0.17, -0.39],
  [-0.18, 0, 0]
);
for (let row = 0; row < 4; row++)
  for (let col = 0; col < 12; col++)
    part(laptop, new BoxGeometry(0.145, 0.018, 0.115), [
      -0.93 + col * 0.17,
      -0.507,
      -0.14 + row * 0.15,
    ]);
part(laptop, new BoxGeometry(0.68, 0.02, 0.34, 4, 1, 3), [0, -0.5, 0.65]);
laptop.rotation.set(0.25, 0.05, -0.08);
await exportArt('laptop', laptop);

// Engineering: two interlocking machined gears.
const gears = new Group();
function gear(x, y, r, teeth) {
  part(gears, new TorusGeometry(r * 0.72, r * 0.24, 6, teeth * 3), [x, y, 0]);
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2;
    part(
      gears,
      new BoxGeometry(r * 0.23, r * 0.28, r * 0.4, 2, 2, 2),
      [x + Math.cos(angle) * r, y + Math.sin(angle) * r, 0],
      [0, 0, angle - Math.PI / 2]
    );
  }
  part(gears, new TorusGeometry(r * 0.22, r * 0.12, 6, 24), [x, y, 0]);
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    part(
      gears,
      new BoxGeometry(r * 0.55, r * 0.11, r * 0.2, 4, 1, 1),
      [x + Math.cos(angle) * r * 0.5, y + Math.sin(angle) * r * 0.5, 0],
      [0, 0, angle]
    );
  }
}
gear(-0.53, 0.3, 0.8, 16);
gear(0.61, -0.57, 0.58, 12);
await exportArt('gears', gears);

// Learning: an open book, with curved, individually drawn pages.
const book = new Group();
for (const direction of [-1, 1]) {
  for (let page = 0; page < 9; page++) {
    const positions = [];
    const cols = 20;
    const rows = 15;
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++) {
        const p = (x, z) => [
          direction * x,
          Math.sin(x * Math.PI) * (0.24 + page * 0.008) + page * 0.018,
          z,
        ];
        const a = p((col / cols) * 1.3, (row / rows) * 1.65 - 0.825);
        const b = p(((col + 1) / cols) * 1.3, (row / rows) * 1.65 - 0.825);
        const c = p((col / cols) * 1.3, ((row + 1) / rows) * 1.65 - 0.825);
        const d = p(
          ((col + 1) / cols) * 1.3,
          ((row + 1) / rows) * 1.65 - 0.825
        );
        positions.push(...a, ...b, ...c, ...b, ...d, ...c);
      }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    part(book, geometry);
  }
}
book.rotation.set(0.8, 0, 0.05);
await exportArt('book', book, 9000);

// Open source: a spatial network of connected nodes.
const network = new Group();
const nodes = [
  [0, 0, 0],
  [-0.8, 0.65, 0],
  [0.8, 0.65, 0],
  [-1.1, -0.55, 0.2],
  [0, -0.8, 0.7],
  [1, -0.55, 0.2],
  [0, 1, 0.65],
];
for (const p of nodes) part(network, new SphereGeometry(0.16, 12, 8), p);
for (const [from, to] of [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [3, 4],
  [4, 5],
]) {
  const a = new Vector3(...nodes[from]),
    b = new Vector3(...nodes[to]);
  const mesh = part(
    network,
    new CylinderGeometry(0.035, 0.035, a.distanceTo(b), 6, 6)
  );
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(
    new Vector3(0, 1, 0),
    b.sub(a).normalize()
  );
}
await exportArt('network', network);

// The next chapter: a fountain pen.
const pen = new Group();
part(pen, new CylinderGeometry(0.12, 0.13, 1.7, 18, 20), [0, 0.2, 0]);
part(pen, new CylinderGeometry(0.13, 0.025, 0.5, 12, 10), [0, -0.9, 0]);
part(pen, new CylinderGeometry(0.15, 0.15, 0.28, 18, 3), [0, 1.14, 0]);
part(pen, new BoxGeometry(0.04, 0.75, 0.035, 1, 10, 1), [0.16, 0.73, 0]);
pen.rotation.z = -0.55;
await exportArt('pen', pen);

// Contact: a folded paper airplane in flight.
const plane = new Group();
const points = [
  [0, 0, -1.5],
  [-1.2, 0, 0.9],
  [-0.15, -0.26, 0.55],
  [0, 0.03, 0.85],
  [0.15, -0.26, 0.55],
  [1.2, 0, 0.9],
];
const triangles = [
  [0, 1, 2],
  [0, 2, 3],
  [0, 3, 4],
  [0, 4, 5],
];
for (const face of triangles) {
  const [a, b, c] = face.map((i) => new Vector3(...points[i]));
  const positions = [];
  const p = (i, j) =>
    a
      .clone()
      .addScaledVector(b.clone().sub(a), i / 22)
      .addScaledVector(c.clone().sub(a), j / 22)
      .toArray();
  for (let i = 0; i < 22; i++)
    for (let j = 0; j < 22 - i; j++) {
      positions.push(...p(i, j), ...p(i + 1, j), ...p(i, j + 1));
      if (i + j < 21)
        positions.push(...p(i + 1, j), ...p(i + 1, j + 1), ...p(i, j + 1));
    }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  part(plane, geometry);
}
plane.rotation.set(0.65, 0.2, -0.35);
await exportArt('paper-plane', plane);
