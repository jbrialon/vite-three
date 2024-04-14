import * as THREE from "three";
import Experience from "../Experience";

import { creatRigidBodyFixed } from "../Utils/Physic";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.physic = this.experience.physic.instance;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Setup
    this.setModel();
    this.initPhysic();
  }

  setModel() {
    this.geometry = new THREE.BoxGeometry(12, 0.1, 12);
    this.material = new THREE.MeshStandardMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }

  initPhysic() {
    const { rigidBody, collider } = creatRigidBodyFixed(this.mesh, this.physic);
    this.rigidBody = rigidBody;
    this.collider = collider;

    this.mesh.position.copy(this.rigidBody.translation());
  }

  update() {}
}
