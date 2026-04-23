import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useAuth } from "@/contexts/AuthContext";
import { useT } from "@/hooks/useT";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MoodLogger = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [logged, setLogged] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, activeChild } = useAuth();
  const tr = useT();

  const moods = [
    { emoji: "😊", label: tr.happy, color: "bg-mood-happy" },
    { emoji: "😢", label: tr.sad, color: "bg-mood-sad" },
    { emoji: "😠", label: tr.angry, color: "bg-mood-angry" },
    { emoji: "😰", label: tr.anxious, color: "bg-mood-anxious" },
    { emoji: "🤩", label: tr.excited, color: "bg-mood-excited" },
  ];

  const handleSelect = (label: string) => { setSelected(label); setLogged(false); };

  const handleLog = async () => {
    if (!selected) return;
    if (user && activeChild) {
      setSaving(true);
      const { error } = await supabase.from("mood_logs").insert({ child_id: activeChild.id, parent_id: user.id, mood: selected });
      setSaving(false);
      if (error) { toast.error("Failed to save mood"); return; }
    }
    setLogged(true);
  };

  return (
    <LayoutShell title={`${tr.howAreYouFeeling}`} bgClass="bg-background" backTo="/kids">
      {user && activeChild && (
        <div className="mb-8 text-center">
          <span className="rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary">{tr.loggingFor} <strong>{activeChild.name}</strong></span>
        </div>
      )}
      <p className="mb-10 text-center text-xl text-muted-foreground font-medium">{tr.tapEmoji}</p>
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {moods.map((m) => (
          <button key={m.label} onClick={() => handleSelect(m.label)}
            className={`flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-ring/20 ${selected === m.label ? `${m.color} scale-110 shadow-card ring-4 ring-foreground/20` : "bg-white/80 shadow-soft hover:scale-105 hover:shadow-card"}`}
            aria-label={m.label} aria-pressed={selected === m.label}>
            <span className="text-6xl">{m.emoji}</span>
            <span className="text-sm font-semibold text-foreground">{m.label}</span>
          </button>
        ))}
      </div>
      {selected && !logged && (
        <div className="text-center">
          <button onClick={handleLog} disabled={saving}
            className="rounded-full bg-primary hover:bg-primary/90 px-10 py-4 text-lg font-bold text-primary-foreground shadow-soft transition-all active:scale-95 disabled:opacity-50">
            {saving ? tr.saving : tr.logMyMood}
          </button>
        </div>
      )}
      {logged && (
        <div className="rounded-2xl bg-green-100/50 p-8 text-center shadow-soft">
          <p className="text-2xl font-bold text-foreground">{tr.moodLogged} ✓</p>
          <p className="mt-2 text-muted-foreground">{tr.youreFeeling} <strong className="text-foreground">{selected}</strong> {tr.thatsOkay}</p>
        </div>
      )}
    </LayoutShell>
  );
};

export default MoodLogger;
