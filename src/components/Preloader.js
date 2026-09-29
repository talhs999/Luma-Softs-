"use client";
import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if mobile for faster loading
    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? 800 : 1500; // Faster on mobile
    
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
        <div className="logo-wrapper">
          <img src="/logo.png" alt="Luma Softs Logo" className="loader-logo" />
        </div>
        
        <div className="counter-wrapper">
          <span className="counter-text">{count}</span>
          <span className="counter-percent">%</span>
        </div>
      </div>

      <style>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #050505;
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
          gap: 2rem;
        }

        .logo-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Glowing ring behind logo */
        .logo-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(from 0deg, transparent, var(--primary), transparent 30%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: spin 1s linear infinite;
        }

        .loader-logo {
          width: 90px;
          height: auto;
          object-fit: contain;
          animation: pulseLogo 1.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 15px rgba(194, 255, 5, 0.3));
        }

        .counter-wrapper {
          display: flex;
          align-items: flex-end;
          line-height: 0.8;
          overflow: hidden;
        }

        .counter-text {
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px var(--primary);
          font-family: system-ui, -apple-system, sans-serif;
          font-variant-numeric: tabular-nums;
        }

        .counter-percent {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--primary);
          margin-left: 5px;
          margin-bottom: 5px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulseLogo {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.05); opacity: 1; }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .counter-wrapper {
            display: none; /* Hide counter on mobile as requested */
          }
          
          .logo-wrapper {
            width: 120px;
            height: 120px;
          }
          
          .loader-logo {
            width: 75px;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
