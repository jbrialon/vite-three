import * as THREE from "three";
import Experience from "../Experience";

import { createRigidBodyEntity } from "../Utils/Physic";

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.physic = this.experience.physic.instance;

    // Options
    this.options = {
      color: 0xbebebe,
      position: new THREE.Vector3(0, 10, 0),
    };

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: this.options.color,
    });

    this.boxes = [];
    this.rigidBodies = [];
    // Setup
    this.addMesh();

    // Debug
    this.setDebug();
  }

  addMesh() {
    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    this.initPhysic(mesh);
    this.scene.add(mesh);
  }

  initPhysic(mesh) {
    const { rigidBody } = createRigidBodyEntity(
      mesh,
      this.options.position,
      this.physic
    );

    this.boxes.push({
      mesh,
      rigidBody,
    });
  }

  updateVisual() {
    this.boxes.forEach((box) => {
      box.mesh.position.copy(box.rigidBody.translation());
      const quaternion = box.rigidBody.rotation();
      box.mesh.quaternion.set(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w
      );
    });
  }

  update() {
    this.updateVisual();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("📦 Box");

      this.debugFolder.add(this, "addMesh");
    }
  }
}
