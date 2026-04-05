import React from 'react';
import { Clock, Calendar, ArrowRight, Gauge, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const speedColor = {
    Easy: '#22c55e',
    Moderate: 'hsl(var(--secondary))',
    Active: '#ef4444',
};

const difficultyConfig = {
    Easy:     { color: '#16a34a', bg: '#dcfce7', label: 'Easy' },
    Moderate: { color: '#d97706', bg: '#fef3c7', label: 'Moderate' },
    Hard:     { color: '#dc2626', bg: '#fee2e2', label: 'Hard' },
};

const TourCard = ({ id, image, title, category, duration, season, price, description, speed, difficulty }) => {
    return (
        <Link to={`/tours/${id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                style={{
                    background: '#fff',
                    borderRadius: '1.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
                    border: '1px solid hsl(var(--border))',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'box-shadow 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.14)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.08)'}
            >
                {/* Image */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            transition: 'transform 0.7s ease',
                        }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />

                    {/* Category badge */}
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                        <span style={{
                            background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                            padding: '0.3rem 0.85rem', borderRadius: '999px',
                            fontSize: '0.7rem', fontWeight: 700,
                            letterSpacing: '0.07em', textTransform: 'uppercase',
                        }}>
                            {category}
                        </span>
                    </div>

                    {/* Price badge */}
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
                            color: 'hsl(var(--primary))', padding: '0.35rem 0.9rem',
                            borderRadius: '999px', fontSize: '1rem', fontWeight: 900,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        }}>
                            {price}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{
                        fontSize: '1.05rem', fontWeight: 800,
                        marginBottom: '0.6rem', lineHeight: 1.25,
                        color: 'hsl(var(--foreground))',
                    }}>
                        {title}
                    </h3>

                    {description && (
                        <p style={{
                            fontSize: '0.875rem', lineHeight: 1.65,
                            color: 'hsl(var(--muted-foreground))',
                            marginBottom: '1.25rem', flex: 1,
                        }}>
                            {description}
                        </p>
                    )}

                    {/* Meta */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>
                            <Clock size={14} style={{ color: 'hsl(var(--secondary))' }} />
                            {duration}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>
                            <Calendar size={14} style={{ color: 'hsl(var(--secondary))' }} />
                            {season}
                        </span>
                        {speed && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: 600, color: speedColor[speed] || 'hsl(var(--muted-foreground))' }}>
                                <Gauge size={14} />
                                {speed}
                            </span>
                        )}
                    </div>

                    {/* Difficulty badge */}
                    {difficulty && difficultyConfig[difficulty] && (
                        <div style={{ marginBottom: '1.1rem' }}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                background: difficultyConfig[difficulty].bg,
                                color: difficultyConfig[difficulty].color,
                                padding: '0.28rem 0.75rem', borderRadius: '999px',
                                fontSize: '0.75rem', fontWeight: 700,
                            }}>
                                <Mountain size={12} />
                                Difficulty: {difficultyConfig[difficulty].label}
                            </span>
                        </div>
                    )}

                    {/* CTA */}
                    <button style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        padding: '0.8rem 1rem', borderRadius: '0.75rem',
                        background: 'hsl(var(--primary))', color: '#fff',
                        fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                        fontFamily: 'inherit', transition: 'opacity 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        View Tour <ArrowRight size={16} />
                    </button>
                </div>
            </motion.div>
        </Link>
    );
};

export default TourCard;
