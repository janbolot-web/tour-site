import React from 'react';
import { Shield, Map, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Benefits = () => {
    const benefits = [
        {
            icon: <Map size={32} />,
            label: "01",
            title: "Choose Your Destination",
            description: "Select from curated adventures across the Tien Shan mountains — from alpine lakes to historic caravanserais."
        },
        {
            icon: <Zap size={32} />,
            label: "02",
            title: "Personalize Your Trip",
            description: "Every tour is tailored to your preferences, fitness level, and travel style. Private groups only."
        },
        {
            icon: <Shield size={32} />,
            label: "03",
            title: "Travel Effortlessly",
            description: "We handle all logistics from transport and gear to permits. You just focus on the experience."
        },
        {
            icon: <Heart size={32} />,
            label: "04",
            title: "Sustainable Travel",
            description: "We work directly with local families to build genuine homestays, keeping tourism benefits in the community."
        }
    ];

    return (
        <section className="section overflow-hidden relative" style={{ backgroundColor: 'hsl(var(--primary))' }}>
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(255,255,255,0.04)', marginRight: '-8rem', marginTop: '-8rem' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ background: 'hsl(var(--secondary) / 0.1)', marginLeft: '-4rem', marginBottom: '-4rem' }} />

            <div className="container relative z-10">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: 'hsl(var(--secondary))' }}>How It Works</span>
                    <h2 className="text-4xl md:text-5xl text-white mb-6">Why Travelers Love Kyrgyz Riders</h2>
                    <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        We go beyond just tours — we create meaningful connections with the land and its people.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-[1.75rem] border transition-all duration-300"
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', y: -5 }}
                        >
                            <div className="absolute top-6 right-6 text-sm font-black" style={{ color: 'rgba(255,255,255,0.12)', fontSize: '3rem', lineHeight: 1 }}>
                                {benefit.label}
                            </div>
                            <div className="mb-6 transition-transform duration-300 group-hover:scale-110" style={{ color: 'hsl(var(--secondary))' }}>
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
