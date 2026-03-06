import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, Users, MapPin, ArrowLeft, Check, ChevronDown, ChevronUp, Send, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toursData } from '../data';
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';
import horseImg from '../assets/kyrgyzstan_horse_riding_tour_1772534860001.png';
import lakeImg from '../assets/kyrgyzstan_lake_tour_1772535567087.png';
import panoramaImg from '../assets/kyrgyzstan_mountain_panorama_1772534959492.png';

const WHATSAPP_NUMBER = '996705660593';

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

// ─── Packing list ─────────────────────────────────────────────────────────────
const packingList = [
    'Warm layers (fleece or down jacket)',
    'Waterproof and windproof jacket',
    'Hat or cap for sun protection',
    'Comfortable trekking boots',
    'Long pants for riding / trekking',
    'Sunglasses and sunscreen (SPF 50+)',
    'Reusable water bottle',
    'Small daypack for essentials',
    'Basic first aid kit & personal medications',
    'Camera or smartphone',
    'Power bank and charging cables',
    'Passport and copies of travel documents',
];

// ─── Before You Go ────────────────────────────────────────────────────────────
const beforeYouGo = [
    { title: 'Meals', body: 'All meals provided are traditional Central Asian cuisine. Vegetarian options available — inform your guide in advance.' },
    { title: 'Money & Payments', body: 'Cards accepted in towns. Carry some Kyrgyz Som for small expenses. ≈ $10/day for personal spending is usually sufficient.' },
    { title: 'Internet', body: 'Available in cities, may be limited in remote mountain areas. Consider a local MEGACOM SIM card.' },
    { title: 'Electricity', body: 'Kyrgyzstan uses 220V / Type C & F (European-style round plugs). Bring adapters if needed.' },
    { title: 'Languages', body: 'Official languages: Kyrgyz and Russian. Basic English spoken in cities. Your guide speaks English throughout the tour.' },
    { title: 'Health & Safety', body: 'Travel insurance covering medical emergencies and adventure activities is strongly recommended.' },
];

