import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ArrowRight } from 'lucide-react';
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';

const inputStyle = {
    width: '100%', padding: '0.9rem 1.1rem',
    borderRadius: '0.75rem',
    border: '1.5px solid hsl(var(--border))',
    fontSize: '0.95rem', fontFamily: 'inherit',
    outline: 'none', background: '#fff',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
};

const contactItems = [
    {
        icon: <Phone size={22} />,
        label: 'Phone / WhatsApp',
        value: '+996 558 033 880',
        sub: 'Available 9am – 8pm (KGT)',
        link: 'https://wa.me/996558033880',
    },
    {
        icon: <Mail size={22} />,
        label: 'Email',
        value: 'kyrgyzriders@gmail.com',
        sub: 'Reply within 24 hours',
        link: 'mailto:kyrgyzriders@gmail.com',
    },
    {
        icon: <MapPin size={22} />,
        label: 'Office',
        value: 'Bishkek, Akiev str. 66',
        sub: 'VESNA Business Center',
        link: 'https://maps.google.com',
    },
    {
        icon: <Clock size={22} />,
        label: 'Working Hours',
        value: 'Mon – Fri: 9:00 – 18:00',
        sub: 'Sat: 10:00 – 15:00',
        link: null,
    },
];

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', tour: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate send
        setSent(true);
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero */}
            <section style={{ position: 'relative', height: '52vh', minHeight: '420px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.42)',
                }} />
                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

                <div className="container" style={{ position: 'relative', zIndex: 2, color: '#fff', paddingBottom: '4rem' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{
                            display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)', fontSize: '0.75rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))', marginBottom: '1.25rem',
                        }}>
                            Get In Touch
                        </span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '0.75rem', lineHeight: 1.05 }}>
                            Let's Plan Your <span style={{ color: 'hsl(var(--secondary))' }}>Adventure</span>
                        </h1>
                        <p style={{ fontSize: '1.15rem', opacity: 0.8, maxWidth: '34rem', fontWeight: 300, lineHeight: 1.7 }}>
                            Have a question or want a custom tour? Our team responds within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ padding: '6rem 0', background: 'hsl(var(--muted) / 0.25)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>

                        {/* Left — Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                                Contact Details
                            </h2>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                                Reach us via WhatsApp, email, or visit our office in Bishkek. We speak English, Russian, and Kyrgyz.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                                {contactItems.map((item) => (
                                    <div key={item.label} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1.1rem 1.25rem', borderRadius: '1.25rem',
                                        background: '#fff', border: '1px solid hsl(var(--border))',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                        textDecoration: 'none', color: 'inherit',
                                        transition: 'box-shadow 0.2s',
                                        ...(item.link ? { cursor: 'pointer' } : {}),
                                    }}
                                        onClick={item.link ? () => window.open(item.link, '_blank') : undefined}
                                        onMouseEnter={item.link ? e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)' : undefined}
                                        onMouseLeave={item.link ? e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' : undefined}
                                    >
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '0.9rem', flexShrink: 0,
                                            background: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff',
                                        }}>{item.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'hsl(var(--muted-foreground))', marginBottom: '0.2rem' }}>
                                                {item.label}
                                            </div>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.15rem' }}>{item.value}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>{item.sub}</div>
                                        </div>
                                        {item.link && <ArrowRight size={16} style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0 }} />}
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <a
                                href="https://wa.me/996558033880"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                    padding: '1rem 1.5rem', borderRadius: '0.9rem',
                                    background: '#25D366', color: '#fff',
                                    fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
                                    transition: 'opacity 0.2s',
                                    boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <MessageCircle size={20} /> Chat on WhatsApp
                            </a>
                        </motion.div>

                        {/* Right — Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            style={{
                                background: '#fff', borderRadius: '2rem',
                                padding: '3rem',
                                boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
                                border: '1px solid hsl(var(--border))',
                            }}
                        >
                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '3rem 1rem' }}
                                >
                                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Message Sent!</h3>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSent(false); setFormData({ name: '', email: '', tour: '', message: '' }); }}
                                        style={{
                                            marginTop: '2rem', padding: '0.75rem 2rem', borderRadius: '0.75rem',
                                            background: 'hsl(var(--primary))', color: '#fff',
                                            fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>Send us a Message</h3>
                                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '2rem' }}>
                                        Tell us about your dream trip — dates, interests, and group size.
                                    </p>

                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                    Your Name *
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="John Smith"
                                                    value={formData.name}
                                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                                    style={inputStyle}
                                                    onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                    Email Address *
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@email.com"
                                                    value={formData.email}
                                                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                                    style={inputStyle}
                                                    onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                Tour of Interest
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Song-Kol Lake on Horseback, 3 Days"
                                                value={formData.tour}
                                                onChange={e => setFormData(p => ({ ...p, tour: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                                onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: 'hsl(var(--muted-foreground))' }}>
                                                Your Message *
                                            </label>
                                            <textarea
                                                required
                                                rows={5}
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
                                                padding: '1rem', borderRadius: '0.75rem',
                                                background: 'hsl(var(--primary))', color: '#fff',
                                                fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer',
                                                fontFamily: 'inherit', transition: 'opacity 0.2s',
                                                marginTop: '0.5rem',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            <Send size={18} /> Send Message
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section style={{ height: '400px', position: 'relative' }}>
                <iframe
                    title="Kyrgyz Riders Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.7!2d74.5995!3d42.8700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUyJzEyLjAiTiA3NMKwMzUnNTguMiJF!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', display: 'block', filter: 'grayscale(15%)' }}
                    allowFullScreen
                    loading="lazy"
                />
                {/* Overlay label */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'hsl(var(--primary))', color: '#fff',
                    padding: '0.75rem 1.5rem', borderRadius: '1rem',
                    fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                    pointerEvents: 'none',
                }}>
                    📍 Bishkek, Kyrgyzstan
                </div>
            </section>
        </div>
    );
};

export default Contact;
