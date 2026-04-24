# 💧 FlowState — React + Tailwind

A calm, premium wellness app for hydration tracking, habit building, journaling, and daily wisdom quotes.

**Brand:** FlowState / Hydrate With Ashiya  
**Stack:** React 18 · React Router v6 · Framer Motion · Tailwind CSS · Vite  
**Deploy:** Netlify (SPA routing configured)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed navbar + mobile bottom nav
│   ├── PageLayout.jsx      # Shared page wrapper, Container, PageHeader
│   ├── QuoteBanner.jsx     # AI-powered daily quote (with fallback)
│   ├── StatCard.jsx        # Dashboard stat cards with progress bars
│   └── WaterProgress.jsx   # Animated water drop SVG
├── context/
│   ├── ThemeContext.jsx     # Dark/light mode toggle
│   └── ToastContext.jsx     # Global toast notifications
├── pages/
│   ├── Home.jsx            # Dashboard landing
│   ├── Water.jsx           # Hydration tracker
│   ├── Habits.jsx          # Habit tracker with streak calendar
│   ├── Journal.jsx         # Daily journal with mood tagging
│   ├── Quotes.jsx          # Wisdom quotes browser + save
│   └── Login.jsx           # Login / Signup UI
├── utils/
│   └── index.js            # Storage helpers, date utils, quotes bank
├── App.jsx                 # Router setup
├── main.jsx                # Entry point
└── index.css               # Tailwind + custom design tokens
```

---

## 🌐 Deploying to Vercel



---

## ✨ Features

| Page | Features |
|------|----------|
| **Home** | Hero, dashboard stats, habits preview, feature cards |
| **Water** | Preset/custom logging, animated drop, weekly bar chart, daily log |
| **Habits** | Create/delete habits, daily toggle, streak tracking, week strip |
| **Journal** | Daily prompts, mood tagging, entry history with expand/collapse |
| **Quotes** | AI daily quote, category browse, save favourites |
| **Login** | Sign in / Sign up UI (frontend only, no backend yet) |

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Font Display | Cormorant Garamond |
| Font Body | DM Sans |
| Primary | Ocean Blue `#2E86AB` |
| Secondary | Sage Green `#6B9E78` |
| Background | Sand `#FBF8F4` |
| Dark bg | Ink `#0D1F2D` |

---

## 📌 Notes

- All data stored in `localStorage` (no backend)
- AI quotes use Anthropic API (`claude-sonnet-4-20250514`) with local fallback
- Dark mode persisted across sessions
- Fully responsive: desktop nav + mobile bottom tab bar
