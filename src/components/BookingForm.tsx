import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Phone, Mail, Calendar, Users, BedDouble,
  MessageSquare, Send, AlertCircle,
} from 'lucide-react';
import type { Brand, FormData } from '../App';

interface Props {
  selectedBrand: Brand;
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting: boolean;
}

interface Errors {
  [key: string]: string;
}

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

const EMPTY_FORM: FormData = {
  prenom: '',
  nom: '',
  dateArrivee: '',
  dateDepart: '',
  voyageurs: '',
  typeChambre: '',
  email: '',
  telephone: '',
  discord: '',
  demandes: '',
};

export default function BookingForm({ selectedBrand, onSubmit, isSubmitting }: Props) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.prenom.trim()) e.prenom = 'Le prénom est requis';
    if (!formData.nom.trim()) e.nom = 'Le nom est requis';
    if (!formData.email.trim()) {
      e.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Format d'email invalide";
    }
    if (!formData.discord.trim()) e.discord = 'Le pseudo Discord est obligatoire';
    if (!selectedBrand) e.brand = 'Veuillez sélectionner une enseigne ci-dessus';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
    setFormData(EMPTY_FORM);
  };

  const inputClass = (field: string) => `input-field${errors[field] ? ' error' : ''}`;

  return (
    <section id="booking-form" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto">
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
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-inter">
              Demande de Réservation
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white mb-4">
            Votre Séjour{' '}
            <span className="gold-gradient font-semibold">Sur Mesure</span>
          </h2>
          <p className="text-white/50 text-sm font-inter max-w-md mx-auto leading-relaxed">
            Remplissez ce formulaire et notre conciergerie vous contactera sous 24h avec votre devis exclusif.
          </p>
        </motion.div>

        {/* Brand error */}
        {errors.brand && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-3 p-4 border border-red-500/30 bg-red-500/5"
          >
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm font-inter">{errors.brand}</span>
          </motion.div>
        )}

        {/* Selected brand indicator */}
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-3 p-4 border border-[#D4AF37]/20 bg-[#D4AF37]/5"
          >
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0" />
            <span className="text-[#D4AF37]/80 text-xs tracking-widest uppercase font-inter">
              Enseigne :{' '}
              <strong className="text-[#D4AF37]">
                {selectedBrand === 'ACCOR' ? 'ALL — Accor Live Limitless' : 'Hilton Hotels & Resorts'}
              </strong>
            </span>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Prénom */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Prénom <span className="text-[#D4AF37]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => set('prenom', e.target.value)}
                  placeholder="Jean"
                  className={inputClass('prenom')}
                />
              </div>
              {errors.prenom && (
                <p className="mt-1.5 text-red-400 text-xs font-inter flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.prenom}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Nom <span className="text-[#D4AF37]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => set('nom', e.target.value)}
                  placeholder="Dupont"
                  className={inputClass('nom')}
                />
              </div>
              {errors.nom && (
                <p className="mt-1.5 text-red-400 text-xs font-inter flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.nom}
                </p>
              )}
            </div>

            {/* Date Arrivée */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Date d&apos;Arrivée
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <Calendar size={16} />
                </div>
                <input
                  type="date"
                  value={formData.dateArrivee}
                  onChange={(e) => set('dateArrivee', e.target.value)}
                  className={`${inputClass('dateArrivee')} [color-scheme:dark]`}
                />
              </div>
            </div>

            {/* Date Départ */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Date de Départ
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <Calendar size={16} />
                </div>
                <input
                  type="date"
                  value={formData.dateDepart}
                  onChange={(e) => set('dateDepart', e.target.value)}
                  className={`${inputClass('dateDepart')} [color-scheme:dark]`}
                />
              </div>
            </div>

            {/* Voyageurs */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Nombre de Voyageurs
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <Users size={16} />
                </div>
                <select
                  value={formData.voyageurs}
                  onChange={(e) => set('voyageurs', e.target.value)}
                  className={`${inputClass('voyageurs')} appearance-none`}
                >
                  <option value="">Sélectionner</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? 'voyageur' : 'voyageurs'}
                    </option>
                  ))}
                  <option value="9+">9+ voyageurs</option>
                </select>
              </div>
            </div>

            {/* Type de Chambre */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Type de Chambre
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <BedDouble size={16} />
                </div>
                <select
                  value={formData.typeChambre}
                  onChange={(e) => set('typeChambre', e.target.value)}
                  className={`${inputClass('typeChambre')} appearance-none`}
                >
                  <option value="">Sélectionner</option>
                  <option value="Suite Royale">Suite Royale</option>
                  <option value="Suite Deluxe">Suite Deluxe</option>
                  <option value="Chambre Standard">Chambre Standard</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Adresse Email <span className="text-[#D4AF37]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="jean.dupont@email.com"
                  className={inputClass('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-red-400 text-xs font-inter flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.email}
                </p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => set('telephone', e.target.value)}
                  placeholder="+33 6 00 00 00 00"
                  className={inputClass('telephone')}
                />
              </div>
            </div>

            {/* Discord */}
            <div className="md:col-span-2">
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Pseudo Discord <span className="text-[#D4AF37]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 pointer-events-none">
                  <DiscordIcon />
                </div>
                <input
                  type="text"
                  value={formData.discord}
                  onChange={(e) => set('discord', e.target.value)}
                  placeholder="votre_pseudo"
                  className={inputClass('discord')}
                />
              </div>
              {errors.discord && (
                <p className="mt-1.5 text-red-400 text-xs font-inter flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.discord}
                </p>
              )}
            </div>

            {/* Demandes Spéciales */}
            <div className="md:col-span-2">
              <label className="block text-xs tracking-[0.2em] uppercase text-white/50 font-inter mb-2">
                Demandes Spéciales
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-[#D4AF37]/50 pointer-events-none">
                  <MessageSquare size={16} />
                </div>
                <textarea
                  value={formData.demandes}
                  onChange={(e) => set('demandes', e.target.value)}
                  placeholder="Occasions spéciales, préférences particulières, services additionnels..."
                  rows={4}
                  className="w-full bg-[#080808] border border-white/8 text-white placeholder-white/20 pl-11 pr-4 py-4 text-sm font-inter focus:outline-none focus:border-[#D4AF37]/50 transition-colors duration-300 resize-none"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            className={`w-full py-5 flex items-center justify-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
              isSubmitting
                ? 'bg-[#D4AF37]/50 text-black/50 cursor-not-allowed'
                : 'bg-[#D4AF37] text-black hover:shadow-[0_0_50px_rgba(212,175,55,0.35)] hover:bg-[#E8C84A]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={16} />
                Envoyer Ma Demande de Réservation
              </>
            )}
          </motion.button>

          <p className="text-center text-white/30 text-xs font-inter tracking-wide mt-4">
            Vos données sont traitées de manière confidentielle par notre conciergerie privée.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
