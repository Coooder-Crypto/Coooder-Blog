import * as THREE from 'three';
import Experience from '../Experience';

export default class Environment {
  private experience: Experience;
  private scene: THREE.Scene;
  private resources: any;
  private sunLight!: THREE.DirectionalLight;
  private ambientLight!: THREE.AmbientLight;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 10;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(0, 3, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1.5);
    this.scene.add(this.ambientLight);
  }

  setEnvironmentMap() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    this.scene.environment = cubeTextureLoader.load([
      '/3d-room/textures/py.png',
      '/3d-room/textures/py.png',
      '/3d-room/textures/py.png',
      '/3d-room/textures/py.png',
      '/3d-room/textures/py.png',
      '/3d-room/textures/py.png',
    ]);
  }

  resize() {}

  update() {}
}
