'use client';

import { useEffect, useRef, useState } from 'react';
import Experience from './components/Experience/Experience';
import './styles.css';

export default function ThreeDRoomClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (canvasRef.current && !experienceRef.current) {
      try {
        experienceRef.current = new Experience(canvasRef.current);

        // Listen for resources loaded to hide loading screen quickly
        if (experienceRef.current.resources) {
          experienceRef.current.resources.on('ready', () => {
            setIsLoading(false);
          });
        }

        // Listen for preloader completion to ensure controls are enabled
        if (experienceRef.current.preloader) {
          experienceRef.current.preloader.on('enablecontrols', () => {
            // Controls enabled
          });
        }
      } catch (error) {
        console.error('Error initializing Experience:', error);
        setIsLoading(false);
      }
    }

    return () => {
      if (experienceRef.current) {
        // Cleanup if needed
        experienceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loader">
          <div className="loader-wrapper">
            <div className="loading">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Canvas - Background */}
      <canvas ref={canvasRef} className="experience-canvas"></canvas>

      {/* Page Content - Foreground */}
      <main className="m-0 w-screen max-w-none p-0">
        <section className="hero relative m-0 flex h-screen w-screen items-center justify-center p-0">
          <div className="hero-wrapper">
            <div className="intro-text">Welcome to my 3D Room</div>
            <div className="arrow-svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path
                  fill="currentColor"
                  d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
                />
              </svg>
            </div>

            <div className="hero-main">
              <h1 className="hero-main-title">Interactive 3D Room</h1>
              <p className="hero-main-description">Three.js • GSAP • WebGL</p>
            </div>

            <div className="hero-second">
              <p className="hero-second-subheading first-sub">3D Room</p>
              <p className="hero-second-subheading second-sub">Showcase</p>
            </div>
          </div>
        </section>

        {/* 大间距区域 */}
        <div className="first-move w-screen" style={{ height: '200vh' }}></div>

        <section className="first-section section right relative ml-auto w-1/2" style={{ padding: '50vh 4%' }}>
          <div className="progress-wrapper progress-bar-wrapper-right">
            <div className="progress-bar"></div>
          </div>

          <div className="section-intro-wrapper">
            <h1 className="section-title">
              <span className="section-title-text">About this project</span>
              <div className="section-title-decoration styleOne"></div>
              <div className="section-title-decoration styleTwo"></div>
              <div className="section-title-decoration styleThree"></div>
            </h1>
            <span className="section-number">01</span>
          </div>

          <div className="section-detail-wrapper">
            <h3 className="section-heading">Three.js 3D Rendering</h3>
            <p className="section-text">
              This interactive 3D room showcases modern web graphics capabilities using Three.js. The scene features
              realistic lighting, shadows, and textures with smooth animations.
            </p>
            <h3 className="section-heading">Interactive Experience</h3>
            <p className="section-text">
              Experience the room from different perspectives as you scroll through the page. The camera moves
              dynamically to showcase different aspects of the 3D environment.
            </p>
            <h3 className="section-heading">Optimized Performance</h3>
            <p className="section-text">
              Using Draco compression for 3D models and optimized shaders, this demo maintains high visual quality while
              ensuring fast loading times.
            </p>
          </div>
        </section>

        {/* 大间距区域 */}
        <div className="second-move w-screen" style={{ height: '200vh' }}></div>

        <section className="second-section section left relative mr-auto w-1/2" style={{ padding: '50vh 4%' }}>
          <div className="progress-wrapper progress-bar-wrapper-left">
            <div className="progress-bar blue-background"></div>
          </div>

          <div className="section-intro-wrapper">
            <h1 className="section-title">
              <span className="section-title-text">Technical Details</span>
              <div className="section-title-decoration styleOne"></div>
              <div className="section-title-decoration styleTwo"></div>
              <div className="section-title-decoration styleThree"></div>
            </h1>
            <span className="section-number">02</span>
          </div>

          <div className="section-detail-wrapper">
            <h3 className="section-heading">Modern WebGL Pipeline</h3>
            <p className="section-text">
              Built with Three.js featuring the latest WebGL rendering pipeline, physically based materials, and
              real-time environmental lighting.
            </p>
            <h3 className="section-heading">Asset Pipeline</h3>
            <p className="section-text">
              3D models created in Blender and exported as optimized GLB files with Draco compression. Textures are
              compressed and properly sized for web delivery.
            </p>
            <h3 className="section-heading">Animation System</h3>
            <p className="section-text">
              GSAP provides smooth interpolation and easing functions for camera movements, object animations, and
              scroll-triggered animations.
            </p>
          </div>
        </section>

        {/* 大间距区域 */}
        <div className="third-move w-screen" style={{ height: '200vh' }}></div>

        <section className="third-section section right relative ml-auto w-1/2" style={{ padding: '50vh 4%' }}>
          <div className="progress-wrapper progress-bar-wrapper-right">
            <div className="progress-bar green-background"></div>
          </div>

          <div className="section-intro-wrapper">
            <h1 className="section-title">
              <span className="section-title-text">Experience More</span>
              <div className="section-title-decoration styleOne"></div>
              <div className="section-title-decoration styleTwo"></div>
              <div className="section-title-decoration styleThree"></div>
            </h1>
            <span className="section-number">03</span>
          </div>

          <div className="section-detail-wrapper">
            <h3 className="section-heading">Web 3D Future</h3>
            <p className="section-text">
              This demonstrates the potential of browser-based 3D experiences for modern web applications and
              interactive storytelling.
            </p>
            <h3 className="section-heading">Performance Optimization</h3>
            <p className="section-text">
              The experience is optimized for both desktop and mobile devices, ensuring smooth performance across
              different hardware configurations.
            </p>
            <h3 className="section-heading">Scroll-Driven Animation</h3>
            <p className="section-text">
              Using GSAP ScrollTrigger, the 3D scene responds to user scroll behavior, creating an immersive and
              interactive narrative experience.
            </p>
          </div>

          <div className="inspired">Inspired by Rida Bounar.</div>
        </section>
      </main>
    </>
  );
}
