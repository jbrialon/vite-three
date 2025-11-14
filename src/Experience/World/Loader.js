import * as THREE from "three/webgpu";
import { uniform, color, vec4, attribute } from "three/tsl";

import { gsap } from "gsap";
import Experience from "../Experience";

export default class Loader {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Options
    this.uniforms = {
      uColor: color(0x7cb7e5),
      uAlpha: uniform(1),
    };

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.NodeMaterial();
    this.material.depthTest = false;
    this.material.depthWrite = false;
    this.material.transparent = true;

    // Vertex shader equivalent in TSL - fullscreen quad
    // Use position attribute directly as clip space coordinates
    const position = attribute("position");
    this.material.vertexNode = vec4(position, 1.0);

    this.material.fragmentNode = vec4(
      this.uniforms.uColor,
      this.uniforms.uAlpha
    );
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = true;
    this.scene.add(this.mesh);
  }

  hideLoader() {
    gsap.to(this.uniforms.uAlpha, {
      duration: 3,
      value: 0,
      ease: "power4.inOut",
      onComplete: () => {
        this.destroy();
      },
    });
  }

  destroy() {
    this.geometry.dispose();
    this.material.dispose();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.scene.remove(this.mesh);
  }
}
