import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';

import './CartFx.css';

const CartFxContext = createContext(null);

const PARTICLE_COLORS = ['#c73b0f', '#e9a23b', '#f4c2b0', '#1a9b6c', '#2a1712', '#f7d774'];

let uid = 0;
const nextId = () => ++uid;
const random = (min, max) => Math.random() * (max - min) + min;

/*
 * Visual effects for the cart:
 *  - flyToCart: a copy of the product image flies along a curve into the header cart icon
 *  - burst:     small sprinkles explode from the clicked button
 *  - confetti:  full screen confetti after an order is confirmed
 *  - bumpKey:   increments when something lands in the cart (header icon wiggles)
 */
export const CartFxProvider = ({ children }) => {
    const cartTargetRef = useRef(null);
    const [flyers, setFlyers] = useState([]);
    const [particles, setParticles] = useState([]);
    const [bumpKey, setBumpKey] = useState(0);
    const reduceMotion = useReducedMotion();

    const bump = useCallback(() => setBumpKey((k) => k + 1), []);

    const flyToCart = useCallback((src, fromEl) => {
        const target = cartTargetRef.current?.getBoundingClientRect();
        if (reduceMotion || !fromEl || !target) {
            bump();
            return;
        }
        const from = fromEl.getBoundingClientRect();
        const size = Math.min(from.width, from.height, 180);
        const startX = from.left + from.width / 2 - size / 2;
        const startY = from.top + from.height / 2 - size / 2;
        const dx = target.left + target.width / 2 - (startX + size / 2);
        const dy = target.top + target.height / 2 - (startY + size / 2);

        setFlyers((list) => [...list, { id: nextId(), src, size, startX, startY, dx, dy }]);
    }, [reduceMotion, bump]);

    const removeFlyer = useCallback((id) => {
        setFlyers((list) => list.filter((f) => f.id !== id));
        bump();
    }, [bump]);

    const burst = useCallback((x, y, count = 14) => {
        if (reduceMotion) return;
        const items = Array.from({ length: count }, (_, i) => {
            const angle = (Math.PI * 2 * i) / count + random(-0.3, 0.3);
            const distance = random(36, 78);
            return {
                id: nextId(),
                kind: 'spark',
                x,
                y,
                dx: Math.cos(angle) * distance,
                dy: Math.sin(angle) * distance,
                size: random(5, 9),
                color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
                round: Math.random() > 0.4,
                duration: random(0.5, 0.8),
                delay: 0,
                rotate: random(-180, 180),
            };
        });
        setParticles((list) => [...list, ...items]);
    }, [reduceMotion]);

    const confetti = useCallback((count = 90) => {
        if (reduceMotion) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const items = Array.from({ length: count }, (_, i) => ({
            id: nextId(),
            kind: 'confetti',
            x: random(0, w),
            y: -24,
            dx: random(-120, 120),
            dy: h + 60,
            size: random(7, 12),
            color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
            round: Math.random() > 0.7,
            duration: random(2, 3.4),
            delay: random(0, 0.5),
            rotate: random(-720, 720),
        }));
        setParticles((list) => [...list, ...items]);
    }, [reduceMotion]);

    const removeParticle = useCallback((id) => {
        setParticles((list) => list.filter((p) => p.id !== id));
    }, []);

    const value = useMemo(
        () => ({ cartTargetRef, flyToCart, burst, confetti, bumpKey }),
        [flyToCart, burst, confetti, bumpKey]
    );

    return (
        <CartFxContext.Provider value={value}>
            {children}
            {createPortal(
                <div className="fxLayer" aria-hidden="true">
                    {flyers.map((f) => (
                        <motion.img
                            key={f.id}
                            src={f.src}
                            alt=""
                            className="fxFlyer"
                            style={{ left: f.startX, top: f.startY, width: f.size, height: f.size }}
                            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                            animate={{
                                x: f.dx,
                                y: f.dy,
                                scale: [1, 1.08, 0.12],
                                rotate: [0, -8, 18],
                                opacity: [1, 1, 0.7],
                                borderRadius: ['18%', '35%', '50%'],
                            }}
                            transition={{
                                x: { duration: 0.85, ease: [0.55, 0, 0.9, 0.6] },
                                y: { duration: 0.85, ease: [0.1, 0.6, 0.35, 1] },
                                default: { duration: 0.85, times: [0, 0.2, 1], ease: 'easeInOut' },
                            }}
                            onAnimationComplete={() => removeFlyer(f.id)}
                        />
                    ))}
                    {particles.map((p) => (
                        <motion.span
                            key={p.id}
                            className="fxParticle"
                            style={{
                                left: p.x,
                                top: p.y,
                                width: p.size,
                                height: p.kind === 'confetti' && !p.round ? p.size * 1.6 : p.size,
                                background: p.color,
                                borderRadius: p.round ? '50%' : '2px',
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                            animate={
                                p.kind === 'confetti'
                                    ? { x: [0, p.dx * 0.5, p.dx], y: p.dy, rotate: p.rotate, opacity: [1, 1, 0] }
                                    : { x: p.dx, y: p.dy, rotate: p.rotate, opacity: 0, scale: 0.2 }
                            }
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                ease: p.kind === 'confetti' ? 'linear' : [0.2, 0.8, 0.4, 1],
                            }}
                            onAnimationComplete={() => removeParticle(p.id)}
                        />
                    ))}
                </div>,
                document.body
            )}
        </CartFxContext.Provider>
    );
};

export const useCartFx = () => useContext(CartFxContext);
