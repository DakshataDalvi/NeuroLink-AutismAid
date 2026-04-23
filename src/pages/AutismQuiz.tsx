import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/contexts/LanguageContext";
import { getQuizQuestions, getSpecialists } from "@/i18n/quizTranslations";
import { ArrowRight, ArrowLeft, CheckCircle, UserRound, Stethoscope } from "lucide-react";

interface CategoryResult {
  category: string;
  score: number;
  maxScore: number;
  level: "Low" | "Moderate" | "Notable";
}

const AutismQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const tr = useT();
  const { lang } = useLanguage();

  const questions = getQuizQuestions(lang);
  const specialists = getSpecialists(lang);
  const question = questions[current];
  const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (score: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: score }));
  };

  const next = () => {
    if (current + 1 < questions.length) setCurrent((c) => c + 1);
    else setFinished(true);
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const getResults = (): CategoryResult[] => {
    const categories: Record<string, { score: number; count: number }> = {};
    questions.forEach((q) => {
      if (!categories[q.category]) categories[q.category] = { score: 0, count: 0 };
      categories[q.category].count++;
      categories[q.category].score += answers[q.id] ?? 0;
    });
    return Object.entries(categories).map(([category, data]) => {
      const maxScore = data.count * 3;
      const pct = data.score / maxScore;
      const level: CategoryResult["level"] = pct < 0.33 ? "Low" : pct < 0.66 ? "Moderate" : "Notable";
      return { category, score: data.score, maxScore, level };
    });
  };

  const levelLabel = (l: string) => l === "Low" ? tr.low : l === "Moderate" ? tr.moderate : tr.notable;

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxTotal = questions.length * 3;

  if (finished) {
    const results = getResults();
    const notableAreas = results.filter((r) => r.level === "Notable" || r.level === "Moderate");
    const relevantSpecialists = specialists.filter((s) =>
      notableAreas.some((a) => a.category === s.category)
    );

    return (
      <LayoutShell title={tr.yourResults} bgClass="bg-background">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/80 p-8 shadow-soft text-center backdrop-blur-sm">
            <UserRound className="mx-auto mb-4 h-14 w-14 text-primary" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{tr.assessmentComplete}</h2>
            <p className="text-muted-foreground mb-6">{tr.overallScore}: <span className="text-lg font-bold text-primary">{totalScore} / {maxTotal}</span></p>
            <div className="mx-auto h-3 max-w-xs overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(totalScore / maxTotal) * 100}%` }} />
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">{tr.quizDisclaimer}</p>
          </div>

          <div className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-bold text-foreground">{tr.traitCategories}</h3>
            <div className="space-y-4">
              {results.map((r) => (
                <div key={r.category}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{r.category}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${r.level === "Notable" ? "bg-secondary/50 text-secondary-foreground" : r.level === "Moderate" ? "bg-primary/20 text-primary" : "bg-accent/25 text-foreground"}`}>
                      {levelLabel(r.level)}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full transition-all ${r.level === "Notable" ? "bg-secondary" : r.level === "Moderate" ? "bg-primary" : "bg-accent"}`} style={{ width: `${(r.score / r.maxScore) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {relevantSpecialists.length > 0 && (
            <div className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{tr.suggestedSpecialists}</h3>
              </div>
              <div className="space-y-4">
                {relevantSpecialists.map((s) => (
                  <div key={s.category} className="rounded-xl bg-secondary/20 p-4">
                    <p className="mb-2 text-sm font-semibold text-foreground">{s.category}:</p>
                    <ul className="space-y-2">
                      {s.suggestions.map((sug) => (
                        <li key={sug} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                          {sug}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-3">
            <button onClick={() => navigate("/")} className="rounded-full bg-primary hover:bg-primary/90 px-8 py-3 font-semibold text-primary-foreground transition-all active:scale-95">{tr.goToHome}</button>
          </div>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell title={tr.identificationQuiz} bgClass="bg-background">
      <div className="mb-8">
        <div className="mb-3 flex justify-between text-xs font-medium">
          <span className="text-muted-foreground">{tr.question} {current + 1} {tr.of} {questions.length}</span>
          <span className="rounded-full bg-primary/20 px-3 py-1 text-primary">{question.category}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-2xl bg-white/80 p-8 shadow-soft backdrop-blur-sm mb-8">
        <h2 className="mb-8 text-xl md:text-2xl font-bold text-foreground leading-relaxed">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt.score)}
              className={`w-full rounded-lg p-4 text-left font-medium transition-all focus:outline-none focus:ring-4 focus:ring-ring/20 ${answers[question.id] === opt.score ? "bg-primary/20 border-2 border-primary text-foreground" : "bg-muted/50 text-foreground hover:bg-muted border border-transparent"}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={prev} disabled={current === 0} className="flex items-center gap-2 rounded-full bg-muted hover:bg-muted/70 px-6 py-3 font-semibold text-foreground transition-colors disabled:opacity-40">
          <ArrowLeft className="h-4 w-4" /> {tr.back}
        </button>
        <button onClick={next} disabled={answers[question.id] === undefined} className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-6 py-3 font-semibold text-primary-foreground transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-primary">
          {current + 1 === questions.length ? tr.seeResults : tr.next} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </LayoutShell>
  );
};

export default AutismQuiz;
