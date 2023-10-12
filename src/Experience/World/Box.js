import * as THREE from "three";
import Experience from "../Experience";

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.physics = this.experience.physics;

    // Options
    this.options = {};

    // Debug
    this.setDebug();

    // Setup
    this.setModel();
  }

  setModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();

    this.model = new THREE.Mesh(geometry, material);
    this.model.position.y = 10;
    this.physics.addPhysicToMesh(this.model, 1);

    this.scene.add(this.model);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Box");
      this.debugFolder.close();
    }
  }

  update() {}
}
