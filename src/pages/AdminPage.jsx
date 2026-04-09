import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, X, Trash2, Save, Loader, FileText, Plus, AlertCircle, ChevronDown, Key } from 'lucide-react';
import { useTours } from '../context/TourStoreContext';
import MapPointsPicker from '../components/MapPointsPicker';

// ── Constants ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'kyrgyz2026';
const LS_GEMINI_KEY = 'adminGeminiKey';
const CATEGORIES = ['Horse Riding', 'Trekking', 'Combined', 'Road Trip'];
const SPEEDS = ['Easy', 'Moderate', 'Active'];
const DIFFICULTIES = ['Easy', 'Moderate', 'Hard'];

// ── Gemini extraction ─────────────────────────────────────────────────────────
async function extractTourFromText(text, apiKey) {
    const prompt = `You are a tour data extractor for a Kyrgyzstan travel company.
Extract a structured tour object from the provided PDF text.
Return ONLY valid JSON (no markdown fences, no explanation) with exactly these fields:
{
  "title": string,
  "category": "Horse Riding"|"Trekking"|"Combined"|"Road Trip",
  "duration": string (e.g. "7 Days"),
  "durationDays": number,
  "price": string (e.g. "$580"),
  "speed": "Easy"|"Moderate"|"Active",
  "difficulty": "Easy"|"Moderate"|"Hard",
  "season": string (e.g. "May to October"),
  "description": string (2-3 sentence summary),
  "overview": string (1 full paragraph),
  "highlights": string[] (5-8 bullets, each max 12 words),
  "itinerary": [{ "day": number, "title": string, "description": string }],
  "includes": string[] (what is included in the price),
  "excludes": string[] (what is NOT included),
  "mapPoints": array of GPS waypoints for the tour route — one per day/stop, derived from place names in the itinerary.
    Each item: { "lat": number, "lng": number, "label": string }.
    Use your knowledge of Kyrgyzstan geography to assign accurate coordinates.
    For example Bishkek is {lat:42.87,lng:74.59}, Karakol {lat:42.49,lng:78.39}, Kochkor {lat:42.21,lng:75.76}, Song-Kul {lat:41.85,lng:75.13}, Naryn {lat:41.43,lng:76.00}, Osh {lat:40.52,lng:72.80}.
    Always include at least a Start and End point. Aim for 3-8 meaningful stops.
}

PDF TEXT:

${text.slice(0, 12000)}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 },
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Gemini error ${response.status}`);
    }
    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    const jsonStr = raw.replace(/^```json?\s*/i, '').replace(/```\s*$/, '').trim();
    return JSON.parse(jsonStr);
}

// ── PDF: extract text only ────────────────────────────────────────────────────
async function extractTextFromPdf(file) {
    const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist');
    GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
    ).href;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(' ') + '\n\n';
    }
    return fullText.trim();
}

// ── Helper ────────────────────────────────────────────────────────────────────
function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
}

// ── Styled helpers ────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <label style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280' }}>{label}</label>
        {children}
    </div>
);

const inputSx = {
    padding: '0.6rem 0.85rem', borderRadius: '0.6rem',
    border: '1.5px solid #e5e7eb', fontSize: '0.88rem', outline: 'none',
    fontFamily: 'inherit', color: '#111827', background: '#fafafa',
    transition: 'border-color 0.15s, box-shadow 0.15s', boxSizing: 'border-box', width: '100%',
};
const fx = {
    onFocus: e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)'; e.target.style.background = '#fff'; },
    onBlur: e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; e.target.style.background = '#fafafa'; },
};

