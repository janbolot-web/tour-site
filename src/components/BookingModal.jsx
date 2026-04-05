import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown, Check, ArrowRight, ArrowLeft, Shield, Clock, Users } from 'lucide-react';
import { useTours } from '../context/TourStoreContext';

const WHATSAPP_NUMBER = '996705660593';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

// ─── Styled input helper ──────────────────────────────────────────────────────
const Field = ({ label, required, children }) => (
    <div>
        <label style={{
            display: 'block', fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'hsl(var(--muted-foreground))', marginBottom: '0.45rem',
        }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: '0.2rem' }}>*</span>}
        </label>
        {children}
    </div>
);

const inputBase = {
    width: '100%', padding: '0.85rem 1rem',
    borderRadius: '0.75rem',
    border: '1.5px solid hsl(var(--border))',
    fontSize: '0.95rem', fontFamily: 'inherit',
    outline: 'none', background: '#fff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    color: 'hsl(var(--foreground))',
};

const focusHandlers = {
    onFocus: e => {
        e.target.style.borderColor = 'hsl(var(--primary))';
        e.target.style.boxShadow = '0 0 0 3px hsl(var(--primary)/0.12)';
    },
    onBlur: e => {
        e.target.style.borderColor = 'hsl(var(--border))';
        e.target.style.boxShadow = 'none';
    },
};

// ─── Trust badges ─────────────────────────────────────────────────────────────
const TRUST = [
    { icon: <Shield size={14} />, text: 'Free cancellation · 14 days' },
    { icon: <Clock size={14} />, text: 'Reply within 24 hours' },
    { icon: <Users size={14} />, text: 'Small groups · max 8 pax' },
];

// ─── Steps ───────────────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, label: 'Contact' },
    { id: 2, label: 'Tour' },
    { id: 3, label: 'Details' },
];

