import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { Trophy } from "lucide-react";

const PATTERNS = [
  { sequence: ["🔴", "🔵", "🔴", "🔵"], answer: "🔴", options: ["🔴", "🟢", "🔵"] },
  { sequence: ["⭐", "⭐", "🌙", "⭐", "⭐"], answer: "🌙", options: ["⭐", "🌙", "☀️"] },
  { sequence: ["🐱", "🐶", "🐱", "🐶", "🐱"], answer: "🐶", options: ["🐱", "🐶", "🐭"] },
  { sequence: ["1", "2", "3", "4"], answer: "5", options: ["5", "6", "3"] },
  { sequence: ["🟩", "🟨", "🟩", "🟨", "🟩"], answer: "🟨", options: ["🟩", "🟨", "🟥"] },
  { sequence: ["A", "B", "C", "D"], answer: "E", options: ["E", "F", "A"] },
  { sequence: ["🌸", "🌸", "🌺", "🌸", "🌸"], answer: "🌺", options: ["🌸", "🌺", "🌻"] },
  { sequence: ["2", "4", "6", "8"], answer: "10", options: ["9", "10", "12"] },
];

const PatternGame = () => {
  const [level, setLevel] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const tr = useT();
  const pattern = PATTERNS[level];

  const choose = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    if (opt === pattern.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (level + 1 < PATTERNS.length) { setLevel((l) => l + 1); setChosen(null); }
      else setFinished(true);
    }, 1000);
  };

  const restart = () => { setLevel(0); setChosen(null); setScore(0); setFinished(false); };

  if (finished) {
    return (
      <LayoutShell title={`${tr.patternGame} 🔮`} bgClass="bg-background" backTo="/kids">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/80 p-8 text-center shadow-soft backdrop-blur-sm">
          <Trophy className="h-14 w-14 text-secondary animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground">{score} / {PATTERNS.length} {tr.correct}!</h2>
          <p className="text-muted-foreground text-lg">{"⭐".repeat(Math.min(score, 5))} {tr.greatPatternSkills}</p>
          <button onClick={restart} className="rounded-full bg-primary hover:bg-primary/90 px-8 py-3 font-semibold text-primary-foreground transition-all active:scale-95 mt-2">{tr.playAgain}</button>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell title={`${tr.patternGame} 🔮`} bgClass="bg-background" backTo="/kids">
      <div className="mb-8 flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">{tr.level} <span className="text-lg text-foreground font-bold">{level + 1}</span> {tr.of} {PATTERNS.length}</span>
        <span className="rounded-full bg-secondary/40 px-4 py-2 text-sm font-semibold">{tr.score}: {score} ⭐</span>
      </div>
      <div className="rounded-2xl bg-white/80 p-8 shadow-soft backdrop-blur-sm">
        <p className="mb-6 text-center text-muted-foreground font-medium text-lg">{tr.whatComesNext}</p>
        <div className="mb-8 flex items-center justify-center gap-3 flex-wrap">
          {pattern.sequence.map((item, i) => (
            <span key={i} className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-3xl font-bold shadow-soft border border-primary/20">{item}</span>
          ))}
          <span className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-primary/40 text-3xl text-primary font-bold">?</span>
        </div>
        <div className="flex justify-center gap-4">
          {pattern.options.map((opt) => {
            let style = "bg-muted/50 hover:bg-muted text-foreground";
            if (chosen) {
              if (opt === pattern.answer) style = "bg-accent/40 ring-2 ring-accent text-foreground";
              else if (opt === chosen) style = "bg-destructive/30 ring-2 ring-destructive text-foreground";
            }
            return (
              <button key={opt} onClick={() => choose(opt)}
                className={`flex h-18 w-18 items-center justify-center rounded-lg text-3xl font-bold transition-all ${style} focus:outline-none focus:ring-4 focus:ring-ring/20 disabled:opacity-50`}
                disabled={chosen !== null}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </LayoutShell>
  );
};

export default PatternGame;
