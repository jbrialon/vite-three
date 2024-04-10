import * as THREE from "three";
import Experience from "../Experience";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Options
    this.options = {};

    // Setup
    this.setMaterial();
    this.setModel();

    // Debug
    this.setDebug();
  }

  setMaterial() {
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffc880,
      flatShading: true,
    });
  }

  setModel() {
    this.geometry = new THREE.IcosahedronGeometry(25, 1);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = -27;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Ground");
    }
  }

  update() {
    this.mesh.rotation.x -= 0.0003 * this.time.delta;
  }
}
