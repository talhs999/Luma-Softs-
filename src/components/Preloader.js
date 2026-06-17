"use client";
import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fast fade out for the new simple loader
    const timer = setTimeout(() => setFadeOut(true), 1500);
    const hide = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      
      {/* NEW LOADING ANIMATION */}
      <div className="loading-text">LOADING</div>

      <style>{`
        .loading-text {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          background: linear-gradient(90deg, var(--primary), #00ffcc, #ff00cc, var(--primary));
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: flowColor 2.5s linear infinite;
        }

        @keyframes flowColor {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      {/* 
        ========================================
        OLD ANIMATION BACKUP (DO NOT DELETE)
        ========================================
      
      <div className="logo-circle">
        <img src="/logo.png" alt="Luma Softs" className="wave-logo" />
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.2em", color: "var(--fg)", marginBottom: "0.5rem" }}>
          LUMA <span style={{ color: "var(--primary)" }}>SOFTS</span>
        </p>
        <p style={{ fontSize: "0.8125rem", color: "var(--gray)", letterSpacing: "0.05em" }}>
          INITIALIZING SYSTEM...
        </p>
      </div>

      <div style={{ width: 120, height: 20, overflow: "hidden", position: "relative", marginTop: "0.5rem" }}>
        <svg width="240" height="20" className="wave-line">
          <path 
            d="M 0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10" 
            fill="none" 
            stroke="var(--primary)" 
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <style>{\`
        .logo-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 2px dashed var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(194,255,5,0.03);
          box-shadow: 0 0 30px rgba(194,255,5,0.15), inset 0 0 20px rgba(194,255,5,0.1);
          animation: circleSpinAppear 1.5s ease-out forwards, circleRotate 10s linear infinite;
        }

        .wave-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          animation: logoWaveEntrance 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, counterRotate 10s linear infinite;
        }

        .wave-line {
          position: absolute;
          left: 0;
          top: 0;
          animation: slideWave 1.2s linear infinite;
        }

        @keyframes circleSpinAppear {
          0% { transform: scale(0); opacity: 0; border-color: transparent; }
          50% { transform: scale(1.1); opacity: 0.5; border-color: rgba(194,255,5,0.5); }
          100% { transform: scale(1); opacity: 1; border-color: var(--primary); }
        }

        @keyframes circleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes counterRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes logoWaveEntrance {
          0% {
            transform: scale(0) translate(-150px, 150px);
            opacity: 0;
          }
          40% {
            transform: scale(1.3) translate(30px, -40px);
            opacity: 1;
          }
          70% {
            transform: scale(0.9) translate(-10px, 10px);
          }
          100% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
        }

        @keyframes slideWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-120px); }
        }
      \`}</style>
      */}
      
    </div>
  );
};

export default Preloader;
