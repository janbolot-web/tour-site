import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, Users, MapPin, ArrowLeft, Check, ChevronDown, ChevronUp, Send, ZoomIn, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { toursData } from '../data';
import heroImg from '../assets/kyrgyzstan_hero_landscape_1772534628709.png';
import horseImg from '../assets/kyrgyzstan_horse_riding_tour_1772534860001.png';
import lakeImg from '../assets/kyrgyzstan_lake_tour_1772535567087.png';
import panoramaImg from '../assets/kyrgyzstan_mountain_panorama_1772534959492.png';

const WHATSAPP_NUMBER = '996999137500';

// ─── Default packing list (shown for all tours) ─────────────────────────────
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

// ─── Before You Go info (shared) ─────────────────────────────────────────────
const beforeYouGo = [
    { title: 'Meals', body: 'All meals provided are traditional Central Asian cuisine. Vegetarian options available — inform your guide in advance.' },
    { title: 'Money & Payments', body: 'Cards accepted in towns. Carry some Kyrgyz Som for small expenses. ≈ $10/day for personal spending is usually sufficient.' },
    { title: 'Internet', body: 'Available in cities, may be limited in remote mountain areas. Consider a local MEGACOM SIM card.' },
    { title: 'Electricity', body: 'Kyrgyzstan uses 220V / Type C & F (European-style round plugs). Bring adapters if needed.' },
    { title: 'Languages', body: 'Official languages: Kyrgyz and Russian. Basic English spoken in cities. Your guide speaks English throughout the tour.' },
    { title: 'Health & Safety', body: 'Travel insurance covering medical emergencies and adventure activities is strongly recommended.' },
];

// ─── Day card ────────────────────────────────────────────────────────────────
function DayCard({ day, title, description, meals, overnight, index }) {
    const [open, setOpen] = useState(index === 0);
    return (
        <div style={{ borderRadius: '1.25rem', border: '1.5px solid hsl(var(--border))', overflow: 'hidden', background: '#fff' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.25rem 1.5rem', background: 'none', border: 'none',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                }}
            >
                <span style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: 'hsl(var(--primary))', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 800,
                }}>
                    {day}
                </span>
                <span style={{ flex: 1, fontWeight: 700, fontSize: '1rem' }}>{title}</span>
                {open ? <ChevronUp size={18} style={{ color: 'hsl(var(--muted-foreground))' }} /> : <ChevronDown size={18} style={{ color: 'hsl(var(--muted-foreground))' }} />}
            </button>

            {open && (
                <div style={{ borderTop: '1.5px solid hsl(var(--border))', padding: '1.25rem 1.5rem 1.5rem' }}>
                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.75, fontSize: '0.925rem', marginBottom: '1.25rem' }}>
                        {description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {meals && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'hsl(var(--muted))', borderRadius: '999px', padding: '0.3rem 0.85rem', fontSize: '0.78rem', fontWeight: 600 }}>
                                🍽 {meals}
                            </span>
                        )}
                        {overnight && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'hsl(var(--muted))', borderRadius: '999px', padding: '0.3rem 0.85rem', fontSize: '0.78rem', fontWeight: 600 }}>
                                🏠 {overnight}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Generate default itinerary for tours without a custom one ───────────────
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

