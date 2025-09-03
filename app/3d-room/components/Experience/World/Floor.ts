import * as THREE from 'three';
import Experience from '../Experience';

export default class Floor {
  private experience: Experience;
  private scene: THREE.Scene;
  public plane!: THREE.Mesh;
  public circle!: THREE.Mesh;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.Material;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircle();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -1;
    this.plane.receiveShadow = true;
  }

  setCircle() {
    this.geometry = new THREE.CircleGeometry(20, 128);
    this.material = new THREE.MeshStandardMaterial({ color: 0x555555 });
    this.circle = new THREE.Mesh(this.geometry, this.material);

    this.circle.position.y = -0.9;
    this.circle.scale.set(0, 0, 0);
    this.circle.rotation.x = -Math.PI / 2;
    this.circle.receiveShadow = true;

    this.scene.add(this.circle);
  }

  resize() {}

  update() {}
}
