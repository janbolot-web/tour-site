import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const Hero = () => {
    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    return (
        <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45)' }} />
            <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

            {/* Stats — hidden on tablet/mobile */}
            {!isTablet && (
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    style={{ position: 'absolute', top: '10rem', right: '4rem', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {[
                        { num: '19+', label: 'Tours Available' },
                        { num: '7+', label: 'Years of Experience' },
                        { num: '500+', label: 'Happy Travelers' },
                    ].map(stat => (
                        <div key={stat.num} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '1rem', padding: '1rem 1.5rem', textAlign: 'center', color: '#fff' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1, color: 'hsl(var(--secondary))' }}>{stat.num}</div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginTop: '0.25rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Main Content */}
            <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: isMobile ? '4rem' : '10rem', color: '#fff', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    style={{ maxWidth: isTablet ? '100%' : '60%' }}
                >
                    {/* Badge */}
                    <span style={{
                        display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px',
                        background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                        backdropFilter: 'blur(6px)', fontSize: '0.72rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'hsl(var(--secondary))', marginBottom: '1.25rem',
                    }}>
                        ✦ Since 2017 — Kochkor, Kyrgyzstan
                    </span>

                    {/* Heading */}
                    <h1 style={{
                        fontSize: isMobile ? 'clamp(2rem, 9vw, 2.8rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
                        fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05,
                        marginBottom: '1.1rem',
                    }}>
                        Explore the <br />
                        Untamed Beauty of<br />
                        <span style={{ color: 'hsl(var(--secondary))' }}>Kyrgyzstan</span>
                    </h1>

                    {/* Sub-text */}
                    <p style={{
                        fontSize: isMobile ? '0.95rem' : '1.1rem',
                        opacity: 0.82, maxWidth: '34rem',
                        fontWeight: 300, lineHeight: 1.7,
                        marginBottom: isMobile ? '1.75rem' : '2.25rem',
                    }}>
                        Discover hidden alpine lakes, ancient Silk Road routes, and authentic nomadic culture with Kyrgyzstan's leading adventure travel company.
                    </p>

                    {/* Stats row on mobile */}
                    {isMobile && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                            {[
                                { num: '19+', label: 'Tours' },
                                { num: '7+', label: 'Years' },
                                { num: '500+', label: 'Travelers' },
                            ].map(stat => (
                                <div key={stat.num} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'hsl(var(--secondary))', lineHeight: 1 }}>{stat.num}</div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                        <Link to="/tours" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: isMobile ? '0.85rem 1.5rem' : '1rem 2.25rem', borderRadius: '0.75rem',
                            background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                            fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1rem', textDecoration: 'none',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                            flexShrink: 0,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.3)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'; }}
                        >
                            View Our Tours <ArrowRight size={16} />
                        </Link>
                        <Link to="/about" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: isMobile ? '0.85rem 1.5rem' : '1rem 2.25rem', borderRadius: '0.75rem',
                            background: 'rgba(255,255,255,0.1)', color: '#fff',
                            fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1rem', textDecoration: 'none',
                            border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(6px)',
                            transition: 'background 0.2s',
                            flexShrink: 0,
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            About Us
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator — hidden on mobile */}
            {!isMobile && (
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                >
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
                    <div style={{ width: '24px', height: '40px', borderRadius: '999px', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
                        <div style={{ width: '4px', height: '8px', borderRadius: '2px', background: '#fff', opacity: 0.7 }} />
                    </div>
                </motion.div>
            )}
        </section>
    );
};

export default Hero;
