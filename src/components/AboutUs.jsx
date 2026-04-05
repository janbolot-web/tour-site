import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import aboutImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const AboutUs = () => {
    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 900;

    const stats = [
        { num: '19+', label: 'Tours offered' },
        { num: '7', label: 'Years of experience' },
        { num: '1–8', label: 'People per group' },
    ];

    return (
        <section id="about" style={{ padding: isMobile ? '4rem 0' : '7rem 0', background: '#fff' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
                    gap: isTablet ? '3rem' : '6rem',
                    alignItems: 'center',
                }}>
                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, x: isTablet ? 0 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative', paddingBottom: isTablet ? 0 : '2.5rem' }}
                    >
                        <div style={{
                            borderRadius: '2rem',
                            overflow: 'hidden',
                            aspectRatio: isTablet ? '16/9' : '4/5',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
                        }}>
                            <img src={aboutImg} alt="TRIPLINE" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Stats — inline on mobile, floating card on desktop */}
                        {isTablet ? (
                            <div style={{
                                display: 'flex', gap: '0', marginTop: '1.25rem',
                                borderRadius: '1.25rem', overflow: 'hidden',
                                border: '1px solid hsl(var(--border))',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                background: '#fff',
                            }}>
                                {stats.map((s, i) => (
                                    <div key={s.label} style={{
                                        flex: 1, textAlign: 'center',
                                        padding: '1.1rem 0.5rem',
                                        borderRight: i < stats.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                                    }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'hsl(var(--primary))', lineHeight: 1 }}>{s.num}</div>
                                        <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'hsl(var(--muted-foreground))', marginTop: '0.3rem' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Floating stats card */}
                                <div style={{
                                    position: 'absolute', bottom: 0, right: '-1.5rem',
                                    background: '#fff', borderRadius: '1.5rem',
                                    padding: '1.5rem 2rem',
                                    boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                                    border: '1px solid hsl(var(--border))',
                                    display: 'flex', gap: '2rem',
                                }}>
                                    {stats.map(s => (
                                        <div key={s.label} style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'hsl(var(--primary))', lineHeight: 1 }}>{s.num}</div>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'hsl(var(--muted-foreground))', marginTop: '0.3rem' }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Bg glow */}
                                <div style={{ position: 'absolute', top: '-3rem', left: '-3rem', width: '200px', height: '200px', borderRadius: '50%', background: 'hsl(var(--secondary) / 0.1)', filter: 'blur(40px)', zIndex: -1 }} />
                            </>
                        )}
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: isTablet ? 0 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            display: 'block', fontSize: '0.75rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--accent))', marginBottom: '0.75rem'
                        }}>Our Story</span>
                        <h2 style={{
                            fontSize: isMobile ? 'clamp(1.75rem, 7vw, 2.5rem)' : 'clamp(2rem, 4vw, 3.25rem)',
                            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem'
                        }}>
                            We Are <span style={{ color: 'hsl(var(--primary))' }}>TRIPLINE</span>
                        </h2>
                        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                            Founded in 2017 in the village of Kochkor by Chyngyz, a former history teacher, TRIPLINE has grown from a small horseback tour operation into Kyrgyzstan's leading boutique adventure travel company.
                        </p>
                        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Our tours are intentionally small — 1 to 8 people — so we can travel quietly and authentically, giving full attention to the land and its people.
                        </p>

                        {/* Feature list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            {[
                                'Local guides born and raised in the mountains',
                                'Private & custom itineraries only',
                                'Supporting nomadic families & communities',
                            ].map(point => (
                                <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 500 }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'hsl(var(--accent))', flexShrink: 0, display: 'inline-block' }} />
                                    {point}
                                </div>
                            ))}
                        </div>

                        <Link to="/about" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: isMobile ? '0.85rem 1.5rem' : '1rem 2rem', borderRadius: '0.75rem',
                            background: 'hsl(var(--primary))', color: '#fff',
                            fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1rem', textDecoration: 'none',
                            transition: 'opacity 0.2s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            Read Our Full Story <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
