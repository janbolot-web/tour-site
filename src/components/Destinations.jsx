import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sightsData } from '../data';
import { ArrowRight } from 'lucide-react';

const Destinations = () => {
    const featuredSights = sightsData.slice(0, 3);

    return (
        <section id="sights" style={{ padding: '7rem 0', background: '#fff' }}>
            <div className="container">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem' }}>
                    <div>
                        <span style={{
                            display: 'block', fontSize: '0.75rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--accent))', marginBottom: '0.75rem'
                        }}>Explore Sights</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            Popular Destinations
                        </h2>
                    </div>
                    <Link to="/sights" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
                        border: '1.5px solid hsl(var(--border))',
                        fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                        color: 'hsl(var(--foreground))', background: '#fff',
                        transition: 'border-color 0.2s, color 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'hsl(var(--primary))'; e.currentTarget.style.color = 'hsl(var(--primary))'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'hsl(var(--border))'; e.currentTarget.style.color = 'hsl(var(--foreground))'; }}
                    >
                        All Sights <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Sight Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {featuredSights.map((sight, index) => (
                        <motion.div
                            key={sight.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                            style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', height: '420px', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
                        >
                            <img
                                src={sight.image}
                                alt={sight.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                                onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
                            <div style={{ position: 'absolute', inset: 0, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{sight.name}</h3>
                                <p style={{ fontSize: '0.875rem', opacity: 0.75, lineHeight: 1.6, marginBottom: '1rem' }}>{sight.description}</p>
                                <Link to="/sights" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    color: 'hsl(var(--secondary))', fontWeight: 700, fontSize: '0.875rem',
                                    textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em',
                                    transition: 'gap 0.2s',
                                }}>
                                    Explore <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
