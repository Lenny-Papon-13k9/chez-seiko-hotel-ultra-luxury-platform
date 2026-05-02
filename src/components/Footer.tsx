import { motion } from 'framer-motion';
import { Crown, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-[#D4AF37]/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#D4AF37]/40 flex items-center justify-center">
              <Crown size={14} className="text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-cormorant text-lg font-semibold tracking-widest text-white">CHEZ JS</span>
              <span className="font-cormorant text-lg font-light tracking-widest text-[#D4AF37] ml-2">HOTEL</span>
            </div>
          </div>

          {/* Center text */}
          <p className="text-white/30 text-xs font-inter tracking-widest text-center">
            Conciergerie Privée d&apos;Élite — Réductions Exclusives jusqu&apos;à -70%
          </p>

          {/* Discord link */}
          <a
            href="https://discord.gg/bJ6HqRqNAT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors text-xs font-inter tracking-widest uppercase"
          >
            <ExternalLink size={12} />
            Discord
          </a>
        </motion.div>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-inter">
            © {new Date().getFullYear()} Chez JS Hotel — Système de Conciergerie Privée. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
