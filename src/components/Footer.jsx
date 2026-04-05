import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle, ArrowRight, Mountain } from 'lucide-react';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const Footer = () => {
    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Tours', href: '/tours' },
        { name: 'Popular Sights', href: '/sights' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const sights = [
        'Song-Kol Lake',
        'Kel-Suu Lake',
        'Altyn-Arashan Valley',
        'Tash-Rabat',
        'Ysyk-Kol Lake',
        'Karakol City',
    ];

    const socials = [
        { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
        { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
        { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
    ];

    const contacts = [
        { icon: <Phone size={15} />, val: '+996 705 660 593', href: 'https://wa.me/996705660593' },
        { icon: <Mail size={15} />, val: 'example@gmail.com', href: 'mailto:example@gmail.com' },
        { icon: <MapPin size={15} />, val: 'Bishkek, Akiev str. 66', href: 'https://maps.google.com' },
    ];

    return (
        <footer style={{
            background: 'linear-gradient(175deg, hsl(220, 42%, 14%) 0%, hsl(var(--primary)) 100%)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* ── Decorative background elements ── */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                {/* Top right glow */}
                <div style={{ position: 'absolute', top: '-6rem', right: '-4rem', width: '28rem', height: '28rem', background: 'hsl(var(--secondary)/0.06)', borderRadius: '50%', filter: 'blur(60px)' }} />
                {/* Bottom left glow */}
                <div style={{ position: 'absolute', bottom: '-4rem', left: '-4rem', width: '20rem', height: '20rem', background: 'hsl(var(--accent)/0.05)', borderRadius: '50%', filter: 'blur(50px)' }} />
                {/* Mountain silhouette SVG */}
                <svg
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: 0.04 }}
                    viewBox="0 0 1440 220"
                    preserveAspectRatio="none"
                    height="220"
                >
                    <path d="M0,220 L0,160 L80,100 L160,140 L280,50 L380,110 L480,70 L580,130 L680,40 L780,100 L880,60 L980,120 L1080,80 L1180,130 L1280,85 L1360,120 L1440,90 L1440,220 Z" fill="white" />
                </svg>
                {/* Subtle grid pattern */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>

            {/* ── Top CTA Banner ── */}
            <div style={{
                position: 'relative', zIndex: 1,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: isMobile ? '1.75rem 1.25rem' : '2.5rem 0',
            }}>
                <div className="container" style={{ paddingLeft: isMobile ? '0' : '1.5rem', paddingRight: isMobile ? '0' : '1.5rem' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        justifyContent: 'space-between',
                        gap: isMobile ? '1.25rem' : '2rem',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '42px', height: '42px', background: 'hsl(var(--secondary)/0.15)', border: '1px solid hsl(var(--secondary)/0.3)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--secondary))', flexShrink: 0 }}>
                                <Mountain size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.2 }}>
                                    Ready for your Kyrgyz adventure?
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.55, marginTop: '0.15rem' }}>
                                    We reply within 24 hours · Custom tours available
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.65rem', flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
                            <a
                                href="https://wa.me/996705660593"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    padding: isMobile ? '0.7rem 1rem' : '0.7rem 1.25rem',
                                    background: '#25D366', color: '#fff',
                                    borderRadius: '0.7rem', fontWeight: 700,
                                    fontSize: '0.85rem', textDecoration: 'none',
                                    flex: isMobile ? 1 : 'none', justifyContent: 'center',
                                }}
                            >
                                <MessageCircle size={15} /> WhatsApp
                            </a>
                            <Link
                                to="/tours"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    padding: isMobile ? '0.7rem 1rem' : '0.7rem 1.25rem',
                                    background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                                    borderRadius: '0.7rem', fontWeight: 700,
                                    fontSize: '0.85rem', textDecoration: 'none',
                                    flex: isMobile ? 1 : 'none', justifyContent: 'center',
                                }}
                            >
                                View Tours <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '2.5rem 1.25rem' : '4rem 0 3rem' }}>
                <div className="container" style={{ paddingLeft: isMobile ? '0' : '1.5rem', paddingRight: isMobile ? '0' : '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile
                            ? '1fr 1fr'
                            : isTablet
                                ? '1.5fr 1fr 1fr'
                                : '1.8fr 1fr 1fr 1.4fr',
                        gap: isMobile ? '2rem 1.5rem' : '3rem',
                        alignItems: 'start',
                    }}>

                        {/* ── Brand col ── */}
                        <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
                            {/* Logo */}
                            <div style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '0.9rem' }}>
                                KYRGYZ<span style={{ color: 'hsl(var(--secondary))' }}>RIDERS</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, opacity: 0.55, marginBottom: isMobile ? '1.25rem' : '1.75rem', maxWidth: '22rem' }}>
                                Connecting travelers with the authentic spirit of Kyrgyzstan since 2017. Small groups, big adventures, genuine nomadic culture.
                            </p>

                            {/* Social icons */}
                            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: isMobile ? '0' : '0' }}>
                                {socials.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        aria-label={s.label}
                                        style={{
                                            width: '38px', height: '38px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: '0.6rem',
                                            background: 'rgba(255,255,255,0.07)',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                            color: '#fff', textDecoration: 'none',
                                            transition: 'background 0.2s, border-color 0.2s',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'hsl(var(--secondary)/0.2)';
                                            e.currentTarget.style.borderColor = 'hsl(var(--secondary)/0.5)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                                        }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* ── Navigation col ── */}
                        <div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(var(--secondary))', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
                                Navigation
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: isMobile ? '0.7rem' : '0.9rem' }}>
                                {navLinks.map(link => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            style={{
                                                fontSize: isMobile ? '0.85rem' : '0.875rem',
                                                opacity: 0.6, textDecoration: 'none', color: '#fff',
                                                display: 'flex', alignItems: 'center', gap: '0.35rem',
                                                transition: 'opacity 0.2s, color 0.2s',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'hsl(var(--secondary))'; }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.color = '#fff'; }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Sights col ── */}
                        <div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(var(--secondary))', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
                                Top Sights
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: isMobile ? '0.7rem' : '0.9rem' }}>
                                {sights.map(sight => (
                                    <li key={sight}>
                                        <Link
                                            to="/sights"
                                            style={{
                                                fontSize: isMobile ? '0.85rem' : '0.875rem',
                                                opacity: 0.6, textDecoration: 'none', color: '#fff',
                                                transition: 'opacity 0.2s, color 0.2s',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'hsl(var(--secondary))'; }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.color = '#fff'; }}
                                        >
                                            {sight}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Contact col ── */}
                        {(!isMobile || w >= 640) && (
                            <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(var(--secondary))', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
                                    Get In Touch
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                                    {contacts.map((c, i) => (
                                        <a
                                            key={i}
                                            href={c.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.7rem',
                                                fontSize: '0.85rem', opacity: 0.65, color: '#fff',
                                                textDecoration: 'none', transition: 'opacity 0.2s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
                                        >
                                            <span style={{ color: 'hsl(var(--secondary))', flexShrink: 0 }}>{c.icon}</span>
                                            {c.val}
                                        </a>
                                    ))}
                                </div>

                                {/* WhatsApp CTA card */}
                                <div style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '1rem',
                                    padding: '1.1rem 1.25rem',
                                }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'hsl(var(--secondary))', marginBottom: '0.7rem' }}>
                                        Quick Contact
                                    </div>
                                    <a
                                        href="https://wa.me/996705660593"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            padding: '0.65rem 1rem', borderRadius: '0.65rem',
                                            background: '#25D366', color: '#fff',
                                            fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
                                            transition: 'opacity 0.2s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        <MessageCircle size={15} /> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile contact row — shown only on mobile below the grid */}
                    {isMobile && (
                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
                                {contacts.map((c, i) => (
                                    <a
                                        key={i}
                                        href={c.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                                            padding: '0.75rem 0.5rem', borderRadius: '0.85rem',
                                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff', textDecoration: 'none', textAlign: 'center',
                                        }}
                                    >
                                        <span style={{ color: 'hsl(var(--secondary))' }}>{c.icon}</span>
                                        <span style={{ fontSize: '0.62rem', opacity: 0.65, lineHeight: 1.3 }}>{c.val}</span>
                                    </a>
                                ))}
                            </div>
                            <a
                                href="https://wa.me/996705660593"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.85rem', borderRadius: '0.75rem',
                                    background: '#25D366', color: '#fff',
                                    fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', width: '100%',
                                }}
                            >
                                <MessageCircle size={16} /> Chat on WhatsApp
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div style={{
                position: 'relative', zIndex: 1,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                padding: isMobile ? '1.25rem' : '1.5rem 0',
            }}>
                <div className="container" style={{ paddingLeft: isMobile ? '0' : '1.5rem', paddingRight: isMobile ? '0' : '1.5rem' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        fontSize: '0.75rem',
                        opacity: 0.45,
                        textAlign: isMobile ? 'center' : 'left',
                    }}>
                        <p style={{ margin: 0 }}>© 2026 TRIPLINE Travel. All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Privacy Policy</a>
                            <Link to="/terms-and-conditions" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
