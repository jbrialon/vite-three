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
    this.geometry = new THREE.BoxGeometry(200, 0.1, 200);
    this.material = new THREE.MeshStandardMaterial();

    this.model = new THREE.Mesh(this.geometry, this.material);
    this.model.position.y = -2.15;
    this.model.receiveShadow = true;
    this.physics.addPhysicToMesh(this.model, 0);

    this.scene.add(this.model);
  }

  update() {}
}
