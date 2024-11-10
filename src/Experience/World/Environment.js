import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.options = {
      ambientLightColor: 0xffffff,
      sunLightColor: 0xffffff,
      showHelper: false,
      environmentIntensity: 1,
      useEnvMap: false,
      showEnvMap: false,
      envMapRotation: Math.PI * 0.5,
    };

    // Setup
    this.envMap = this.resources.items.envMap;

    this.setEnvMap();
    this.setAmbientLight();
    this.setSunLight();

    // Debug
    this.setDebug();
  }

  setEnvMap() {
    this.envMap.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = this.options.showEnvMap ? this.envMap : null;
    this.scene.environment = this.options.useEnvMap ? this.envMap : null;

    this.scene.backgroundRotation.y = this.options.envMapRotation;
    this.scene.environmentRotation.y = this.options.envMapRotation;

    this.scene.environmentIntensity = this.options.environmentIntensity;
  }
  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(
      this.options.ambientLightColor,
      0.8
    );
    this.scene.add(this.ambientLight);
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(this.options.sunLightColor, 2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
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
      this.debugFolder = this.debug.ui.addFolder("Env");
      this.debugFolder
        .add(this.ambientLight, "intensity")
        .name("Light Intensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        .addColor(this.options, "ambientLightColor")
        .name("Light Color")
        .onChange(() => {
          this.ambientLight.color.set(this.options.ambientLightColor);
        });

      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("Sun Intensity")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .addColor(this.options, "sunLightColor")
        .name("Light Color")
        .onChange(() => {
          this.sunLight.color.set(this.options.sunLightColor);
        });

      // Toggle Env Map
      this.debugFolder
        .add(this.options, "useEnvMap")
        .name("Use Env Map")
        .onChange(() => {
          this.scene.environment = this.options.useEnvMap ? this.envMap : null;
        });

      // Show/Hide Env Map
      this.debugFolder
        .add(this.options, "showEnvMap")
        .name("Show Env Map")
        .onChange(() => {
          this.scene.background = this.options.showEnvMap ? this.envMap : null;
        });

      this.debugFolder
        .add(this.options, "envMapRotation")
        .min(-Math.PI)
        .max(Math.PI)
        .onChange(() => {
          this.scene.backgroundRotation.y = this.options.envMapRotation;
          this.scene.environmentRotation.y = this.options.envMapRotation;
        });

      this.debugFolder
        .add(this.scene, "environmentIntensity")
        .name("Env Intensity")
        .min(0)
        .max(5)
        .step(0.001);

      // Show/Hide Directional Light Helper
      this.helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
      this.debugFolder
        .add(this.options, "showHelper")
        .name("Show Light Helper")
        .onChange((value) => {
          if (value) {
            this.scene.add(this.helper); // Add the helper to the scene
          } else {
            this.scene.remove(this.helper); // Remove the helper from the scene
          }
        });

      // Initially add the helper if showHelper is true
      // Create the helper but don't add it to the scene yet
      this.helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
      if (this.options.showHelper) {
        this.scene.add(this.helper);
      }
    }
  }
}
