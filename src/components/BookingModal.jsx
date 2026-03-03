import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown } from 'lucide-react';
import { toursData } from '../data';

const WHATSAPP_NUMBER = '996999137500';

const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    borderRadius: '0.75rem',
    border: '1.5px solid hsl(var(--border))',
    fontSize: '0.95rem', fontFamily: 'inherit',
    outline: 'none', background: '#fff',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    color: 'hsl(var(--foreground))',
};

const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.07em',
    color: 'hsl(var(--muted-foreground))', marginBottom: '0.4rem',
};

const BookingModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        name: '',
        tour: '',
        date: '',
        people: '1',
        notes: '',
    });

    const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const lines = [
            `👋 Hello, I'd like to book a tour!`,
            ``,
            `👤 *Name:* ${form.name}`,
            `🏔 *Tour:* ${form.tour || 'Not specified'}`,
            `📅 *Date:* ${form.date || 'Flexible'}`,
            `👥 *Group size:* ${form.people} ${form.people === '1' ? 'person' : 'people'}`,
            form.notes ? `📝 *Notes:* ${form.notes}` : '',
        ].filter(Boolean).join('\n');

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
        window.open(url, '_blank');
        onClose();
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
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '1.5rem',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff', borderRadius: '2rem',
                            padding: '2.5rem', width: '100%', maxWidth: '520px',
                            boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
                            position: 'relative',
                            maxHeight: '90vh', overflowY: 'auto',
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute', top: '1.25rem', right: '1.25rem',
                                background: 'hsl(var(--muted))', border: 'none', borderRadius: '50%',
                                width: '36px', height: '36px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'hsl(var(--foreground))',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'hsl(var(--border))'}
                            onMouseLeave={e => e.currentTarget.style.background = 'hsl(var(--muted))'}
                        >
                            <X size={17} />
                        </button>

                        {/* Header */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.75rem' }}>🏔</span>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                                    Book Your Tour
                                </h2>
                            </div>
                            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                Fill in the details below and we'll open WhatsApp so you can send the booking request directly to our team.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            {/* Name */}
                            <div>
                                <label style={labelStyle}>Your Name *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Maria Schmidt"
                                    value={form.name}
                                    onChange={e => set('name', e.target.value)}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#25D366'}
                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                />
                            </div>

                            {/* Tour */}
                            <div>
                                <label style={labelStyle}>Select Tour</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={form.tour}
                                        onChange={e => set('tour', e.target.value)}
                                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer', background: '#fff' }}
                                        onFocus={e => e.target.style.borderColor = '#25D366'}
                                        onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                    >
                                        <option value="">— Choose a tour (optional) —</option>
                                        {toursData.map(t => (
                                            <option key={t.id} value={t.title}>{t.title} — {t.duration}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'hsl(var(--muted-foreground))' }} />
                                </div>
                            </div>

                            {/* Date + People */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Preferred Date</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={e => set('date', e.target.value)}
                                        style={{ ...inputStyle, cursor: 'pointer' }}
                                        onFocus={e => e.target.style.borderColor = '#25D366'}
                                        onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Group Size</label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            value={form.people}
                                            onChange={e => set('people', e.target.value)}
                                            style={{ ...inputStyle, appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}
                                            onFocus={e => e.target.style.borderColor = '#25D366'}
                                            onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                                            ))}
                                            <option value="8+">8+ people</option>
                                        </select>
                                        <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'hsl(var(--muted-foreground))' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label style={labelStyle}>Additional Notes</label>
                                <textarea
                                    rows={3}
                                    placeholder="Any special requests, fitness level, dietary needs..."
                                    value={form.notes}
                                    onChange={e => set('notes', e.target.value)}
                                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                                    onFocus={e => e.target.style.borderColor = '#25D366'}
                                    onBlur={e => e.target.style.borderColor = 'hsl(var(--border))'}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                    padding: '1rem 1.5rem', borderRadius: '0.85rem',
                                    background: '#25D366', color: '#fff',
                                    fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                                    fontFamily: 'inherit', transition: 'opacity 0.2s',
                                    marginTop: '0.25rem',
                                    boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <Send size={18} /> Send via WhatsApp
                            </button>

                            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'hsl(var(--muted-foreground))', marginTop: '-0.25rem' }}>
                                This will open WhatsApp with your details pre-filled.
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
