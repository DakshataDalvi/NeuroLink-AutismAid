import { Link } from "react-router-dom";
import LayoutShell from "@/components/LayoutShell";
import SpeakButton from "@/components/SpeakButton";
import { useT } from "@/hooks/useT";
import { Gamepad2, SmilePlus, BookHeart, HelpCircle, Palette, Shapes, Zap, Puzzle } from "lucide-react";

const KidsHub = () => {
  const tr = useT();

  const sections = [
    { title: tr.memoryGame, desc: tr.memoryGameDesc, icon: Gamepad2, to: "/kids/memory-game", color: "bg-blue-100/40" },
    { title: tr.patternGame, desc: tr.patternGameDesc, icon: Shapes, to: "/kids/pattern-game", color: "bg-pink-100/30" },
    { title: tr.attentionGame, desc: tr.attentionGameDesc, icon: Zap, to: "/kids/attention-game", color: "bg-purple-100/30" },
    { title: tr.problemSolving, desc: tr.problemSolvingDesc, icon: Puzzle, to: "/kids/problem-solving", color: "bg-cyan-100/30" },
    { title: tr.dailyQuiz, desc: tr.dailyQuizDesc, icon: HelpCircle, to: "/kids/quiz", color: "bg-red-100/30" },
    { title: tr.moodCheckIn, desc: tr.moodCheckInDesc, icon: SmilePlus, to: "/kids/mood", color: "bg-blue-100/40" },
    { title: tr.emotionGuide, desc: tr.emotionGuideDesc, icon: Palette, to: "/kids/emotions", color: "bg-pink-100/30" },
    { title: tr.storyTime, desc: tr.storyTimeDesc, icon: BookHeart, to: "/kids/stories", color: "bg-purple-100/30" },
  ];

  return (
    <LayoutShell title={tr.kidsZone} bgClass="bg-background">
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

export default KidsHub;
