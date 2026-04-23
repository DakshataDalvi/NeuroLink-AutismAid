import { useState, useEffect } from "react";
import LayoutShell from "@/components/LayoutShell";
import SpeakButton from "@/components/SpeakButton";
import { useT } from "@/hooks/useT";
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface QuizQuestion { q: string; options: string[]; answer: number; image?: string; emoji?: string; }

const fallbackQuestions: QuizQuestion[] = [
  { q: "What planet is closest to the Sun?", options: ["🌍 Earth", "☀️ Mercury", "🪐 Venus", "🔴 Mars"], answer: 1, emoji: "☀️" },
  { q: "Which shape has 3 sides?", options: ["⬛ Square", "⭕ Circle", "🔺 Triangle", "📦 Rectangle"], answer: 2, emoji: "🔺" },
  { q: "What color do you get when you mix red and blue?", options: ["💚 Green", "💜 Purple", "🧡 Orange", "💛 Yellow"], answer: 1, emoji: "💜" },
  { q: "How many legs does a spider have?", options: ["6️⃣ 6", "8️⃣ 8", "🔟 10", "4️⃣ 4"], answer: 1, emoji: "🕷️" },
  { q: "Which animal is known as man's best friend?", options: ["🐱 Cat", "🐠 Fish", "🐶 Dog", "🐦 Bird"], answer: 2, emoji: "🐶" },
];

const categories = [
  "general knowledge", "science and nature", "animals and wildlife", "space and planets",
  "math puzzles", "history fun facts", "human body", "geography",
];

const DailyQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(fallbackQuestions);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, activeChild } = useAuth();
  const tr = useT();

  const fetchQuestions = async (category: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", { body: { ageGroup: "kids", category } });
      if (error) throw error;
      if (data?.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setQuestions(fallbackQuestions);
        toast.info("Using default questions");
      }
    } catch {
      setQuestions(fallbackQuestions);
      toast.error("Couldn't generate quiz. Using default questions.");
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (category: string) => {
    setSelectedCategory(category);
    setCurrent(0); setScore(0); setChosen(null); setFinished(false);
    fetchQuestions(category);
  };

  const question = questions[current];

  const handleAnswer = (index: number) => {
    if (chosen !== null) return;
    setChosen(index);
    if (index === question.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) { setCurrent((c) => c + 1); setChosen(null); }
      else {
        setFinished(true);
        if (user && activeChild) {
          supabase.from("quiz_results").insert({
            child_id: activeChild.id, parent_id: user.id, quiz_type: "daily_quiz",
            category: selectedCategory, score: score + (index === question.answer ? 1 : 0), max_score: questions.length,
          });
        }
      }
    }, 1200);
  };

  const restart = () => { if (selectedCategory) startQuiz(selectedCategory); };
  const backToCategories = () => { setSelectedCategory(null); setFinished(false); setCurrent(0); setScore(0); setChosen(null); setLoading(false); };

  if (!selectedCategory) {
    return (
      <LayoutShell title={`${tr.dailyQuiz} 🧠`} bgClass="bg-kids-bg" backTo="/kids">
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">{tr.chooseATopic}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => startQuiz(cat)}
                className="rounded-2xl bg-card p-5 text-left shadow-soft transition-all hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-ring/20">
                <span className="text-lg font-bold capitalize text-foreground">{cat}</span>
                <p className="mt-1 text-sm text-muted-foreground">{tr.funQuestions.replace("{category}", cat)}</p>
              </button>
            ))}
          </div>
        </div>
      </LayoutShell>
    );
  }

  if (loading) {
    return (
      <LayoutShell title={`${tr.dailyQuiz} 🧠`} bgClass="bg-kids-bg" backTo="/kids">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-card p-12 shadow-soft">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-semibold text-foreground">{tr.creatingQuiz}</p>
          <p className="text-sm text-muted-foreground">{tr.generatingQuestions.replace("{category}", selectedCategory)}</p>
        </div>
      </LayoutShell>
    );
  }

  if (finished) {
    return (
      <LayoutShell title={`${tr.dailyQuiz} 🧠`} bgClass="bg-kids-bg" backTo="/kids">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-soft">
          <span className="text-6xl">🎉</span>
          <h2 className="text-2xl font-bold text-foreground">{tr.youGot.replace("{score}", String(score)).replace("{total}", String(questions.length))}</h2>
          <p className="text-muted-foreground">{"⭐".repeat(score)} {tr.greatEffort}</p>
          <div className="flex gap-3">
            <button onClick={restart} className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground">
              <RefreshCw className="h-4 w-4" /> {tr.newQuestions}
            </button>
            <button onClick={backToCategories} className="rounded-full bg-muted px-6 py-2.5 font-semibold text-foreground">{tr.changeTopic}</button>
          </div>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell title={`${tr.dailyQuiz} 🧠`} bgClass="bg-kids-bg" backTo="/kids">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{tr.question} {current + 1} {tr.of} {questions.length}</span>
        <span>{tr.score}: {score} ⭐</span>
      </div>
      <div className="mb-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">{selectedCategory} · {tr.aiGenerated}</span>
      </div>
      <div className="rounded-2xl bg-card p-6 shadow-soft">
        {/* Question visual representation */}
        <div className="mb-6 flex flex-col items-center justify-center gap-4">
          {question.emoji && <div className="text-7xl mb-2 animate-bounce">{question.emoji}</div>}
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-center text-xl font-bold text-foreground">{question.q}</h2>
            <SpeakButton text={`${question.q}. Options: ${question.options.join(", ")}`} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((opt, i) => {
            const isChosen = chosen === i;
            const isCorrect = i === question.answer;
            let style = "bg-gradient-to-br from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/40 border border-transparent";
            if (chosen !== null) {
              if (isCorrect) style = "bg-gradient-to-br from-accent/40 to-accent/20 ring-2 ring-accent border border-accent/50";
              else if (isChosen) style = "bg-gradient-to-br from-destructive/30 to-destructive/10 ring-2 ring-destructive border border-destructive/50";
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)}
                className={`flex items-center gap-3 rounded-xl p-4 text-left font-medium text-foreground transition-all ${style} focus:outline-none focus:ring-4 focus:ring-ring/20 hover:scale-105`}>
                <span className="text-3xl">{opt.charAt(0)}</span>
                <span className="flex-1 text-lg">{opt.slice(1)}</span>
                {chosen !== null && isCorrect && <CheckCircle className="h-6 w-6 shrink-0 text-accent" />}
                {chosen !== null && isChosen && !isCorrect && <XCircle className="h-6 w-6 shrink-0 text-destructive" />}
              </button>
            );
          })}
        </div>
      </div>
    </LayoutShell>
  );
};

export default DailyQuiz;
