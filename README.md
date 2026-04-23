# NeuroLink – Neurodevelopmental Support Platform

A comprehensive, multilingual web application designed to support children, teens, and parents navigating neurodevelopmental differences such as autism. Built with accessibility, engagement, and family collaboration at its core.

---

## 🌟 Features

### 👧 Kids Zone (Ages 6–12)
- **Memory Game** – Card-matching game to boost visual memory
- **Pattern Game** – Recognize and complete visual patterns
- **Attention Game** – Focus-building interactive exercises
- **Problem Solving** – Logic puzzles and critical thinking challenges
- **Daily Quiz** – AI-generated quizzes across multiple categories (science, math, animals, etc.)
- **Mood Logger** – Simple emoji-based mood tracking
- **Story Generator** – AI-powered creative story builder
- **Emotion Guide** – Learn to identify and understand emotions

### 🧑‍🎓 Teens Hub (Ages 13–18)
- **Scenario Quizzes** – AI-generated social skills scenarios with voice narration and illustrations
- **Communication Skills** – Practice real-world communication techniques
- **Breathing Exercise** – Guided breathing for anxiety and stress management
- **Journal** – Private reflective journaling space
- **Goal Tracker** – Set and monitor personal goals
- **Text-to-Speech** – Accessibility tool for reading support

### 👨‍👩‍👧 Parent Dashboard
- **Child Profile Management** – Add/manage multiple child profiles
- **Progress Tracking** – View game scores, quiz results, and mood history
- **Autism Awareness** – Educational resources about autism spectrum
- **Autism Identification Quiz** – Screening questionnaire with specialist recommendations

### 🌐 Multilingual Support
All UI text is fully translated into **7 languages**:
| Code | Language |
|------|----------|
| `en` | English |
| `hi` | हिन्दी (Hindi) |
| `mr` | मराठी (Marathi) |
| `ta` | தமிழ் (Tamil) |
| `te` | తెలుగు (Telugu) |
| `bn` | বাংলা (Bengali) |
| `kn` | ಕನ್ನಡ (Kannada) |

### 🔊 Voice Support
- Text-to-speech across quiz scenarios and activities
- Language-aware voice selection (e.g., `ta-IN`, `mr-IN`)

### 🔐 Authentication
- Email/password sign-up and login
- Demo mode for exploring without an account
- Session persistence with auto-refresh tokens

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS v3, shadcn/ui |
| **Backend** | Lovable Cloud (Supabase) |
| **AI** | Lovable AI Gateway (Gemini models) |
| **Speech** | Web Speech API |
| **State** | React Context (Auth, Language) |
| **Routing** | React Router v6 |

---

## 📁 Project Structure

```
src/
├── assets/              # Generated images (scenario illustrations)
├── components/          # Shared components (LanguageSelector, SpeakButton, etc.)
│   └── ui/              # shadcn/ui primitives
├── contexts/            # React contexts (AuthContext, LanguageContext)
├── hooks/               # Custom hooks (useT, useSpeech, use-mobile)
├── i18n/                # Translation files
│   ├── translations.ts  # Main UI translations (7 languages)
│   └── quizTranslations.ts  # Quiz & awareness content translations
├── integrations/        # Supabase client & types (auto-generated)
├── pages/
│   ├── kids/            # Kids Zone pages
│   ├── teens/           # Teens Hub pages
│   ├── parent/          # Parent Dashboard pages
│   ├── Index.tsx        # Landing page
│   ├── AuthPage.tsx     # Login/Signup
│   └── AutismQuiz.tsx   # Screening quiz
└── lib/                 # Utilities

supabase/
├── config.toml          # Supabase project config
└── functions/
    └── generate-quiz/   # AI quiz generation edge function
```

---

## 🗄 Database Schema

| Table | Purpose |
|-------|---------|
| `children` | Child profiles linked to parent users |
| `profiles` | User display names |
| `game_scores` | Scores from kids' cognitive games |
| `mood_logs` | Daily mood entries per child |
| `quiz_results` | Quiz scores (daily quiz, scenario quiz) |

All tables use Row-Level Security (RLS) to ensure parents can only access their own children's data.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:8080`.

---

## 📝 Environment Variables

Automatically configured via Lovable Cloud:
- `VITE_SUPABASE_URL` – Backend API URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` – Public API key
- `VITE_SUPABASE_PROJECT_ID` – Project identifier

---

## 🧪 Testing

```bash
npm run test
```

Uses Vitest for unit tests and Playwright for E2E testing.

---

## 🌐 Deployment

Open [Lovable](https://lovable.dev) → Share → Publish.

**Published URL**: https://kindred-spark-learn.lovable.app

---

## 📄 License

This project is proprietary. All rights reserved.
