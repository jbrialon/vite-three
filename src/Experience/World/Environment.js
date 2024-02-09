import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Setup
    this.setFog();
    this.setAmbientLight();
    this.setSunLight();

    // Debug
    this.setDebug();
  }

  setFog() {
    this.scene.fog = new THREE.Fog("#9fcce9", 1, 115);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.far = 45;
    this.sunLight.shadow.camera.left = -5;
    this.sunLight.shadow.camera.top = 5;
    this.sunLight.shadow.camera.right = 5;
    this.sunLight.shadow.camera.bottom = -5;
    this.sunLight.shadow.bias = -0.0001;
    this.sunLight.position.set(2, 8, 8);
    this.scene.add(this.sunLight);
  }

  setDebug() {
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Environment");
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
      this.scene.add(this.helper);
    }
  }
}