// ─── Custom itinerary for Elena's tour ───────────────────────────────────────
const elenaItinerary = [
    { day: 1, title: 'Bishkek → Kyzyl-Oi Village', description: 'Scenic drive from Bishkek through the Too-Ashuu Pass (3,600m). Stop for a panoramic view and a picnic lunch by the river. Arrive in Kyzyl-Oi Village, settle into a guesthouse, and take a guided walk through the village.', meals: 'Lunch-picnic, Dinner', overnight: 'Guesthouse' },
    { day: 2, title: 'Kyzyl-Oi → Kyzart → Song-Kol Lake (horseback)', description: 'Drive to Kyzart Village then mount up! Ride through open fields toward the Uzbek-Ashuu Pass (3,300m). First views of Song-Kol Lake appear from the summit. Descend to the lakeshore and settle into a nomadic yurt camp.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Yurt (3,100m)' },
    { day: 3, title: 'Song-Kol Lake → Bokonbaev (horseback)', description: 'Return to Kyzart via the Kara-Kiya Pass, then drive along the beautiful south shore of Ysyk-Kol Lake. Evening arrival in Bokonbaev Village.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Guesthouse' },
    { day: 4, title: 'Eagle Hunting · Fairy-Tale Canyons · Karakol', description: 'Eagle hunting demonstration by a local hunter. Drive to the Fairy-Tale Canyons, stop at the Barskoon Waterfall, and explore the Jety-Oguz Valley. Evening arrival in Karakol.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Hotel' },
    { day: 5, title: 'Trek to Altyn-Arashan Gorge', description: 'Drive to Ak-Suu Village. Trek 12 km through lush alpine forest to Altyn-Arashan Gorge. Picnic by the river. Arrive at the guesthouse and soak in the natural hot springs.', meals: 'Breakfast, Lunch-picnic, Dinner', overnight: 'Guesthouse (hot springs)' },
    { day: 6, title: 'Altyn-Arashan → Chong-Kemin', description: 'Trek back to Ak-Suu Village, then drive along the north shore of Ysyk-Kol past Cholpon-Ata and Balykchy to Chong-Kemin National Park.', meals: 'Breakfast, Lunch, Dinner', overnight: 'Guesthouse (Chong-Kemin)' },
    { day: 7, title: 'Chong-Kemin → Bishkek (departure)', description: 'Final morning in the mountains. Transfer back to Bishkek. Your driver drops you at your hotel or the airport. Safe travels!', meals: 'Breakfast', overnight: 'Departure' },
];

// ─── Map tour ID → itinerary ──────────────────────────────────────────────────
const itineraryMap = { 'elena-taber-7': elenaItinerary };

// ─── Gallery data per category ───────────────────────────────────────────────
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
    // Per-tour override first
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

