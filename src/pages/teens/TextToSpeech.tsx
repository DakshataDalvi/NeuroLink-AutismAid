import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { Volume2 } from "lucide-react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const tr = useT();

  const speak = () => {
    if (!text.trim() || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <LayoutShell title={`${tr.textToSpeech} 🔊`} bgClass="bg-teens-bg" backTo="/teens">
      <p className="mb-4 text-center text-muted-foreground">{tr.typeWhatYouWantToSay}</p>
      <div className="rounded-2xl bg-card p-6 shadow-soft">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={tr.typeWhatYouWantToSay}
          className="w-full resize-none rounded-xl bg-muted p-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          rows={5} maxLength={500} aria-label={tr.textToSpeech} />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{text.length}/500</span>
          <button onClick={speak} disabled={!text.trim() || speaking}
            className="flex items-center gap-2 rounded-full bg-teens-primary px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105 disabled:opacity-50">
            <Volume2 className={`h-5 w-5 ${speaking ? "animate-pulse-gentle" : ""}`} />
            {speaking ? tr.speaking : tr.speak}
          </button>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-muted/50 p-4">
        <h3 className="mb-2 text-sm font-bold text-foreground">{tr.whenToUseThis}</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• {tr.ttsUse1}</li>
          <li>• {tr.ttsUse2}</li>
          <li>• {tr.ttsUse3}</li>
          <li>• {tr.ttsUse4}</li>
        </ul>
      </div>
    </LayoutShell>
  );
};

export default TextToSpeech;
