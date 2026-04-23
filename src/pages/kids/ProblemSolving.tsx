import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { Trophy, Lightbulb } from "lucide-react";

interface Puzzle { question: string; visual?: string; options: string[]; answer: number; hint: string; }

const puzzles: Puzzle[] = [
  { question: "If you have 3 apples and give away 1, how many do you have?", visual: "🍎🍎🍎 → give 1 away → ?", options: ["1", "2", "3", "4"], answer: 1, hint: "Count what's left after giving one away" },
  { question: "Which container can hold more water?", visual: "🥛 small cup  vs  🪣 bucket", options: ["The cup", "The bucket", "They hold the same", "Neither"], answer: 1, hint: "Think about the size of each container" },
  { question: "A farmer has 5 chickens. 2 fly away. How many are left?", visual: "🐔🐔🐔🐔🐔 → 2 fly away 🐔🐔", options: ["5", "3", "2", "7"], answer: 1, hint: "Subtract the ones that left" },
  { question: "What's heavier: a kilogram of feathers or a kilogram of rocks?", visual: "🪶 1kg  vs  🪨 1kg", options: ["Feathers", "Rocks", "They weigh the same", "Can't tell"], answer: 2, hint: "Read the question carefully — what's the weight of each?" },
  { question: "If today is Monday, what day is it in 3 days?", visual: "Mon → ? → ? → ?", options: ["Wednesday", "Thursday", "Friday", "Tuesday"], answer: 1, hint: "Count: Tue (1), Wed (2), Thu (3)" },
  { question: "You see 4 legs under a table. What could it be?", visual: "🪑 Under the table: 4 legs visible", options: ["A cat", "A chair", "Either could be true", "A spider"], answer: 2, hint: "Both cats and chairs have 4 legs!" },
];

const ProblemSolving = () => {
  const [level, setLevel] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const tr = useT();
  const puzzle = puzzles[level];

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === puzzle.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (level + 1 < puzzles.length) { setLevel((l) => l + 1); setChosen(null); setShowHint(false); }
      else setFinished(true);
    }, 1200);
  };

  const restart = () => { setLevel(0); setChosen(null); setShowHint(false); setScore(0); setFinished(false); };

  if (finished) {
    return (
      <LayoutShell title={`${tr.problemSolving} 🧩`} bgClass="bg-kids-bg" backTo="/kids">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-soft">
          <Trophy className="h-12 w-12 text-secondary" />
          <h2 className="text-2xl font-bold text-foreground">{score} / {puzzles.length} {tr.solved}</h2>
          <p className="text-muted-foreground">{"⭐".repeat(score)} {tr.amazingThinking}</p>
          <button onClick={restart} className="rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground">{tr.tryAgain}</button>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell title={`${tr.problemSolving} 🧩`} bgClass="bg-kids-bg" backTo="/kids">
      <div className="mb-4 flex justify-between text-sm text-muted-foreground">
        <span>{tr.puzzle} {level + 1} {tr.of} {puzzles.length}</span>
        <span>{tr.score}: {score} ⭐</span>
      </div>
      <div className="rounded-2xl bg-card p-6 shadow-soft">
        <h2 className="mb-3 text-xl font-bold text-foreground">{puzzle.question}</h2>
        {puzzle.visual && <div className="mb-4 rounded-xl bg-muted/50 p-3 text-center text-lg">{puzzle.visual}</div>}
        <div className="space-y-3">
          {puzzle.options.map((opt, i) => {
            let style = "bg-muted hover:bg-muted/70";
            if (chosen !== null) {
              if (i === puzzle.answer) style = "bg-accent/30 ring-2 ring-accent";
              else if (i === chosen) style = "bg-destructive/20 ring-2 ring-destructive";
            }
            return (
              <button key={i} onClick={() => choose(i)}
                className={`w-full rounded-xl p-4 text-left font-medium text-foreground transition-all ${style} focus:outline-none focus:ring-4 focus:ring-ring/20`}>
                {opt}
              </button>
            );
          })}
        </div>
        {!showHint && chosen === null && (
          <button onClick={() => setShowHint(true)} className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Lightbulb className="h-4 w-4" /> {tr.needAHint}
          </button>
        )}
        {showHint && <div className="mt-4 rounded-xl bg-secondary/20 p-3 text-sm text-foreground">💡 {puzzle.hint}</div>}
      </div>
    </LayoutShell>
  );
};

export default ProblemSolving;
