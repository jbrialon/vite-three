import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
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
    this.material = new THREE.MeshBasicMaterial({
      color: 0x9fcce9,
    });
    // Debug
    this.setDebug();

    // Setup
    this.setModel();
  }

  setModel() {
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      this.geometry = new TextGeometry("PHYSICS", {
        font: font,
        size: 4,
        height: 1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2,
      });

      this.geometry.center();
      this.model = new THREE.Mesh(this.geometry, this.material);
      this.model.castShadow = true;
      this.model.receiveShadow = true;
      this.physics.addPhysicToMesh(this.model, 0);
      this.scene.add(this.model);
    });
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Text");
      this.debugFolder.close();

      this.options.material = this.material.color;
      this.debugFolder
        .addColor(this.material, "color")
        .onChange(() => {
          this.material.color = this.options.material;
        })
        .name("Text Color");
    }
  }

  update() {}
}
