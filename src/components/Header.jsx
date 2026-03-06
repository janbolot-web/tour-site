import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/', emoji: '' },
    { name: 'Tours', href: '/tours', emoji: '' },
    { name: 'Sights', href: '/sights', emoji: '' },
    { name: 'Gallery', href: '/gallery', emoji: '' },
    { name: 'About Us', href: '/about', emoji: '' },
    { name: 'Contact', href: '/contact', emoji: '' },
  ];

  const isLight = isScrolled || location.pathname !== '/';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isLight ? 'glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline" style={{ zIndex: 1001, position: 'relative' }}>
            <div className="text-2xl font-bold tracking-tighter" style={{ color: isMobileMenuOpen ? '#fff' : (isLight ? 'hsl(var(--primary))' : 'white') }}>
              KYRGYZ<span style={{ color: 'hsl(var(--secondary))' }}>RIDERS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('/#');
              return isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium transition-colors hover:text-secondary"
                  style={{ color: isLight ? 'hsl(var(--primary))' : 'white' }}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-medium transition-colors hover:text-secondary"
                  style={{ color: isLight ? 'hsl(var(--primary))' : 'white' }}
                >
                  {link.name}
                </Link>
              );
            })}
            <button onClick={onBookNow} className="btn btn-primary" style={{ cursor: 'pointer', border: 'none' }}>Book Now</button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            style={{
              color: isMobileMenuOpen ? '#fff' : (isLight ? 'hsl(var(--primary))' : 'white'),
              background: 'none', border: 'none', cursor: 'pointer',
              position: 'relative', zIndex: 1001,
              padding: '0.5rem',
              transition: 'color 0.3s',
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'block' }}>
                  <X size={28} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'block' }}>
                  <Menu size={28} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(220,40%,20%) 60%, hsl(var(--primary)) 100%)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Background texture */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(var(--secondary)/0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--accent)/0.08) 0%, transparent 40%)',
              pointerEvents: 'none',
            }} />

            {/* Decorative mountain line */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.06 }} viewBox="0 0 400 200" preserveAspectRatio="none" height="260">
              <polyline points="0,200 60,100 110,140 180,50 240,120 300,70 360,110 400,80 400,200" fill="white" />
            </svg>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute', top: '1.1rem', right: '1rem', zIndex: 20,
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', borderRadius: '999px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.03em',
                backdropFilter: 'blur(8px)',
              }}
            >
              <X size={16} /> Close
            </button>

            {/* Nav links */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 2rem 2rem' }}>
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        textDecoration: 'none', padding: '0.85rem 0',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        color: isActive ? 'hsl(var(--secondary))' : 'rgba(255,255,255,0.9)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {/* Number */}
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.3)', width: '1.5rem', flexShrink: 0,
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        0{i + 1}
                      </span>

                      {/* Label */}
                      <span style={{
                        fontSize: 'clamp(1.6rem, 7vw, 2.1rem)',
                        fontWeight: 900, letterSpacing: '-0.03em', flex: 1, lineHeight: 1,
                        color: isActive ? 'hsl(var(--secondary))' : 'inherit',
                      }}>
                        {link.name}
                      </span>

                      {/* Emoji */}
                      <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>{link.emoji}</span>

                      {/* Arrow — only active */}
                      {isActive && (
                        <ArrowRight size={18} style={{ color: 'hsl(var(--secondary))', flexShrink: 0 }} />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom: Book Now + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              style={{ padding: '1.5rem 2rem 3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', zIndex: 10 }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileMenuOpen(false);
                  if (onBookNow) onBookNow();
                }}
                style={{
                  width: '100%', padding: '1rem', borderRadius: '1rem',
                  background: 'hsl(var(--secondary))', color: 'hsl(var(--primary))',
                  fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', letterSpacing: '-0.01em',
                }}
              >
                ✦ Book a Tour
              </button>
              <a
                href="https://wa.me/996705660593"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  width: '100%', padding: '0.9rem', borderRadius: '1rem',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>💬</span> WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
