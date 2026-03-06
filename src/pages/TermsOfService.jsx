import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const SECTIONS = [
    {
        id: 'acceptance',
        title: '1. Acceptance of Terms',
        body: `By accessing or using the services offered by Kyrgyz Riders Travel ("we", "us", or "our"), including our website and tour booking services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.

These Terms apply to all visitors, users, and customers who access or use our services. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of our services following any changes constitutes your acceptance of the revised Terms.`,
    },
    {
        id: 'services',
        title: '2. Services Description',
        body: `Kyrgyz Riders Travel provides guided tour packages, horseback riding expeditions, trekking excursions, road trips, and related travel services throughout Kyrgyzstan. Our services include, but are not limited to:

• Guided multi-day tour packages
• Horseback riding experiences to Song-Kol Lake and surrounding regions
• Trekking and hiking expeditions in the Tian Shan mountains
• Road trips and vehicle-based tours across Kyrgyzstan
• Accommodation arrangements with local guesthouses and yurt camps
• Transportation to and from Bishkek

All tours are subject to availability and may be modified or cancelled due to weather conditions, safety concerns, or other circumstances beyond our control.`,
    },
    {
        id: 'booking',
        title: '3. Booking and Payment',
        body: `To confirm a booking, a deposit of 30% of the total tour price is required at the time of booking. The remaining balance must be paid no later than 14 days before the tour start date.

Payment methods accepted include:
• Bank transfer (SWIFT/SEPA)
• Cash payment upon arrival in Bishkek
• Other methods as agreed in writing with our team

All prices are quoted per person unless otherwise stated. Prices are subject to change until a booking is confirmed in writing by our team. Group discounts may be available upon request.

By making a booking, you confirm that you are of legal age to enter into a binding agreement and that the information provided is accurate and complete.`,
    },
    {
        id: 'cancellation',
        title: '4. Cancellation Policy',
        body: `We understand that plans can change. Our cancellation policy is as follows:

• Cancellation more than 30 days before departure: Full refund of deposit
• Cancellation 15–30 days before departure: 50% of total tour price forfeited
• Cancellation 8–14 days before departure: 75% of total tour price forfeited
• Cancellation 7 days or less before departure: No refund

In the event that Kyrgyz Riders Travel cancels a tour due to safety concerns, extreme weather, or unforeseen circumstances, you will receive a full refund or the option to reschedule at no additional charge.

We strongly recommend purchasing comprehensive travel insurance that includes trip cancellation coverage.`,
    },
    {
        id: 'health',
        title: '5. Health and Fitness Requirements',
        body: `Participation in our tours requires an adequate level of physical fitness. By booking a tour, you confirm that you are in good health and physically capable of completing the activities described in the tour itinerary.

You must notify us of any pre-existing medical conditions, allergies, or physical limitations at the time of booking. We reserve the right to exclude participants from certain activities if we reasonably believe participation poses a risk to their health or safety, or to the safety of the group.

High-altitude tours may reach elevations above 3,500 metres. Participants should consult their physician before booking if they have concerns about altitude sickness or cardiovascular health.`,
    },
    {
        id: 'liability',
        title: '6. Limitation of Liability',
        body: `Participation in adventure travel and outdoor activities involves inherent risks, including but not limited to: personal injury, illness, property damage, and death. By booking our services, you acknowledge and accept these risks.

Kyrgyz Riders Travel shall not be liable for:
• Personal injury, illness, or death arising from participation in tour activities
• Loss or damage to personal property
• Delays, missed connections, or itinerary changes due to weather, political events, or other factors outside our control
• Acts of third-party service providers (accommodation, transport, etc.)

To the maximum extent permitted by applicable law, our total liability to you for any claim arising from your use of our services shall not exceed the total amount paid by you for the relevant tour.`,
    },
    {
        id: 'insurance',
        title: '7. Travel Insurance',
        body: `Travel insurance is strongly recommended for all participants. Your insurance policy should cover, at minimum:

• Medical expenses and emergency evacuation
• Trip cancellation and interruption
• Personal liability
• Loss or theft of personal belongings

Kyrgyz Riders Travel does not provide travel insurance and is not responsible for any costs arising from events that would typically be covered by a travel insurance policy. Please ensure your policy is valid for adventure and high-altitude activities.`,
    },
    {
        id: 'conduct',
        title: '8. Participant Conduct',
        body: `We are committed to providing a safe and respectful environment for all participants, guides, and local communities. By joining our tours, you agree to:

• Follow the instructions of your guide at all times
• Treat fellow participants, guides, and local residents with respect
• Respect local customs, traditions, and sacred sites
• Avoid damaging natural environments, wildlife, or cultural heritage
• Refrain from the use of illegal substances during tours

We reserve the right to remove any participant from a tour without refund if their behaviour is deemed dangerous, disruptive, or disrespectful.`,
    },
    {
        id: 'privacy',
        title: '9. Privacy Policy',
        body: `We collect and process personal information (name, email, phone number) solely for the purpose of managing your booking and communicating with you about your tour. We do not sell or share your personal information with third parties, except as required to deliver our services (e.g., accommodation providers).

By providing your information, you consent to its use for the purposes described above. You may request access to or deletion of your personal data by contacting us at example@gmail.com.`,
    },
    {
        id: 'law',
        title: '10. Governing Law',
        body: `These Terms shall be governed by and construed in accordance with the laws of the Kyrgyz Republic. Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bishkek, Kyrgyzstan.

If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

For questions or concerns about these Terms, please contact us at example@gmail.com or via WhatsApp at +996 705 660 593.`,
    },
];

