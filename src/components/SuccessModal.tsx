import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const DISCORD_URL = 'https://discord.gg/bJ6HqRqNAT';

export default function SuccessModal({ onClose }: Props) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.open(DISCORD_URL, '_blank');
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full bg-[#080808] border border-[#D4AF37]/30 p-10 text-center"
          style={{ boxShadow: '0 0 80px rgba(212,175,55,0.15)' }}
        >
          {/* Top/bottom gold lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center"
          >
            <CheckCircle size={36} className="text-[#D4AF37]" />
          </motion.div>

          <h3 className="font-cormorant text-3xl font-semibold text-white mb-3">
            Demande Envoyée !
          </h3>
          <p className="text-white/50 text-sm font-inter leading-relaxed mb-8">
            Votre demande de réservation a été transmise à notre conciergerie. Nous vous contacterons sous 24h via Discord.
          </p>

          {/* Countdown */}
          <div className="mb-6 p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20">
            <p className="text-[#D4AF37]/70 text-xs font-inter tracking-widest uppercase mb-1">
              Redirection automatique dans
            </p>
            <span className="font-cormorant text-5xl font-bold text-[#D4AF37]">{countdown}</span>
            <p className="text-white/40 text-xs font-inter mt-1">secondes</p>
          </div>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#D4AF37] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#E8C84A] transition-colors duration-300 mb-3"
          >
            <ExternalLink size={14} />
            Rejoindre Notre Discord
          </a>

          <button
            onClick={onClose}
            className="text-white/30 text-xs font-inter hover:text-white/60 transition-colors"
          >
            Fermer
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
