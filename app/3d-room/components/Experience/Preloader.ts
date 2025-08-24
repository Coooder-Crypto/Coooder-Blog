import EventEmitter from './Utils/EventEmitter';
import Experience from './Experience';
import gsap from 'gsap';
import convert from './Utils/convert';

export default class Preloader extends EventEmitter {
  private experience: Experience;
  private scene: any;
  private sizes: any;
  private resources: any;
  private time: any;
  private camera: any;
  private world: any;
  private device: string;
  private timeline!: gsap.core.Timeline;
  private roomChildren: any = {};

  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device || 'desktop';

    this.sizes.on('switchdevice', (device: string) => {
      this.device = device;
    });

    this.world.on('worldready', () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    // Convert text elements for character-by-character animation
    if (typeof document !== 'undefined') {
      convert(document.querySelector('.intro-text'));
      convert(document.querySelector('.hero-main-title'));
      convert(document.querySelector('.hero-main-description'));
    }
    
    // Get room children for animation
    if (this.world.room) {
      this.roomChildren = this.world.room.roomChildren;
    }
  }

  firstIntro() {
    return new Promise<void>((resolve) => {
      this.timeline = gsap.timeline();
      
      // Hide loader quickly
      this.timeline.to('.loader', {
        opacity: 0,
        delay: 0.5, // Reduced delay
        duration: 0.5, // Faster fade
        onComplete: () => {
          const loader = document.querySelector('.loader');
          if (loader) {
            (loader as HTMLElement).style.display = 'none';
          }
        }
      });

      // Animate floor plane quickly
      this.timeline.to(this.world.floor.plane.position, {
        y: -1,
        ease: 'power2.out',
        duration: 1, // Faster animation
      }, '-=0.3'); // Start earlier

      // Animate text elements if they exist (faster)
      this.timeline.to('.intro-text .animated', {
        yPercent: 0,
        stagger: 0.03, // Faster stagger
        ease: 'power2.out',
        duration: 0.8,
      }).to('.arrow-svg-wrapper', {
        opacity: 1,
        duration: 0.5,
      }).to('.hero-main-title .animated', {
        yPercent: 0,
        stagger: 0.05, // Faster stagger
        ease: 'power2.out',
        duration: 0.8,
      }, '-=0.5').to('.hero-main-description .animated', {
        yPercent: 0,
        stagger: 0.05, // Faster stagger
        ease: 'power2.out',
        duration: 0.8,
      }, '-=0.5');

      this.timeline.call(() => {
        resolve();
      });
    });
  }

  secondIntro() {
    return new Promise<void>((resolve) => {
      this.timeline = gsap.timeline();

      // Add a small delay to ensure everything is ready
      this.timeline.to({}, {
        duration: 0.1, // Very small delay
        onComplete: () => {
          this.trigger('enablecontrols');
          resolve();
        }
      });
    });
  }

  async playIntro() {
    await this.firstIntro();
    await this.secondIntro();
  }

  move() {
    // Room movement logic if needed
  }

  scale() {
    // Room scaling logic if needed  
  }

  update() {
    // Update logic if needed
  }
}