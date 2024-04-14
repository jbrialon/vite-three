import * as THREE from "three";
import Rapier from "@dimforge/rapier3d-compat";
import Experience from "./Experience";

import RapierDebugRenderer from "./Utils/RapierDebugRenderer";

await Rapier.init();

export default class Physic {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;

    this.options = {
      debugger: true,
      gravity: new THREE.Vector3(0, -9.81, 0),
    };

    this.setInstance();

    // Debug
    this.setDebug();
  }

  setInstance() {
    this.instance = new Rapier.World(this.options.gravity);
  }
  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("🧲 Physic");

      this.rapierDebugRenderer = new RapierDebugRenderer(
        this.scene,
        this.instance
      );

      this.debugFolder
        .add(this.options, "debugger")
        .name("Toggle Colliders")
        .onChange(() => {
          this.rapierDebugRenderer.enabled = this.options.debugger;
        });
    }
  }

  update() {
    this.instance.step();
    if (this.rapierDebugRenderer) this.rapierDebugRenderer.update();
  }
}