// ─── Lightbox component ───────────────────────────────────────────────────────
function TourLightbox({ photos, index, onClose }) {
    const [current, setCurrent] = useState(index);
    const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length);
    const next = () => setCurrent(i => (i + 1) % photos.length);
    useEffect(() => {
        const h = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, []);
    const photo = photos[current];
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={20} /></button>
            <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={22} /></button>
            <motion.div key={current} initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
                <img src={photo.src} alt={photo.caption} style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '1rem' }} />
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem', fontSize: '1rem', fontWeight: 500 }}>{photo.caption}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{current + 1} / {photos.length}</p>
            </motion.div>
            <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={22} /></button>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TourDetail = ({ onBookNow }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('description');
    const [lightboxIndex, setLightboxIndex] = useState(null);

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
        { id: 'description', label: 'Description' },
        { id: 'gallery', label: `Gallery (${tourGallery.length})` },
        { id: 'packing', label: 'What to Pack?' },
        { id: 'beforeyougo', label: 'Before You Go' },
    ];

    return (
        <div style={{ paddingTop: '80px', background: '#fafaf9', minHeight: '100vh' }}>
            {/* Hero */}
            <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
                <img src={tour.image} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

                {/* Back button */}
                <button
                    onClick={() => navigate('/tours')}
                    style={{
                        position: 'absolute', top: '2rem', left: '2rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff', borderRadius: '0.75rem',
                        padding: '0.5rem 1rem', fontWeight: 700, fontSize: '0.875rem',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}
                >
                    <ArrowLeft size={16} /> All Tours
                </button>

                <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', paddingBottom: '2.5rem', color: '#fff' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))', padding: '0.25rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {tour.category}
                        </span>
                        <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.25rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {tour.duration}
                        </span>
                        <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.25rem 0.85rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                            {tour.season}
                        </span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                        {tour.title}
                    </h1>
                </div>
            </div>

            {/* Content + Sidebar */}
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem', alignItems: 'start' }}>

                    {/* ── Left: Main Content ── */}
                    <div>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '2px solid hsl(var(--border))', marginBottom: '2.5rem' }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: '0.75rem 1.25rem', fontFamily: 'inherit', cursor: 'pointer',
                                        fontWeight: 700, fontSize: '0.9rem', border: 'none', background: 'none',
                                        borderBottom: activeTab === tab.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                                        color: activeTab === tab.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                                        marginBottom: '-2px', transition: 'color 0.2s',
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab: Description */}
                        {activeTab === 'description' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>
                                    {tour.description}
                                </p>

                                {/* Highlights */}
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Tour Highlights</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '3rem' }}>
                                    {highlights.map(h => (
                                        <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.925rem', fontWeight: 500 }}>
                                            <Check size={16} style={{ color: '#22c55e', marginTop: '0.15rem', flexShrink: 0 }} />
                                            {h}
                                        </div>
                                    ))}
                                </div>

                                {/* Itinerary */}
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Day by Day Itinerary</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {itinerary.map((d, i) => (
                                        <DayCard key={i} index={i} {...d} />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tab: Gallery */}
                        {activeTab === 'gallery' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Tour Gallery</h2>
                                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginBottom: '1.75rem' }}>Click any photo to view full screen.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                                    {tourGallery.map((photo, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setLightboxIndex(idx)}
                                            style={{ position: 'relative', borderRadius: '1.1rem', overflow: 'hidden', cursor: 'zoom-in', aspectRatio: idx % 3 === 0 ? '16/9' : '4/3', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', gridColumn: idx % 3 === 0 ? 'span 2' : 'span 1' }}
                                        >
                                            <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                                                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                            />
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '1rem' }}
                                                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', color: '#fff' }}>
                                                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{photo.caption}</span>
                                                    <ZoomIn size={18} style={{ flexShrink: 0, marginLeft: '0.5rem', opacity: 0.85 }} />
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
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>What to Pack?</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    {packingList.map(item => (
                                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: '#fff', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid hsl(var(--border))', fontSize: '0.9rem', fontWeight: 500 }}>
                                            <Check size={15} style={{ color: '#22c55e', marginTop: '0.15rem', flexShrink: 0 }} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tab: Before you go */}
                        {activeTab === 'beforeyougo' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem' }}>Before You Go</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {beforeYouGo.map(item => (
                                        <div key={item.title} style={{ background: '#fff', borderRadius: '1rem', padding: '1.25rem 1.5rem', border: '1px solid hsl(var(--border))' }}>
                                            <div style={{ fontWeight: 800, marginBottom: '0.4rem', fontSize: '1rem' }}>{item.title}</div>
                                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* ── Right: Sticky Sidebar ── */}
                    <div style={{ position: 'sticky', top: '6rem' }}>
                        <div style={{ background: '#fff', borderRadius: '1.75rem', padding: '2rem', boxShadow: '0 8px 48px rgba(0,0,0,0.09)', border: '1px solid hsl(var(--border))' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'hsl(var(--primary))', marginBottom: '0.25rem' }}>{tour.price}</div>
                            <div style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>per person</div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                                {[
                                    { icon: <Clock size={16} />, label: 'Duration', value: tour.duration },
                                    { icon: <Calendar size={16} />, label: 'Season', value: tour.season },
                                    { icon: <MapPin size={16} />, label: 'Start / End', value: 'Bishkek' },
                                    { icon: <Users size={16} />, label: 'Group size', value: '1 – 8 people' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                                        <span style={{ color: 'hsl(var(--secondary))', flexShrink: 0 }}>{item.icon}</span>
                                        <span style={{ color: 'hsl(var(--muted-foreground))', flex: 1 }}>{item.label}</span>
                                        <span style={{ fontWeight: 700 }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={onBookNow}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '0.85rem',
                                    background: 'hsl(var(--primary))', color: '#fff',
                                    fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                                    fontFamily: 'inherit', marginBottom: '0.75rem', transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                Book This Tour
                            </button>

                            <button
                                onClick={sendWhatsApp}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '0.85rem',
                                    background: '#25D366', color: '#fff',
                                    fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <Send size={17} /> Ask via WhatsApp
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'hsl(var(--muted-foreground))', marginTop: '1rem', lineHeight: 1.5 }}>
                                Free cancellation up to 14 days before the tour
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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
