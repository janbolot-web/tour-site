import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';
import horseImg from '../assets/kyrgyzstan_horse_riding_tour_1772534860001.png';
import lakeImg from '../assets/kyrgyzstan_lake_tour_1772535567087.png';
import panoramaImg from '../assets/kyrgyzstan_mountain_panorama_1772534959492.png';

// ─── Gallery items ────────────────────────────────────────────────────────────
const photos = [
    { id: 1, src: heroImg, caption: 'Kyrgyzstan highlands at golden hour', category: 'Landscapes', span: 'wide' },
    { id: 2, src: horseImg, caption: 'Horseback riding to Song-Kol Lake', category: 'Horse Riding' },
    { id: 3, src: lakeImg, caption: 'Turquoise waters of Kel-Suu Lake', category: 'Lakes' },
    { id: 4, src: panoramaImg, caption: 'Tien Shan mountain panorama', category: 'Landscapes', span: 'tall' },
    { id: 5, src: horseImg, caption: 'Nomadic riders crossing the valley', category: 'Horse Riding', span: 'wide' },
    { id: 6, src: heroImg, caption: 'Village life in Kochkor valley', category: 'Culture' },
    { id: 7, src: lakeImg, caption: 'Yurt camp by the alpine lake', category: 'Nomadic Life' },
    { id: 8, src: panoramaImg, caption: 'High-altitude pass at 3,600 m', category: 'Landscapes' },
    { id: 9, src: horseImg, caption: 'Sunrise over Song-Kol Lake', category: 'Lakes' },
    { id: 10, src: heroImg, caption: 'Eagle hunter in traditional dress', category: 'Culture' },
    { id: 11, src: lakeImg, caption: 'Kyrgyz horsemen at full gallop', category: 'Horse Riding', span: 'wide' },
    { id: 12, src: panoramaImg, caption: 'Fairy-Tale Canyons, south Ysyk-Kol', category: 'Landscapes' },
];

const CATEGORIES = ['All', 'Landscapes', 'Horse Riding', 'Lakes', 'Nomadic Life', 'Culture'];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ photos, index, onClose }) {
    const [current, setCurrent] = useState(index);
    const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
    const next = () => setCurrent(i => (i + 1) % photos.length);

    // Keyboard nav
    React.useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const photo = photos[current];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 2000,
                background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '2rem',
            }}
        >
            {/* Close */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', borderRadius: '50%', width: '44px', height: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                <X size={20} />
            </button>

            {/* Prev */}
            <button
                onClick={e => { e.stopPropagation(); prev(); }}
                style={{
                    position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
            >
                <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '1000px', width: '100%', textAlign: 'center' }}
            >
                <img
                    src={photo.src}
                    alt={photo.caption}
                    style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '1rem' }}
                />
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem', fontSize: '1rem', fontWeight: 500 }}>
                    {photo.caption}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {current + 1} / {photos.length}
                </p>
            </motion.div>

            {/* Next */}
            <button
                onClick={e => { e.stopPropagation(); next(); }}
                style={{
                    position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
            >
                <ChevronRight size={22} />
            </button>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filtered = filter === 'All' ? photos : photos.filter(p => p.category === filter);

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
            {/* Hero */}

            <section style={{ position: 'relative', height: '45vh', minHeight: '320px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${panoramaImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45)' }} />
                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0 }} />
                <div className="container" style={{ position: 'relative', zIndex: 2, color: '#fff', paddingBottom: '6rem', width: '80%' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{
                            display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)', fontSize: '0.75rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))', marginBottom: '1.25rem',
                        }}>
                            📷 {photos.length} Photos
                        </span>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                            Photo <span style={{ color: 'hsl(var(--secondary))' }}>Gallery</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '32rem', fontWeight: 300, marginTop: '0.75rem' }}>
                            Moments from our tours across the mountains, lakes, and steppes of Kyrgyzstan.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter chips */}
            <div style={{ background: '#fff', borderBottom: '1px solid hsl(var(--border))', position: 'sticky', top: '72px', zIndex: 100 }}>
                <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.45rem 1.1rem', borderRadius: '999px', cursor: 'pointer', fontFamily: 'inherit',
                                fontWeight: 700, fontSize: '0.82rem', border: '1.5px solid',
                                transition: 'all 0.2s',
                                background: filter === cat ? 'hsl(var(--primary))' : 'transparent',
                                color: filter === cat ? '#fff' : 'hsl(var(--muted-foreground))',
                                borderColor: filter === cat ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                            }}
                        >
                            {cat} {cat !== 'All' ? `(${photos.filter(p => p.category === cat).length})` : `(${photos.length})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <section style={{ padding: '3rem 0 6rem' }}>
                <div className="container">
                    <div style={{
                        columns: '3 280px', columnGap: '1.25rem',
                    }}>
                        {filtered.map((photo, idx) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: Math.min(idx, 5) * 0.06 }}
                                onClick={() => setLightboxIndex(idx)}
                                style={{
                                    position: 'relative', breakInside: 'avoid', marginBottom: '1.25rem',
                                    borderRadius: '1.25rem', overflow: 'hidden', cursor: 'zoom-in',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    aspectRatio: photo.span === 'wide' ? '16/9' : photo.span === 'tall' ? '3/4' : '4/3',
                                }}
                                className="gallery-card"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.caption}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                />
                                {/* Hover overlay */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
                                    opacity: 0, transition: 'opacity 0.3s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                                >
                                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', color: '#fff' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'hsl(var(--secondary))', marginBottom: '0.2rem' }}>{photo.category}</div>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{photo.caption}</div>
                                            </div>
                                            <ZoomIn size={22} style={{ opacity: 0.8, flexShrink: 0, marginLeft: '0.75rem' }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem', color: 'hsl(var(--muted-foreground))' }}>
                            No photos in this category.
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        photos={filtered}
                        index={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
