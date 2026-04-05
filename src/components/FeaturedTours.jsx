import React from 'react';
import { motion } from 'framer-motion';
import TourCard from './TourCard';
import { useTours } from '../context/TourStoreContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedTours = () => {
    const { allTours } = useTours();
    const featuredTours = allTours.filter(tour => tour.featured).slice(0, 3);

    return (
        <section id="tours" style={{ padding: '7rem 0', background: 'hsl(var(--muted) / 0.25)' }}>
            <div className="container">
                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem' }}>
                    <div>
                        <span style={{
                            display: 'block', fontSize: '0.75rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'hsl(var(--accent))', marginBottom: '0.75rem'
                        }}>
                            Adventure Awaits
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            Our Featured Tours
                        </h2>
                    </div>
                    <Link to="/tours" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
                        border: '1.5px solid hsl(var(--border))',
                        fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                        color: 'hsl(var(--foreground))', background: '#fff',
                        transition: 'border-color 0.2s, color 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'hsl(var(--primary))'; e.currentTarget.style.color = 'hsl(var(--primary))'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'hsl(var(--border))'; e.currentTarget.style.color = 'hsl(var(--foreground))'; }}
                    >
                        View All Tours <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Tour Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {featuredTours.map((tour, index) => (
                        <motion.div
                            key={tour.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{ height: '100%' }}
                        >
                            <TourCard {...tour} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTours;
