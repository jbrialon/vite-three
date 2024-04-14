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
    this.material = new THREE.MeshBasicMaterial({
      color: this.options.color,
    });

    // Setup
    this.addMesh();
    this.initPhysic();

    // Debug
    this.setDebug();
  }

  addMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.scene.add(this.mesh);
  }

  initPhysic() {
    this.position = this.mesh.position.clone();
    const { rigidBody, collider } = createRigidBodyEntity(
      this.mesh,
      this.options.position,
      this.physic
    );
    this.rigidBody = rigidBody;
    this.collider = collider;
  }

  updateVisual() {
    if (this.mesh) this.mesh.position.copy(this.rigidBody.translation());
  }

  update() {
    this.updateVisual();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("📦 Box");
      this.debugFolder.close();

      this.debugFolder
        .addColor(this.options, "color")
        .onChange(() => {
          this.material.color = this.options.material;
        })
        .name("Box Color");
    }
  }
}
