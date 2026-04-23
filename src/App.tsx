import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import AutismQuiz from "./pages/AutismQuiz.tsx";
import KidsHub from "./pages/kids/KidsHub.tsx";
import MemoryGame from "./pages/kids/MemoryGame.tsx";
import MoodLogger from "./pages/kids/MoodLogger.tsx";
import EmotionGuide from "./pages/kids/EmotionGuide.tsx";
import DailyQuiz from "./pages/kids/DailyQuiz.tsx";
import StoryGenerator from "./pages/kids/StoryGenerator.tsx";
import PatternGame from "./pages/kids/PatternGame.tsx";
import AttentionGame from "./pages/kids/AttentionGame.tsx";
import ProblemSolving from "./pages/kids/ProblemSolving.tsx";
import TeensHub from "./pages/teens/TeensHub.tsx";
import ScenarioQuiz from "./pages/teens/ScenarioQuiz.tsx";
import CommunicationSkills from "./pages/teens/CommunicationSkills.tsx";
import TextToSpeech from "./pages/teens/TextToSpeech.tsx";
import BreathingExercise from "./pages/teens/BreathingExercise.tsx";
import JournalPage from "./pages/teens/JournalPage.tsx";
import GoalTracker from "./pages/teens/GoalTracker.tsx";
import ParentDashboard from "./pages/parent/ParentDashboard.tsx";
import AutismAwareness from "./pages/parent/AutismAwareness.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/quiz" element={<AutismQuiz />} />
            <Route path="/kids" element={<KidsHub />} />
            <Route path="/kids/memory-game" element={<MemoryGame />} />
            <Route path="/kids/pattern-game" element={<PatternGame />} />
            <Route path="/kids/attention-game" element={<AttentionGame />} />
            <Route path="/kids/problem-solving" element={<ProblemSolving />} />
            <Route path="/kids/mood" element={<MoodLogger />} />
            <Route path="/kids/emotions" element={<EmotionGuide />} />
            <Route path="/kids/quiz" element={<DailyQuiz />} />
            <Route path="/kids/stories" element={<StoryGenerator />} />
            <Route path="/teens" element={<TeensHub />} />
            <Route path="/teens/scenarios" element={<ScenarioQuiz />} />
            <Route path="/teens/communication" element={<CommunicationSkills />} />
            <Route path="/teens/tts" element={<TextToSpeech />} />
            <Route path="/teens/breathing" element={<BreathingExercise />} />
            <Route path="/teens/journal" element={<JournalPage />} />
            <Route path="/teens/goals" element={<GoalTracker />} />
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/parent/awareness" element={<AutismAwareness />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
