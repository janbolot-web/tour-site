import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teamData } from '../data';
import { ArrowLeft, MessageCircle, Globe, Award, Clock, ChevronRight } from 'lucide-react';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const GuideProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    const guide = teamData.find(g => g.id === id);

    if (!guide) {
        return (
            <div style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Guide not found</h2>
                <Link to="/about" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>
                    ← Back to the team
                </Link>
            </div>
        );
    }

    // Other team members (excluding self)
    const others = teamData.filter(g => g.id !== id);

    return (
        <div style={{ paddingTop: '80px', background: '#fafaf9', minHeight: '100vh' }}>

            {/* ── Hero ── */}
            <section style={{
                position: 'relative',
                background: 'linear-gradient(150deg, hsl(220,42%,14%) 0%, hsl(var(--primary)) 100%)',
                overflow: 'hidden',
                paddingTop: isMobile ? '2rem' : '4rem',
                paddingBottom: isMobile ? '3rem' : '5.5rem',
            }}>
                {/* bg blobs */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-4rem', right: '-4rem', width: '24rem', height: '24rem', background: 'hsl(var(--secondary)/0.08)', borderRadius: '50%', filter: 'blur(60px)' }} />
                    <div style={{ position: 'absolute', bottom: '-3rem', left: '-3rem', width: '18rem', height: '18rem', background: 'hsl(var(--accent)/0.07)', borderRadius: '50%', filter: 'blur(50px)' }} />
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 2, paddingLeft: isMobile ? '1.25rem' : '1.5rem', paddingRight: isMobile ? '1.25rem' : '1.5rem' }}>
                    {/* Back button */}
                    <button
                        onClick={() => navigate('/about')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', borderRadius: '0.65rem', padding: '0.45rem 0.9rem',
                            fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                            fontFamily: 'inherit', marginBottom: isMobile ? '1.5rem' : '2.5rem',
                        }}
                    >
                        <ArrowLeft size={14} /> Our Team
                    </button>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '180px 1fr' : '220px 1fr',
                        gap: isMobile ? '1.5rem' : '3rem',
                        alignItems: 'center',
                    }}>
                        {/* Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                width: isMobile ? '110px' : isTablet ? '180px' : '220px',
                                height: isMobile ? '110px' : isTablet ? '180px' : '220px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid hsl(var(--secondary))',
                                boxShadow: '0 0 0 8px rgba(255,255,255,0.08)',
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={guide.image}
                                alt={guide.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                            />
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            style={{ color: '#fff' }}
                        >
                            {guide.featured && (
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                    background: 'hsl(var(--secondary)/0.15)', border: '1px solid hsl(var(--secondary)/0.4)',
                                    color: 'hsl(var(--secondary))', borderRadius: '999px',
                                    padding: '0.2rem 0.75rem', fontSize: '0.65rem',
                                    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                                    marginBottom: '0.75rem',
                                }}>
                                    ✦ Founder
                                </span>
                            )}
                            <h1 style={{
                                fontSize: isMobile ? 'clamp(2rem, 10vw, 3rem)' : 'clamp(2.5rem, 6vw, 4rem)',
                                fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                                marginBottom: '0.5rem',
                            }}>
                                {guide.name}
                            </h1>
                            <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', opacity: 0.65, marginBottom: isMobile ? '1.25rem' : '1.75rem', fontWeight: 500 }}>
                                {guide.role}
                            </p>

                            {/* Quick stats */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: isMobile ? '1.25rem' : '1.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '0.35rem 0.85rem', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Clock size={13} style={{ color: 'hsl(var(--secondary))' }} /> {guide.years}+ years exp.
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '0.35rem 0.85rem', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Globe size={13} style={{ color: 'hsl(var(--secondary))' }} /> {guide.nationality}
                                </div>
                                {guide.languages.map(l => (
                                    <div key={l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: 600, opacity: 0.8 }}>
                                        {l}
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href={guide.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    background: '#25D366', color: '#fff',
                                    padding: isMobile ? '0.7rem 1.25rem' : '0.85rem 1.75rem',
                                    borderRadius: '0.75rem', fontWeight: 700,
                                    fontSize: isMobile ? '0.875rem' : '0.95rem', textDecoration: 'none',
                                }}
                            >
                                <MessageCircle size={16} /> Chat with {guide.name}
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Wave divider */}
                <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', display: 'block' }} viewBox="0 0 1440 60" preserveAspectRatio="none" height="60">
                    <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#fafaf9" />
                </svg>
            </section>

            {/* ── Main Content ── */}
            <section style={{ padding: isMobile ? '2rem 0 3rem' : '4rem 0 6rem' }}>
                <div className="container" style={{ paddingLeft: isMobile ? '1.25rem' : '1.5rem', paddingRight: isMobile ? '1.25rem' : '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isTablet ? '1fr' : '1fr 300px',
                        gap: isMobile ? '2rem' : '3.5rem',
                        alignItems: 'start',
                    }}>

                        {/* ── Left: Bio ── */}
                        <div>
                            <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                                About {guide.name}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {guide.bio.split('\n\n').map((para, i) => (
                                    <p key={i} style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.8, fontSize: isMobile ? '0.925rem' : '1rem' }}>
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Specialties */}
                            <div style={{ marginTop: isMobile ? '1.75rem' : '2.5rem' }}>
                                <h3 style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(var(--muted-foreground))', marginBottom: '0.85rem' }}>
                                    Specialties
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {guide.specialties.map(s => (
                                        <span key={s} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                            background: 'hsl(var(--muted))', borderRadius: '999px',
                                            padding: '0.35rem 0.85rem', fontSize: '0.82rem', fontWeight: 600,
                                        }}>
                                            <Award size={12} style={{ color: 'hsl(var(--secondary))' }} /> {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Sidebar ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Quick facts card */}
                            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
                                    Quick Facts
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                    {[
                                        { label: 'Role', val: guide.role },
                                        { label: 'Experience', val: `${guide.years}+ years` },
                                        { label: 'Nationality', val: guide.nationality },
                                        { label: 'Languages', val: guide.languages.join(', ') },
                                    ].map(item => (
                                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.875rem' }}>
                                            <span style={{ color: 'hsl(var(--muted-foreground))', fontWeight: 500 }}>{item.label}</span>
                                            <span style={{ fontWeight: 700, textAlign: 'right' }}>{item.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA card */}
                            <div style={{ background: 'hsl(var(--primary))', borderRadius: '1.25rem', padding: '1.5rem', color: '#fff', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(var(--secondary))', marginBottom: '0.6rem' }}>
                                    Book a Tour
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '1.1rem' }}>
                                    Want {guide.name} as your guide? Get in touch and we'll arrange it.
                                </p>
                                <a
                                    href={guide.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        background: '#25D366', color: '#fff',
                                        padding: '0.75rem', borderRadius: '0.75rem',
                                        fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                                        marginBottom: '0.6rem',
                                    }}
                                >
                                    <MessageCircle size={15} /> WhatsApp {guide.name}
                                </a>
                                <Link
                                    to="/tours"
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        background: 'rgba(255,255,255,0.12)', color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        padding: '0.75rem', borderRadius: '0.75rem',
                                        fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                                    }}
                                >
                                    Browse All Tours <ChevronRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Meet the Rest ── */}
            <section style={{ padding: isMobile ? '2rem 0 3rem' : '3rem 0 5rem', background: '#fff', borderTop: '1px solid hsl(var(--border))' }}>
                <div className="container" style={{ paddingLeft: isMobile ? '1.25rem' : '1.5rem', paddingRight: isMobile ? '1.25rem' : '1.5rem' }}>
                    <div style={{ marginBottom: isMobile ? '1.5rem' : '2.5rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(var(--accent))', display: 'block', marginBottom: '0.4rem' }}>
                            Our Team
                        </span>
                        <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.75rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                            Meet the rest of the team
                        </h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
                        gap: isMobile ? '0.85rem' : '1.25rem',
                    }}>
                        {others.map((member, i) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                <Link
                                    to={`/team/${member.id}`}
                                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                >
                                    <div style={{
                                        background: '#fff', borderRadius: '1rem', overflow: 'hidden',
                                        border: '1px solid hsl(var(--border))',
                                        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                                        transition: 'box-shadow 0.2s',
                                    }}>
                                        <div style={{ height: isMobile ? '110px' : '140px', overflow: 'hidden', position: 'relative' }}>
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s' }}
                                            />
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                                        </div>
                                        <div style={{ padding: isMobile ? '0.6rem' : '0.85rem' }}>
                                            <div style={{ fontWeight: 800, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>{member.name}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.1rem' }}>{member.role}</div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GuideProfile;
