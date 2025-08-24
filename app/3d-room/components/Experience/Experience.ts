import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import Preloader from './Preloader';
import Controls from './World/Controls';
import assets from './Utils/assets';

export default class Experience {
  private static instance: Experience;
  public canvas: HTMLCanvasElement;
  public scene!: THREE.Scene;
  public sizes!: Sizes;
  public time!: Time;
  public camera!: Camera;
  public renderer!: Renderer;
  public resources!: Resources;
  public world!: World;
  public preloader!: Preloader;
  public controls?: Controls;

  constructor(canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    
    if (canvas) {
      this.canvas = canvas;
      this.scene = new THREE.Scene();
      this.time = new Time();
      this.sizes = new Sizes();
      this.camera = new Camera();
      this.renderer = new Renderer();
      this.resources = new Resources(assets);
      this.world = new World();
      this.preloader = new Preloader();

      // Create controls only after preloader enables them
      this.preloader.on('enablecontrols', () => {
        this.controls = new Controls();
      });

      this.sizes.on('resize', () => {
        this.resize();
      });

      this.time.on('update', () => {
        this.update();
      });
    }
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  update() {
    this.preloader.update();
    this.camera.update();
    this.renderer.update();
    this.world.update();

    if (this.controls) {
      this.controls.update();
    }
  }
}