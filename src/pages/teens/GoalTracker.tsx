import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Goal { id: string; text: string; done: boolean; }

const GoalTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [input, setInput] = useState("");
  const tr = useT();

  const add = () => {
    if (!input.trim()) return;
    setGoals((prev) => [...prev, { id: crypto.randomUUID(), text: input.trim(), done: false }]);
    setInput("");
    toast.success(tr.goalAdded);
  };

  const toggle = (id: string) => setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  const remove = (id: string) => setGoals((prev) => prev.filter((g) => g.id !== id));
  const done = goals.filter((g) => g.done).length;

  return (
    <LayoutShell title={`${tr.goalTracker} 🎯`} bgClass="bg-teens-bg">
      <div className="mx-auto max-w-xl space-y-6">
        <p className="text-center text-muted-foreground">{tr.setGoalsDesc}</p>
        {goals.length > 0 && (
          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>{done} {tr.of} {goals.length} {tr.completed}</span>
              <span>{goals.length > 0 ? Math.round((done / goals.length) * 100) : 0}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-teens-primary transition-all duration-500"
                style={{ width: `${goals.length > 0 ? (done / goals.length) * 100 : 0}%` }} />
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={tr.addNewGoal}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teens-primary/30" />
          <button onClick={add} disabled={!input.trim()}
            className="flex items-center gap-1 rounded-xl bg-teens-primary px-4 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-2">
          {goals.map((g) => (
            <div key={g.id} className={`flex items-center gap-3 rounded-xl bg-card p-4 shadow-card transition-opacity ${g.done ? "opacity-60" : ""}`}>
              <button onClick={() => toggle(g.id)} className="shrink-0 text-teens-primary">
                {g.done ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
              </button>
              <span className={`flex-1 text-foreground ${g.done ? "line-through" : ""}`}>{g.text}</span>
              <button onClick={() => remove(g.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {goals.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">{tr.noGoalsYet} 💪</p>}
        </div>
      </div>
    </LayoutShell>
  );
};

export default GoalTracker;
