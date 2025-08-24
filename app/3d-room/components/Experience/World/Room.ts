import * as THREE from 'three';
import Experience from '../Experience';
import gsap from 'gsap';

export default class Room {
  private experience: Experience;
  private scene: THREE.Scene;
  private resources: any;
  private room: any;
  public actualRoom: THREE.Group;
  private roomChildren: { [key: string]: any } = {};
  private lerp = {
    current: 0,
    target: 0,
    ease: 0.1,
  };

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.room = this.resources.items.room;

    if (!this.room) {
      return;
    }

    if (!this.room.scene) {
      return;
    }

    this.actualRoom = this.room.scene;

    this.setModel();
    // Removed onMouseMove since we use OrbitControls now
  }

  setModel() {
    this.actualRoom.children.forEach((child: any) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild: any) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
          if (groupchild.material) {
            groupchild.material.envMapIntensity = 1;
          }
        });
      }

      if (child.name === 'screen_desktop') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen_desktop,
        });
      }

      // Set initial scale to 1 - no preloader animation needed
      if (child.name !== 'Cube') {
        child.scale.set(1, 1, 1);
      }

      if (child.name === 'Cube') {
        // Hide the cube - it's part of preloader animation we don't want
        child.visible = false;
      }

      if (child.name === 'screen_photo') {
        const texture = new THREE.TextureLoader().load('/static/images/avatar.png');
        texture.flipY = false;
        
        // 设置纹理不重复，剩余部分为黑色
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        
        // 调整纹理缩放以适应屏幕比例
        const aspectRatio = 1; // 方形图片的宽高比
        texture.repeat.set(aspectRatio, 1);
        texture.offset.set((1 - aspectRatio) / 2, 0); // 居中显示
        
        child.material = new THREE.MeshBasicMaterial({
          map: texture,
        });
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.3, 0.3, 0.3);
    this.actualRoom.position.y = -0.4;
  }

  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      const rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = rotation * 0.1;
    });
  }

  resize() {}

  update() {
    // OrbitControls handles camera movement now
  }
}
