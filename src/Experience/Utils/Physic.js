import { ColliderDesc, RigidBodyDesc } from "@dimforge/rapier3d-compat";

function createCollider(geo, rigidBody, physic) {
  const vertices = new Float32Array(geo.attributes.position.array);
  const indices = new Float32Array(geo.index.array);
  const colliderDesc = ColliderDesc.trimesh(vertices, indices);
  return physic.createCollider(colliderDesc, rigidBody);
}

export function creatRigidBodyFixed(mesh, physic) {
  const rigidBodyDesc = RigidBodyDesc.fixed();
  const rigidBody = physic.createRigidBody(rigidBodyDesc);
  const collider = createCollider(mesh.geometry, rigidBody, physic);

  return { rigidBody, collider };
}

export function createRigidBodyEntity(mesh, position, physic) {
  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(...position);

  const rigidBody = physic.createRigidBody(rigidBodyDesc);
  const collider = createCollider(mesh.geometry, rigidBody, physic);

  return { rigidBody, collider };
}