// ─── Day card ─────────────────────────────────────────────────────────────────
function DayCard({ day, title, description, meals, overnight, index }) {
    const [open, setOpen] = useState(index === 0);
    return (
        <div style={{ borderRadius: '1.25rem', border: '1.5px solid hsl(var(--border))', overflow: 'hidden', background: '#fff' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1.1rem 1.25rem', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                }}
            >
                <span style={{
                    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                    background: 'hsl(var(--primary))', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800,
                }}>
                    {day}
                </span>
                <span style={{ flex: 1, fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>{title}</span>
                {open ? <ChevronUp size={16} style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0 }} />}
            </button>
            {open && (
                <div style={{ borderTop: '1.5px solid hsl(var(--border))', padding: '1rem 1.25rem 1.25rem' }}>
                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {meals && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'hsl(var(--muted))', borderRadius: '999px', padding: '0.3rem 0.85rem', fontSize: '0.75rem', fontWeight: 600 }}>
                                🍽 {meals}
                            </span>
                        )}
                        {overnight && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'hsl(var(--muted))', borderRadius: '999px', padding: '0.3rem 0.85rem', fontSize: '0.75rem', fontWeight: 600 }}>
                                🏠 {overnight}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Default itinerary generator ─────────────────────────────────────────────
function getDefaultItinerary(tour) {
    const days = [];
    for (let i = 1; i <= Math.min(tour.durationDays || 3, 8); i++) {
        days.push({
            day: i,
            title: i === 1 ? 'Arrival & Transfer' : i === tour.durationDays ? 'Return & Departure' : `Day ${i} — Exploration`,
            description: i === 1
                ? 'Arrive in Bishkek and transfer to your first accommodation. Meet your guide and receive a full briefing on the days ahead.'
                : i === tour.durationDays
                    ? 'After breakfast, transfer back to Bishkek. Your driver will take you to your hotel or the airport. Safe travels!'
                    : 'Continue your adventure through spectacular mountain landscapes. Experience the authentic nomadic culture along the way.',
            meals: i === 1 ? 'Dinner' : i === tour.durationDays ? 'Breakfast' : 'Breakfast, Lunch, Dinner',
            overnight: i === tour.durationDays ? 'Departure' : i % 2 === 0 ? 'Yurt camp' : 'Guesthouse',
        });
    }
    return days;
}

const elenaItinerary = [
    { day: 1, title: 'Bishkek → Kyzyl-Oi Village', description: 'Scenic drive from Bishkek through the Too-Ashuu Pass (3,600m). Stop for a panoramic view and a picnic lunch by the river. Arrive in Kyzyl-Oi Village, settle into a guesthouse, and take a guided walk through the village.', meals: 'Lunch-picnic, Dinner', overnight: 'Guesthouse' },
    { day: 2, title: 'Kyzyl-Oi → Kyzart → Song-Kol Lake (horseback)', description: 'Drive to Kyzart Village then mount up! Ride through open fields toward the Uzbek-Ashuu Pass (3,300m). First views of Song-Kol Lake appear from the summit. Descend to the lakeshore and settle into a nomadic yurt camp.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Yurt (3,100m)' },
    { day: 3, title: 'Song-Kol Lake → Bokonbaev (horseback)', description: 'Return to Kyzart via the Kara-Kiya Pass, then drive along the beautiful south shore of Ysyk-Kol Lake. Evening arrival in Bokonbaev Village.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Guesthouse' },
    { day: 4, title: 'Eagle Hunting · Fairy-Tale Canyons · Karakol', description: 'Eagle hunting demonstration by a local hunter. Drive to the Fairy-Tale Canyons, stop at the Barskoon Waterfall, and explore the Jety-Oguz Valley. Evening arrival in Karakol.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Hotel' },
    { day: 5, title: 'Trek to Altyn-Arashan Gorge', description: 'Drive to Ak-Suu Village. Trek 12 km through lush alpine forest to Altyn-Arashan Gorge. Picnic by the river. Arrive at the guesthouse and soak in the natural hot springs.', meals: 'Breakfast, Lunch-picnic, Dinner', overnight: 'Guesthouse (hot springs)' },
    { day: 6, title: 'Altyn-Arashan → Chong-Kemin', description: 'Trek back to Ak-Suu Village, then drive along the north shore of Ysyk-Kol past Cholpon-Ata and Balykchy to Chong-Kemin National Park.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Guesthouse (Chong-Kemin)' },
    { day: 7, title: 'Chong-Kemin → Bishkek (departure)', description: 'Final morning in the mountains. Transfer back to Bishkek. Your driver drops you at your hotel or the airport. Safe travels!', meals: 'Breakfast', overnight: 'Departure' },
];

const itineraryMap = { 'elena-taber-7': elenaItinerary };

// ─── Gallery data per category ────────────────────────────────────────────────
const categoryGalleries = {
    'Horse Riding': [
        { src: horseImg, caption: 'Horseback riding to Song-Kol Lake' },
        { src: heroImg, caption: 'Mountain trail at dawn' },
        { src: panoramaImg, caption: 'Crossing the Uzbek-Ashuu Pass (3,300m)' },
        { src: lakeImg, caption: 'Yurt camp by the lakeshore' },
        { src: horseImg, caption: 'Nomadic horsemen in full gallop' },
        { src: heroImg, caption: 'Evening light over the valley' },
    ],
    'Road Trip': [
        { src: heroImg, caption: 'Open road through the Kyrgyz steppe' },
        { src: lakeImg, caption: 'South shore of Ysyk-Kol Lake' },
        { src: panoramaImg, caption: 'Fairy-Tale Canyons panorama' },
        { src: horseImg, caption: 'Barskoon Waterfall stop' },
        { src: lakeImg, caption: 'Kel-Suu turquoise waters' },
        { src: heroImg, caption: 'Sunset over the Chong-Kemin valley' },
    ],
    'Combined': [
        { src: horseImg, caption: 'Horseback riding in mountain meadows' },
        { src: lakeImg, caption: 'Song-Kol Lake at sunrise' },
        { src: panoramaImg, caption: 'High mountain panorama' },
        { src: heroImg, caption: 'Trek through Altyn-Arashan gorge' },
        { src: horseImg, caption: 'Eagle hunting demonstration' },
        { src: lakeImg, caption: 'Natural hot springs at Altyn-Arashan' },
    ],
    'Hiking': [
        { src: panoramaImg, caption: 'Tien Shan high-altitude ridgeline' },
        { src: heroImg, caption: 'Alpine meadow trekking trail' },
        { src: lakeImg, caption: 'Crystal-clear glacial river crossing' },
        { src: panoramaImg, caption: 'Glacier viewpoint at 4,000m' },
        { src: horseImg, caption: 'Campsite at base of peak' },
        { src: heroImg, caption: 'Morning mist in the valley' },
    ],
    'Winter Tours': [
        { src: panoramaImg, caption: 'Snow-covered Song-Kol plateau' },
        { src: horseImg, caption: 'Winter horseback ride through frozen steppe' },
        { src: heroImg, caption: 'Yurt camp under winter stars' },
        { src: panoramaImg, caption: 'Icy mountain pass crossing' },
        { src: lakeImg, caption: 'Frozen lake at sunrise' },
        { src: horseImg, caption: 'Eagle hunting on horseback in winter' },
    ],
};
const defaultGallery = [
    { src: heroImg, caption: 'Kyrgyzstan highland scenery' },
    { src: horseImg, caption: 'Horseback riding adventures' },
    { src: lakeImg, caption: 'Alpine lake landscapes' },
    { src: panoramaImg, caption: 'Mountain panoramas' },
];

function getTourGallery(tour) {
    if (tour.id === 'elena-taber-7') return [
        { src: horseImg, caption: 'Horseback riding to Song-Kol Lake' },
        { src: lakeImg, caption: 'Song-Kol Lake at sunset' },
        { src: heroImg, caption: 'Too-Ashuu Pass (3,600m)' },
        { src: panoramaImg, caption: 'Fairy-Tale Canyons' },
        { src: horseImg, caption: 'Eagle hunting demonstration' },
        { src: lakeImg, caption: 'Natural hot springs, Altyn-Arashan' },
    ];
    return categoryGalleries[tour.category] || defaultGallery;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function TourLightbox({ photos, index, onClose }) {
    const [current, setCurrent] = useState(index);
    const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
    const next = () => setCurrent(i => (i + 1) % photos.length);
    useEffect(() => {
        const h = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, []);
    const photo = photos[current];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={18} /></button>
            <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
            <motion.div key={current} initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '0.75rem' }} />
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.75rem', fontSize: '0.95rem', fontWeight: 500 }}>{photo.caption}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{current + 1} / {photos.length}</p>
            </motion.div>
            <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={20} /></button>
        </motion.div>
    );
}

// ─── Sidebar card (reused on both desktop and mobile) ─────────────────────────
function SidebarCard({ tour, onBookNow, sendWhatsApp, isMobile }) {
    return (
        <div style={{ background: '#fff', borderRadius: '1.5rem', padding: isMobile ? '1.25rem' : '2rem', boxShadow: '0 8px 48px rgba(0,0,0,0.09)', border: '1px solid hsl(var(--border))' }}>
            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 900, color: 'hsl(var(--primary))' }}>{tour.price}</div>
                <div style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>per person</div>
            </div>

            {/* Meta grid */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: isMobile ? '0.6rem' : '0.75rem', marginBottom: '1.5rem' }}>
                {[
                    { icon: <Clock size={15} />, label: 'Duration', value: tour.duration },
                    { icon: <Calendar size={15} />, label: 'Season', value: tour.season },
                    { icon: <MapPin size={15} />, label: 'Start / End', value: 'Bishkek' },
                    { icon: <Users size={15} />, label: 'Group size', value: '1 – 8 people' },
                ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', background: isMobile ? 'hsl(var(--muted)/0.5)' : 'none', borderRadius: isMobile ? '0.6rem' : 0, padding: isMobile ? '0.5rem 0.75rem' : '0.25rem 0', border: isMobile ? 'none' : 'none' }}>
                        <span style={{ color: 'hsl(var(--secondary))', flexShrink: 0 }}>{item.icon}</span>
                        {!isMobile && <span style={{ color: 'hsl(var(--muted-foreground))', flex: 1 }}>{item.label}</span>}
                        <span style={{ fontWeight: 700 }}>{item.value}</span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <button
                onClick={onBookNow}
                style={{
                    width: '100%', padding: '0.9rem', borderRadius: '0.85rem',
                    background: 'hsl(var(--primary))', color: '#fff',
                    fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', marginBottom: '0.6rem', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
                Book This Tour
            </button>

            <button
                onClick={sendWhatsApp}
                style={{
                    width: '100%', padding: '0.9rem', borderRadius: '0.85rem',
                    background: '#25D366', color: '#fff',
                    fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
                <Send size={16} /> Ask via WhatsApp
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.9rem', lineHeight: 1.5 }}>
                Free cancellation up to 14 days before the tour
            </p>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TourDetail = ({ onBookNow }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('description');
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    const tour = toursData.find(t => t.id === id);

    if (!tour) {
        return (
            <div style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Tour not found</h2>
                <Link to="/tours" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>← Back to all tours</Link>
            </div>
        );
    }

    const itinerary = itineraryMap[tour.id] || getDefaultItinerary(tour);
    const tourGallery = getTourGallery(tour);
    const highlights = tour.highlights || [
        'Local Kyrgyz guides born in the mountains',
        'Small groups — maximum 8 people',
        'Authentic nomadic yurt accommodation',
        'All meals included (traditional cuisine)',
        'Flexible, customizable itinerary',
        'Transfer from/to Bishkek included',
    ];

    const sendWhatsApp = () => {
        const text = `👋 Hi! I'd like to book the tour:\n🏔 *${tour.title}* (${tour.duration})\n💰 Price: ${tour.price}\n📅 Please tell me about available dates.`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    };

    const tabs = [
        { id: 'description', label: isMobile ? 'Description' : 'Description' },
        { id: 'gallery', label: isMobile ? `Gallery (${tourGallery.length})` : `Gallery (${tourGallery.length})` },
        { id: 'packing', label: isMobile ? 'Packing' : 'What to Pack?' },
        { id: 'beforeyougo', label: isMobile ? 'Tips' : 'Before You Go' },
    ];

    return (
        <div style={{ paddingTop: '80px', background: '#fafaf9', minHeight: '100vh', paddingBottom: isMobile ? '80px' : 0 }}>

            {/* ── Hero ── */}
            <div style={{ position: 'relative', height: isMobile ? '45vh' : '60vh', minHeight: isMobile ? '280px' : '380px', overflow: 'hidden' }}>
                <img src={tour.image} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />

                {/* Back button */}
                <button
                    onClick={() => navigate('/tours')}
                    style={{
                        position: 'absolute', top: '1.25rem', left: '1.25rem',
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                        borderRadius: '0.75rem', padding: '0.45rem 0.85rem',
                        fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                >
                    <ArrowLeft size={14} /> All Tours
                </button>

                {/* Hero text */}
                <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: isMobile ? '1.5rem' : '2.5rem', paddingLeft: isMobile ? '1.25rem' : '1.5rem', paddingRight: isMobile ? '1.25rem' : '1.5rem', color: '#fff', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{ background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {tour.category}
                        </span>
                        <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 600 }}>
                            {tour.duration}
                        </span>
                        <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 600 }}>
                            {tour.season}
                        </span>
                    </div>
                    <h1 style={{ fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.2rem)' : 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                        {tour.title}
                    </h1>
                </div>
            </div>

            {/* ── Content + Sidebar ── */}
            <div className="container" style={{ paddingTop: isMobile ? '1.5rem' : '3rem', paddingBottom: isMobile ? '1.5rem' : '5rem', paddingLeft: isMobile ? '1.25rem' : '1.5rem', paddingRight: isMobile ? '1.25rem' : '1.5rem', boxSizing: 'border-box' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isTablet ? '1fr' : '1fr 340px',
                    gap: isTablet ? '2rem' : '3rem',
                    alignItems: 'start',
                }}>

                    {/* ── Left: Main Content ── */}
                    <div>
                        {/* Tabs — horizontal scroll on mobile */}
                        <div style={{
                            display: 'flex',
                            gap: '0',
                            borderBottom: '2px solid hsl(var(--border))',
                            marginBottom: isMobile ? '1.5rem' : '2.5rem',
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                        }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.25rem',
                                        fontFamily: 'inherit', cursor: 'pointer',
                                        fontWeight: 700,
                                        fontSize: isMobile ? '0.8rem' : '0.875rem',
                                        border: 'none', background: 'none',
                                        borderBottom: activeTab === tab.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                                        color: activeTab === tab.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                                        marginBottom: '-2px',
                                        transition: 'color 0.2s',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab: Description */}
                        {activeTab === 'description' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <p style={{ fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.8, color: 'hsl(var(--muted-foreground))', marginBottom: '2rem' }}>
                                    {tour.description}
                                </p>

                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Tour Highlights</h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                    gap: '0.65rem', marginBottom: '2.5rem'
                                }}>
                                    {highlights.map(h => (
                                        <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                            <Check size={15} style={{ color: '#22c55e', marginTop: '0.15rem', flexShrink: 0 }} />
                                            {h}
                                        </div>
                                    ))}
                                </div>

                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Day by Day Itinerary</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                    {itinerary.map((d, i) => (
                                        <DayCard key={i} index={i} {...d} />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tab: Gallery */}
                        {activeTab === 'gallery' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Tour Gallery</h2>
                                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                                    {isMobile ? 'Tap any photo to view full screen.' : 'Click any photo to view full screen.'}
                                </p>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: isMobile ? '0.65rem' : '1rem',
                                }}>
                                    {tourGallery.map((photo, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setLightboxIndex(idx)}
                                            style={{
                                                position: 'relative', borderRadius: '1rem', overflow: 'hidden',
                                                cursor: 'zoom-in', aspectRatio: '4/3',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                // wide shot on desktop only
                                                gridColumn: (!isMobile && idx % 3 === 0) ? 'span 2' : 'span 1',
                                            }}
                                        >
                                            <img
                                                src={photo.src} alt={photo.caption}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                                                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                            />
                                            <div
                                                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)', display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', color: '#fff' }}>
                                                    <span style={{ fontSize: '0.72rem', fontWeight: 600, lineHeight: 1.3 }}>{photo.caption}</span>
                                                    <ZoomIn size={15} style={{ flexShrink: 0, marginLeft: '0.4rem', opacity: 0.85 }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tab: Packing */}
                        {activeTab === 'packing' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>What to Pack?</h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                    gap: '0.65rem'
                                }}>
                                    {packingList.map(item => (
                                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: '#fff', padding: '0.7rem 0.9rem', borderRadius: '0.75rem', border: '1px solid hsl(var(--border))', fontSize: '0.875rem', fontWeight: 500 }}>
                                            <Check size={14} style={{ color: '#22c55e', marginTop: '0.15rem', flexShrink: 0 }} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tab: Before You Go */}
                        {activeTab === 'beforeyougo' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Before You Go</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                    {beforeYouGo.map(item => (
                                        <div key={item.title} style={{ background: '#fff', borderRadius: '1rem', padding: '1.1rem 1.25rem', border: '1px solid hsl(var(--border))' }}>
                                            <div style={{ fontWeight: 800, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{item.title}</div>
                                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* ── Right: Desktop Sidebar ── */}
                    {!isTablet && (
                        <div style={{ position: 'sticky', top: '6rem' }}>
                            <SidebarCard tour={tour} onBookNow={onBookNow} sendWhatsApp={sendWhatsApp} isMobile={false} />
                        </div>
                    )}

                    {/* ── Tablet: Sidebar below content ── */}
                    {isTablet && !isMobile && (
                        <SidebarCard tour={tour} onBookNow={onBookNow} sendWhatsApp={sendWhatsApp} isMobile={false} />
                    )}

                    {/* ── Mobile: Sidebar as collapsible section ── */}
                    {isMobile && (
                        <div>
                            {/* Prominent toggle — looks like a CTA card */}
                            <button
                                onClick={() => setSidebarOpen(v => !v)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center',
                                    justifyContent: 'space-between', padding: '1rem 1.25rem',
                                    borderRadius: '1rem',
                                    background: sidebarOpen ? 'hsl(var(--primary))' : '#fff',
                                    border: `1.5px solid ${sidebarOpen ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                                    fontFamily: 'inherit', cursor: 'pointer',
                                    fontWeight: 700, fontSize: '0.9rem',
                                    color: sidebarOpen ? '#fff' : 'inherit',
                                    marginBottom: sidebarOpen ? '0.75rem' : 0,
                                    transition: 'background 0.2s, color 0.2s',
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    📋 {sidebarOpen ? 'Hide Details' : 'View Pricing & Details'}
                                </span>
                                <span style={{ fontWeight: 900, fontSize: '1rem', opacity: sidebarOpen ? 0.85 : 1, color: sidebarOpen ? '#fff' : 'hsl(var(--primary))' }}>
                                    {tour.price} {sidebarOpen ? '▲' : '▼'}
                                </span>
                            </button>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <SidebarCard tour={tour} onBookNow={onBookNow} sendWhatsApp={sendWhatsApp} isMobile />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Mobile: Sticky Bottom Booking Bar ── */}
            {isMobile && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
                    background: 'rgba(255,255,255,0.97)',
                    backdropFilter: 'blur(12px)',
                    borderTop: '1px solid hsl(var(--border))',
                    boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
                    padding: '0.75rem 1.25rem',
                    paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'hsl(var(--primary))', lineHeight: 1, letterSpacing: '-0.02em' }}>{tour.price}</div>
                        <div style={{ fontSize: '0.65rem', color: 'hsl(var(--muted-foreground))' }}>per person</div>
                    </div>
                    <button
                        onClick={sendWhatsApp}
                        style={{
                            padding: '0.7rem 0.9rem', borderRadius: '0.75rem',
                            background: '#25D366', color: '#fff',
                            fontWeight: 700, fontSize: '0.82rem', border: 'none', cursor: 'pointer',
                            fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem',
                            flexShrink: 0,
                        }}
                    >
                        <Send size={14} /> WhatsApp
                    </button>
                    <button
                        onClick={onBookNow}
                        style={{
                            padding: '0.7rem 1.1rem', borderRadius: '0.75rem',
                            background: 'hsl(var(--primary))', color: '#fff',
                            fontWeight: 700, fontSize: '0.82rem', border: 'none', cursor: 'pointer',
                            fontFamily: 'inherit', flexShrink: 0,
                        }}
                    >
                        Book Now
                    </button>
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <TourLightbox
                        photos={tourGallery}
                        index={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TourDetail;
