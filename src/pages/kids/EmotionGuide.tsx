import LayoutShell from "@/components/LayoutShell";
import SpeakButton from "@/components/SpeakButton";
import { useT } from "@/hooks/useT";

const EmotionGuide = () => {
  const tr = useT();

  const emotions = [
    {
      emoji: "😊", name: tr.happy,
      signs: [tr.smiling, tr.brightEyes, tr.energeticVoice, tr.relaxedBody],
      color: "bg-mood-happy/20 border-mood-happy/40", tip: tr.happyTip,
    },
    {
      emoji: "😢", name: tr.sad,
      signs: [tr.eyesLookingDown, tr.quietVoice, tr.slowMovements, tr.tears],
      color: "bg-mood-sad/20 border-mood-sad/40", tip: tr.sadTip,
    },
    {
      emoji: "😠", name: tr.angry,
      signs: [tr.furrowedEyebrows, tr.raisedVoice, tr.tenseFace, tr.clenchedFists],
      color: "bg-mood-angry/20 border-mood-angry/40", tip: tr.angryTip,
    },
    {
      emoji: "😰", name: tr.anxious,
      signs: [tr.fidgeting, tr.fastBreathing, tr.avoidingEyeContact, tr.bitingNails],
      color: "bg-mood-anxious/20 border-mood-anxious/40", tip: tr.anxiousTip,
    },
    {
      emoji: "🤩", name: tr.excited,
      signs: [tr.wideEyes, tr.fastTalking, tr.jumpingOrBouncing, tr.bigSmile],
      color: "bg-mood-excited/20 border-mood-excited/40", tip: tr.excitedTip,
    },
  ];

  return (
    <LayoutShell title={`${tr.emotionGuide} 🎨`} bgClass="bg-background" backTo="/kids">
      <p className="mb-8 text-center text-muted-foreground max-w-lg mx-auto">{tr.learnToRecognize}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        {emotions.map((e) => (
          <div key={e.name} className={`rounded-2xl border-2 ${e.color} p-6 shadow-soft hover:shadow-card transition-all`}>
            <div className="mb-4 flex items-start gap-3">
              <span className="text-5xl flex-shrink-0">{e.emoji}</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{e.name}</h2>
              </div>
              <SpeakButton text={`${e.name}. ${tr.signsToLookFor}: ${e.signs.join(", ")}. ${e.tip}`} className="flex-shrink-0" />
            </div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tr.signsToLookFor}</h3>
            <ul className="mb-4 space-y-2">
              {e.signs.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary/60" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="rounded-lg bg-white/50 p-3">
              <p className="text-sm text-muted-foreground italic">💡 {e.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </LayoutShell>
  );
};

export default EmotionGuide;
