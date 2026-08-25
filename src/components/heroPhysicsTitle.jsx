import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
    heroTitleVariants, 
    heroTitleIdleFloatVariants
} from '../animations/home.js';

/**
 * Interactive Ambient Particle Canvas & Subtle Luminous Name
 * Crisp, non-squashed 1:1 vector particle space
 * Smooth, non-bouncy fluid particles that gently drift and fade without graph lines
 * Subtle continuous ambient glow for the name
 * Fully toggleable via Appearance Settings
 */
export default function HeroPhysicsTitle({ title }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const mousePosRef = useRef({ x: -3000, y: -3000, radius: 180, isOver: false });
    const animFrameRef = useRef(null);
    const particlesRef = useRef([]);

    const [particlesEnabled, setParticlesEnabled] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('jchengroa_hero_particles_enabled');
            if (saved !== null) return saved === 'true';
        }
        return true;
    });

    useEffect(() => {
        const handleSettingChange = (e) => {
            setParticlesEnabled(e.detail);
        };
        window.addEventListener('jchengroa_hero_particles_setting_changed', handleSettingChange);
        return () => {
            window.removeEventListener('jchengroa_hero_particles_setting_changed', handleSettingChange);
        };
    }, []);

    // Dynamic extraction of active CSS accent color variables (hex / rgb / hsl)
    const getAccentRGB = useCallback(() => {
        if (typeof window === 'undefined') return { r: 59, g: 130, b: 246 };
        const style = getComputedStyle(document.documentElement);
        
        const raw = style.getPropertyValue('--accent-500').trim() ||
                    style.getPropertyValue('--color-blue-500').trim();

        if (raw.startsWith('#')) {
            const hex = raw.replace('#', '');
            const bigint = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        } else if (raw.startsWith('rgb')) {
            const match = raw.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
            }
        }
        return { r: 59, g: 130, b: 246 };
    }, []);

    useEffect(() => {
        if (!particlesEnabled) {
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;

        const setupCanvas = () => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width || window.innerWidth;
            height = rect.height || 260;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);

            ctx.resetTransform();
            ctx.scale(dpr, dpr);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        };

        const handleResize = () => {
            setupCanvas();
            initParticles();
        };

        setupCanvas();
        window.addEventListener('resize', handleResize);

        // Smooth drifting, non-bouncy fading ambient particles
        class Particle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + 15;
                this.radius = Math.random() * 2.2 + 1.2;
                
                // Gentle floating velocity
                this.baseVx = (Math.random() - 0.5) * 0.35;
                this.baseVy = -(Math.random() * 0.4 + 0.15);
                this.vx = this.baseVx;
                this.vy = this.baseVy;
                
                // Opacity & breathing cycle
                this.maxAlpha = Math.random() * 0.5 + 0.25;
                this.alpha = initial ? Math.random() * this.maxAlpha : 0;
                this.fadeSpeed = Math.random() * 0.007 + 0.003;
                this.fadingIn = true;
                
                this.angle = Math.random() * Math.PI * 2;
                this.angularSpeed = Math.random() * 0.02 + 0.008;
            }

            update(mouse) {
                this.angle += this.angularSpeed;
                
                if (this.fadingIn) {
                    this.alpha += this.fadeSpeed;
                    if (this.alpha >= this.maxAlpha) {
                        this.alpha = this.maxAlpha;
                        this.fadingIn = false;
                    }
                } else {
                    this.alpha -= this.fadeSpeed * 0.75;
                    if (this.alpha <= 0.01) {
                        this.reset(false);
                        return;
                    }
                }

                // Smooth dampened cursor push (fluid, non-bouncy)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = mouse.radius;

                if (dist < maxDist && dist > 0) {
                    const force = (1 - dist / maxDist) * 2.0;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force;
                    this.vy -= Math.sin(angle) * force;
                    this.alpha = Math.min(0.9, this.alpha + 0.06);
                }

                // Dampened velocity return to base drift
                this.vx = this.vx * 0.93 + this.baseVx * 0.07;
                this.vy = this.vy * 0.93 + this.baseVy * 0.07;

                this.x += this.vx + Math.cos(this.angle) * 0.2;
                this.y += this.vy + Math.sin(this.angle) * 0.15;

                if (this.y < -20 || this.x < -30 || this.x > width + 30) {
                    this.reset(false);
                }
            }

            draw(context, rgb) {
                if (this.alpha <= 0.01) return;

                context.save();
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`;
                context.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha * 0.5})`;
                context.shadowBlur = this.radius * 2.5;
                context.fill();
                context.restore();
            }
        }

        const initParticles = () => {
            const particles = [];
            const count = Math.min(65, Math.max(30, Math.floor(width / 18)));
            
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }

            particlesRef.current = particles;
        };

        initParticles();

        let render = () => {
            ctx.clearRect(0, 0, width, height);
            const rgb = getAccentRGB();

            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mousePosRef.current);
                particles[i].draw(ctx, rgb);
            }

            animFrameRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, [particlesEnabled, getAccentRGB]);

    const handleMouseMove = (e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            radius: 160,
            isOver: true
        };
    };

    const handleMouseLeave = () => {
        mousePosRef.current = { x: -3000, y: -3000, radius: 160, isOver: false };
    };

    const handleClick = (e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        particlesRef.current.forEach(p => {
            const dx = p.x - clickX;
            const dy = p.y - clickY;
            const dist = Math.max(10, Math.sqrt(dx * dx + dy * dy));
            if (dist < 260) {
                const power = (1 - dist / 260) * 6.5;
                p.vx += (dx / dist) * power;
                p.vy += (dy / dist) * power;
                p.alpha = Math.min(0.9, p.alpha + 0.3);
            }
        });
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="relative flex items-center justify-center cursor-default select-none py-6 sm:py-8 px-2 sm:px-4 w-full max-w-full"
        >
            {/* Crisp 1:1 Canvas Overlay Container */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            />

            {/* Subtle, Persistent Ambient Glow Backdrop behind name */}
            <motion.div
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ 
                    opacity: [0.45, 0.65, 0.45],
                    scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-[85%] sm:w-[75%] h-[110%] rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/25 to-purple-500/20 dark:from-blue-500/30 dark:via-indigo-500/30 dark:to-purple-500/30 blur-3xl pointer-events-none -z-10"
            />

            {/* Subtle Continuously Glowing Name Title */}
            <motion.div
                variants={heroTitleVariants}
                className="relative z-10 max-w-full flex justify-center"
            >
                <motion.h1 
                    variants={heroTitleIdleFloatVariants}
                    animate="animate"
                    className="whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none transition-all duration-300 text-gray-900 dark:text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.35)] dark:drop-shadow-[0_0_40px_rgba(96,165,250,0.5)]"
                    style={{ fontSize: 'clamp(2rem, 7.5vw, 6.5rem)' }}
                >
                    <span className="bg-gradient-to-br from-gray-950 via-gray-800 to-gray-600 dark:from-white dark:via-blue-50 dark:to-blue-200 bg-clip-text text-transparent">
                        {title}
                    </span>
                </motion.h1>
            </motion.div>
        </div>
    );
}

export { HeroPhysicsTitle };
