'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpring, animated, SpringValue } from '@react-spring/web';

interface AnimatedGlobeProps {
  isActive?: boolean;
}

interface AnimatedDivProps {
  style: {
    scale: SpringValue<number>;
  };
  className?: string;
  children: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  notification?: {
    type: 'alert' | 'email' | 'critical';
    alpha: number;
  };
}

export function AnimatedGlobe({ isActive }: AnimatedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const [isClient, setIsClient] = useState(false);
  const pointsRef = useRef<Point[]>([]);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scale } = useSpring({
    from: { scale: 1 },
    to: async (next) => {
      while (isActive) {
        await next({ scale: 1.05 });
        await next({ scale: 1 });
      }
    },
    config: { tension: 300, friction: 10 },
  });

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize points with 3D coordinates
    const numPoints = 30;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;
    pointsRef.current = Array.from({ length: numPoints }, () => {
      // Generate points on a sphere surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Add notification points (about 30% of points)
      const hasNotification = Math.random() < 0.3;
      const notification = hasNotification ? {
        type: ['alert', 'email', 'critical'][Math.floor(Math.random() * 3)] as 'alert' | 'email' | 'critical',
        alpha: 1
      } : undefined;

      return {
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        notification
      };
    });

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Update rotation
      rotationRef.current += isActive ? 0.005 : 0.001;

      // Sort points by z-coordinate for proper depth rendering
      const sortedPoints = pointsRef.current
        .map(point => {
          // Apply rotation around Y axis
          const cosR = Math.cos(rotationRef.current);
          const sinR = Math.sin(rotationRef.current);
          const x = point.x * cosR - point.z * sinR;
          const z = point.z * cosR + point.x * sinR;
          
          return {
            ...point,
            renderX: centerX + x,
            renderY: centerY + point.y,
            renderZ: z,
          };
        })
        .sort((a, b) => a.renderZ - b.renderZ);

      // Draw connections and points
      sortedPoints.forEach((point, i) => {
        const scale = (point.renderZ + radius) / (radius * 2); // 0 to 1 based on z position
        const alpha = Math.max(0.1, scale);

        // Draw connections
        ctx.beginPath();
        ctx.strokeStyle = isActive 
          ? `rgba(59, 130, 246, ${alpha * 0.5})`
          : `rgba(148, 163, 184, ${alpha * 0.5})`;
        ctx.lineWidth = 1;

        sortedPoints.slice(i + 1).forEach(otherPoint => {
          const distance = Math.hypot(
            point.renderX - otherPoint.renderX,
            point.renderY - otherPoint.renderY,
            point.renderZ - otherPoint.renderZ
          );
          if (distance < radius) {
            ctx.moveTo(point.renderX, point.renderY);
            ctx.lineTo(otherPoint.renderX, otherPoint.renderY);
          }
        });
        ctx.stroke();

        // Draw notification points with different colors and pulsing effect
        if (point.notification && isActive) {
          const notificationColors = {
            alert: '#EF4444',   // Red
            email: '#10B981',   // Green
            critical: '#F59E0B', // Yellow
          };

          ctx.beginPath();
          ctx.fillStyle = `${notificationColors[point.notification.type]}`;
          const pulseScale = 1 + Math.sin(performance.now() * 0.005) * 0.2;
          const baseSize = 3 * scale;
          ctx.arc(point.renderX, point.renderY, baseSize * pulseScale, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            point.renderX, point.renderY, 0,
            point.renderX, point.renderY, baseSize * 3
          );
          gradient.addColorStop(0, `${notificationColors[point.notification.type]}33`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.arc(point.renderX, point.renderY, baseSize * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw regular points
          ctx.beginPath();
          ctx.fillStyle = isActive 
            ? `rgba(37, 99, 235, ${alpha})`
            : `rgba(100, 116, 139, ${alpha})`;
          ctx.arc(point.renderX, point.renderY, 2 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw globe outline with gradient
      const gradient = ctx.createLinearGradient(
        centerX - radius,
        centerY - radius,
        centerX + radius,
        centerY + radius
      );
      gradient.addColorStop(0, isActive ? '#2563EB' : '#64748B');
      gradient.addColorStop(1, isActive ? '#3B82F6' : '#94A3B8');
      
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, isClient]);

  const AnimatedDiv = animated.div as React.FC<AnimatedDivProps>;

  // Return empty div during SSR
  if (!isClient) {
    return <div className="relative w-full aspect-square" />;
  }

  return (
    <AnimatedDiv style={{ scale }} className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="w-full h-full"
      />
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-white/80 dark:bg-gray-900/80 px-3 py-1 rounded-full backdrop-blur-sm">
            Scanning Web
          </div>
        </div>
      )}
    </AnimatedDiv>
  );
} 