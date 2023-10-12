import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Box from "./Box";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.box = new Box();
      this.floor = new Floor();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.floor) this.floor.update();
    if (this.box) this.box.update();
  }
}
