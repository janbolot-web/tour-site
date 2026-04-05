import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTours } from '../context/TourStoreContext';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import img1 from '../assets/0I1A2081.jpg';
import img2 from '../assets/0I1A2101.jpg';
import img3 from '../assets/0I1A2145.jpg';
import img4 from '../assets/0I1A2153.jpg';
import img5 from '../assets/0I1A2168.jpg';
import img6 from '../assets/0I1A2245.jpg';
import img7 from '../assets/0I1A2271.jpg';
import img8 from '../assets/0I1A2335.jpg';
import img9 from '../assets/0I1A2355.jpg';
import img10 from '../assets/0I1A2366.jpg';
import img11 from '../assets/0I1A2400.jpg';
import img12 from '../assets/0I1A2422.jpg';
import img13 from '../assets/0I1A2425.jpg';
import img14 from '../assets/0I1A2426.jpg';
import img15 from '../assets/0I1A2441.jpg';
import img16 from '../assets/0I1A2448.jpg';
import img17 from '../assets/0I1A2488.jpg';
import img18 from '../assets/0I1A2495.jpg';
import img19 from '../assets/0I1A2523.jpg';
import img20 from '../assets/0I1A2560.jpg';
import img21 from '../assets/0I1A2617.jpg';
import img22 from '../assets/0I1A2630.jpg';
import img23 from '../assets/0I1A2652.jpg';
import img24 from '../assets/0I1A2674.jpg';
import img25 from '../assets/IMG_3530.jpg';
import img26 from '../assets/IMG_3542.jpg';
import img27 from '../assets/IMG_3567.jpg';
import img28 from '../assets/IMG_3571.jpg';
import img29 from '../assets/IMG_3574.jpg';
import img30 from '../assets/IMG_3578.jpg';
import img31 from '../assets/IMG_3593.jpg';
import img32 from '../assets/IMG_3781.jpg';
import img33 from '../assets/IMG_3813.jpg';
import img34 from '../assets/IMG_3903.jpg';
import img35 from '../assets/0I1A1778 (1).jpg';
import img36 from '../assets/0I1A1804.jpg';
import img37 from '../assets/0I1A1823.jpg';
import img38 from '../assets/0I1A1918.jpg';
import img39 from '../assets/0I1A1925.jpg';
import img40 from '../assets/0I1A1929.jpg';
import img41 from '../assets/0I1A2044.jpg';
import img42 from '../assets/0I1A2049.jpg';
const heroImg = img1;
const panoramaImg = img2;


// ─── Gallery items ────────────────────────────────────────────────────────────
const photos = [
    { id: 1,  src: img1,  caption: 'Kyrgyzstan highlands at golden hour', category: 'Landscapes', span: 'wide' },
    { id: 2,  src: img35, caption: 'Alpine lake of Kel-Suu, narrow gorge entrance', category: 'Lakes' },
    { id: 3,  src: img32, caption: 'Song-Kol Lake — summer yurt camp', category: 'Lakes' },
    { id: 4,  src: img21, caption: 'Horseback riding through the valley', category: 'Horse Riding', span: 'tall' },
    { id: 5,  src: img22, caption: 'Riders descending from mountain pass', category: 'Horse Riding' },
    { id: 6,  src: img36, caption: 'Turquoise waters of Kel-Suu canyon lake', category: 'Lakes', span: 'wide' },
    { id: 7,  src: img37, caption: 'Sheer canyon walls at Kel-Suu gorge', category: 'Landscapes' },
    { id: 8,  src: img2,  caption: 'Tien Shan mountain panorama', category: 'Landscapes' },
    { id: 9,  src: img3,  caption: 'Nomadic life on the summer pastures', category: 'Nomadic Life' },
    { id: 10, src: img4,  caption: 'Traditional yurt interior', category: 'Nomadic Life' },
    { id: 11, src: img5,  caption: 'Eagle hunter in traditional dress', category: 'Culture' },
    { id: 12, src: img6,  caption: 'Tash-Rabat caravanserai stone entrance', category: 'Culture', span: 'wide' },
    { id: 13, src: img7,  caption: 'Tash-Rabat surrounding landscape', category: 'Landscapes' },
    { id: 14, src: img8,  caption: 'Mountain stream in the valley', category: 'Landscapes' },
    { id: 15, src: img9,  caption: 'Altyn-Arashan valley views', category: 'Landscapes' },
    { id: 16, src: img10, caption: 'High-altitude glacier scenery', category: 'Landscapes', span: 'tall' },
    { id: 17, src: img11, caption: 'Trek through alpine meadows', category: 'Nomadic Life' },
    { id: 18, src: img38, caption: 'Early morning at the mountain lake', category: 'Lakes' },
    { id: 19, src: img39, caption: 'Sunset over the Tian Shan peaks', category: 'Landscapes', span: 'wide' },
    { id: 20, src: img40, caption: 'Nomadic shepherds with their herd', category: 'Nomadic Life' },
    { id: 21, src: img41, caption: 'Traditional Kyrgyz cuisine preparation', category: 'Culture' },
    { id: 22, src: img42, caption: 'Kochkor village in the valley', category: 'Culture' },
    { id: 23, src: img12, caption: 'Local guide on the trail', category: 'Culture' },
    { id: 24, src: img13, caption: 'Group trekking to Kel-Suu', category: 'Horse Riding' },
    { id: 25, src: img14, caption: 'Kel-Suu boat crossing', category: 'Lakes', span: 'wide' },
    { id: 26, src: img15, caption: 'Riders at Song-Kol sunrise', category: 'Horse Riding' },
    { id: 27, src: img16, caption: 'Wildflowers of Altyn-Arashan valley', category: 'Landscapes' },
    { id: 28, src: img17, caption: 'Mountain pass crossing at twilight', category: 'Nomadic Life' },
    { id: 29, src: img18, caption: 'Kyrgyz children welcoming travelers', category: 'Culture' },
    { id: 30, src: img33, caption: 'Song-Kol camp at dusk', category: 'Nomadic Life', span: 'tall' },
    { id: 31, src: img34, caption: 'Fairy-Tale Canyons of south Ysyk-Kol', category: 'Landscapes' },
    { id: 32, src: img23, caption: 'Hot springs of Altyn-Arashan', category: 'Landscapes' },
    { id: 33, src: img24, caption: 'Mountain guide on the trail', category: 'Culture' },
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
    const { allTours } = useTours();

    const combinedPhotos = React.useMemo(() => {
        const dynamicPhotos = [];
        let idCounter = photos.length + 1;
        
        allTours.forEach(tour => {
            if (tour.images && tour.images.length > 0) {
                tour.images.forEach((url, i) => {
                    dynamicPhotos.push({
                        id: idCounter++,
                        src: url,
                        caption: i === 0 ? `${tour.title} (Cover)` : `${tour.title}`,
                        category: tour.category || 'Landscapes',
                        span: i % 4 === 0 ? 'wide' : undefined,
                    });
                });
            }
        });
        
        return [...photos, ...dynamicPhotos];
    }, [allTours]);

    const filtered = filter === 'All' ? combinedPhotos : combinedPhotos.filter(p => p.category === filter);

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
                            📷 {combinedPhotos.length} Photos
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
                            {cat} {cat !== 'All' ? `(${combinedPhotos.filter(p => p.category === cat).length})` : `(${combinedPhotos.length})`}
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
