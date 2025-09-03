import * as THREE from 'three';
import Experience from '../Experience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ASScroll from '@ashthornton/asscroll';

export default class Controls {
  private experience: Experience;
  private scene: THREE.Scene;
  private sizes: any;
  private resources: any;
  private camera: any;
  private time: any;
  private room: THREE.Group;
  private file: any;
  private circle: any;
  private floor: any;
  private asscroll: any;
  private mixer?: THREE.AnimationMixer;
  private drawerClip?: THREE.AnimationClip;
  private mailClip?: THREE.AnimationClip;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;

    // Check if world objects exist
    if (!this.experience.world.room || !this.experience.world.floor) {
      return;
    }

    this.room = this.experience.world.room.actualRoom;
    this.file = this.resources.items.room;
    this.circle = this.experience.world.floor.circle;
    this.floor = this.experience.world.floor.plane;

    gsap.registerPlugin(ScrollTrigger);

    // Enable body overflow for scrolling
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body')!;
      body.style.overflow = 'visible';
      body.style.overflowX = 'hidden'; // Prevent horizontal scroll
    }

    // this.setSmoothScroll(); // Disabled for now
    this.setScrollTrigger();
  }

  setupASScroll() {
    // Find container element with fallback
    const container = document.querySelector('[data-asscroll-container]') || document.querySelector('.page');
    if (!container) {
      return null;
    }

    const asscroll = new ASScroll({
      containerElement: container as HTMLElement,
      disableRaf: true,
      ease: 0.3,
    });

    gsap.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value: any) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      fixedMarkers: true,
    });

    asscroll.on('update', ScrollTrigger.update);
    ScrollTrigger.addEventListener('refresh', asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll('.gsap-marker-start, .gsap-marker-end, [data-asscroll]'),
      });
    });

    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    if (!this.room || !this.room.position) {
      return;
    }

    // Reset ScrollTrigger to default scroller (window) since we're not using ASScroll
    ScrollTrigger.defaults({
      scroller: window,
    });

    ScrollTrigger.matchMedia({
      // Desktop
      '(min-width: 969px)': () => {
        // Resets
        this.room.scale.set(0.3, 0.3, 0.3);

        // First Section ----------------------------------------
        const firstTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        firstTimeline.to(this.room.position, {
          x: () => {
            return -(this.sizes.width * 0.0009);
          },
          z: () => {
            return this.sizes.width * 0.0009;
          },
        });

        // Second Section ----------------------------------------
        const secondTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        secondTimeline
          .to(
            this.room.position,
            {
              x: 2,
              z: 2,
            },
            'same'
          )
          .to(
            this.room.scale,
            {
              x: 0.6,
              y: 0.6,
              z: 0.6,
            },
            'same'
          );

        if (this.floor && this.floor.position) {
          secondTimeline.to(
            this.floor.position,
            {
              y: -1.5,
            },
            'same'
          );
        }

        // Third Section ----------------------------------------
        const thirdTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        thirdTimeline.to(this.camera.perspectiveCamera.position, {
          x: 1.7,
          y: 2,
        });

        // Drawer animation (setAnimationDrawer) -----------------
        if (this.file && this.file.animations) {
          this.mixer = new THREE.AnimationMixer(this.room);
          ScrollTrigger.create({
            trigger: '.third-move',
            start: 'top-=100 top',
            end: 'bottom bottom',
            onEnter: () => {
              if (this.file.animations && this.file.animations.length > 0) {
                this.drawerClip = this.mixer!.clipAction(this.file.animations[0]);
                this.drawerClip.play();
                this.drawerClip.repetitions = 1;
              }
              if (this.file.animations && this.file.animations.length > 1) {
                this.mailClip = this.mixer!.clipAction(this.file.animations[1]);
                this.mailClip.play();
                this.mailClip.repetitions = 1;
                this.mailClip.clampWhenFinished = true;
              }
            },
            scrub: 0.5,
            invalidateOnRefresh: true,
          });
        }
      },

      // All devices
      all: () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
          const progressBar = section.querySelector('.progress-bar');
          const introWrapper = section.querySelector('.section-intro-wrapper');
          const detailWrapper = section.querySelector('.section-detail-wrapper');

          // Animate content appearance
          if (introWrapper) {
            gsap.to(introWrapper, {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'center center',
                toggleActions: 'play none none reverse',
              },
            });
          }

          if (detailWrapper) {
            gsap.to(detailWrapper, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'center center',
                toggleActions: 'play none none reverse',
              },
            });
          }

          if (section.classList.contains('right')) {
            gsap.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.5,
              },
            });
            gsap.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            });
          } else {
            gsap.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.5,
              },
            });
            gsap.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            });
          }

          if (progressBar) {
            gsap.from(progressBar, {
              scaleY: 0,
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.4,
                pin: progressBar,
                pinSpacing: false,
              },
            });
          }
        });

        // Circle animations ------------------
        // First Section ----------------------------------------
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(this.circle.scale, {
            x: 3,
            y: 3,
            z: 3,
          });

        // Second Section ----------------------------------------
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(this.circle.scale, {
            x: 0,
            y: 0,
            z: 0,
          });

        // Third Section ----------------------------------------
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(this.circle.scale, {
            x: 3,
            y: 3,
            z: 3,
          });
      },

      // Mobile
      '(max-width: 968px)': () => {
        // Resets
        this.room.scale.set(0.15, 0.15, 0.15);

        // First Section ----------------------------------------
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.room.scale,
            {
              x: 0.5,
              y: 0.5,
              z: 0.5,
            },
            'same'
          );

        // Second Section ----------------------------------------
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.second-move',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.room.scale,
            {
              x: 1,
              y: 1,
              z: 1,
            },
            'same'
          )
          .to(
            this.room.position,
            {
              x: -3.2,
            },
            'same'
          )
          .to(
            this.scene.position,
            {
              y: -2,
            },
            'same'
          );

        // Third Section ----------------------------------------
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.third-move',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.room.position,
            {
              x: 1.5,
              z: -4,
            },
            'same'
          )
          .to(
            this.room.scale,
            {
              x: 1.5,
              y: 1.5,
              z: 1.5,
            },
            'same'
          )
          .to(
            this.room.rotation,
            {
              z: -0.2,
              x: 0.2,
            },
            'same'
          );

        // Drawer animation (setAnimationDrawer) -----------------
        if (this.file && this.file.animations) {
          this.mixer = new THREE.AnimationMixer(this.room);
          ScrollTrigger.create({
            trigger: '.third-move',
            start: 'top+=1300 top',
            end: 'bottom bottom',
            onEnter: () => {
              if (this.file.animations && this.file.animations.length > 0) {
                this.drawerClip = this.mixer!.clipAction(this.file.animations[0]);
                this.drawerClip.play();
                this.drawerClip.repetitions = 1;
              }
              if (this.file.animations && this.file.animations.length > 1) {
                this.mailClip = this.mixer!.clipAction(this.file.animations[1]);
                this.mailClip.play();
                this.mailClip.repetitions = 1;
                this.mailClip.clampWhenFinished = true;
              }
            },
            scrub: 0.5,
            invalidateOnRefresh: true,
          });
        }
      },
    });

    // Refresh ScrollTrigger after setup
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  }

  resize() {
    // Handle resize if needed
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.time.delta * 0.001);
    }
  }
}
