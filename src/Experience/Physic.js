import * as THREE from "three";
import Rapier from "@dimforge/rapier3d-compat";
import Experience from "./Experience";

await Rapier.init();

export default class Physic {
  constructor() {
    this.experience = new Experience();

    this.canvas = this.experience.canvas;
    this.time = this.experience.time;
    this.scene = this.experience.scene;

    this.options = {
      debugger: false,
      gravity: new THREE.Vector3(0, -9.81, 0),
    };

    this.instance = new Rapier.World(this.options.gravity);

    // Debug
    this.setDebug();
  }

  setDebug() {
    // this.rapierDebugRenderer = new RapierDebugRenderer(scene, world);
  }

  update() {
    this.instance.step();
  }
}
