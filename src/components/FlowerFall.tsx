import { useEffect, useRef } from 'react';

interface Flower {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  opacity: number;
  oscillationSpeed: number;
  oscillationAmplitude: number;
  time: number;
}

export default function FlowerFall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let flowers: Flower[] = [];
    let animationFrameId: number;
    let lastSpawnTime = 0;
    // Initial spawn delay between 5 and 10 seconds
    let nextSpawnDelay = Math.random() * 5000 + 5000;

    function spawnFlowers() {
      // Spawn a sparse burst of 2 to 5 flowers
      const count = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < count; i++) {
        flowers.push({
          x: Math.random() * width,
          y: -50 - Math.random() * 50, // Start just above the screen
          size: Math.random() * 0.2 + 0.15, // Small, delicate size
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          speedY: Math.random() * 0.4 + 0.3, // Very gentle, slow fall
          speedX: (Math.random() - 0.5) * 0.3, // Slight horizontal drift
          opacity: Math.random() * 0.4 + 0.4, // Semi-transparent
          oscillationSpeed: Math.random() * 0.015 + 0.005,
          oscillationAmplitude: Math.random() * 1.0 + 0.5,
          time: Math.random() * 100
        });
      }
    }

    function drawSakura(ctx: CanvasRenderingContext2D, f: Flower) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.scale(f.size, f.size);
      ctx.globalAlpha = f.opacity;
      
      // Draw 5 petals for a stylized cherry blossom
      ctx.fillStyle = "rgba(255, 183, 197, 0.85)"; // Soft cherry blossom pink
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // Stylized petal shape
        ctx.bezierCurveTo(-10, -15, -15, -30, -3, -35);
        ctx.lineTo(0, -32);
        ctx.lineTo(3, -35);
        ctx.bezierCurveTo(15, -30, 10, -15, 0, 0);
        ctx.fill();
      }
      
      // Center of the flower
      ctx.fillStyle = "rgba(220, 100, 120, 0.8)";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    function update(timestamp: number) {
      if (!lastSpawnTime) lastSpawnTime = timestamp;
      
      const elapsed = timestamp - lastSpawnTime;
      if (elapsed > nextSpawnDelay) {
        spawnFlowers();
        lastSpawnTime = timestamp;
        // Next spawn in 5 to 10 seconds
        nextSpawnDelay = Math.random() * 5000 + 5000;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = flowers.length - 1; i >= 0; i--) {
        const f = flowers[i];
        
        f.time += 1;
        f.y += f.speedY;
        // Gentle swaying motion
        f.x += f.speedX + Math.sin(f.time * f.oscillationSpeed) * f.oscillationAmplitude;
        f.rotation += f.rotationSpeed;

        drawSakura(ctx, f);

        // Remove flower if it falls off screen
        if (f.y > height + 50 || f.x < -50 || f.x > width + 50) {
          flowers.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    }

    animationFrameId = requestAnimationFrame(update);
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Negative z-index to stay behind all page content
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" />;
}
