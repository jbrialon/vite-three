import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.physics = this.experience.physics;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Floor");
      this.debugFolder.close();
    }

    // Setup
    this.resource = this.resources.items.floorModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true;
        this.physics.addPhysicToMesh(child, 0);
      }
    });
    this.scene.add(this.model);
  }

  update() {}
}
