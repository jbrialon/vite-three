import Experience from "../Experience";
import Environment from "./Environment";
import Loader from "./Loader";
import Ground from "./Ground";
import Plane from "./Plane";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.loader = new Loader();

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.ground = new Ground();
      this.plane = new Plane();
      this.environment = new Environment();

      // Show Experience
      this.loader.hideLoader();
    });
  }

  update() {
    if (this.plane) this.plane.update();
    if (this.ground) this.ground.update();
  }
}
