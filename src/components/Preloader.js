"use client";
import React, { useEffect, useState, useRef } from "react";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [count, setCount] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if mobile for faster loading
    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? 2500 : 4000; // 4 seconds total
    
    // Speed up video
    if (videoRef.current) {
      videoRef.current.playbackRate = isMobile ? 4.0 : 2.5;
    }
    
    let start = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(Math.floor((progress / duration) * 100), 100);
      
      setCount(percentage);

      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        // When 100% reached
        setTimeout(() => setFadeOut(true), 200);
        setTimeout(() => setVisible(false), 700);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="preloader-container"
      style={{
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="loader-content">
        <div className="video-wrapper">
          <video 
            ref={videoRef}
            src="/preloader-video.mp4" 
            autoPlay 
            muted 
            playsInline
            className="loader-video"
          />
        </div>
      </div>
      
      <div className="counter-wrapper">
        <span className="counter-text">{count}</span>
        <span className="counter-percent">%</span>
      </div>

      <style>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-video {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .counter-wrapper {
          position: absolute;
          bottom: 40px;
          right: 40px;
          display: flex;
          align-items: baseline;
          line-height: 1; /* Fixed cut off issue */
          z-index: 2;
        }

        .counter-text {
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px var(--primary);
          font-family: system-ui, -apple-system, sans-serif;
          font-variant-numeric: tabular-nums;
          display: block;
        }

        .counter-percent {
          font-size: clamp(1.5rem, 3vw, 3rem);
          font-weight: 900;
          color: var(--primary);
          margin-left: 8px;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .counter-wrapper {
            bottom: 20px;
            right: 20px;
          }
          
          .counter-text {
            -webkit-text-stroke: 1px var(--primary);
          }
          
          .video-wrapper {
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
