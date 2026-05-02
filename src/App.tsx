import { useState, useCallback, Component, ReactNode } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandSelector from './components/BrandSelector';
import BookingForm from './components/BookingForm';
import SuccessModal from './components/SuccessModal';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ProgressBar from './components/ProgressBar';

export type Brand = 'ACCOR' | 'HILTON' | null;

export interface FormData {
  prenom: string;
  nom: string;
  dateArrivee: string;
  dateDepart: string;
  voyageurs: string;
  typeChambre: string;
  email: string;
  telephone: string;
  discord: string;
  demandes: string;
}

const WEBHOOK_URL =
  'https://discord.com/api/webhooks/1496845840764113046/DYcb5oER7PLsCINMaulTOXQEARtN1LjbVTbVcKV2sDfaTwjRbnNsT8L7KUaMeFMuvXeB';

// ─── Error Boundary ───────────────────────────────────────────────────────────
interface EBState { hasError: boolean; }
class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <div style={{ color: '#D4AF37', fontFamily: 'serif', fontSize: 32 }}>Chez JS Hotel</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Une erreur est survenue. Veuillez rafraîchir la page.</p>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 32px', background: '#D4AF37', color: '#000', border: 'none', cursor: 'pointer', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Rafraîchir
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBrandSelect = useCallback((brand: Brand) => {
    setSelectedBrand(brand);
    setTimeout(() => {
      const el = document.getElementById('booking-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      setIsSubmitting(true);

      const brandLabel =
        selectedBrand === 'ACCOR'
          ? 'ALL — Accor Live Limitless'
          : selectedBrand === 'HILTON'
          ? 'Hilton Hotels & Resorts'
          : 'Non selectionnee';

      const payload = {
        embeds: [
          {
            title: '💎 NOUVELLE RÉSERVATION — CHEZ JS HOTEL',
            color: 0xd4af37,
            fields: [
              { name: '👤 Client', value: `${data.prenom} ${data.nom}`, inline: true },
              { name: '🏨 Enseigne', value: brandLabel, inline: true },
              { name: '📅 Arrivée', value: data.dateArrivee || 'Non renseignée', inline: true },
              { name: '📅 Départ', value: data.dateDepart || 'Non renseigné', inline: true },
              { name: '👥 Voyageurs', value: data.voyageurs || 'Non renseigné', inline: true },
              { name: '🛏️ Chambre', value: data.typeChambre || 'Non renseigné', inline: true },
              { name: '📧 Email', value: data.email, inline: false },
              { name: '📱 Téléphone', value: data.telephone || 'Non renseigné', inline: true },
              { name: '🎮 Discord', value: data.discord, inline: true },
              ...(data.demandes ? [{ name: '📝 Demandes Spéciales', value: data.demandes, inline: false }] : []),
            ],
            footer: {
              text: `Système de Conciergerie Chez JS Hotel • ${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}`,
            },
            thumbnail: {
              url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=100',
            },
          },
        ],
      };

      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Webhook error:', err);
      } finally {
        setIsSubmitting(false);
        setShowSuccess(true);
      }
    },
    [selectedBrand]
  );

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <ErrorBoundary>
      <CustomCursor />
      <ProgressBar />
      <div className="min-h-screen bg-black text-white">
        <Navbar key="navbar" />
        <Hero key="hero" />
        <BrandSelector key="brand-selector" selectedBrand={selectedBrand} onSelect={handleBrandSelect} />
        <BookingForm
          key="booking-form"
          selectedBrand={selectedBrand}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
        <Footer key="footer" />
      </div>
      {showSuccess && <SuccessModal key="success-modal" onClose={handleCloseSuccess} />}
    </ErrorBoundary>
  );
}
// Petit script pour activer l'animation au scroll
window.addEventListener('scroll', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      reveal.classList.add('active');
    }
  });
});