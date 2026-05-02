import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-[#D4AF37]/60 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors duration-300">
            <Crown size={14} className="text-[#D4AF37]" />
          </div>
          <div>
            <span className="font-cormorant text-lg font-semibold tracking-widest text-white">
              CHEZ JS
            </span>
            <span className="font-cormorant text-lg font-light tracking-widest text-[#D4AF37] ml-2">
              HOTEL
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Accueil', id: 'hero' },
            { label: 'Enseignes', id: 'brands' },
            { label: 'Réservation', id: 'booking-form' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-[#D4AF37] transition-colors duration-300 font-inter"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://discord.gg/bJ6HqRqNAT"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-inter hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300"
          >
            Discord
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#D4AF37]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-[#D4AF37]/10 px-6 py-6 flex flex-col gap-4">
          {[
            { label: 'Accueil', id: 'hero' },
            { label: 'Enseignes', id: 'brands' },
            { label: 'Réservation', id: 'booking-form' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#D4AF37] transition-colors text-left font-inter"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://discord.gg/bJ6HqRqNAT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-inter"
          >
            Discord
          </a>
        </div>
      )}
    </motion.nav>
  );
}