// ════════════════════════════════════════════════════════════════════════════ //
const AdminPage = () => {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuthed') === '1');
    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState(false);
    const login = () => {
        if (pwInput === ADMIN_PASSWORD) { sessionStorage.setItem('adminAuthed', '1'); setAuthed(true); }
        else { setPwError(true); setTimeout(() => setPwError(false), 2000); }
    };

    // ── Store ─────────────────────────────────────────────────────────────────
    const { adminTours, addTour, deleteTour, updateTour } = useTours();

    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem(LS_GEMINI_KEY);
        if (saved) setApiKey(saved);
    }, []);

    // ── Hardcoded Keys (Fill these in) ────────────────────────────────────────
    const CLOUD_NAME = 'dsfsrf2xw'; // Вставь Cloudinary Cloud Name
    const UPLOAD_PRESET = 'tripline'; // Вставь Cloudinary Upload Preset

    // ── Pipeline state ────────────────────────────────────────────────────────
    const [stage, setStage] = useState('idle'); // idle | processing | preview | done
    const [progress, setProgress] = useState('');
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [form, setForm] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('info');
    const imgUploadRef = useRef();
    const fileRef = useRef();

    const [isUploading, setIsUploading] = useState(false);
    const [tourToDelete, setTourToDelete] = useState(null);

    const handleManualImages = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        if (!CLOUD_NAME.trim() || !UPLOAD_PRESET.trim()) {
            alert('Пожалуйста, укажите Cloud Name и Upload Preset в коде.');
            e.target.value = '';
            return;
        }

        setIsUploading(true);
        const uploadedUrls = [];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', UPLOAD_PRESET.trim());

                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME.trim()}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error('Failed to upload image');
                const data = await res.json();
                uploadedUrls.push(data.secure_url);
            }

            setForm(f => {
                if (!f) return f;
                const next = [...(f.images || []), ...uploadedUrls];
                return { ...f, images: next, image: next[0] };
            });
        } catch (err) {
            console.error('Upload error:', err);
            alert('Error uploading images to Cloudinary.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const removeImage = (idx) => {
        setForm(f => {
            if (!f) return f;
            const next = (f.images || []).filter((_, i) => i !== idx);
            return { ...f, images: next, image: next[0] || null };
        });
    };

    const setCoverImage = (idx) => {
        if (idx === 0) return;
        setForm(f => {
            if (!f) return f;
            const imgs = [...(f.images || [])];
            const [chosen] = imgs.splice(idx, 1);
            imgs.unshift(chosen);
            return { ...f, images: imgs, image: imgs[0] };
        });
    };

    // ── File pipeline ─────────────────────────────────────────────────────────
    const handleFile = useCallback(async (file) => {
        if (!file || file.type !== 'application/pdf') { setError('Please upload a PDF file.'); return; }
        if (!apiKey.trim()) { setError('API ключ от Gemini не указан.'); return; }
        setError(''); setStage('processing'); setProgress('Reading PDF…');
        try {
            const text = await extractTextFromPdf(file);
            setProgress('Extracting tour data & building map route with Gemini AI…');
            const tour = await extractTourFromText(text, apiKey.trim());
            const { image: _geminiImage, ...cleanTour } = tour;

            // Normalise mapPoints — ensure lat/lng are numbers, keep label
            const rawPts = Array.isArray(tour.mapPoints) ? tour.mapPoints : [];
            const mapPoints = rawPts
                .filter(p => p && typeof p.lat === 'number' && typeof p.lng === 'number')
                .map((p, i) => ({
                    lat: parseFloat(p.lat.toFixed(5)),
                    lng: parseFloat(p.lng.toFixed(5)),
                    label: p.label || (i === 0 ? 'Start' : i === rawPts.length - 1 ? 'End' : `Stop ${i}`),
                }));

            setForm({
                id: slugify(tour.title || 'tour'),
                featured: false,
                months: [5, 6, 7, 8, 9, 10],
                ...cleanTour,
                images: [],
                image: null,
                difficulty: tour.difficulty || 'Moderate',
                highlights: tour.highlights || [],
                itinerary: tour.itinerary || [],
                includes: tour.includes || [],
                excludes: tour.excludes || [],
                mapPoints,
            });
            setStage('preview');
        } catch (e) {
            setError(e.message || 'Something went wrong.');
            setStage('idle');
        }
    }, [apiKey]);

    const handleDrop = e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };

    // ── Form helpers ──────────────────────────────────────────────────────────
    const set = (key, val) => setForm(p => ({ ...p, [key]: val }));
    const setListItem = (k, i, v) => set(k, form[k].map((x, j) => j === i ? v : x));
    const addListItem = (k) => set(k, [...(form[k] || []), '']);
    const removeListItem = (k, i) => set(k, (form[k] || []).filter((_, j) => j !== i));
    const setItinerary = (i, key, val) => {
        const copy = [...form.itinerary]; copy[i] = { ...copy[i], [key]: val }; set('itinerary', copy);
    };

    // ── Save ──────────────────────────────────────────────────────────────────
    const handleSave = () => {
        const imgs = form.images || (form.image ? [form.image] : []);
        const payload = {
            ...form,
            durationDays: Number(form.durationDays) || 0,
            images: imgs,
            image: imgs[0] || null,
        };
        if (isEditing) {
            updateTour(form.id, payload);
        } else {
            addTour(payload);
        }
        setStage('done');
    };
    const handleReset = () => { setForm(null); setStage('idle'); setError(''); setIsEditing(false); };

    const handleEdit = (tour) => {
        setForm(tour);
        setIsEditing(true);
        setError('');
        setStage('preview');
        setActiveTab('info');
    };

    // ── Password gate ─────────────────────────────────────────────────────────
    if (!authed) return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.5rem', width: '100%', maxWidth: '380px', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔐</div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.4rem' }}>Admin Access</h1>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Enter the admin password to continue.</p>
                <input type="password" placeholder="Password" value={pwInput} onChange={e => setPwInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} style={{ ...inputSx, borderColor: pwError ? '#ef4444' : '#e5e7eb', marginBottom: '0.75rem' }} autoFocus />
                {pwError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Incorrect password.</p>}
                <button onClick={login} style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', background: '#0f172a', color: '#fff', fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Sign In</button>
            </motion.div>
        </div>
    );

    // ── Main UI ───────────────────────────────────────────────────────────────
    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f1f5f9' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', color: '#fff', padding: '1.25rem 0' }}>
                <div className="container" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                        <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>TRIPLINE</div>
                        <h1 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>Tour Admin Panel</h1>
                    </div>
                    <button onClick={() => { sessionStorage.removeItem('adminAuthed'); setAuthed(false); }} style={{ padding: '0.45rem 0.9rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}>Sign Out</button>
                </div>
            </div>

            <div className="container" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1.5rem', paddingBottom: '4rem' }}>


                {/* ── 2-column layout ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: '1.25rem', alignItems: 'start' }}>

                    {/* ══ Left: upload / processing / preview ══ */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {/* Settings */}
                        <div style={{ background: '#fff', borderRadius: '1.1rem', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                            <div style={{ padding: '0.9rem 1.25rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Key size={14} style={{ color: '#111827' }} />
                                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#111827' }}>Integrations</span>
                            </div>
                            <div style={{ padding: '1rem 1.25rem' }}>
                                <Field label="Gemini API Key">
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input 
                                            type="text" 
                                            value={apiKey} 
                                            onChange={e => {
                                                setApiKey(e.target.value);
                                                localStorage.setItem(LS_GEMINI_KEY, e.target.value);
                                            }} 
                                            placeholder="AIzaSy..." 
                                            style={{ ...inputSx, flex: 1 }} 
                                            {...fx} 
                                        />
                                        <button 
                                            onClick={() => {
                                                localStorage.setItem(LS_GEMINI_KEY, apiKey);
                                                alert('Ключ успешно сохранен!');
                                            }}
                                            style={{ padding: '0 1rem', borderRadius: '0.6rem', background: '#e5e7eb', color: '#374151', border: 'none', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                            Save
                                        </button>
                                    </div>
                                    <p style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: '0.3rem', marginBottom: 0 }}>Required to parse PDF files. Saved securely in your browser's local storage.</p>
                                </Field>
                            </div>
                        </div>

                        {/* Upload / progress */}
                        {stage === 'idle' && (
                            <div style={{ background: '#fff', borderRadius: '1.1rem', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FileText size={15} style={{ color: '#f97316' }} />
                                    <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Upload Tour PDF</span>
                                </div>
                                <div style={{ padding: '1.25rem' }}>
                                    <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} onClick={() => fileRef.current?.click()}
                                        style={{ border: `2px dashed ${dragOver ? '#f97316' : '#d1d5db'}`, borderRadius: '0.85rem', padding: '3.5rem 2rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? '#fff7ed' : '#fafafa', transition: 'all 0.2s' }}>
                                        <Upload size={32} style={{ color: dragOver ? '#f97316' : '#9ca3af', marginBottom: '0.75rem' }} />
                                        <p style={{ fontWeight: 700, color: '#374151', marginBottom: '0.25rem' }}>Drop PDF here or click to browse</p>
                                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>AI will extract text & images automatically</p>
                                        <input ref={fileRef} type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
                                    </div>
                                    {error && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', padding: '0.65rem 1rem', background: '#fef2f2', borderRadius: '0.6rem', border: '1px solid #fecaca' }}>
                                            <AlertCircle size={13} style={{ color: '#ef4444', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.8rem', color: '#dc2626' }}>{error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {stage === 'processing' && (
                            <div style={{ background: '#fff', borderRadius: '1.1rem', border: '1px solid #e5e7eb', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 1 }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                                    <Loader size={36} style={{ color: '#f97316' }} />
                                </motion.div>
                                <p style={{ fontWeight: 800, color: '#111827', marginBottom: '0.3rem' }}>{progress}</p>
                                <p style={{ fontSize: '0.78rem', color: '#9ca3af' }}>This may take 15–30 seconds…</p>
                            </div>
                        )}

                        {stage === 'done' && (
                            <div style={{ background: '#fff', borderRadius: '1.1rem', border: '1px solid #e5e7eb', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                    <Check size={26} style={{ color: '#16a34a' }} />
                                </div>
                                <p style={{ fontWeight: 900, fontSize: '1.1rem', color: '#111827', marginBottom: '0.35rem' }}>{isEditing ? 'Tour updated!' : 'Tour created!'}</p>
                                <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '1.25rem' }}>It now appears on /tours and the homepage.</p>
                                <button onClick={handleReset} style={{ padding: '0.7rem 1.75rem', borderRadius: '0.7rem', background: '#0f172a', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Plus size={14} /> Create Another
                                </button>
                            </div>
                        )}

                        {/* ── Preview form ── */}
                        {stage === 'preview' && form && (
                            <div style={{ background: '#fff', borderRadius: '1.1rem', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

                                {/* Tab bar */}
                                <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6' }}>
                                    {[
                                        ['info', 'Basic Info', null],
                                        ['itinerary', 'Itinerary', null],
                                        ['lists', 'Includes/Excludes', null],
                                        ['map', '🗺 Map Route', (form.mapPoints || []).length],
                                    ].map(([id, label, badge]) => (
                                        <button key={id} onClick={() => setActiveTab(id)}
                                            style={{ flex: 1, padding: '0.8rem 0.15rem', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === id ? '#f97316' : 'transparent'}`, color: activeTab === id ? '#f97316' : '#6b7280', fontWeight: activeTab === id ? 700 : 500, fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                            {label}
                                            {badge > 0 && (
                                                <span style={{ background: '#16a34a', color: '#fff', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 800, padding: '0.05rem 0.4rem', lineHeight: 1.5 }}>
                                                    {badge}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div style={{ padding: '1.25rem', overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
                                    <AnimatePresence mode="wait">
                                        {/* Basic Info */}
                                        {activeTab === 'info' && (
                                            <motion.div key="info" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.12 }}
                                                style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                                <Field label="Галерея (нажми для выбора обложки)">
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'flex-start' }}>
                                                        {(form.images || []).map((img, i) => (
                                                            <div key={i} style={{ position: 'relative', flexShrink: 0, cursor: i === 0 ? 'default' : 'pointer' }}
                                                                onClick={() => setCoverImage(i)}>
                                                                <img src={img} alt={`img ${i + 1}`} style={{ width: '90px', height: '60px', objectFit: 'cover', borderRadius: '0.45rem', border: `2px solid ${i === 0 ? '#f97316' : '#e5e7eb'}`, display: 'block', transition: 'border-color 0.15s' }} />
                                                                {i === 0 ? (
                                                                    <span style={{ position: 'absolute', bottom: '3px', left: '3px', background: '#f97316', color: '#fff', fontSize: '0.52rem', fontWeight: 800, padding: '1px 4px', borderRadius: '3px', lineHeight: 1.4 }}>COVER</span>
                                                                ) : (
                                                                    <span style={{ position: 'absolute', inset: 0, borderRadius: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0)', opacity: 0, transition: 'opacity 0.15s, background 0.15s' }}
                                                                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.opacity = 0; e.currentTarget.style.background = 'rgba(0,0,0,0)'; }}>
                                                                        ★ Обложка
                                                                    </span>
                                                                )}
                                                                <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(i); }} style={{ position: 'absolute', top: '3px', right: '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                                                                    <X size={10} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {isUploading ? (
                                                            <div style={{ width: '90px', height: '60px', borderRadius: '0.45rem', border: '2px dashed #d1d5db', background: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}>
                                                                    <Loader size={16} style={{ color: '#9ca3af' }} />
                                                                </motion.div>
                                                                <span style={{ fontSize: '0.6rem', color: '#9ca3af', fontWeight: 600, marginTop: '0.2rem' }}>Wait...</span>
                                                            </div>
                                                        ) : (
                                                            <button type="button" onClick={() => imgUploadRef.current?.click()} style={{ width: '90px', height: '60px', borderRadius: '0.45rem', border: '2px dashed #d1d5db', background: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '0.2rem', flexShrink: 0, fontFamily: 'inherit' }}
                                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.background = '#fff7ed'; }}
                                                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = '#fafafa'; }}>
                                                                <Plus size={16} style={{ color: '#9ca3af' }} />
                                                                <span style={{ fontSize: '0.6rem', color: '#9ca3af', fontWeight: 600 }}>Add</span>
                                                            </button>
                                                        )}
                                                        <input ref={imgUploadRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleManualImages} disabled={isUploading} />
                                                    </div>
                                                </Field>
                                                <Field label="Tour Title *">
                                                    <input value={form.title || ''} onChange={e => set('title', e.target.value)} style={inputSx} {...fx} />
                                                </Field>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                    <Field label="Category">
                                                        <div style={{ position: 'relative' }}>
                                                            <select value={form.category || ''} onChange={e => set('category', e.target.value)} style={{ ...inputSx, appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }} {...fx}>
                                                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                                            </select>
                                                            <ChevronDown size={13} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                                                        </div>
                                                    </Field>
                                                    <Field label="Speed / Pace">
                                                        <div style={{ position: 'relative' }}>
                                                            <select value={form.speed || ''} onChange={e => set('speed', e.target.value)} style={{ ...inputSx, appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }} {...fx}>
                                                                {SPEEDS.map(s => <option key={s}>{s}</option>)}
                                                            </select>
                                                            <ChevronDown size={13} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                                                        </div>
                                                    </Field>
                                                    <Field label="Difficulty Level">
                                                        <div style={{ position: 'relative' }}>
                                                            <select value={form.difficulty || 'Moderate'} onChange={e => set('difficulty', e.target.value)} style={{ ...inputSx, appearance: 'none', paddingRight: '2rem', cursor: 'pointer' }} {...fx}>
                                                                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                                                            </select>
                                                            <ChevronDown size={13} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                                                        </div>
                                                    </Field>
                                                    <Field label="Duration">
                                                        <input value={form.duration || ''} onChange={e => set('duration', e.target.value)} style={inputSx} {...fx} placeholder="7 Days" />
                                                    </Field>
                                                    <Field label="Days (number)">
                                                        <input type="number" min={1} value={form.durationDays || ''} onChange={e => set('durationDays', e.target.value)} style={inputSx} {...fx} />
                                                    </Field>
                                                    <Field label="Price">
                                                        <input value={form.price || ''} onChange={e => set('price', e.target.value)} style={inputSx} {...fx} placeholder="$580" />
                                                    </Field>
                                                    <Field label="Season">
                                                        <input value={form.season || ''} onChange={e => set('season', e.target.value)} style={inputSx} {...fx} />
                                                    </Field>
                                                </div>
                                                <Field label="Short Description (card)">
                                                    <textarea rows={2} value={form.description || ''} onChange={e => set('description', e.target.value)} style={{ ...inputSx, resize: 'vertical', lineHeight: 1.65 }} {...fx} />
                                                </Field>
                                                <Field label="Full Overview">
                                                    <textarea rows={4} value={form.overview || ''} onChange={e => set('overview', e.target.value)} style={{ ...inputSx, resize: 'vertical', lineHeight: 1.65 }} {...fx} />
                                                </Field>
                                                <Field label="Highlights">
                                                    {(form.highlights || []).map((h, i) => (
                                                        <div key={i} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.35rem' }}>
                                                            <input value={h} onChange={e => setListItem('highlights', i, e.target.value)} style={{ ...inputSx, flex: 1 }} {...fx} />
                                                            <button onClick={() => removeListItem('highlights', i)} style={{ padding: '0 0.55rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', cursor: 'pointer' }}><X size={12} /></button>
                                                        </div>
                                                    ))}
                                                    <button onClick={() => addListItem('highlights')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.38rem 0.7rem', borderRadius: '0.5rem', background: '#f3f4f6', border: '1px dashed #d1d5db', color: '#6b7280', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                        <Plus size={11} /> Add
                                                    </button>
                                                </Field>
                                                <Field label="Featured on homepage?">
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {[true, false].map(v => (
                                                            <button key={String(v)} onClick={() => set('featured', v)} style={{ padding: '0.45rem 1rem', borderRadius: '0.55rem', border: `1.5px solid ${form.featured === v ? '#f97316' : '#e5e7eb'}`, background: form.featured === v ? '#fff7ed' : '#fafafa', color: form.featured === v ? '#f97316' : '#6b7280', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                                {v ? 'Yes' : 'No'}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </Field>
                                            </motion.div>
                                        )}

                                        {/* Itinerary */}
                                        {activeTab === 'itinerary' && (
                                            <motion.div key="itin" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.12 }}
                                                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {(form.itinerary || []).map((day, i) => (
                                                    <div key={i} style={{ borderRadius: '0.7rem', border: '1px solid #e5e7eb', padding: '0.85rem', background: '#fafafa' }}>
                                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                            <span style={{ background: '#0f172a', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>{day.day}</span>
                                                            <input value={day.title || ''} onChange={e => setItinerary(i, 'title', e.target.value)} placeholder="Day title" style={{ ...inputSx, flex: 1, background: '#fff' }} {...fx} />
                                                        </div>
                                                        <textarea rows={2} value={day.description || ''} onChange={e => setItinerary(i, 'description', e.target.value)} style={{ ...inputSx, background: '#fff', resize: 'vertical', lineHeight: 1.65 }} {...fx} />
                                                    </div>
                                                ))}
                                                <button onClick={() => set('itinerary', [...(form.itinerary || []), { day: (form.itinerary?.length || 0) + 1, title: '', description: '' }])} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 0.85rem', borderRadius: '0.6rem', background: '#f3f4f6', border: '1px dashed #d1d5db', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                    <Plus size={13} /> Add day
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* Includes / Excludes */}
                                        {activeTab === 'lists' && (
                                            <motion.div key="lists" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.12 }}
                                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                                {['includes', 'excludes'].map(k => (
                                                    <div key={k}>
                                                        <div style={{ fontWeight: 800, fontSize: '0.82rem', marginBottom: '0.6rem', color: k === 'includes' ? '#16a34a' : '#ef4444' }}>
                                                            {k === 'includes' ? '✓ Included' : '✗ Not Included'}
                                                        </div>
                                                        {(form[k] || []).map((item, i) => (
                                                            <div key={i} style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.35rem' }}>
                                                                <input value={item} onChange={e => setListItem(k, i, e.target.value)} style={{ ...inputSx, flex: 1, fontSize: '0.8rem', padding: '0.5rem 0.7rem' }} {...fx} />
                                                                <button onClick={() => removeListItem(k, i)} style={{ padding: '0 0.45rem', borderRadius: '0.45rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', cursor: 'pointer' }}><X size={11} /></button>
                                                            </div>
                                                        ))}
                                                        <button onClick={() => addListItem(k)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.65rem', borderRadius: '0.45rem', background: '#f3f4f6', border: '1px dashed #d1d5db', color: '#6b7280', fontWeight: 600, fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                            <Plus size={11} /> Add
                                                        </button>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {/* Map Route */}
                                        {activeTab === 'map' && (
                                            <motion.div key="map" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.12 }}>
                                                {(form.mapPoints || []).length > 0 && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.55rem 0.9rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.6rem', fontSize: '0.78rem', color: '#15803d', fontWeight: 600 }}>
                                                        ✨ <span>AI automatically generated <b>{(form.mapPoints || []).length} waypoints</b> from the PDF itinerary. You can adjust them below.</span>
                                                    </div>
                                                )}
                                                <MapPointsPicker
                                                    points={form.mapPoints || []}
                                                    onChange={(pts) => set('mapPoints', pts)}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Save bar */}
                                <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '0.6rem' }}>
                                    <button onClick={handleReset} style={{ padding: '0.65rem 1rem', borderRadius: '0.65rem', background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#374151', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <X size={13} /> Discard
                                    </button>
                                    <button onClick={handleSave} style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: '0.65rem', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                        <Save size={14} /> {isEditing ? 'Update Tour' : 'Publish Tour'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ══ Right: saved tours ══ */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '5.5rem' }}>
                        <div style={{ background: '#fff', borderRadius: '1.1rem', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>Published Tours</span>
                                <span style={{ background: '#f3f4f6', borderRadius: '999px', padding: '0.15rem 0.6rem', fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>{adminTours.length}</span>
                            </div>
                            {adminTours.length === 0
                                ? <div style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.82rem' }}>No tours yet.</div>
                                : <div style={{ maxHeight: '440px', overflowY: 'auto' }}>
                                    {adminTours.map(tour => (
                                        <div key={tour.id} onClick={() => handleEdit(tour)} style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            {tour.image && <img src={tour.image} alt="" style={{ width: '40px', height: '28px', objectFit: 'cover', borderRadius: '0.35rem', flexShrink: 0 }} />}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tour.title}</div>
                                                <div style={{ fontSize: '0.67rem', color: '#9ca3af' }}>{tour.duration} · {tour.price}</div>
                                            </div>
                                            {tourToDelete === tour.id ? (
                                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ef4444' }}>Sure?</span>
                                                    <button onClick={(e) => { e.stopPropagation(); deleteTour(tour.id); setTourToDelete(null); }} style={{ padding: '0.2rem 0.5rem', borderRadius: '0.3rem', background: '#ef4444', border: 'none', color: '#fff', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>Yes</button>
                                                    <button onClick={(e) => { e.stopPropagation(); setTourToDelete(null); }} style={{ padding: '0.2rem 0.5rem', borderRadius: '0.3rem', background: '#e5e7eb', border: 'none', color: '#374151', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>No</button>
                                                </div>
                                            ) : (
                                                <button onClick={(e) => { e.stopPropagation(); setTourToDelete(tour.id); }} style={{ flexShrink: 0, padding: '0.3rem', borderRadius: '0.4rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', cursor: 'pointer' }}>
                                                    <Trash2 size={12} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>

                        <div style={{ background: '#fff7ed', borderRadius: '0.85rem', padding: '0.9rem 1rem', border: '1px solid #fed7aa' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#c2410c', marginBottom: '0.35rem' }}>⚡ How it works</div>
                            <ol style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.72rem', color: '#92400e', lineHeight: 1.9 }}>
                                <li>Save your Gemini API key above.</li>
                                <li>Upload a PDF tour itinerary.</li>
                                <li>AI extracts the tour data automatically.</li>
                                <li>Upload a cover image manually in the form.</li>
                                <li>Review and edit the form if needed.</li>
                                <li>Click <strong>Publish Tour</strong> → live instantly.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
