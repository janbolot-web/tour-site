import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ArrowRight } from 'lucide-react';
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const contactItems = [
    {
        icon: <Phone size={20} />,
        label: 'Phone / WhatsApp',
        value: '+996 705 660 593',
        sub: 'Available 9am – 8pm (KGT)',
        link: 'https://wa.me/996705660593',
    },
    {
        icon: <Mail size={20} />,
        label: 'Email',
        value: 'example@gmail.com',
        sub: 'Reply within 24 hours',
        link: 'mailto:example@gmail.com',
    },
    {
        icon: <MapPin size={20} />,
        label: 'Office',
        value: 'Bishkek, Akiev str. 66',
        sub: 'VESNA Business Center',
        link: 'https://maps.google.com',
    },
    {
        icon: <Clock size={20} />,
        label: 'Working Hours',
        value: 'Mon – Fri: 9:00 – 18:00',
        sub: 'Sat: 10:00 – 15:00',
        link: null,
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', tour: '', message: '' });
    const [sent, setSent] = useState(false);

    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    const inputStyle = {
        width: '100%',
        padding: isMobile ? '0.8rem 0.95rem' : '0.9rem 1.1rem',
        borderRadius: '0.75rem',
        border: '1.5px solid hsl(var(--border))',
        fontSize: isMobile ? '0.9rem' : '0.95rem',
        fontFamily: 'inherit',
        outline: 'none',
        background: '#fff',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div style={{ paddingTop: '80px' }}>

            {/* ── Hero ── */}
            <section style={{
                position: 'relative',
                height: isMobile ? '48vh' : '52vh',
                minHeight: isMobile ? '300px' : '380px',
                display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.42)',
                }} />
                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

                <div className="container" style={{
                    position: 'relative', zIndex: 2, color: '#fff',
                    paddingBottom: isMobile ? '2rem' : '4rem',
                    paddingLeft: isMobile ? '1.25rem' : '1.5rem',
                    paddingRight: isMobile ? '1.25rem' : '1.5rem',
                    width: isMobile ? '100%' : '80%',
                    boxSizing: 'border-box',
                }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{
                            display: 'inline-block',
                            padding: isMobile ? '0.2rem 0.75rem' : '0.3rem 1rem',
                            borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)',
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))', marginBottom: isMobile ? '0.75rem' : '1.25rem',
                        }}>
                            Get In Touch
                        </span>
                        <h1 style={{
                            fontSize: isMobile ? 'clamp(1.75rem, 8vw, 2.6rem)' : 'clamp(2.5rem, 6vw, 5rem)',
                            fontWeight: 900, letterSpacing: '-0.04em',
                            marginBottom: isMobile ? '0.5rem' : '0.75rem',
                            lineHeight: 1.05,
                        }}>
                            Let's Plan Your{' '}
                            <span style={{ color: 'hsl(var(--secondary))' }}>Adventure</span>
                        </h1>
                        <p style={{
                            fontSize: isMobile ? '0.875rem' : '1.15rem',
                            opacity: 0.8,
                            maxWidth: '34rem',
                            fontWeight: 300,
                            lineHeight: 1.6,
                        }}>
                            Have a question or want a custom tour? We respond within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Main Content ── */}
            <section style={{
                padding: isMobile ? '2.5rem 0' : '6rem 0',
                background: 'hsl(var(--muted) / 0.25)',
            }}>
                <div className="container" style={{
                    paddingLeft: isMobile ? '1.25rem' : '1.5rem',
                    paddingRight: isMobile ? '1.25rem' : '1.5rem',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isTablet ? '1fr' : '1fr 1.4fr',
                        gap: isTablet ? '2rem' : '4rem',
                        alignItems: 'start',
                    }}>

                        {/* ── Left: Contact Info ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 style={{
                                fontSize: isMobile ? '1.35rem' : '1.6rem',
                                fontWeight: 900, letterSpacing: '-0.02em',
                                marginBottom: '0.5rem',
                            }}>
                                Contact Details
                            </h2>
                            <p style={{
                                color: 'hsl(var(--muted-foreground))',
                                fontSize: isMobile ? '0.875rem' : '0.95rem',
                                lineHeight: 1.7, marginBottom: isMobile ? '1.5rem' : '2.5rem',
                            }}>
                                Reach us via WhatsApp, email, or our office in Bishkek. We speak English, Russian, and Kyrgyz.
                            </p>

                            {/* Contact cards grid — 2 columns on mobile for compactness */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr',
                                gap: isMobile ? '0.75rem' : '1rem',
                                marginBottom: isMobile ? '1.5rem' : '2.5rem',
                            }}>
                                {contactItems.map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            display: 'flex',
                                            flexDirection: isMobile ? 'column' : 'row',
                                            alignItems: isMobile ? 'flex-start' : 'center',
                                            gap: isMobile ? '0.6rem' : '1rem',
                                            padding: isMobile ? '0.9rem' : '1.1rem 1.25rem',
                                            borderRadius: '1.25rem',
                                            background: '#fff', border: '1px solid hsl(var(--border))',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                            cursor: item.link ? 'pointer' : 'default',
                                            transition: 'box-shadow 0.2s, transform 0.2s',
                                        }}
                                        onClick={item.link ? () => window.open(item.link, '_blank') : undefined}
                                        onMouseEnter={item.link ? e => {
                                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        } : undefined}
                                        onMouseLeave={item.link ? e => {
                                            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                            e.currentTarget.style.transform = 'none';
                                        } : undefined}
                                    >
                                        <div style={{
                                            width: isMobile ? '36px' : '48px',
                                            height: isMobile ? '36px' : '48px',
                                            borderRadius: '0.75rem', flexShrink: 0,
                                            background: 'hsl(var(--primary))',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff',
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontSize: '0.65rem', fontWeight: 700,
                                                textTransform: 'uppercase', letterSpacing: '0.07em',
                                                color: 'hsl(var(--muted-foreground))', marginBottom: '0.15rem',
                                            }}>
                                                {item.label}
                                            </div>
                                            <div style={{
                                                fontWeight: 800,
                                                fontSize: isMobile ? '0.8rem' : '0.95rem',
                                                marginBottom: '0.1rem',
                                                wordBreak: 'break-word',
                                            }}>
                                                {item.value}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: 'hsl(var(--muted-foreground))' }}>
                                                {item.sub}
                                            </div>
                                        </div>
                                        {!isMobile && item.link && (
                                            <ArrowRight size={16} style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0 }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href="https://wa.me/996705660593"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                    padding: isMobile ? '0.85rem 1.25rem' : '1rem 1.5rem',
                                    borderRadius: '0.9rem',
                                    background: '#25D366', color: '#fff',
                                    fontWeight: 800, fontSize: isMobile ? '0.9rem' : '1rem',
                                    textDecoration: 'none', transition: 'opacity 0.2s',
                                    boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <MessageCircle size={18} /> Chat on WhatsApp
                            </a>
                        </motion.div>

                        {/* ── Right: Contact Form ── */}
                        <motion.div
                            initial={{ opacity: 0, x: isTablet ? 0 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            style={{
                                background: '#fff', borderRadius: isMobile ? '1.25rem' : '2rem',
                                padding: isMobile ? '1.5rem' : '3rem',
                                boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
                                border: '1px solid hsl(var(--border))',
                            }}
                        >
                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: isMobile ? '2rem 0.5rem' : '3rem 1rem' }}
                                >
                                    <div style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: '1.25rem' }}>✅</div>
                                    <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                                        Message Sent!
                                    </h3>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, fontSize: isMobile ? '0.9rem' : '1rem' }}>
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSent(false); setFormData({ name: '', email: '', tour: '', message: '' }); }}
                                        style={{
                                            marginTop: '1.5rem', padding: '0.75rem 1.75rem', borderRadius: '0.75rem',
                                            background: 'hsl(var(--primary))', color: '#fff',
                                            fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                                        Send us a Message
                                    </h3>
                                    <p style={{
                                        color: 'hsl(var(--muted-foreground))',
                                        fontSize: isMobile ? '0.85rem' : '0.9rem',
                                        marginBottom: isMobile ? '1.25rem' : '2rem',
                                    }}>
                                        Tell us about your dream trip — dates, interests, and group size.
                                    </p>

                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.85rem' : '1rem' }}>

                                        {/* Name + Email: 2-col on desktop, 1-col on mobile */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                            gap: isMobile ? '0.85rem' : '1rem',
                                        }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                    Your Name *
                                                </label>
                                                <input
                                                    required type="text" placeholder="John Smith"
                                                    value={formData.name}
                                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                                    style={inputStyle}
                                                    onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                    Email Address *
                                                </label>
                                                <input
                                                    required type="email" placeholder="john@email.com"
                                                    value={formData.email}
                                                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                                    style={inputStyle}
                                                    onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                Tour of Interest
                                            </label>
                                            <input
                                                type="text" placeholder="e.g. Song-Kol Lake on Horseback, 3 Days"
                                                value={formData.tour}
                                                onChange={e => setFormData(p => ({ ...p, tour: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                Your Message *
                                            </label>
                                            <textarea
                                                required
                                                rows={isMobile ? 4 : 5}
                                                placeholder="Tell us your planned travel dates, group size, and what kind of experience you're looking for..."
                                                value={formData.message}
                                                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                                                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                                                onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                                padding: isMobile ? '0.9rem' : '1rem',
                                                borderRadius: '0.75rem',
                                                background: 'hsl(var(--primary))', color: '#fff',
                                                fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1rem',
                                                border: 'none', cursor: 'pointer',
                                                fontFamily: 'inherit', transition: 'opacity 0.2s',
                                                marginTop: '0.25rem',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            <Send size={16} /> Send Message
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Map ── */}
            <section style={{ height: isMobile ? '280px' : '400px', position: 'relative' }}>
                <iframe
                    title="Kyrgyz Riders Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.7!2d74.5995!3d42.8700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUyJzEyLjAiTiA3NMKwMzUnNTguMiJF!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', display: 'block', filter: 'grayscale(15%)' }}
                    allowFullScreen
                    loading="lazy"
                />
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'hsl(var(--primary))', color: '#fff',
                    padding: isMobile ? '0.55rem 1rem' : '0.75rem 1.5rem',
                    borderRadius: '1rem',
                    fontWeight: 700, fontSize: isMobile ? '0.8rem' : '0.9rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                    pointerEvents: 'none', whiteSpace: 'nowrap',
                }}>
                    📍 Bishkek, Kyrgyzstan
                </div>
            </section>
        </div>
    );
};

export default Contact;
