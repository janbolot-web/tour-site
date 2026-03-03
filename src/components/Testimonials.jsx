import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah M.",
            text: "The trip to Song-Kol was life-changing. The horses were well-trained and the landscape was breathtaking. Coming back next year for sure!",
            location: "Germany",
            stars: 5,
            tour: "Song-Kol Horseback, 3 Days"
        },
        {
            name: "James T.",
            text: "Expert guides who really know the history and culture of their country. I felt safe and welcomed throughout the entire 10-day trek.",
            location: "USA",
            stars: 5,
            tour: "Tien Shan Mountains Trek"
        },
        {
            name: "Elena K.",
            text: "If you want an authentic nomadic experience, this is the company to trust. The yurt stays and the people were the highlights of my year.",
            location: "Kazakhstan",
            stars: 5,
            tour: "Kyrgyzstan in a Week"
        }
    ];

    return (
        <section className="section overflow-hidden relative" style={{ background: 'linear-gradient(to br, hsl(var(--muted)) 0%, #fff 100%)' }}>
            <div className="container">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: 'hsl(var(--accent))' }}>Reviews</span>
                    <h2 className="text-4xl md:text-5xl mb-6">Travelers Love Kyrgyz Riders</h2>
                    <p className="max-w-xl mx-auto text-lg" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Real adventures, real stories. Hear from the people who've explored Kyrgyzstan with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white p-10 rounded-[2rem] shadow-sm border border-border relative hover:shadow-xl transition-all duration-500"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <Star key={i} size={16} fill="hsl(var(--secondary))" style={{ color: 'hsl(var(--secondary))' }} />
                                ))}
                            </div>

                            <p className="text-lg leading-relaxed mb-8 italic" style={{ color: 'hsl(var(--foreground) / 0.8)' }}>
                                "{t.text}"
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-border">
                                <div>
                                    <div className="font-bold text-base">{t.name}</div>
                                    <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{t.location}</div>
                                </div>
                                <div className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
                                    {t.tour}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
