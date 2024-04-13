import Experience from "../Experience";
import Environment from "./Environment";
import Loader from "./Loader";
import Floor from "./Floor";
import Box from "./Box";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.loader = new Loader();

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.box = new Box();
      this.environment = new Environment();

      // Show Experience
      this.loader.hideLoader();
    });
  }

  update() {
    if (this.box) this.box.update();
    if (this.floor) this.floor.update();
  }
}
