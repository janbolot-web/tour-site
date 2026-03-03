import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X, Clock, Calendar, Play } from 'lucide-react';
import TourCard from '../components/TourCard';
import { toursData } from '../data';
import heroImg from '../assets/kyrgyzstan_mountain_panorama_1772534959492.png';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const CATEGORIES = ['All Categories', 'Horse Riding', 'Road Trip', 'Combined', 'Hiking', 'Winter Tours'];
const DURATIONS = ['Any Duration', '1–3 Days', '4–5 Days', '6–7 Days', '8+ Days'];
const SPEEDS = ['Any Speed', 'Easy', 'Moderate', 'Active'];

function durationLabel(days) {
    if (days <= 3) return '1–3 Days';
    if (days <= 5) return '4–5 Days';
    if (days <= 7) return '6–7 Days';
    return '8+ Days';
}

function Select({ label, options, value, onChange, fullWidth }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="select-wrapper" style={{ width: fullWidth ? '100%' : 'auto' }}>
            <button
                onClick={() => setOpen(!open)}
                className="select-btn"
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: '#fff', border: '1.5px solid hsl(var(--border))',
                    borderRadius: '0.75rem', padding: '0.7rem 1.1rem',
                    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                    width: fullWidth ? '100%' : 'auto',
                    minWidth: fullWidth ? undefined : '160px',
                    justifyContent: 'space-between', whiteSpace: 'nowrap',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: open ? '0 0 0 3px hsl(var(--secondary)/0.18)' : 'none',
                    borderColor: open ? 'hsl(var(--secondary))' : 'hsl(var(--border))',
                    fontFamily: 'inherit',
                }}
            >
                <span style={{ color: value === options[0] ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))' }}>
                    {value}
                </span>
                <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'hsl(var(--muted-foreground))', flexShrink: 0 }} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        style={{
                            position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 100,
                            background: '#fff', border: '1.5px solid hsl(var(--border))',
                            borderRadius: '0.75rem', padding: '0.35rem',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.12)', minWidth: '100%',
                        }}
                    >
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setOpen(false); }}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '0.6rem 1rem', borderRadius: '0.5rem',
                                    background: value === opt ? 'hsl(var(--muted))' : 'none',
                                    fontWeight: value === opt ? 700 : 500,
                                    fontSize: '0.875rem', cursor: 'pointer', border: 'none',
                                    color: value === opt ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                                    fontFamily: 'inherit',
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


