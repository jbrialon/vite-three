import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    // Options
    this.options = {
      clearColor: 0x9fcce9,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1,
    };

    this.setInstance();

    // Debug
    this.setDebug();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
    });

    THREE.ColorManagement.enabled = true;
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor(this.options.clearColor);

    this.instance.toneMapping = this.options.toneMapping;
    this.instance.toneMappingExposure = this.options.toneMappingExposure;

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Experience");
      this.debugFolder
        .addColor(this.options, "clearColor")
        .name("Background Color")
        .onChange(() => {
          this.instance.setClearColor(this.options.clearColor);
        });
      // Tone Mapping
      this.debugFolder
        .add(this.options, "toneMapping", {
          None: THREE.NoToneMapping,
          Linear: THREE.LinearToneMapping,
          Reinhard: THREE.ReinhardToneMapping,
          Cineon: THREE.CineonToneMapping,
          ACESFilmic: THREE.ACESFilmicToneMapping,
        })
        .name("Tone Mapping")
        .onChange(() => {
          this.instance.toneMapping = Number(this.options.toneMapping);
        });

      // Tone Mapping Exposure
      this.debugFolder
        .add(this.options, "toneMappingExposure", 0, 2, 0.01)
        .name("Exposure")
        .onChange(() => {
          this.instance.toneMappingExposure = this.options.toneMappingExposure;
        });
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
