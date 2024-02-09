import * as THREE from "three";
import Experience from "../Experience";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;

    // Options
    this.options = {};

    // Setup
    this.setMaterial();
    this.setModel();

    // Debug
    this.setDebug();
  }

  setMaterial() {
    this.material = new THREE.MeshLambertMaterial({ color: 0x020202 });
    this.material.color.setHSL(0.095, 1, 0.75);
  }

  setModel() {
    this.geometry = new THREE.PlaneGeometry(10000, 10000);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = -5;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Ground");
    }
  }

  update() {}
}