const BookingModal = ({ isOpen, onClose }) => {
    const w = useWindowWidth();
    const isMobile = w < 640;
    const { allTours } = useTours();

    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        email: '',
        tour: '',
        date: '',
        people: '2',
        notes: '',
    });

    const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setStep(1), 400);
        }
    }, [isOpen]);

    // ESC to close
    useEffect(() => {
        const h = e => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const lines = [
            `👋 Hello! I'd like to book a tour.`,
            ``,
            `👤 *Name:* ${form.name}`,
            form.email ? `📧 *Email:* ${form.email}` : '',
            `🏔 *Tour:* ${form.tour || 'Not specified — please suggest'}`,
            `📅 *Date:* ${form.date || 'Flexible'}`,
            `👥 *Group size:* ${form.people} ${form.people === '1' ? 'person' : 'people'}`,
            form.notes ? `📝 *Notes:* ${form.notes}` : '',
        ].filter(Boolean).join('\n');

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, '_blank');
        onClose();
    };

    const canNext1 = form.name.trim().length > 0;

    // ── Panel content by step ──────────────────────────────────────────────────
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Field label="Your Name" required>
                                <input
                                    required type="text" placeholder="e.g. Maria Schmidt"
                                    value={form.name} onChange={e => set('name', e.target.value)}
                                    style={inputBase} {...focusHandlers}
                                />
                            </Field>
                            <Field label="Email (optional)">
                                <input
                                    type="email" placeholder="your@email.com"
                                    value={form.email} onChange={e => set('email', e.target.value)}
                                    style={inputBase} {...focusHandlers}
                                />
                            </Field>
                        </div>
                        <button
                            type="button"
                            disabled={!canNext1}
                            onClick={() => setStep(2)}
                            style={{
                                marginTop: '1.5rem', width: '100%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                padding: '0.95rem', borderRadius: '0.85rem',
                                background: canNext1 ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                                color: canNext1 ? '#fff' : 'hsl(var(--muted-foreground))',
                                fontWeight: 800, fontSize: '0.95rem', border: 'none',
                                cursor: canNext1 ? 'pointer' : 'not-allowed',
                                fontFamily: 'inherit', transition: 'background 0.2s',
                            }}
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Field label="Select Tour">
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={form.tour} onChange={e => set('tour', e.target.value)}
                                        style={{ ...inputBase, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}
                                        {...focusHandlers}
                                    >
                                        <option value="">— Not sure yet, please suggest —</option>
                                        {allTours.map(t => (
                                            <option key={t.id} value={t.title}>{t.title} · {t.duration}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={15} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'hsl(var(--muted-foreground))' }} />
                                </div>
                            </Field>
                            <Field label="Preferred Start Date">
                                <input
                                    type="date" value={form.date}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={e => set('date', e.target.value)}
                                    style={{ ...inputBase, cursor: 'pointer' }}
                                    {...focusHandlers}
                                />
                            </Field>
                        </div>
                        <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.5rem' }}>
                            <button type="button" onClick={() => setStep(1)} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.95rem 1.1rem', borderRadius: '0.85rem', background: 'hsl(var(--muted))', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem', color: 'hsl(var(--foreground))' }}>
                                <ArrowLeft size={15} />
                            </button>
                            <button type="button" onClick={() => setStep(3)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.95rem', borderRadius: '0.85rem', background: 'hsl(var(--primary))', color: '#fff', fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                Continue <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Field label="Group Size">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => set('people', String(n))}
                                            style={{
                                                padding: '0.65rem 0.25rem', borderRadius: '0.65rem',
                                                border: `1.5px solid ${form.people === String(n) ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                                                background: form.people === String(n) ? 'hsl(var(--primary)/0.08)' : '#fff',
                                                color: form.people === String(n) ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                                                fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                                                fontFamily: 'inherit', transition: 'all 0.15s',
                                            }}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => set('people', '8+')}
                                        style={{
                                            padding: '0.65rem 0.25rem', borderRadius: '0.65rem',
                                            border: `1.5px solid ${form.people === '8+' ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                                            background: form.people === '8+' ? 'hsl(var(--primary)/0.08)' : '#fff',
                                            color: form.people === '8+' ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                                            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                                            fontFamily: 'inherit', transition: 'all 0.15s',
                                        }}
                                    >
                                        8+
                                    </button>
                                </div>
                            </Field>
                            <Field label="Additional Notes">
                                <textarea
                                    rows={3}
                                    placeholder="Special requests, fitness level, dietary needs..."
                                    value={form.notes}
                                    onChange={e => set('notes', e.target.value)}
                                    style={{ ...inputBase, resize: 'none', lineHeight: 1.65 }}
                                    {...focusHandlers}
                                />
                            </Field>
                        </div>
                        <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.5rem' }}>
                            <button type="button" onClick={() => setStep(2)} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.95rem 1.1rem', borderRadius: '0.85rem', background: 'hsl(var(--muted))', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem', color: 'hsl(var(--foreground))' }}>
                                <ArrowLeft size={15} />
                            </button>
                            <button
                                type="submit"
                                style={{
                                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.95rem', borderRadius: '0.85rem',
                                    background: '#25D366', color: '#fff',
                                    fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
                                }}
                            >
                                <Send size={15} /> Send via WhatsApp
                            </button>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.75rem' }}>
                            Opens WhatsApp with your details pre-filled ✓
                        </p>
                    </motion.div>
                );
            default: return null;
        }
    };

    // On mobile: slide-up sheet. On desktop: centered dialog.
    const overlay = isMobile
        ? { alignItems: 'flex-end', padding: 0 }
        : { alignItems: 'center', justifyContent: 'center', padding: '1.5rem' };

    const panelVariants = isMobile
        ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
        : { initial: { opacity: 0, scale: 0.92, y: 16 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.92, y: 16 } };

    const panelStyle = isMobile
        ? {
            background: '#fff',
            borderRadius: '1.5rem 1.5rem 0 0',
            padding: '0',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            position: 'relative',
        }
        : {
            background: '#fff',
            borderRadius: '2rem',
            width: '100%',
            maxWidth: '900px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            overflow: 'hidden',
        };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
                        display: 'flex',
                        ...overlay,
                    }}
                >
                    <motion.div
                        {...panelVariants}
                        transition={isMobile ? { type: 'spring', damping: 30, stiffness: 300 } : { type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={e => e.stopPropagation()}
                        style={panelStyle}
                    >
                        {/* ── Desktop: Left hero panel ── */}
                        {!isMobile && (
                            <div style={{
                                width: '280px', flexShrink: 0,
                                background: 'linear-gradient(160deg, hsl(220,42%,14%) 0%, hsl(var(--primary)) 100%)',
                                padding: '3rem 2rem',
                                display: 'flex', flexDirection: 'column',
                                position: 'relative', overflow: 'hidden',
                                color: '#fff',
                            }}>
                                {/* Decorative blobs */}
                                <div style={{ position: 'absolute', top: '-3rem', right: '-3rem', width: '12rem', height: '12rem', background: 'hsl(var(--secondary)/0.1)', borderRadius: '50%', filter: 'blur(30px)' }} />
                                <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', width: '10rem', height: '10rem', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(20px)' }} />
                                <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.06, width: '100%' }} viewBox="0 0 280 180" preserveAspectRatio="none" height="180">
                                    <path d="M0,180 L0,120 L50,70 L90,100 L140,30 L190,80 L240,50 L280,70 L280,180 Z" fill="white" />
                                </svg>

                                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                                    {/* Logo / brand */}
                                    <div style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '2rem', color: '#fff' }}>
                                        KYRGYZ<span style={{ color: 'hsl(var(--secondary))' }}>RIDERS</span>
                                    </div>

                                    <h2 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                                        Book Your<br />
                                        <span style={{ color: 'hsl(var(--secondary))' }}>Adventure</span>
                                    </h2>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.65, marginBottom: '2rem' }}>
                                        Fill in the form and we'll open WhatsApp with your request pre-filled.
                                    </p>

                                    {/* Trust badges */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {TRUST.map((t, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', opacity: 0.75 }}>
                                                <span style={{ color: 'hsl(var(--secondary))', flexShrink: 0 }}>{t.icon}</span>
                                                {t.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Step indicator on left panel */}
                                <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {STEPS.map((s, i) => (
                                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                                                background: step > s.id ? '#25D366' : step === s.id ? 'hsl(var(--secondary))' : 'rgba(255,255,255,0.15)',
                                                color: step >= s.id ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.5)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.7rem', fontWeight: 800, transition: 'all 0.3s',
                                            }}>
                                                {step > s.id ? <Check size={13} /> : s.id}
                                            </div>
                                            <span style={{ fontSize: '0.82rem', fontWeight: step === s.id ? 700 : 500, opacity: step === s.id ? 1 : 0.5, transition: 'all 0.3s' }}>
                                                {s.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Right: Form ── */}
                        <div style={{ flex: 1, padding: isMobile ? '1.75rem 1.25rem 2rem' : '2.5rem 2.5rem 2.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                            {/* Mobile: drag handle */}
                            {isMobile && (
                                <div style={{ width: '40px', height: '4px', borderRadius: '999px', background: 'hsl(var(--border))', margin: '0 auto 1.25rem' }} />
                            )}

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute', top: isMobile ? '0.85rem' : '1.25rem', right: isMobile ? '1rem' : '1.25rem',
                                    background: 'hsl(var(--muted))', border: 'none', borderRadius: '50%',
                                    width: '36px', height: '36px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: 'hsl(var(--foreground))',
                                    zIndex: 10,
                                }}
                            >
                                <X size={17} />
                            </button>

                            {/* Mobile: step bar */}
                            {isMobile && (
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    {STEPS.map(s => (
                                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: s.id < STEPS.length ? 1 : 'none' }}>
                                            <div style={{
                                                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                                                background: step > s.id ? '#25D366' : step === s.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                                                color: step >= s.id ? '#fff' : 'hsl(var(--muted-foreground))',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.65rem', fontWeight: 800, transition: 'all 0.3s',
                                            }}>
                                                {step > s.id ? <Check size={11} /> : s.id}
                                            </div>
                                            <span style={{ fontSize: '0.72rem', fontWeight: step === s.id ? 700 : 500, color: step === s.id ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                                                {s.label}
                                            </span>
                                            {s.id < STEPS.length && <div style={{ flex: 1, height: '1.5px', background: step > s.id ? '#25D366' : 'hsl(var(--border))', transition: 'background 0.3s' }} />}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Title */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                {isMobile && <div style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>Book Your Adventure</div>}
                                {!isMobile && <div style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>
                                    {step === 1 ? 'Who are you?' : step === 2 ? 'Which tour?' : 'Group details'}
                                </div>}
                                <p style={{ fontSize: '0.82rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>
                                    {step === 1 ? 'Let us know your name so we can personalise your booking.' : step === 2 ? 'Select a tour or leave it blank for a personalised recommendation.' : 'Last step — how many people and any special requests?'}
                                </p>
                            </div>

                            {/* Step content */}
                            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                                <AnimatePresence mode="wait">
                                    {renderStep()}
                                </AnimatePresence>
                            </form>

                            {/* Mobile: trust badges at bottom */}
                            {isMobile && (
                                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid hsl(var(--border))', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {TRUST.map((t, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                                            <span style={{ color: 'hsl(var(--accent))' }}>{t.icon}</span>
                                            {t.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
