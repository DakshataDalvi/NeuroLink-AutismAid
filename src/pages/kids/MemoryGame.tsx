import { useState, useEffect } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { RotateCcw, Trophy, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const EMOJIS = ["🌟", "🎨", "🦋", "🌈", "🎵", "🌻", "🐬", "🎈"];

interface Card { id: number; emoji: string; flipped: boolean; matched: boolean; }

// Difficulty progression: Easy=4 pairs, Medium=6 pairs, Hard=8 pairs, Expert=8 pairs, Master=8 pairs
const getPairCountByDifficulty = (level: number): number => {
  return Math.min(4 + level * 1, 8);
};

const createDeck = (pairCount: number): Card[] => {
  const pairs = [...EMOJIS.slice(0, pairCount), ...EMOJIS.slice(0, pairCount)];
  return pairs.sort(() => Math.random() - 0.5).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
};

const MemoryGame = () => {
  const { user, activeChild } = useAuth();
  const [difficulty, setDifficulty] = useState(1); // 1-5: Easy to Master
  const [pairCount, setPairCount] = useState(getPairCountByDifficulty(1));
  const [cards, setCards] = useState<Card[]>(createDeck(pairCount));
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [stars, setStars] = useState(0);
  const [won, setWon] = useState(false);
  const [showDifficultyUp, setShowDifficultyUp] = useState(false);
  const tr = useT();

  const matched = cards.filter((c) => c.matched).length;
  const isGameWon = matched === cards.length && cards.length > 0;

  const difficultyNames = ["", "Easy 🟢", "Medium 🟡", "Hard 🔴", "Expert ⚡", "Master 🌟"];
  const maxStarsForDifficulty = [0, 10, 8, 6, 5, 4]; // Perfect score (efficiency targets)

  // Save score to database
  const saveScore = async (movesCount: number, finalStars: number) => {
    if (!user || !activeChild) return;
    
    const accuracy = Math.round((finalStars / maxStarsForDifficulty[difficulty]) * 100);
    
    await supabase.from("game_scores").insert({
      game_type: "memory_game",
      difficulty_level: difficulty,
      score: finalStars * 10, // Convert stars to score out of 50
      accuracy: accuracy,
      time_taken: moves,
      child_id: activeChild.id,
      parent_id: user.id,
    });
  };

  useEffect(() => {
    if (isGameWon && !won) {
      setWon(true);
      saveScore(moves, stars);
      
      // Check if should increase difficulty (perfect or near-perfect play)
      const targetStars = maxStarsForDifficulty[difficulty];
      if (stars >= targetStars - 1 && difficulty < 5) {
        setTimeout(() => setShowDifficultyUp(true), 1500);
      }
    }
  }, [isGameWon, won, moves, stars, difficulty]);

  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = selected;
      if (cards[a].emoji === cards[b].emoji) {
        setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setStars((s) => s + 1);
      }
      setTimeout(() => {
        setCards((prev) => prev.map((c, i) => (i === a || i === b ? { ...c, flipped: c.matched } : c)));
        setSelected([]);
      }, 800);
    }
  }, [selected]);

  const flip = (index: number) => {
    if (selected.length >= 2 || cards[index].flipped || cards[index].matched || won) return;
    setCards((prev) => prev.map((c, i) => (i === index ? { ...c, flipped: true } : c)));
    setSelected((prev) => [...prev, index]);
    setMoves((m) => m + 1);
  };

  const reset = () => {
    setCards(createDeck(pairCount));
    setSelected([]);
    setMoves(0);
    setStars(0);
    setWon(false);
  };

  const increaseDifficulty = () => {
    const newDifficulty = difficulty + 1;
    setDifficulty(newDifficulty);
    const newPairCount = getPairCountByDifficulty(newDifficulty);
    setPairCount(newPairCount);
    setCards(createDeck(newPairCount));
    setSelected([]);
    setMoves(0);
    setStars(0);
    setWon(false);
    setShowDifficultyUp(false);
  };

  return (
    <LayoutShell title={`${tr.memoryGame} 🧩`} bgClass="bg-background">
      <div className="mb-8 flex flex-col gap-4">
        {/* Difficulty indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 text-sm font-bold text-primary">
              {difficultyNames[difficulty]}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-3 w-3 rounded-full transition-all ${
                    level <= difficulty ? "bg-primary scale-125" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-soft backdrop-blur-sm">
              {tr.moves}: <span className="text-primary font-bold">{moves}</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-secondary/40 px-4 py-2 text-sm font-semibold">
              {"⭐".repeat(Math.min(stars, 5))}{stars === 0 && <span className="ml-1 text-muted-foreground text-xs">{tr.start}</span>}
            </span>
            <button
              onClick={reset}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/80 shadow-soft hover:bg-white transition-all active:scale-95"
              aria-label="Restart"
            >
              <RotateCcw className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>

        {/* Target indicator */}
        <div className="text-sm text-muted-foreground">
          Target: {maxStarsForDifficulty[difficulty]} matches · Pairs: {pairCount}
        </div>
      </div>

      {/* Win screen */}
      {won && (
        <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 p-8 text-center shadow-soft backdrop-blur-sm">
          <Trophy className="h-16 w-16 text-secondary animate-bounce" />
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{tr.greatJob}</h2>
            <p className="text-muted-foreground mb-4">
              {stars} {stars === 1 ? "match" : "matches"} in {moves} {moves === 1 ? "move" : "moves"}
            </p>
            {showDifficultyUp && difficulty < 5 && (
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="flex items-center justify-center gap-2 text-primary font-semibold mb-3">
                  <Zap className="h-5 w-5" /> Ready for the next challenge?
                </p>
                <button
                  onClick={increaseDifficulty}
                  className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
                >
                  Level Up to {difficultyNames[difficulty + 1]} ⬆️
                </button>
              </div>
            )}
          </div>
          <button
            onClick={reset}
            className="mt-3 rounded-full bg-primary hover:bg-primary/90 px-8 py-3 text-sm font-semibold text-primary-foreground transition-all active:scale-95"
          >
            {tr.playAgain}
          </button>
        </div>
      )}

      {/* Game grid */}
      <div className={`grid gap-4 ${pairCount === 4 ? "grid-cols-4" : pairCount === 6 ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-4"}`}>
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => flip(i)}
            className={`aspect-square rounded-xl text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ring/20 ${
              card.flipped || card.matched
                ? "bg-white/80 shadow-soft scale-100"
                : "bg-gradient-to-br from-primary to-primary/80 text-white hover:shadow-card hover:scale-102 shadow-soft"
            } ${card.matched ? "opacity-50 cursor-default" : ""}`}
            aria-label={card.flipped || card.matched ? card.emoji : "Hidden card"}
            disabled={won}
          >
            {card.flipped || card.matched ? card.emoji : "🎴"}
          </button>
        ))}
      </div>
    </LayoutShell>
  );
};

export default MemoryGame;
