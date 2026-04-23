import { useState, useEffect, useRef, useCallback } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { Trophy, Zap } from "lucide-react";

const ICONS = ["🌟", "🎈", "🦋", "🌸", "🐬", "🌈", "🎵", "🍎", "🌻", "⚡"];

const AttentionGame = () => {
  const [target, setTarget] = useState("");
  const [grid, setGrid] = useState<string[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [targetCount, setTargetCount] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState<"ready" | "playing" | "result">("ready");
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const tr = useT();

  const generateRound = useCallback(() => {
    const t = ICONS[Math.floor(Math.random() * ICONS.length)];
    setTarget(t);
    const count = 3 + Math.floor(Math.random() * 4);
    setTargetCount(count);
    const cells: string[] = [];
    for (let i = 0; i < count; i++) cells.push(t);
    while (cells.length < 20) {
      const random = ICONS.filter((ic) => ic !== t)[Math.floor(Math.random() * (ICONS.length - 1))];
      cells.push(random);
    }
    setGrid(cells.sort(() => Math.random() - 0.5));
    setFound([]);
    setTimeLeft(15);
  }, []);

  const startGame = () => { setScore(0); setRound(0); setGameState("playing"); generateRound(); };

  useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setGameState("result"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState, round]);

  useEffect(() => {
    if (found.length === targetCount && gameState === "playing") {
      setScore((s) => s + 1);
      clearInterval(timerRef.current);
      setTimeout(() => { setRound((r) => r + 1); generateRound(); }, 600);
    }
  }, [found, targetCount, gameState, generateRound]);

  const handleTap = (index: number) => {
    if (gameState !== "playing" || found.includes(index)) return;
    if (grid[index] === target) setFound((prev) => [...prev, index]);
  };

  if (gameState === "ready") {
    return (
      <LayoutShell title={`${tr.attentionGame} ⚡`} bgClass="bg-kids-bg" backTo="/kids">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-soft">
          <Zap className="h-16 w-16 text-secondary" />
          <h2 className="text-2xl font-bold text-foreground">{tr.findTheIcons}</h2>
          <p className="text-muted-foreground max-w-sm">{tr.attentionGameInstructions}</p>
          <button onClick={startGame} className="mt-2 rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground">{tr.startGame}</button>
        </div>
      </LayoutShell>
    );
  }

  if (gameState === "result") {
    return (
      <LayoutShell title={`${tr.attentionGame} ⚡`} bgClass="bg-kids-bg" backTo="/kids">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-soft">
          <Trophy className="h-12 w-12 text-secondary" />
          <h2 className="text-2xl font-bold text-foreground">{score} {tr.roundsCompleted}</h2>
          <p className="text-muted-foreground">{"⭐".repeat(Math.min(score, 10))} {tr.greatFocus}</p>
          <button onClick={startGame} className="rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground">{tr.playAgain}</button>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell title={`${tr.attentionGame} ⚡`} bgClass="bg-kids-bg" backTo="/kids">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{tr.find}:</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/30 text-2xl">{target}</span>
          <span className="text-sm text-muted-foreground">({found.length}/{targetCount})</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{tr.round} {round + 1}</span>
          <span className={`rounded-full px-3 py-1 text-sm font-bold ${timeLeft <= 5 ? "bg-destructive/20 text-destructive" : "bg-muted text-foreground"}`}>{timeLeft}s</span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {grid.map((icon, i) => (
          <button key={i} onClick={() => handleTap(i)}
            className={`flex aspect-square items-center justify-center rounded-xl text-2xl transition-all focus:outline-none ${found.includes(i) ? "bg-accent/30 scale-90 opacity-60" : "bg-card shadow-card hover:scale-105 active:scale-95"}`}>
            {icon}
          </button>
        ))}
      </div>
    </LayoutShell>
  );
};

export default AttentionGame;
