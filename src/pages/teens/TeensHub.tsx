import { Link } from "react-router-dom";
import LayoutShell from "@/components/LayoutShell";
import SpeakButton from "@/components/SpeakButton";
import { useT } from "@/hooks/useT";
import { MessageSquare, Lightbulb, Volume2, Wind, BookOpen, Target } from "lucide-react";

const TeensHub = () => {
  const tr = useT();

  const sections = [
    { title: tr.scenarioQuizzes, desc: tr.scenarioQuizzesDesc, icon: MessageSquare, to: "/teens/scenarios", color: "bg-blue-100/40" },
    { title: tr.communicationSkills, desc: tr.communicationSkillsDesc, icon: Lightbulb, to: "/teens/communication", color: "bg-yellow-100/30" },
    { title: tr.textToSpeech, desc: tr.textToSpeechDesc, icon: Volume2, to: "/teens/tts", color: "bg-pink-100/30" },
    { title: tr.breathingExercise, desc: tr.breathingExerciseDesc, icon: Wind, to: "/teens/breathing", color: "bg-green-100/30" },
    { title: tr.myJournal, desc: tr.myJournalDesc, icon: BookOpen, to: "/teens/journal", color: "bg-purple-100/30" },
    { title: tr.goalTracker, desc: tr.goalTrackerDesc, icon: Target, to: "/teens/goals", color: "bg-cyan-100/30" },
  ];

  return (
    <LayoutShell title={tr.teenZone} bgClass="bg-background">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <div key={s.to} className={`group flex flex-col rounded-2xl ${s.color} p-6 shadow-soft hover:shadow-card transition-all hover:scale-[1.02] backdrop-blur-sm`}>
            <Link to={s.to} className="flex items-start justify-between focus:outline-none focus:ring-4 focus:ring-ring/20 rounded-xl">
              <div className="flex flex-1 flex-col">
                <h2 className="text-lg font-bold text-foreground mb-1">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <div className="ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/80 shadow-card">
                <s.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
            </Link>
            <div className="mt-4">
              <SpeakButton text={`${s.title}. ${s.desc}`} />
            </div>
          </div>
        ))}
      </div>
    </LayoutShell>
  );
};

export default TeensHub;
