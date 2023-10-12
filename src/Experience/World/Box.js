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
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xbebebe,
    });

    // Debug
    this.setDebug();

    // Setup
    this.addModel();
    setInterval(() => {
      this.addModel();
    }, 2000);
  }

  addModel() {
    const model = new THREE.Mesh(this.geometry, this.material);
    model.position.x = Math.random() * 10 - 5;
    model.position.z = Math.random() * 10 - 5;
    model.position.y = 10;
    model.receiveShadow = true;
    model.castShadow = true;
    this.physics.addPhysicToMesh(model, 1);

    this.scene.add(model);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Box");
      this.debugFolder.close();

      this.options.material = this.material.color;
      this.debugFolder
        .addColor(this.material, "color")
        .onChange(() => {
          this.material.color = this.options.material;
        })
        .name("Box Color");
    }
  }

  update() {}
}
