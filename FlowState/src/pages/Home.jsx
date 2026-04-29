import PageLayout from '../components/PageLayout'
import HeroSection    from '../sections/HeroSection'
import DashboardStats from '../sections/DashboardStats'
import WisdomCarousel from '../sections/WisdomCarousel'
import HabitsPreview  from '../sections/HabitsPreview'
import IndiaSections  from '../sections/IndiaSections'

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
   Keyframe animations and shared class names (.fs-dash-card,
   .fs-habit-row, .fs-slide-dot etc.) used across all sections.
   Injected once here so every child component can use them.
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

:root {
  --saffron:   #E87722;
  --gold:      #c9a84c;
  --gold-lt:   #e8c97a;
  --gold-dim:  #8b6914;
  --cream:     #FDF6E3;
  --cream2:    #F5EDD8;
  --bark:      #5C3D1E;
  --bark-lt:   #8B5E2F;
  --lotus:     #D4607A;
  --forest:    #1B4332;
  --forest-lt: #2D6A4F;
  --parchment: #EFD9A8;
}

@keyframes petalFall {
  0%   { transform: translateY(-60px) rotate(0deg) translateX(0); opacity: 0; }
  10%  { opacity: 0.85; }
  80%  { opacity: 0.65; }
  100% { transform: translateY(110vh) rotate(660deg) translateX(50px); opacity: 0; }
}
@keyframes slowSpin { to { transform: rotate(360deg); } }
@keyframes glowPulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}

.fs-petal {
  position: absolute;
  pointer-events: none;
  border-radius: 60% 40% 60% 40% / 60% 60% 40% 40%;
  animation: petalFall linear infinite;
}
.fs-mandala-spin { animation: slowSpin 70s linear infinite; }
.fs-glow         { animation: glowPulse 2.8s ease-in-out infinite; }

.fs-dash-card {
  background:
    linear-gradient(145deg, rgba(255,249,235,0.96) 0%, rgba(248,237,210,0.93) 100%);
  border: 1px solid rgba(201,168,76,0.24);
  border-radius: 22px;
  padding: 1.35rem 1.45rem;
  position: relative; overflow: hidden;
  box-shadow: 0 14px 36px rgba(92,61,30,0.10), inset 0 1px 0 rgba(255,255,255,0.9);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  min-height: 280px;
}
.fs-dash-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 44px rgba(92,61,30,0.15), inset 0 1px 0 rgba(255,255,255,0.95);
}
.fs-dash-card::before {
  content: none;
}

.fs-dashboard-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  width: min(1360px, calc(100vw - 80px));
  margin-left: 50%;
  transform: translateX(-50%);
}

.fs-real-icon {
  width: 84px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -0.15rem 0 0.9rem;
  filter: drop-shadow(0 9px 10px rgba(92,61,30,0.18));
}

.fs-real-icon--water {
  width: 110px;
  height: 110px;
  margin: -0.85rem 0 -0.2rem -0.7rem;
}

.fs-real-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.fs-real-icon--lotus {
  width: 88px;
  height: 88px;
  margin-top: -0.2rem;
  filter: drop-shadow(0 9px 10px rgba(121,64,79,0.18));
}

.fs-real-icon--diya {
  width: 96px;
  height: 96px;
  margin: -0.55rem 0 0.15rem -0.25rem;
  filter: drop-shadow(0 10px 12px rgba(145,78,22,0.22));
}

.fs-date-icon {
  box-shadow: 0 8px 16px rgba(126,75,150,0.18);
}

.fs-date-icon-img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  filter: drop-shadow(0 4px 5px rgba(94,45,80,0.16));
}

.fs-date-card {
  display: flex;
  flex-direction: column;
}

@media (max-width: 820px) {
  .fs-dashboard-stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: min(680px, calc(100vw - 36px));
    gap: 16px;
  }

  .fs-dash-card {
    min-height: 250px;
  }
}

@media (max-width: 460px) {
  .fs-dashboard-stats-grid {
    grid-template-columns: 1fr;
    width: min(320px, calc(100vw - 28px));
  }

  .fs-dash-card {
    min-height: 235px;
  }
}

.fs-feature-card {
  background: linear-gradient(135deg, rgba(253,246,227,0.96) 0%, rgba(245,237,216,0.93) 100%);
  border: 1px solid rgba(201,168,76,0.28);
  border-radius: 20px; padding: 1.5rem;
  position: relative; overflow: hidden;
  box-shadow: 0 2px 14px rgba(92,61,30,0.08);
  transition: all 0.25s ease; height: 100%;
}
.fs-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 34px rgba(92,61,30,0.15);
  border-color: rgba(201,168,76,0.55);
}

.fs-legacy-card {
  background: linear-gradient(145deg, rgba(253,246,227,0.97) 0%, rgba(239,217,168,0.9) 100%);
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 18px; padding: 1.3rem;
  transition: all 0.2s;
  box-shadow: 0 2px 12px rgba(92,61,30,0.07);
}
.fs-legacy-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 26px rgba(92,61,30,0.14);
}

.fs-habit-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; border-radius: 14px;
  background: rgba(253,246,227,0.82);
  border: 1px solid rgba(201,168,76,0.18);
  transition: all 0.2s;
}
.fs-habit-row:hover {
  background: rgba(239,217,168,0.92);
  border-color: rgba(201,168,76,0.38);
}

.fs-slide-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,0.4);
  transition: all 0.3s; cursor: pointer; border: none;
}
.fs-slide-dot.active {
  background: white; width: 20px; border-radius: 3px;
}

.fs-sanskrit-banner {
  background: linear-gradient(135deg, #1B4332 0%, #0d3d26 50%, #1B4332 100%);
  border-top: 2px solid #8b6914;
  border-bottom: 2px solid #8b6914;
  padding: 1.2rem 2rem; text-align: center;
  position: relative; overflow: hidden;
}
.fs-sanskrit-banner::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 20px,
    rgba(201,168,76,0.03) 20px, rgba(201,168,76,0.03) 21px
  );
}
`

/* ─────────────────────────────────────────────────────────────
   HOME PAGE  (default export)

   This file only composes sections. No logic, no data,
   no inline styles beyond the parchment wrapper.

   To edit a section → open its file in src/sections/
   To edit a shared component → open src/components/
   To edit carousel slides → open WisdomCarousel.jsx
   To edit feature cards → open IndiaSections.jsx
   To edit streak logic → open hooks/useHydrationStreak.js
───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <PageLayout>
      <style>{GLOBAL_CSS}</style>

      <HeroSection />

      <div style={{
        background: 'linear-gradient(180deg, #FDF6E3 0%, #F5EDD8 35%, #EFD9A8 100%)',
        paddingBottom: '5rem',
      }}>
        {/* Decorative top border band */}
        <div style={{
          height: 8,
          background: 'linear-gradient(90deg, var(--saffron), var(--gold), var(--forest), var(--gold), var(--saffron))',
        }} />
        <div style={{
          textAlign: 'center',
          padding: '5px 0',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
        }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: '#8b6914',
          }}>
            ✦ ✦ ✦
          </span>
        </div>

        {/* All page sections */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.2rem 0' }}>
          <DashboardStats />
          <WisdomCarousel />
          <HabitsPreview />
          <IndiaSections />
        </div>
      </div>
    </PageLayout>
  )
}
