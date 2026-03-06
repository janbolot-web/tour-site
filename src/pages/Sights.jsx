import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Mountain, Droplets, Trees, Home, ChevronDown } from 'lucide-react';
import { sightsData } from '../data';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';
import horseTourImg from '../assets/kyrgyzstan_horse_riding_tour_1772534860001.png';
import lakeTourImg from '../assets/kyrgyzstan_lake_tour_1772535567087.png';
import panoramaImg from '../assets/kyrgyzstan_mountain_panorama_1772534959492.png';

// Comprehensive sights with full descriptions matching the real site
const allSights = [
    {
        id: 'song-kol-lake',
        name: "Song-Kol Lake",
        tagline: "High-mountain nomadic paradise",
        elevation: "3,016 m",
        region: "Naryn Region",
        season: "Late May – Early October",
        image: lakeTourImg,
        icon: <Droplets size={20} />,
        description: "Song-Kol Lake is a high-mountain lake in central Kyrgyzstan, set at roughly 3,000 meters above sea level. Because the passes are snow-covered for much of the year, the area is mostly accessible only from late May to early October.\n\nIn summer, the lake becomes a lively seasonal home for nomadic herders who bring their horses, sheep, and yaks to graze on the lush surrounding pastures. Yurt camps appear across the jailoo (summer pasture), giving visitors a chance to experience Kyrgyz traditions — sharing local meals, riding horses, and enjoying the rhythm of rural life.\n\nThe landscape is wide and open, with calm blue water, rolling hills, and distant mountains that glow beautifully at sunrise and sunset. Travelers come to Song-Kol for its peaceful atmosphere, horseback trekking, scenic hiking routes, and incredible night skies.",
        highlights: ["Nomadic yurt camps", "Horseback riding", "Star-gazing", "Sunrise over the lake"],
    },
    {
        id: 'kel-suu-lake',
        name: "Kel-Suu Lake",
        tagline: "Remote & wild — near the Chinese border",
        elevation: "3,520 m",
        region: "Naryn Region",
        season: "June – September",
        image: horseTourImg,
        icon: <Droplets size={20} />,
        description: "Kel-Suu is one of Kyrgyzstan's most dramatic and remote destinations, nestled in a narrow gorge near the Chinese border. The lake appears suddenly as you round a cliff face — a vivid turquoise ribbon of water surrounded by sheer canyon walls up to 200 meters high.\n\nAccess requires a permit and a 4×4 vehicle followed by a boat ride or swim-float across the icy entrance channel. The remoteness is part of the appeal: very few tourists make it this far, making it a genuinely off-grid adventure.\n\nThe area around Kel-Suu is inhabited by a small community of herder families who welcome travelers into their yurts. The combination of dramatic geology, crystal-clear water, and authentic nomadic culture makes this one of Kyrgyzstan's most rewarding experiences.",
        highlights: ["Turquoise canyon lake", "Boat ride through gorge", "Nomadic communities", "Permit required"],
    },
    {
        id: 'altyn-arashan',
        name: "Altyn-Arashan Valley",
        tagline: "Hot springs, glaciers & alpine wilderness",
        elevation: "2,500-3,800 m",
        region: "Issyk-Kul Region",
        season: "May – October",
        image: panoramaImg,
        icon: <Mountain size={20} />,
        description: "Altyn-Arashan — meaning 'Golden Spring' in Kyrgyz — is a stunning alpine valley located 40 km southeast of Karakol. The valley is famous for its natural hot springs rich in minerals, which can be reached on foot or horseback along a scenic gorge trail.\n\nAt the head of the valley rises Palatka Peak (4,260 m), and from its upper reaches you can see the dramatic ice-covered flanks of the Terskey Ala-Too range. The surrounding forests of Tien Shan fir and alpine meadows bursting with wildflowers make Altyn-Arashan one of the most beautiful valleys in Kyrgyzstan.\n\nA small cluster of guesthouses and shepherds' huts provides accommodation. The hot spring baths themselves are simple outdoor pools — a deeply relaxing reward after a full day of hiking.",
        highlights: ["Natural hot spring pools", "Forest hiking trails", "Views of Palatka Peak", "Glacier scenery"],
    },
    {
        id: 'karakol-city',
        name: "Karakol City",
        tagline: "Colonial charm meets mountain culture",
        elevation: "1,770 m",
        region: "Issyk-Kul Region",
        season: "All Year",
        image: heroImg,
        icon: <Home size={20} />,
        description: "Karakol is the fourth-largest city in Kyrgyzstan, founded in 1869 as a Russian Imperial outpost. Today it serves as the gateway to some of the most dramatic mountain landscapes in the country, including Altyn-Arashan Valley and Ala-Kol Lake.\n\nThe city itself has several notable landmarks: a beautiful wooden Russian Orthodox Cathedral built in 1895 without a single nail, and an ornate wooden Dungan Mosque built in 1910 with classic Chinese architectural details. Both are remarkably well-preserved and reflect the multicultural heritage of the region.\n\nKarakol hosts a renowned animal market every Sunday — one of the largest in Central Asia — where you can see horses, cows, sheep, and handcrafts being traded. The city's bazaar district is also excellent for sampling local food.",
        highlights: ["Wooden Orthodox Cathedral", "Dungan Mosque", "Sunday animal market", "Mountain gateway"],
    },
    {
        id: 'cholpon-ata-city',
        name: "Cholpon-Ata City",
        tagline: "Petroglyphs, beaches & ancient heritage",
        elevation: "1,620 m",
        region: "Issyk-Kul Region",
        season: "May – September",
        image: lakeTourImg,
        icon: <Trees size={20} />,
        description: "Cholpon-Ata is the main resort town on the northern shore of Ysyk-Kol Lake, and also one of Kyrgyzstan's most significant archaeological sites. The town is famous for its Open-Air Petroglyph Museum — a field of granite boulders engraved with hundreds of Bronze Age carvings of ibex, deer, hunting scenes, and celestial symbols.\n\nThe museum grounds cover several hectares and contain over 2,000 petroglyphs, some dating back 3,000 years. Walking among the stones at dusk, with the lake shimmering in the background, is a genuinely moving experience.\n\nBeyond the museum, Cholpon-Ata offers beautiful sandy beaches on the lake shore, a local market, and easy access to the mountain villages of the Kyungöy Range.",
        highlights: ["Bronze Age petroglyphs", "Sandy lake beaches", "Ysyk-Kol views", "Local market"],
    },
    {
        id: 'ysyk-kol-lake',
        name: "Ysyk-Kol Lake",
        tagline: "The Pearl of Kyrgyzstan — never freezes",
        elevation: "1,607 m",
        region: "Issyk-Kul Region",
        season: "All Year",
        image: panoramaImg,
        icon: <Droplets size={20} />,
        description: "Ysyk-Kol — meaning 'Warm Lake' in Kyrgyz — is the second-largest alpine lake in the world after Titicaca, and the tenth deepest lake on earth. Despite its high altitude, it never freezes in winter due to its depth, salinity, and thermal activity.\n\nThe lake is surrounded by snow-capped peaks of the Tien Shan range on both sides, creating a landscape of exceptional beauty. The north shore is more developed, with resort towns and sandy beaches, while the south shore remains wilder and more remote.\n\nYsyk-Kol has been an important trade and cultural hub for centuries: Silk Road caravans once passed along its shores, and Soviet-era health sanatoriums still dot the northern coast. Today it attracts visitors for swimming, watersports, hiking, and exploring nearby archaeological sites.",
        highlights: ["Never-freezing lake", "2nd largest alpine lake", "North & south shores", "Silk Road heritage"],
    },
    {
        id: 'tash-rabat',
        name: "Tash-Rabat",
        tagline: "15th-century Silk Road caravanserai",
        elevation: "3,200 m",
        region: "Naryn Region",
        season: "May – October",
        image: panoramaImg,
        icon: <Home size={20} />,
        description: "Tash-Rabat is one of the most remarkable medieval structures in Central Asia — a 15th-century stone caravanserai built in a remote mountain valley near the Chinese border. The building served as a rest stop for Silk Road merchants and travelers making the arduous crossing between China and Persia.\n\nThe structure is built entirely from dark grey stone and features a main domed hall, a labyrinth of rooms around a central corridor, and a dungeon. Its walls are up to 2 meters thick, providing insulation from the cold mountain climate.\n\nThe surrounding landscape is stunning: a wide high-altitude valley ringed by rolling jailoos (summer pastures) where nomadic families still graze their horses. Yurt camps nearby offer overnight stays with a view of the stars across the open steppe.",
        highlights: ["Medieval Silk Road stop", "Stone dome architecture", "Nomadic yurt camps", "Border region"],
    },
];

