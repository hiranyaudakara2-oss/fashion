import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RibbonAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

    // Animate the ribbon path
    // We'll use stroke-dashoffset to simulate the ribbon moving
    tl.fromTo(".ribbon-path", 
      { strokeDashoffset: 2000 }, 
      { strokeDashoffset: 0, duration: 10 }
    );

    // Subtle lighting animation
    gsap.to(".ribbon-gradient", {
      attr: { x1: "100%", x2: "200%" },
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <div className="w-full flex items-center justify-center py-20 bg-black overflow-hidden">
      <svg 
        ref={svgRef}
        viewBox="0 0 800 300" 
        className="w-full max-w-4xl h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ribbon Gradient for realistic lighting */}
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%" className="ribbon-gradient">
            <stop offset="0%" stopColor="#660000" />
            <stop offset="25%" stopColor="#FF3B30" />
            <stop offset="50%" stopColor="#990000" />
            <stop offset="75%" stopColor="#FF3B30" />
            <stop offset="100%" stopColor="#660000" />
          </linearGradient>

          {/* Shadow filter for depth */}
          <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.6" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="10" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clipping paths for the holes of 'd' and 'o' */}
          {/* These define the areas where the ribbon is visible "on top" */}
          <clipPath id="clip-d-hole">
            <ellipse cx="152" cy="168" rx="28" ry="32" />
          </clipPath>
          <clipPath id="clip-o-hole">
            <ellipse cx="648" cy="168" rx="28" ry="32" />
          </clipPath>
          
          {/* Clipping path for the part of the ribbon that is in front of the text after exiting 'o' */}
          <clipPath id="clip-foreground-exit">
            <rect x="680" y="0" width="200" height="300" />
          </clipPath>
        </defs>

        {/* 1. Background Ribbon (behind everything) */}
        <path 
          className="ribbon-path"
          d="M -100,150 C 50,150 100,280 200,150 S 300,20 400,150 S 500,280 600,150 S 750,20 900,150"
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth="45"
          strokeLinecap="round"
          strokeDasharray="2000"
          filter="url(#ribbonShadow)"
        />

        {/* 2. Main Text "DRAGHO" */}
        <g filter="url(#textShadow)">
          <text 
            x="400" 
            y="195" 
            textAnchor="middle" 
            className="font-display text-[180px] font-black tracking-tighter fill-white"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '-0.05em' }}
          >
            DRAGHO
          </text>
        </g>

        {/* 3. Ribbon segments that appear through holes */}
        {/* Ribbon through 'd' hole */}
        <g clipPath="url(#clip-d-hole)">
          <path 
            className="ribbon-path"
            d="M -100,150 C 50,150 100,280 200,150 S 300,20 400,150 S 500,280 600,150 S 750,20 900,150"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="45"
            strokeLinecap="round"
            strokeDasharray="2000"
          />
        </g>

        {/* Ribbon through 'o' hole */}
        <g clipPath="url(#clip-o-hole)">
          <path 
            className="ribbon-path"
            d="M -100,150 C 50,150 100,280 200,150 S 300,20 400,150 S 500,280 600,150 S 750,20 900,150"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="45"
            strokeLinecap="round"
            strokeDasharray="2000"
          />
        </g>

        {/* 4. Foreground Ribbon (part that comes out of 'o' and stays in front) */}
        <g clipPath="url(#clip-foreground-exit)">
          <path 
            className="ribbon-path"
            d="M -100,150 C 50,150 100,280 200,150 S 300,20 400,150 S 500,280 600,150 S 750,20 900,150"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="45"
            strokeLinecap="round"
            strokeDasharray="2000"
            filter="url(#ribbonShadow)"
          />
        </g>
      </svg>
    </div>
  );
}
