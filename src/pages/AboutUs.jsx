import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { teamData } from '../data';
import heroImg from '../assets/0I1A2081.jpg';

import { Users, History, Heart, Globe } from 'lucide-react';

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
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);
    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    return (
        <div className="pt-20">

            {/* ── Hero ── */}
            <section style={{
                position: 'relative',
                height: isMobile ? '48vh' : '45vh',
                minHeight: isMobile ? '300px' : '420px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.5)',
                    transition: 'opacity 0.6s ease',
                    opacity: videoReady ? 0 : 1,
                }} />

                <video
                    ref={videoRef}
                    autoPlay muted loop playsInline
                    onCanPlay={() => setVideoReady(true)}
                    style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.45)',
                        opacity: videoReady ? 1 : 0,
                        transition: 'opacity 0.8s ease',
                    }}
                >
                    <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>

                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 2 }} />

                <div className="container" style={{
                    position: 'relative', zIndex: 3, textAlign: 'center', color: '#fff',
                    paddingLeft: isMobile ? '1.25rem' : '1.5rem',
                    paddingRight: isMobile ? '1.25rem' : '1.5rem',
                }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                        <span style={{
                            display: 'inline-block',
                            padding: isMobile ? '0.2rem 0.75rem' : '0.3rem 1rem',
                            borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)',
                            fontSize: isMobile ? '0.65rem' : '0.75rem',
                            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))',
                            marginBottom: isMobile ? '0.75rem' : '1.5rem',
                        }}>
                            Our Story
                        </span>
                        <h1 style={{
                            fontSize: isMobile ? 'clamp(1.75rem, 9vw, 2.8rem)' : 'clamp(2.5rem, 7vw, 5.5rem)',
                            fontWeight: 900, letterSpacing: '-0.04em',
                            marginBottom: isMobile ? '0.75rem' : '1.25rem',
                            lineHeight: 1.05,
                        }}>
                            About <span style={{ color: 'hsl(var(--secondary))' }}>Tripline</span>
                        </h1>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1.2rem',
                            opacity: 0.85, maxWidth: '42rem', margin: '0 auto',
                            fontWeight: 300, lineHeight: 1.65,
                            padding: isMobile ? '0 0.5rem' : 0,
                        }}>
                            Born from a love of mountains and people — guiding travelers through the real Kyrgyzstan since 2017.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Company Story ── */}
            <section style={{
                paddingTop: isMobile ? '2.5rem' : '5rem',
                paddingBottom: isMobile ? '2.5rem' : '5rem',
            }}>
                <div className="container" style={{
                    paddingLeft: isMobile ? '1.25rem' : '1.5rem',
                    paddingRight: isMobile ? '1.25rem' : '1.5rem',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '2rem' : isTablet ? '3rem' : '5rem',
                        alignItems: 'center',
                    }}>
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--accent))', marginBottom: '1rem' }}>
                                <History size={isMobile ? 20 : 24} />
                                <span style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: isMobile ? '0.72rem' : '0.875rem' }}>
                                    Guiding since 2017 · Founded 2026
                                </span>
                            </div>

                            {/*  intro */}
                            <h2 style={{
                                fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 900, letterSpacing: '-0.03em',
                                marginBottom: isMobile ? '0.75rem' : '1rem',
                                lineHeight: 1.15,
                            }}>
                                We Are <span style={{ color: 'hsl(var(--accent))' }}>TRIPLINE</span>
                            </h2>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: isMobile ? '0.9rem' : '1.05rem', lineHeight: 1.7, marginBottom: isMobile ? '1rem' : '1.5rem' }}>
                                Founded in 2017 in the village of Kochkor by Chyngyz, a former history teacher, TRIPLINE has grown from a small horseback tour operation into Kyrgyzstan's leading boutique adventure travel company.
                            </p>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: isMobile ? '0.9rem' : '1.05rem', lineHeight: 1.7, marginBottom: isMobile ? '1rem' : '1.5rem' }}>
                                Our tours are intentionally small — 1 to 8 people — so we can travel quietly and authentically, giving full attention to the land and its people.
                            </p>

                            {/* 3 pillars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: isMobile ? '1.25rem' : '2rem' }}>
                                {[
                                    'Local guides born and raised in the mountains',
                                    'Private & custom itineraries only',
                                    'Supporting nomadic families & communities',
                                ].map(item => (
                                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                                        <span style={{ color: 'hsl(var(--secondary))', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1.4, flexShrink: 0 }}>✦</span>
                                        <span style={{ color: 'hsl(var(--foreground))', fontSize: isMobile ? '0.875rem' : '1rem', fontWeight: 500, lineHeight: 1.55 }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{ borderTop: '1px solid hsl(var(--border))', marginBottom: isMobile ? '1.25rem' : '2rem' }} />

                            {/* About Tripline Kyrgyzstan sub-heading */}
                            <h3 style={{
                                fontSize: isMobile ? '1.1rem' : '1.4rem',
                                fontWeight: 800, letterSpacing: '-0.02em',
                                marginBottom: isMobile ? '1rem' : '1.25rem',
                                color: 'hsl(var(--primary))',
                            }}>
                                About Tripline Kyrgyzstan
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.85rem' : '1.25rem', color: 'hsl(var(--muted-foreground))', fontSize: isMobile ? '0.9rem' : '1.05rem', lineHeight: 1.7 }}>
                                <p>
                                    After five years of studying at Kyrgyz National University, I returned to my home region — a small village in Kochkor district — to work as a German language teacher at a local school. At that time, my friend Amantur, a manager at Kyrgyz Riders, suggested that I try working as a tour guide.
                                </p>
                                <p>
                                    In 2017, I started guiding travelers, and that is when my true love for nature and tourism began. Working as a guide allowed me to see how deeply people from all over the world admire the beauty of Kyrgyzstan — the majestic mountains of the Tien Shan, endless alpine pastures, the nomadic culture, and the warm hospitality of local people. Seeing my country through the eyes of travelers inspired me to share this experience in a deeper way.
                                </p>
                                <p>
                                    In 2021, the first idea of creating my own tourism company was born. After several years of experience and preparation, in 2026 we officially founded Tripline Kyrgyzstan.
                                </p>

                                {/* Today we help */}
                                <div>
                                    <p style={{ color: 'hsl(var(--foreground))', fontWeight: 600, marginBottom: '0.6rem' }}>
                                        Today our team helps travelers discover the real Kyrgyzstan:
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        {[
                                            'Scenic mountain routes',
                                            'Traditional nomadic culture',
                                            'Unique nature and alpine lakes',
                                            'The sincere hospitality of local communities',
                                        ].map(item => (
                                            <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                                <span style={{ color: 'hsl(var(--secondary))', fontWeight: 700, flexShrink: 0 }}>•</span>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p>
                                    Our mission is to develop sustainable tourism, support local communities, and show Kyrgyzstan the way we truly love it.
                                </p>

                                <p style={{
                                    fontStyle: 'italic',
                                    borderLeft: '4px solid hsl(var(--secondary))',
                                    paddingLeft: isMobile ? '1rem' : '1.5rem',
                                    paddingTop: '0.5rem', paddingBottom: '0.5rem',
                                    background: 'hsl(var(--muted)/0.3)',
                                    borderRadius: '0 0.75rem 0.75rem 0',
                                    color: 'hsl(var(--foreground))',
                                }}>
                                    "We believe that every journey is more than just a trip — it is a story that stays in your heart for a lifetime."
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: isTablet ? 0 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                aspectRatio: isMobile ? '16/9' : '4/5',
                                borderRadius: isMobile ? '1.25rem' : '2.5rem',
                                overflow: 'hidden',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                                position: 'relative', zIndex: 10,
                            }}>
                                <img src={heroImg} alt="TRIPLINE team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                            </div>

                            {/* Decorative blobs — hidden on mobile */}
                            {!isMobile && (
                                <>
                                    <div style={{ position: 'absolute', top: '-2.5rem', right: '-2.5rem', width: '10rem', height: '10rem', background: 'hsl(var(--secondary)/0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
                                    <div style={{ position: 'absolute', bottom: '-2.5rem', left: '-2.5rem', width: '10rem', height: '10rem', background: 'hsl(var(--accent)/0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
                                </>
                            )}

                            {/* Stats card — only on desktop */}
                            {!isTablet && (
                                <div style={{
                                    position: 'absolute', bottom: '-2rem', right: '-2rem',
                                    background: '#fff', padding: '2rem 2.5rem',
                                    borderRadius: '2rem', boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                                    zIndex: 20, border: '1px solid hsl(var(--border))',
                                }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 900, color: 'hsl(var(--primary))', lineHeight: 1 }}>2017</div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>Guiding Since</div>
                                </div>
                            )}

                            {/* Stats inline on mobile */}
                            {isTablet && (
                                <div style={{
                                    display: 'flex', gap: '1rem', marginTop: '1rem',
                                    justifyContent: isMobile ? 'center' : 'flex-start',
                                }}>
                                    {[
                                        { num: '2017', label: 'Guiding Since' },
                                        { num: '8+', label: 'Years of Experience' },
                                        { num: '2026', label: 'Company Founded' },
                                    ].map(s => (
                                        <div key={s.label} style={{
                                            background: '#fff', borderRadius: '1rem',
                                            padding: '0.85rem 1.1rem', textAlign: 'center',
                                            border: '1px solid hsl(var(--border))',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                                            flex: 1,
                                        }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'hsl(var(--primary))', lineHeight: 1 }}>{s.num}</div>
                                            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'hsl(var(--muted-foreground))', marginTop: '0.2rem' }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Values Section ── */}
            <section style={{
                paddingTop: isMobile ? '3rem' : '5rem',
                paddingBottom: isMobile ? '3rem' : '5rem',
                background: 'hsl(var(--primary))',
                color: '#fff',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(30%, -30%)', filter: 'blur(40px)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24rem', height: '24rem', background: 'hsl(var(--secondary)/0.1)', borderRadius: '50%', transform: 'translate(-30%, 30%)', filter: 'blur(40px)' }} />

                <div className="container" style={{
                    position: 'relative', zIndex: 10,
                    paddingLeft: isMobile ? '1.25rem' : '1.5rem',
                    paddingRight: isMobile ? '1.25rem' : '1.5rem',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '5rem' }}>
                        <h2 style={{
                            fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.4rem)' : 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 900, letterSpacing: '-0.03em',
                            marginBottom: '0.75rem',
                        }}>
                            Our Core Philosophy
                        </h2>
                        <p style={{
                            fontSize: isMobile ? '0.9rem' : '1.1rem',
                            opacity: 0.7, maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7,
                        }}>
                            Our mission is to develop sustainable tourism, support local communities, and show Kyrgyzstan the way we truly love it.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
                        gap: isMobile ? '1rem' : '2rem',
                    }}>
                        {[
                            { icon: <Heart size={isMobile ? 24 : 32} />, title: 'Scenic Mountain Routes', desc: 'We take you through breathtaking passes, high-altitude meadows and valleys that most travelers never see.' },
                            { icon: <Globe size={isMobile ? 24 : 32} />, title: 'Sustainable Tourism', desc: 'We develop tourism responsibly, working with local communities and protecting the nature we love so much.' },
                            { icon: <Users size={isMobile ? 24 : 32} />, title: 'Nomadic Culture', desc: 'Unique nature, alpine lakes, and the sincere hospitality of local communities — a journey that stays in your heart.' },
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(12px)',
                                    padding: isMobile ? '1.5rem' : '2.5rem',
                                    borderRadius: isMobile ? '1.25rem' : '2rem',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    display: isMobile ? 'flex' : 'block',
                                    gap: isMobile ? '1rem' : 0,
                                    alignItems: isMobile ? 'flex-start' : 'initial',
                                }}
                            >
                                <div style={{ color: 'hsl(var(--secondary))', marginBottom: isMobile ? 0 : '1.5rem', flexShrink: 0 }}>
                                    {value.icon}
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: isMobile ? '1.05rem' : '1.35rem',
                                        fontWeight: 700, marginBottom: isMobile ? '0.4rem' : '1rem',
                                    }}>
                                        {value.title}
                                    </h3>
                                    <p style={{ opacity: 0.72, lineHeight: 1.65, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                                        {value.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team Grid ── */}
            <section style={{
                paddingTop: isMobile ? '2.5rem' : '7rem',
                paddingBottom: isMobile ? '2.5rem' : '7rem',
            }}>
                <div className="container" style={{
                    paddingLeft: isMobile ? '1.25rem' : '1.5rem',
                    paddingRight: isMobile ? '1.25rem' : '1.5rem',
                }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4.5rem' }}>
                        <span style={{
                            display: 'block', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--accent))', marginBottom: '0.6rem',
                        }}>
                            Our Family
                        </span>
                        <h2 style={{
                            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.2rem)' : 'clamp(1.75rem, 4vw, 3rem)',
                            fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem',
                        }}>
                            The Faces of TRIPLINE
                        </h2>
                        <p style={{
                            color: 'hsl(var(--muted-foreground))', maxWidth: '36rem', margin: '0 auto',
                            fontSize: isMobile ? '0.875rem' : '1.05rem', lineHeight: 1.7,
                        }}>
                            A team of local guides, drivers, and mountain experts united by their love for the Celestial Mountains.
                        </p>
                    </div>

                    {/* Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile
                            ? 'repeat(2, 1fr)'
                            : isTablet
                                ? 'repeat(3, 1fr)'
                                : 'repeat(4, 1fr)',
                        gap: isMobile ? '0.85rem' : '2rem',
                    }}>
                        {teamData.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index, 4) * 0.07 }}
                                viewport={{ once: true }}
                                whileHover={!isMobile ? { y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.13)' } : {}}
                                style={{
                                    background: '#fff',
                                    borderRadius: isMobile ? '1rem' : '1.75rem',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 28px rgba(0,0,0,0.07)',
                                    border: '1px solid hsl(var(--border))',
                                    cursor: 'pointer',
                                }}
                            >
                                <Link to={`/team/${member.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    {/* Image */}
                                    <div style={{ position: 'relative', height: isMobile ? '150px' : '240px', overflow: 'hidden' }}>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.7s ease' }}
                                            onMouseEnter={e => !isMobile && (e.target.style.transform = 'scale(1.06)')}
                                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                                        <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.6rem', right: '0.6rem' }}>
                                            <span style={{
                                                background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                                                padding: isMobile ? '0.15rem 0.55rem' : '0.3rem 0.85rem',
                                                borderRadius: '999px',
                                                fontSize: isMobile ? '0.58rem' : '0.7rem',
                                                fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                display: 'inline-block', maxWidth: '100%',
                                            }}>
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div style={{ padding: isMobile ? '0.75rem' : '1.5rem 1.75rem' }}>
                                        <h3 style={{
                                            fontSize: isMobile ? '0.875rem' : '1.2rem',
                                            fontWeight: 800, marginBottom: isMobile ? '0.2rem' : '0.5rem',
                                            letterSpacing: '-0.02em',
                                        }}>
                                            {member.name}
                                        </h3>
                                        {!isMobile && (
                                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.65 }}>
                                                Local expert with deep knowledge of Kyrgyzstan's mountains, culture, and nomadic traditions.
                                            </p>
                                        )}
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

export default AboutUs;