function SightCard({ sight, index, expanded, onToggle, isMobile }) {
    const isExpanded = expanded === sight.id;
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index, 3) * 0.08, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ background: '#fff', borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
        >
            {/* Image */}
            <div style={{ position: 'relative', height: isMobile ? '220px' : '300px', overflow: 'hidden' }}>
                <img
                    src={sight.image}
                    alt={sight.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />

                {/* Tags */}
                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px',
                        padding: '0.3rem 0.85rem', fontSize: '0.7rem', fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff'
                    }}>
                        {sight.region}
                    </span>
                    <span style={{
                        background: 'hsl(var(--secondary))', borderRadius: '999px',
                        padding: '0.3rem 0.85rem', fontSize: '0.7rem', fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase', color: 'hsl(var(--primary))'
                    }}>
                        ↑ {sight.elevation}
                    </span>
                </div>

                {/* Title overlay */}
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: '#fff' }}>
                    <h2 style={{ fontSize: isMobile ? '1.35rem' : '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{sight.name}</h2>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>{sight.tagline}</p>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '1.75rem' }}>
                {/* Season & Highlights */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'hsl(var(--accent))', background: 'hsl(var(--muted))', borderRadius: '999px', padding: '0.3rem 0.8rem' }}>
                        📅 {sight.season}
                    </span>
                </div>

                {/* Description preview */}
                <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, fontSize: '0.925rem', marginBottom: '1.25rem' }}>
                    {sight.description.split('\n\n')[0]}
                </p>

                {/* Expand */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {sight.description.split('\n\n').slice(1).map((para, i) => (
                                <p key={i} style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, fontSize: '0.925rem', marginBottom: '1rem' }}>{para}</p>
                            ))}

                            {/* Highlights */}
                            <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>
                                <p style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'hsl(var(--muted-foreground))', marginBottom: '0.75rem' }}>Highlights</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {sight.highlights.map(h => (
                                        <span key={h} style={{
                                            background: 'hsl(var(--muted))', borderRadius: '999px',
                                            padding: '0.35rem 0.9rem', fontSize: '0.8rem', fontWeight: 600
                                        }}>✓ {h}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid hsl(var(--border))' }}>
                    <button
                        onClick={() => onToggle(isExpanded ? null : sight.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            color: 'hsl(var(--primary))', fontWeight: 700, fontSize: '0.875rem',
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0
                        }}
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                        <ChevronDown size={16} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </button>
                    <a href="/tours" style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'hsl(var(--primary))', color: '#fff',
                        padding: '0.6rem 1.25rem', borderRadius: '0.6rem',
                        fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none',
                        transition: 'opacity 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        View Tours <ArrowRight size={15} />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

const Sights = () => {
    const [expanded, setExpanded] = useState(null);
    const [videoReady, setVideoReady] = useState(false);
    const w = useWindowWidth();
    const isMobile = w < 600;

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Hero */}
            <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                {/* Poster image — shown until video ready */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.45)',
                    opacity: videoReady ? 0 : 1,
                    transition: 'opacity 0.7s ease',
                }} />

                {/* Background Video */}
                <video
                    autoPlay muted loop playsInline
                    onCanPlay={() => setVideoReady(true)}
                    style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.42)',
                        opacity: videoReady ? 1 : 0,
                        transition: 'opacity 0.8s ease',
                    }}
                >
                    <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>

                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 2 }} />

                <div className="container" style={{ position: 'relative', zIndex: 3, color: '#fff', paddingBottom: isMobile ? '2.5rem' : '6rem', width: '80%' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.3rem 1rem', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))', marginBottom: '1rem',
                        }}>
                            <MapPin size={13} /> {allSights.length} Popular Sights
                        </span>
                        <h1 style={{ fontSize: isMobile ? 'clamp(1.9rem, 8vw, 2.8rem)' : 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '0.75rem', lineHeight: 1.05 }}>
                            Discover Kyrgyzstan's
                            <br />
                            <span style={{ color: 'hsl(var(--secondary))' }}>Natural Wonders</span>
                        </h1>
                        <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', opacity: 0.8, maxWidth: '36rem', fontWeight: 300, lineHeight: 1.7 }}>
                            From turquoise alpine lakes to ancient Silk Road caravanserais — explore the soul of Central Asia.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sights Grid */}
            <section className="section container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: isMobile ? '1.5rem' : '2.5rem',
                }}>
                    {allSights.map((sight, index) => (
                        <SightCard
                            key={sight.id}
                            sight={sight}
                            index={index}
                            expanded={expanded}
                            onToggle={setExpanded}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: isMobile ? '4rem 0' : '6rem 0',
                background: 'hsl(var(--primary))',
                color: '#fff',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(var(--secondary))', display: 'block', marginBottom: '1rem' }}>
                            Let Us Help
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
                            Can't decide where to go?
                        </h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                            Our local experts will design the perfect itinerary based on your interests, fitness level, and travel dates.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="/tours" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '1rem 2.25rem', borderRadius: '0.75rem',
                                background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                            }}>
                                Browse All Tours <ArrowRight size={18} />
                            </a>
                            <a href="/#contact" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '1rem 2.25rem', borderRadius: '0.75rem',
                                background: 'rgba(255,255,255,0.1)', color: '#fff',
                                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}>
                                Contact Our Team
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Sights;
