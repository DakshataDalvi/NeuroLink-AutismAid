import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { toast } from "sonner";

const JournalPage = () => {
  const tr = useT();
  const prompts = [tr.journalPrompt1, tr.journalPrompt2, tr.journalPrompt3, tr.journalPrompt4, tr.journalPrompt5, tr.journalPrompt6, tr.journalPrompt7, tr.journalPrompt8];

  const [prompt, setPrompt] = useState(prompts[0]);
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<{ prompt: string; text: string; date: string }[]>([]);

  const randomPrompt = () => setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

  const save = () => {
    if (!entry.trim()) return;
    setEntries((prev) => [{ prompt, text: entry, date: new Date().toLocaleDateString() }, ...prev]);
    setEntry("");
    randomPrompt();
    toast.success(tr.journalEntrySaved);
  };

  return (
    <LayoutShell title={`${tr.myJournal} 📝`} bgClass="bg-teens-bg">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <p className="mb-1 text-sm font-medium text-muted-foreground">{tr.todaysPrompt}</p>
          <p className="mb-4 text-lg font-bold text-foreground">{prompt}</p>
          <button onClick={randomPrompt} className="mb-4 text-sm text-teens-primary hover:underline">{tr.tryDifferentPrompt} →</button>
          <textarea value={entry} onChange={(e) => setEntry(e.target.value)} placeholder={tr.startWritingHere}
            className="w-full min-h-[160px] rounded-xl border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teens-primary/30 resize-none" />
          <button onClick={save} disabled={!entry.trim()}
            className="mt-3 rounded-full bg-teens-primary px-6 py-2.5 font-semibold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50">
            {tr.saveEntry}
          </button>
        </div>
        {entries.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-foreground">{tr.previousEntries}</h3>
            {entries.map((e, i) => (
              <div key={i} className="rounded-xl bg-card p-4 shadow-card">
                <p className="text-xs text-muted-foreground">{e.date} — {e.prompt}</p>
                <p className="mt-2 text-sm text-foreground whitespace-pre-wrap">{e.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutShell>
  );
};

export default JournalPage;
