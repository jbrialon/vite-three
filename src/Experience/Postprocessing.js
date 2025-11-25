import * as THREE from "three/webgpu";
import { pass } from "three/tsl";
import { customPixelate } from "./CustomPass.js";
import Experience from "./Experience";

export default class Postprocessing {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;

    // Options
    this.options = {
      enabled: true,
      pixelSize: 0.005,
    };

    this.setInstance();
    this.setDebug();
  }

  setInstance() {
    this.instance = new THREE.PostProcessing(this.renderer.instance);

    const scenePass = pass(this.scene, this.camera.instance);
    const scenePassColor = scenePass.getTextureNode();

    this.pixelatePass = customPixelate(scenePassColor, {
      pixelSize: this.options.pixelSize,
    });

    this.instance.outputNode = this.pixelatePass;
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder({
        title: "Postprocessing",
      });

      this.debugFolder.addBinding(this.options, "enabled", {
        label: "Enable",
      });

      // Pixel Size
      this.debugFolder
        .addBinding(this.options, "pixelSize", {
          label: "Pixel Size",
          min: 0.001,
          max: 0.02,
          step: 0.0001,
        })
        .on("change", () => {
          this.rebuildPasses();
        });
    }
  }

  rebuildPasses() {
    this.setInstance();
  }

  update() {
    if (this.options.enabled) {
      this.instance.render();
    }
  }
}
