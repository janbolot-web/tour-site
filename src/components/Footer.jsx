import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Tours', href: '/tours' },
        { name: 'Popular Sights', href: '/sights' },
        { name: 'About Us', href: '/about' },
    ];

    const sights = ['Song-Kol Lake', 'Kel-Suu Lake', 'Tash-Rabat', 'Altyn-Arashan', 'Ysyk-Kol Lake'];

    return (
        <footer style={{ backgroundColor: 'hsl(var(--primary))' }} className="text-white">
            <div className="container pt-20 pb-10">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="text-3xl font-black tracking-tighter mb-5">
                            KYRGYZ<span style={{ color: 'hsl(var(--secondary))' }}>RIDERS</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-8" style={{ opacity: 0.6 }}>
                            Connecting travelers with the authentic spirit of Kyrgyzstan. Small groups, big adventures.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: <Instagram size={18} />, href: '#' },
                                { icon: <Facebook size={18} />, href: '#' },
                                { icon: <Youtube size={18} />, href: '#' },
                            ].map((s, i) => (
                                <a key={i} href={s.href}
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-secondary hover:border-secondary transition-all duration-300"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'hsl(var(--secondary))' }}>Navigation</div>
                        <ul className="flex flex-col gap-4">
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm hover:text-secondary transition-colors duration-200" style={{ opacity: 0.7 }}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Sights */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'hsl(var(--secondary))' }}>Top Sights</div>
                        <ul className="flex flex-col gap-4">
                            {sights.map(sight => (
                                <li key={sight}>
                                    <Link to="/sights" className="text-sm hover:text-secondary transition-colors duration-200" style={{ opacity: 0.7 }}>
                                        {sight}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'hsl(var(--secondary))' }}>Get In Touch</div>
                        <div className="flex flex-col gap-5">
                            {[
                                { icon: <Phone size={16} />, val: '+996 705 660 593' },
                                { icon: <Mail size={16} />, val: 'example@gmail.com' },
                                { icon: <MapPin size={16} />, val: 'Bishkek, Kyrgyzstan' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 text-sm" style={{ opacity: 0.7 }}>
                                    <span style={{ color: 'hsl(var(--secondary))', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                                    <span>{item.val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/5">
                            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(var(--secondary))' }}>WhatsApp</p>
                            <a
                                href="https://wa.me/996705660593"
                                className="btn text-sm px-5 py-2.5 rounded-xl font-bold text-primary"
                                style={{ backgroundColor: '#25D366', color: '#fff' }}
                            >
                                Chat with Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs" style={{ borderColor: 'rgba(255,255,255,0.1)', opacity: 0.5 }}>
                    <p>© 2026 Kyrgyz Riders Travel. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
