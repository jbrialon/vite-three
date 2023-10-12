import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { threeToCannon } from "three-to-cannon";

import Experience from "./Experience.js";

export default class Physics {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // World
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;
    this.world.gravity.set(0, -29.82, 0);

    // Materials
    this.defaultMaterial = new CANNON.Material("default");

    this.objectsToUpdate = [];

    this.defaultContactMaterial = new CANNON.ContactMaterial(
      this.defaultMaterial,
      this.defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.7,
      }
    );

    this.world.addContactMaterial(this.defaultContactMaterial);
    this.world.defaultContactMaterial = this.defaultContactMaterial;

    this.setDebug();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Physics");
      this.debugFolder.close();

      this.debugObject = {
        debugger: false,
      };

      this.debugFolder.add(this.debugObject, "debugger");

      this.debugger = new CannonDebugger(this.scene, this.world, {
        onUpdate: (body, mesh) => {
          mesh.visible = this.debugObject.debugger;
        },
      });
    }
  }

  addPhysicToMesh(mesh, mass) {
    const { shape, offset, quaternion } = threeToCannon(mesh);
    const position = mesh.position.clone();

    const body = new CANNON.Body({
      mass: mass,
      position: new CANNON.Vec3(position),
      shape: shape,
      offset: offset,
      quaternion: quaternion,
      material: this.defaultMaterial,
    });

    body.position.copy(position);
    this.world.addBody(body);

    // Save In Objects to Update
    this.objectsToUpdate.push({
      mesh: mesh,
      body: body,
    });
  }

  update() {
    if (this.debug.active) this.debugger.update();

    this.world.step(1 / 60, this.time.delta * 0.001, 3);

    this.objectsToUpdate.forEach((object) => {
      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    });
  }

  destroy() {
    // remove all bodies
    for (const object of this.objectsToUpdate) {
      this.world.removeBody(object.body);
    }

    this.world = null;

    this.experience = null;
    this.scene = null;
    this.time = null;
    this.debug = null;

    this.objectsToUpdate = [];
  }
}
