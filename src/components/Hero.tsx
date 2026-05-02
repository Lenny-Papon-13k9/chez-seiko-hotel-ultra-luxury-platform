import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBrands = () => {
    const el = document.getElementById('brands');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Palace de luxe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Stars badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
            ))}
          </div>
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-inter font-medium">
            Conciergerie Privée d&apos;Élite
          </span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none mb-4"
        >
          <span className="block text-white">CHEZ JS</span>
          <span className="block gold-gradient font-semibold">HOTEL</span>
        </motion.h1>

        {/* Discount badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full" />
            <div className="relative border border-[#D4AF37]/60 px-8 py-2">
              <span className="font-cormorant text-4xl md:text-5xl font-bold text-[#D4AF37] tracking-wider">
                -70%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/60 text-sm md:text-base tracking-[0.2em] uppercase font-inter font-light mb-12 max-w-lg mx-auto"
        >
          Le luxe accessible via l&apos;élite
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToBrands}
            className="shimmer-btn group relative px-10 py-4 bg-[#D4AF37] text-black text-xs font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <span className="relative z-10">Obtenir Mon Devis</span>
            <div className="absolute inset-0 bg-[#E8C84A] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>
          <a
            href="https://discord.gg/bJ6HqRqNAT"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-300"
          >
            Rejoindre Discord
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex justify-center gap-12 md:gap-20"
        >
          {[
            { value: '500+', label: 'Hôtels Partenaires' },
            { value: '70%', label: 'Réduction Moyenne' },
            { value: '24/7', label: 'Conciergerie' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-cormorant text-2xl md:text-3xl font-semibold text-[#D4AF37]">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs tracking-widest uppercase mt-1 font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToBrands}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase font-inter">Découvrir</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
