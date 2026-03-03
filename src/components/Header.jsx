import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Sights', href: '/sights' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="text-2xl font-bold tracking-tighter" style={{ color: isScrolled || location.pathname !== '/' ? 'hsl(var(--primary))' : 'white' }}>
            KYRGYZ<span className="text-secondary">RIDERS</span>
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
                className={`font-medium transition-colors hover:text-secondary ${isScrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'}`}
                style={{ color: isScrolled || location.pathname !== '/' ? 'hsl(var(--primary))' : 'white' }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors hover:text-secondary ${isScrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'}`}
                style={{ color: isScrolled || location.pathname !== '/' ? 'hsl(var(--primary))' : 'white' }}
              >
                {link.name}
              </Link>
            )
          })}
          <button onClick={onBookNow} className="btn btn-primary" style={{ cursor: 'pointer', border: 'none' }}>Book Now</button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ color: isScrolled || location.pathname !== '/' ? 'hsl(var(--primary))' : 'white' }}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith('/#');
            return isExternal ? (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-semibold text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-semibold text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          })}
          <button onClick={() => { onBookNow(); setIsMobileMenuOpen(false); }} className="btn btn-primary w-full mt-2" style={{ cursor: 'pointer', border: 'none' }}>Book Now</button>
        </div>
      )}
    </header>
  );
};

export default Header;