const Tours = ({ onBookNow }) => {
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [duration, setDuration] = useState(DURATIONS[0]);
    const [month, setMonth] = useState('Any Month');
    const [speed, setSpeed] = useState(SPEEDS[0]);
    const [search, setSearch] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 900;

    const filteredTours = toursData.filter(tour => {
        if (category !== CATEGORIES[0] && tour.category !== category) return false;
        if (duration !== DURATIONS[0] && durationLabel(tour.durationDays) !== duration) return false;
        if (month !== 'Any Month') {
            const idx = MONTHS.indexOf(month) + 1;
            if (!tour.months.includes(idx)) return false;
        }
        if (speed !== SPEEDS[0] && tour.speed !== speed) return false;
        if (search && !tour.title.toLowerCase().includes(search.toLowerCase()) && !tour.description.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const hasFilters = category !== CATEGORIES[0] || duration !== DURATIONS[0] || month !== 'Any Month' || speed !== SPEEDS[0] || search;

    function clearAll() {
        setCategory(CATEGORIES[0]);
        setDuration(DURATIONS[0]);
        setMonth('Any Month');
        setSpeed(SPEEDS[0]);
        setSearch('');
    }

    return (
        <div style={{ paddingTop: '5rem' }}>
            {/* ── Video Hero ── */}
            <section style={{ position: 'relative', height: isMobile ? '55vh' : '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.48)'
                }} />
                <div className="bg-gradient-hero" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

                {/* Play Video Button */}
                <button
                    onClick={() => setShowVideo(true)}
                    style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10, background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.4)',
                        borderRadius: '50%',
                        width: isMobile ? '60px' : '80px',
                        height: isMobile ? '60px' : '80px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'transform 0.3s, background 0.3s',
                        color: '#fff',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                    <Play size={isMobile ? 22 : 30} fill="white" />
                </button>

                <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: isMobile ? '2rem' : '3rem', color: '#fff' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{
                            display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '999px',
                            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(6px)', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: 'hsl(var(--secondary))', marginBottom: '1rem',
                        }}>
                            {toursData.length} Tours Available
                        </span>
                        <h1 style={{
                            fontSize: isMobile ? 'clamp(1.9rem, 8vw, 2.8rem)' : 'clamp(2.5rem, 6vw, 5.5rem)',
                            fontWeight: 900, letterSpacing: '-0.04em',
                            marginBottom: '0.6rem', lineHeight: 1.05
                        }}>
                            Explore Kyrgyzstan <br />
                            <span style={{ color: 'hsl(var(--secondary))' }}>with Us</span>
                        </h1>
                        {!isMobile && (
                            <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '36rem', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.7 }}>
                                Choose a tour or create your own custom itinerary with our local experts.
                            </p>
                        )}
                        <button
                            onClick={onBookNow}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2rem',
                                borderRadius: '0.75rem',
                                background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                                fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1rem',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            }}
                        >
                            ✦ Create Your Tour
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── Video Modal ── */}
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowVideo(false)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.9)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', padding: '1rem',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
                            onClick={e => e.stopPropagation()}
                            style={{ width: '100%', maxWidth: '900px', aspectRatio: '16/9', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}
                        >
                            <iframe
                                width="100%" height="100%"
                                src="https://www.youtube.com/embed/o6QQ1YEH6U0?si=yWu0CSa56oEwWSOI?autoplay=1"
                                title="Kyrgyz Riders Travel Video"
                                allow="autoplay; fullscreen"
                                style={{ border: 'none' }}
                            />
                            <button
                                onClick={() => setShowVideo(false)}
                                style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
                                    width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: '#fff',
                                }}
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Filters ── */}
            <div style={{
                position: 'sticky', top: '80px', zIndex: 50,
                background: '#fff', borderBottom: '1px solid hsl(var(--border))',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
                <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>

                    {/* Mobile: search + toggle button */}
                    {isMobile ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {/* Search row */}
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Search size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
                                    <input
                                        type="text"
                                        placeholder="Search tours..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        style={{
                                            width: '100%', paddingLeft: '2.5rem', paddingRight: search ? '2.25rem' : '0.9rem',
                                            paddingTop: '0.65rem', paddingBottom: '0.65rem',
                                            border: '1.5px solid hsl(var(--border))', borderRadius: '0.75rem',
                                            fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit',
                                            boxSizing: 'border-box',
                                        }}
                                    />
                                    {search && (
                                        <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))' }}><X size={13} /></button>
                                    )}
                                </div>
                                <button
                                    onClick={() => setFiltersOpen(v => !v)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        padding: '0.65rem 1rem', borderRadius: '0.75rem',
                                        border: `1.5px solid ${filtersOpen ? 'hsl(var(--secondary))' : 'hsl(var(--border))'}`,
                                        background: filtersOpen ? 'hsl(var(--secondary)/0.08)' : '#fff',
                                        fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                                        color: filtersOpen ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                                        whiteSpace: 'nowrap', flexShrink: 0,
                                    }}
                                >
                                    Filters {hasFilters ? `(${[category !== CATEGORIES[0], duration !== DURATIONS[0], month !== 'Any Month', speed !== SPEEDS[0]].filter(Boolean).length})` : ''}
                                    <ChevronDown size={14} style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                </button>
                            </div>

                            {/* Expandable filter grid on mobile */}
                            <AnimatePresence>
                                {filtersOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', paddingBottom: '0.25rem' }}>
                                            <div style={{ position: 'relative' }}>
                                                <Select label="Category" options={CATEGORIES} value={category} onChange={setCategory} fullWidth />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <Select label="Duration" options={DURATIONS} value={duration} onChange={setDuration} fullWidth />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <Select label="Month" options={['Any Month', ...MONTHS]} value={month} onChange={setMonth} fullWidth />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <Select label="Tour Speed" options={SPEEDS} value={speed} onChange={setSpeed} fullWidth />
                                            </div>
                                        </div>
                                        {hasFilters && (
                                            <button onClick={clearAll} style={{
                                                marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                                                color: 'hsl(var(--muted-foreground))', background: 'none', border: 'none',
                                                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: '0.25rem 0',
                                                fontFamily: 'inherit',
                                            }}>
                                                <X size={13} /> Clear all filters
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        /* Desktop: original row */
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem' }}>
                            <div style={{ position: 'relative' }}>
                                <Select label="Category" options={CATEGORIES} value={category} onChange={setCategory} />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Select label="Duration" options={DURATIONS} value={duration} onChange={setDuration} />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Select label="Month" options={['Any Month', ...MONTHS]} value={month} onChange={setMonth} />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Select label="Tour Speed" options={SPEEDS} value={speed} onChange={setSpeed} />
                            </div>

                            <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                                <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
                                <input
                                    type="text"
                                    placeholder="Search tours..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    style={{
                                        width: '100%', paddingLeft: '2.75rem', paddingRight: search ? '2.5rem' : '1rem',
                                        paddingTop: '0.7rem', paddingBottom: '0.7rem',
                                        border: '1.5px solid hsl(var(--border))', borderRadius: '0.75rem',
                                        fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
                                        transition: 'border-color 0.2s', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'hsl(var(--secondary))'}
                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} style={{
                                        position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--muted-foreground))'
                                    }}><X size={14} /></button>
                                )}
                            </div>

                            {hasFilters && (
                                <button onClick={clearAll} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                    color: 'hsl(var(--muted-foreground))', background: 'none', border: 'none',
                                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
                                    transition: 'color 0.2s', padding: '0.5rem', fontFamily: 'inherit',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--primary))'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--muted-foreground))'}
                                >
                                    <X size={14} /> Clear all
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Tours Listing ── */}
            <section className="section container">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: isMobile ? '1.35rem' : '1.75rem', fontWeight: 800 }}>
                        {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'}
                    </h2>
                    {hasFilters && (
                        <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem' }}>
                            matching your filters
                        </span>
                    )}
                </div>

                {filteredTours.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                        gap: isMobile ? '1.25rem' : '2rem',
                    }}>
                        {filteredTours.map((tour, index) => (
                            <motion.div
                                key={tour.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index, 5) * 0.06 }}
                                style={{ height: '100%' }}
                            >
                                <TourCard {...tour} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{
                            textAlign: 'center', padding: isMobile ? '4rem 1.5rem' : '8rem 2rem',
                            background: 'hsl(var(--muted)/0.2)', borderRadius: '2rem',
                            border: '2px dashed hsl(var(--border))',
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>🏔️</div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>No tours found</h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Try different filters or clear your search.</p>
                        <button onClick={clearAll} className="btn btn-primary">Clear All Filters</button>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default Tours;
