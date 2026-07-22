import Stats from "stats-gl";
import Experience from "../Experience.js";

export default class Performance {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.stats = new Stats({
        trackGPU: true,
        trackHz: true,
        trackCPT: false,
        minimal: false,
        mode: 2,
        horizontal: false,
      });
      document.body.appendChild(this.stats.dom);

      this.visible = false;
      this.stats.dom.style.display = "none";
      this.setDebug();
    }
  }

  setDebug() {
    this.debugFolder = this.debug.ui.addFolder({
      title: "Stats",
      expanded: false,
    });
    this.debugFolder.addButton({ title: "Toggle Stats" }).on("click", () => {
      this.visible = !this.visible;
      this.stats.dom.style.display = this.visible ? "" : "none";
    });
  }

  init(renderer) {
    if (this.active) this.stats.init(renderer);
  }

  begin() {
    if (this.active) this.stats.begin();
  }

  update() {
    if (this.active) this.stats.update();
  }

  end() {
    if (this.active) this.stats.end();
  }
}
