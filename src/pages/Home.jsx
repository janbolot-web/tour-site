import React from 'react';
import Hero from '../components/Hero';
import FeaturedTours from '../components/FeaturedTours';
import AboutUs from '../components/AboutUs';
import Benefits from '../components/Benefits';
import Destinations from '../components/Destinations';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedTours />
            <AboutUs />
            <Benefits />
            <Destinations />
            <Testimonials />

            {/* Contact Section */}
            <section id="contact" style={{ padding: '7rem 0', background: 'hsl(var(--muted) / 0.25)' }}>
                <div className="container">
                    <div className="home-contact-grid">
                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span style={{
                                display: 'block', fontSize: '0.75rem', fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: 'hsl(var(--accent))', marginBottom: '0.75rem'
                            }}>Get In Touch</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
                                Ready for your next <span style={{ color: 'hsl(var(--primary))' }}>adventure?</span>
                            </h2>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                Whether you're looking for a relaxing horse ride or a challenging mountain expedition, our local experts are here to make it happen.
                            </p>

                            {/* Contact Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { icon: <Phone size={20} />, label: 'WhatsApp / Phone', value: '+996 705 660 593' },
                                    { icon: <Mail size={20} />, label: 'Email', value: 'example@gmail.com' },
                                    { icon: <MapPin size={20} />, label: 'Office', value: 'Bishkek, Kyrgyzstan' },
                                ].map(item => (
                                    <div key={item.label} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1rem 1.25rem', borderRadius: '1rem',
                                        background: '#fff', border: '1px solid hsl(var(--border))',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                    }}>
                                        <div style={{
                                            width: '44px', height: '44px', borderRadius: '0.75rem', flexShrink: 0,
                                            background: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff',
                                        }}>{item.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'hsl(var(--muted-foreground))', marginBottom: '0.2rem' }}>{item.label}</div>
                                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            style={{
                                background: '#fff', borderRadius: '2rem',
                                padding: '2.5rem',
                                boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
                                border: '1px solid hsl(var(--border))',
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Send us a message</h3>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '2rem' }}>We'll get back to you within 24 hours.</p>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="home-form-row">
                                    <input type="text" placeholder="Your Name" style={inputStyle} />
                                    <input type="email" placeholder="Email Address" style={inputStyle} />
                                </div>
                                <input type="text" placeholder="Which tour are you interested in?" style={inputStyle} />
                                <textarea placeholder="Tell us about your trip plans — dates, group size, interests..." rows="4" style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} />
                                <button
                                    type="submit"
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        padding: '1rem', borderRadius: '0.75rem',
                                        background: 'hsl(var(--primary))', color: '#fff',
                                        fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer',
                                        transition: 'opacity 0.2s',
                                        fontFamily: 'inherit',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    Send Message <ArrowRight size={18} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

const inputStyle = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
    border: '1.5px solid hsl(var(--border))', fontSize: '0.95rem',
    fontFamily: 'inherit', outline: 'none', background: 'hsl(var(--muted) / 0.3)',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
};

export default Home;

