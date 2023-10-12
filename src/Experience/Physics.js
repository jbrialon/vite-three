import * as THREE from "three";
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

    this.options = {
      debugger: false,
      gravity: new THREE.Vector3(0, -29.82, 0),
    };

    // World
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;
    this.world.gravity.set(
      this.options.gravity.x,
      this.options.gravity.y,
      this.options.gravity.z
    );

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
      // this.debugFolder.close();

      this.debugFolder.add(this.options, "debugger");
      this.debugFolderGravity = this.debugFolder.addFolder("Gravity");
      this.debugFolderGravity
        .add(this.options.gravity, "x")
        .min(-30)
        .max(30)
        .name("X Axis")
        .onChange(() => {
          this.world.gravity.set(
            this.options.gravity.x,
            this.options.gravity.y,
            this.options.gravity.z
          );
        });
      this.debugFolderGravity
        .add(this.options.gravity, "y")
        .min(-30)
        .max(30)
        .name("Y Axis")
        .onChange(() => {
          this.world.gravity.set(
            this.options.gravity.x,
            this.options.gravity.y,
            this.options.gravity.z
          );
        });
      this.debugFolderGravity
        .add(this.options.gravity, "z")
        .min(-30)
        .max(30)
        .name("Z Axis")
        .onChange(() => {
          this.world.gravity.set(
            this.options.gravity.x,
            this.options.gravity.y,
            this.options.gravity.z
          );
        });
      this.debugger = new CannonDebugger(this.scene, this.world, {
        onUpdate: (body, mesh) => {
          mesh.visible = this.options.debugger;
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