const TermsOfService = () => {
    const w = useWindowWidth();
    const isMobile = w < 640;
    const isTablet = w < 1024;

    const [openSection, setOpenSection] = useState(null);
    const [activeId, setActiveId] = useState('acceptance');

    const toggleSection = (id) => setOpenSection(prev => prev === id ? null : id);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
    };

    return (
        <div style={{ paddingTop: '80px', background: '#fafaf9', minHeight: '100vh' }}>

            {/* ── Hero ── */}
            <section style={{
                background: 'linear-gradient(150deg, hsl(220,42%,14%) 0%, hsl(var(--primary)) 100%)',
                padding: isMobile ? '2.5rem 1.25rem 3rem' : '4rem 0 5rem',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-4rem', right: '-4rem', width: '22rem', height: '22rem', background: 'hsl(var(--secondary)/0.07)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 2, paddingLeft: isMobile ? '0' : '1.5rem', paddingRight: isMobile ? '0' : '1.5rem' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>/</span>
                            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>Terms of Service</span>
                        </div>
                        <h1 style={{
                            fontSize: isMobile ? 'clamp(1.75rem, 9vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 3.5rem)',
                            fontWeight: 900, color: '#fff', letterSpacing: '-0.04em',
                            lineHeight: 1.1, marginBottom: '0.85rem',
                        }}>
                            Terms of Service
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: isMobile ? '0.875rem' : '1rem', lineHeight: 1.65, maxWidth: '560px' }}>
                            Please read these terms carefully before booking a tour with Kyrgyz Riders Travel. By completing a booking, you agree to all conditions outlined below.
                        </p>
                        <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                            Last updated: March 2026
                        </div>
                    </motion.div>
                </div>

                <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', display: 'block' }} viewBox="0 0 1440 50" preserveAspectRatio="none" height="50">
                    <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" fill="#fafaf9" />
                </svg>
            </section>

            {/* ── Main Content ── */}
            <section style={{ padding: isMobile ? '2rem 0 4rem' : '4rem 0 6rem' }}>
                <div className="container" style={{ paddingLeft: isMobile ? '1.25rem' : '1.5rem', paddingRight: isMobile ? '1.25rem' : '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isTablet ? '1fr' : '220px 1fr',
                        gap: isMobile ? '2rem' : '4rem',
                        alignItems: 'start',
                    }}>

                        {/* ── Sidebar TOC (desktop only) ── */}
                        {!isTablet && (
                            <div style={{ position: 'sticky', top: '6rem' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))', marginBottom: '0.85rem' }}>
                                    Contents
                                </div>
                                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                                    {SECTIONS.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => scrollTo(s.id)}
                                            style={{
                                                textAlign: 'left', background: 'none', border: 'none',
                                                padding: '0.4rem 0.75rem', borderRadius: '0.5rem',
                                                fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit',
                                                fontWeight: activeId === s.id ? 700 : 500,
                                                color: activeId === s.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                                                background: activeId === s.id ? 'hsl(var(--primary)/0.08)' : 'transparent',
                                                borderLeft: `2px solid ${activeId === s.id ? 'hsl(var(--primary))' : 'transparent'}`,
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            {s.title}
                                        </button>
                                    ))}
                                </nav>

                                {/* Contact box */}
                                <div style={{ marginTop: '2rem', background: '#fff', borderRadius: '1rem', padding: '1.1rem', border: '1px solid hsl(var(--border))' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', color: 'hsl(var(--muted-foreground))' }}>
                                        Questions?
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                                        Contact us if you have any questions about these terms.
                                    </p>
                                    <Link to="/contact" style={{ display: 'block', textAlign: 'center', padding: '0.55rem', borderRadius: '0.6rem', background: 'hsl(var(--primary))', color: '#fff', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* ── Sections ── */}
                        <div>
                            {/* Mobile: collapsible sections */}
                            {isMobile ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {SECTIONS.map((s) => {
                                        const open = openSection === s.id;
                                        return (
                                            <div key={s.id} style={{ background: '#fff', borderRadius: '1rem', border: '1px solid hsl(var(--border))', overflow: 'hidden' }}>
                                                <button
                                                    onClick={() => toggleSection(s.id)}
                                                    style={{
                                                        width: '100%', textAlign: 'left', padding: '1rem 1.1rem',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
                                                        background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                                        fontWeight: 700, fontSize: '0.9rem', color: 'hsl(var(--foreground))',
                                                    }}
                                                >
                                                    <span>{s.title}</span>
                                                    {open
                                                        ? <ChevronUp size={16} style={{ flexShrink: 0, color: 'hsl(var(--primary))' }} />
                                                        : <ChevronDown size={16} style={{ flexShrink: 0, color: 'hsl(var(--muted-foreground))' }} />
                                                    }
                                                </button>
                                                {open && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        style={{ overflow: 'hidden', borderTop: '1px solid hsl(var(--border))' }}
                                                    >
                                                        <div style={{ padding: '1rem 1.1rem' }}>
                                                            {s.body.split('\n\n').map((para, i) => (
                                                                <p key={i} style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.75, marginBottom: i < s.body.split('\n\n').length - 1 ? '0.85rem' : 0 }}>
                                                                    {para}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                /* Desktop: full sections */
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    {SECTIONS.map((s, idx) => (
                                        <motion.section
                                            key={s.id}
                                            id={s.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.03 }}
                                            viewport={{ once: true }}
                                            onViewportEnter={() => setActiveId(s.id)}
                                            style={{ scrollMarginTop: '7rem' }}
                                        >
                                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.1rem', paddingBottom: '0.75rem', borderBottom: '1.5px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                                                {s.title}
                                            </h2>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                                {s.body.split('\n\n').map((para, i) => (
                                                    <p key={i} style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.8 }}>
                                                        {para}
                                                    </p>
                                                ))}
                                            </div>
                                        </motion.section>
                                    ))}
                                </div>
                            )}

                            {/* ── Footer note ── */}
                            <div style={{ marginTop: isMobile ? '2rem' : '3.5rem', padding: isMobile ? '1.1rem 1.25rem' : '1.5rem 2rem', background: '#fff', borderRadius: '1.25rem', border: '1px solid hsl(var(--border))' }}>
                                <p style={{ fontSize: isMobile ? '0.82rem' : '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.75, marginBottom: '0.85rem' }}>
                                    If you have questions about our Terms of Service, please don't hesitate to reach out. We're happy to clarify anything before you confirm your booking.
                                </p>
                                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                                    <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.55rem 1.1rem', borderRadius: '0.65rem', background: 'hsl(var(--primary))', color: '#fff', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}>
                                        Contact Us
                                    </Link>
                                    <a href="https://wa.me/996705660593" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.55rem 1.1rem', borderRadius: '0.65rem', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}>
                                        WhatsApp Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
