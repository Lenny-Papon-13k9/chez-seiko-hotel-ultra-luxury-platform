import { motion } from 'framer-motion';
import { CheckCircle2, Building2 } from 'lucide-react';
import type { Brand } from '../App';

interface Props {
  selectedBrand: Brand;
  onSelect: (brand: Brand) => void;
}

const brands = [
  {
    id: 'ACCOR' as Brand,
    name: 'ALL — Accor Live Limitless',
    subtitle: 'Sofitel, Pullman, MGallery & plus',
    description: 'Accédez aux plus grands palaces Accor avec des tarifs négociés exclusivement pour notre clientèle privée.',
    image: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    badge: 'Partenaire Premium',
  },
  {
    id: 'HILTON' as Brand,
    name: 'Hilton Hotels & Resorts',
    subtitle: 'Conrad, Waldorf Astoria & plus',
    description: "L'excellence Hilton à votre portée. Profitez de suites d'exception avec notre programme de conciergerie VIP.",
    image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    badge: 'Partenaire Exclusif',
  },
];

export default function BrandSelector({ selectedBrand, onSelect }: Props) {
  return (
    <section id="brands" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#030303] to-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <Building2 size={14} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-inter">
              Nos Enseignes Partenaires
            </span>
            <Building2 size={14} className="text-[#D4AF37]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white mb-4">
            Choisissez Votre{' '}
            <span className="gold-gradient font-semibold">Enseigne</span>
          </h2>
          <p className="text-white/40 text-sm font-inter max-w-md mx-auto leading-relaxed">
            Sélectionnez l&apos;enseigne de votre choix pour accéder à nos tarifs exclusifs.
          </p>
        </motion.div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand, index) => {
            const isSelected = selectedBrand === brand.id;
            return (
              <motion.button
                key={brand.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                onClick={() => onSelect(brand.id)}
                className="relative overflow-hidden text-left group transition-all duration-500"
                style={{
                  border: isSelected ? '1px solid rgba(212,175,55,0.6)' : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: isSelected ? '0 0 40px rgba(212,175,55,0.12), inset 0 0 40px rgba(212,175,55,0.03)' : 'none',
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-inter text-[#D4AF37] bg-black/60 border border-[#D4AF37]/30 px-3 py-1 backdrop-blur-sm">
                      {brand.badge}
                    </span>
                  </div>

                  {/* Selected check */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <CheckCircle2 size={24} className="text-[#D4AF37]" />
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 bg-[#060606]">
                  <h3 className="font-cormorant text-2xl font-semibold text-white mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-[#D4AF37]/60 text-xs tracking-widest uppercase font-inter mb-3">
                    {brand.subtitle}
                  </p>
                  <p className="text-white/40 text-sm font-inter leading-relaxed">
                    {brand.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    <div
                      className="h-px flex-1 transition-all duration-500"
                      style={{ background: isSelected ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.08)' }}
                    />
                    <span
                      className="text-xs tracking-[0.2em] uppercase font-inter transition-colors duration-300"
                      style={{ color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.3)' }}
                    >
                      {isSelected ? 'Sélectionné' : 'Sélectionner'}
                    </span>
                    <div
                      className="h-px flex-1 transition-all duration-500"
                      style={{ background: isSelected ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
