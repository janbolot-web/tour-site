import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { teamData } from '../data';
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';
import { Users, History, Heart, Globe } from 'lucide-react';

const AboutUs = () => {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    return (
        <div className="pt-20">
            {/* About Hero */}
            <section style={{ position: 'relative', height: '45vh', minHeight: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* Poster image — always shown until video is ready */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.5)',
                    transition: 'opacity 0.6s ease',
                    opacity: videoReady ? 0 : 1,
                }} />

                {/* Background Video */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={() => setVideoReady(true)}
                    style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.45)',
                        opacity: videoReady ? 1 : 0,
                        transition: 'opacity 0.8s ease',
                    }}
                >
                    {/* Free Pexels Kyrgyzstan-style mountain landscape video */}
                    <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>

                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 2 }} />

                <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', color: '#fff' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)', fontSize: '0.75rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))', marginBottom: '1.5rem',
                        }}>
                            Our Identity
                        </span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.25rem', lineHeight: 1.05 }}>
                            Authentic <span style={{ color: 'hsl(var(--secondary))' }}>Spirit</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.85, maxWidth: '38rem', margin: '0 auto', fontWeight: 300, lineHeight: 1.7 }}>
                            Since 2017, we've been sharing the raw beauty of Kyrgyzstan with the world through nomadic eyes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Story */}
            <section className="section container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 text-accent mb-4">
                            <History size={24} />
                            <span className="font-bold tracking-widest uppercase text-sm">Founded in 2017</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl mb-8 leading-tight">A Journey of Passion and Heritage</h2>
                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                Kyrgyz Riders was born in the heart of the mountains, in the village of Kochkor. Founded by Aman — a former history teacher — our company started with a simple vision: to share the authentic nomadic lifestyle that defines our people.
                            </p>
                            <p>
                                What began as a small operation with just four people offering horseback tours to Song-Kol Lake has evolved into a leading adventure travel company. Today, our team of 15+ experts manages expeditions across the most remote corners of Central Asia.
                            </p>
                            <p className="italic border-l-4 border-secondary pl-6 py-2 bg-muted/30 rounded-r-xl">
                                "We don't just guide tours; we welcome you into our home, our culture, and our history."
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                            <img src={heroImg} alt="Kyrgyz Riders team" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

                        <div className="absolute -bottom-8 -right-8 bg-white p-10 rounded-3xl shadow-2xl z-20 border border-border hidden md:block">
                            <div className="text-5xl font-black text-primary mb-1">15+</div>
                            <div className="text-sm font-bold uppercase tracking-tighter text-muted-foreground">Local Experts</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />

                <div className="container relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl mb-6">Our Core Philosophy</h2>
                        <p className="text-xl opacity-70 max-w-2xl mx-auto">Built on the principles of nomadic hospitality and environmental stewardship.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Heart size={32} />,
                                title: "Authenticity",
                                desc: "We stay away from mass tourism. Our tours are private and tailored to give you a genuine connection with local people."
                            },
                            {
                                icon: <Globe size={32} />,
                                title: "Sustainability",
                                desc: "We partner with local families to build yurt camps and homestays, ensuring tourism benefits the communities directly."
                            },
                            {
                                icon: <Users size={32} />,
                                title: "Local Growth",
                                desc: "We train young men from mountain villages, providing them with professional skills and career opportunities."
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/20 hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="text-secondary mb-6">{value.icon}</div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="opacity-70 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section style={{ padding: '7rem 0' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(var(--accent))', marginBottom: '0.75rem' }}>
                            Our Family
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            The Faces of Kyrgyz Riders
                        </h2>
                        <p style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '36rem', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            A team of local guides, drivers, and mountain experts united by their love for the Celestial Mountains.
                        </p>
                    </div>

                    {/* Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                        {teamData.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index, 4) * 0.07 }}
                                viewport={{ once: true }}
                                style={{
                                    background: '#fff',
                                    borderRadius: '1.75rem',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 28px rgba(0,0,0,0.07)',
                                    border: '1px solid hsl(var(--border))',
                                    transition: 'box-shadow 0.3s, transform 0.3s',
                                    cursor: 'default',
                                }}
                                whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.13)' }}
                            >
                                {/* Image */}
                                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                                        onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />

                                    {/* Role badge on image */}
                                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                                        <span style={{
                                            background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                                            padding: '0.3rem 0.85rem', borderRadius: '999px',
                                            fontSize: '0.7rem', fontWeight: 700,
                                            letterSpacing: '0.07em', textTransform: 'uppercase',
                                        }}>
                                            {member.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div style={{ padding: '1.5rem 1.75rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                                        {member.name}
                                    </h3>
                                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.65 }}>
                                        Local expert with deep knowledge of Kyrgyzstan's mountains, culture, and nomadic traditions.
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
