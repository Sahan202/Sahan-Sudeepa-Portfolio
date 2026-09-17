// Run with a local Xbot GLB: node scripts/prepare-wireframe.mjs path/to/model.glb
// Attribution and upstream source are recorded in public/models/credits.txt.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import {
  Box3,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  WireframeGeometry,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const file = await readFile(process.argv[2]);
const jsonSize = file.readUInt32LE(12);
const document = JSON.parse(file.subarray(20, 20 + jsonSize).toString());
const binStart = 20 + jsonSize + 8;
document.buffers[0].uri = `data:application/octet-stream;base64,${file.subarray(binStart).toString('base64')}`;
// Only the geometry and bind pose are needed; no textures or logos are used.
delete document.images;
delete document.textures;
delete document.materials;
for (const mesh of document.meshes)
  for (const primitive of mesh.primitives) delete primitive.material;
globalThis.ProgressEvent ??= class ProgressEvent {};
const gltf = await new GLTFLoader().parseAsync(JSON.stringify(document), '');
// Set an open, reaching pose before baking the skinned vertices.
const leftArm = gltf.scene.getObjectByName('mixamorigLeftArm');
const rightArm = gltf.scene.getObjectByName('mixamorigRightArm');
if (leftArm) {
  leftArm.rotation.z -= 0.3;
  leftArm.rotation.y -= 0.45;
}
if (rightArm) {
  rightArm.rotation.z += 0.65;
  rightArm.rotation.y += 0.25;
}
gltf.scene.updateMatrixWorld(true);
const vertices = [];
const bounds = new Box3().setFromObject(gltf.scene);
const center = bounds.getCenter(new Vector3());
const factor = 2.4 / bounds.getSize(new Vector3()).y;
gltf.scene.traverse((mesh) => {
  if (!mesh.isMesh) return;
  if (mesh.isSkinnedMesh) mesh.skeleton.update();
  const positions = mesh.geometry.attributes.position;
  const transformed = [];
  for (let i = 0; i < positions.count; i++) {
    const point = new Vector3();
    mesh.getVertexPosition(i, point).applyMatrix4(mesh.matrixWorld);
    transformed.push(point);
  }
  let seed = 2026;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (const point of transformed) {
    point.sub(center).multiplyScalar(factor);
    point.x += (random() - 0.5) * 0.014;
    point.y += (random() - 0.5) * 0.014;
    point.z += (random() - 0.5) * 0.014;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new Float32BufferAttribute(
      transformed.flatMap((p) => p.toArray()),
      3
    )
  );
  geometry.setIndex(mesh.geometry.index.clone());
  const wire = new WireframeGeometry(geometry);
  const lines = wire.attributes.position.array;
  // Sample edges uniformly: retain the silhouette without a dense solid surface.
  for (let i = 0; i < lines.length; i += 6) {
    if (random() > 0.3) continue;
    for (let j = 0; j < 6; j++) vertices.push(lines[i + j]);
  }
  geometry.dispose();
  wire.dispose();
});
await mkdir('public/models', { recursive: true });
await writeFile(
  'public/models/human-wireframe.bin',
  Buffer.from(new Float32Array(vertices).buffer)
);
const paths = [];
for (let i = 0; i < vertices.length; i += 6) {
  const project = (x, y, z) => [
    300 + (x * Math.cos(-0.45) + z * Math.sin(-0.45)) * 205,
    310 - y * 205,
  ];
  const a = project(...vertices.slice(i, i + 3));
  const b = project(...vertices.slice(i + 3, i + 6));
  paths.push(
    `M${a.map((n) => n.toFixed(1)).join(',')}L${b.map((n) => n.toFixed(1)).join(',')}`
  );
}
await writeFile(
  'public/models/human-wireframe.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 640"><path d="${paths.join('')}" fill="none" stroke="#e9b783" stroke-width="0.55" opacity="0.5"/></svg>`
);
console.log(
  `Prepared ${vertices.length / 6} wireframe segments (${vertices.length * 4} bytes).`
);
