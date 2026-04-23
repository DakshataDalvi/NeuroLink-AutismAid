import { useState, useEffect } from "react";
import LayoutShell from "@/components/LayoutShell";
import SpeakButton from "@/components/SpeakButton";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThumbsUp, ThumbsDown, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

import cafeteriaImg from "@/assets/scenario-cafeteria.jpg";
import classroomImg from "@/assets/scenario-classroom.jpg";
import sarcasmImg from "@/assets/scenario-sarcasm.jpg";

interface Scenario {
  situation: string;
  image?: string;
  options: { text: string; quality: "great" | "ok" | "poor"; feedback: string }[];
}

const fallbackImages = [cafeteriaImg, classroomImg, sarcasmImg];

const fallbackScenarios: Scenario[] = [
  {
    situation: "🍽️ You're sitting in the cafeteria and a new student sits near you. They look around nervously. What do you do?",
    image: cafeteriaImg,
    options: [
      { text: "👋 Say hi and ask their name", quality: "great", feedback: "Great! A simple greeting can make someone feel welcome." },
      { text: "😊 Smile but stay quiet", quality: "ok", feedback: "A smile helps! Next time, try adding a short hello too." },
      { text: "🤐 Ignore them and keep eating", quality: "poor", feedback: "It's okay to be shy, but a small hello can really help someone new." },
    ],
  },
  {
    situation: "🏫 Your teacher explains something you don't understand. Class is about to end. What do you do?",
    image: classroomImg,
    options: [
      { text: "✋ Raise your hand and ask the teacher to explain", quality: "great", feedback: "Perfect! Teachers appreciate when students ask questions." },
      { text: "👫 Ask a friend after class", quality: "ok", feedback: "Good thinking! But asking the teacher directly gives the most accurate answer." },
      { text: "🤫 Stay quiet and hope you figure it out", quality: "poor", feedback: "It's brave to ask for help — everyone has questions sometimes." },
    ],
  },
  {
    situation: "🤔 A friend says something sarcastic like 'Oh sure, because THAT's a great idea.' You're not sure if they're serious. What do you do?",
    image: sarcasmImg,
    options: [
      { text: "❓ Ask them: 'Are you being serious or joking?'", quality: "great", feedback: "Excellent! It's perfectly fine to ask for clarification." },
      { text: "😄 Laugh along and move on", quality: "ok", feedback: "That can work, but checking helps you understand better." },
      { text: "😠 Get upset and walk away", quality: "poor", feedback: "It's natural to feel confused. Asking what they mean is always a good option." },
    ],
  },
];

const langToSpeechCode: Record<string, string> = {
  en: "en-US", hi: "hi-IN", mr: "mr-IN", ta: "ta-IN", te: "te-IN", bn: "bn-IN", kn: "kn-IN",
};

const ScenarioQuiz = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>(fallbackScenarios);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, activeChild } = useAuth();
  const tr = useT();
  const { lang } = useLanguage();
  const speechLang = langToSpeechCode[lang] || "en-US";

  const categories = [
    tr.generalSocialSkills, tr.makingNewFriends, tr.handlingDisagreements, tr.understandingSarcasm,
    tr.askingForHelp, tr.groupConversations, tr.dealingWithPeerPressure, tr.managingEmotionsInPublic,
  ];

  const finished = selectedCategory !== null && index >= scenarios.length;

  useEffect(() => {
    if (finished && user && activeChild) {
      supabase.from("quiz_results").insert({
        child_id: activeChild.id, parent_id: user.id, quiz_type: "scenario_quiz",
        category: selectedCategory, score, max_score: scenarios.length * 2,
      });
    }
  }, [finished]);

  const fetchScenarios = async (category: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", { body: { ageGroup: "teens", category } });
      if (error) throw error;
      if (data?.scenarios?.length > 0) {
        const withImages = data.scenarios.map((s: Scenario, i: number) => ({
          ...s,
          image: fallbackImages[i % fallbackImages.length],
        }));
        setScenarios(withImages);
      } else { setScenarios(fallbackScenarios); toast.info("Using default scenarios"); }
    } catch { setScenarios(fallbackScenarios); toast.error("Using default scenarios."); }
    finally { setLoading(false); }
  };

  const startQuiz = (category: string) => { setSelectedCategory(category); setIndex(0); setScore(0); setChosen(null); fetchScenarios(category); };
  const choose = (i: number) => {
    if (chosen !== null) return; setChosen(i);
    const scenario = scenarios[index];
    if (scenario.options[i].quality === "great") setScore((s) => s + 2);
    else if (scenario.options[i].quality === "ok") setScore((s) => s + 1);
  };
  const next = () => { setIndex((i) => i + 1); setChosen(null); };
  const backToCategories = () => { setSelectedCategory(null); setIndex(0); setScore(0); setChosen(null); setLoading(false); };

  if (!selectedCategory) {
    return (
      <LayoutShell title={`${tr.scenarioQuizzes} 💬`} bgClass="bg-teens-bg" backTo="/teens">
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">{tr.chooseSkill}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => startQuiz(cat)}
                className="rounded-2xl bg-card p-5 text-left shadow-soft transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-ring/20">
                <span className="text-lg font-bold capitalize text-foreground">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </LayoutShell>
    );
  }

  if (loading) {
    return (
      <LayoutShell title={`${tr.scenarioQuizzes} 💬`} bgClass="bg-teens-bg" backTo="/teens">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-card p-12 shadow-soft">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-semibold text-foreground">{tr.aiCreatingScenarios}</p>
        </div>
      </LayoutShell>
    );
  }

  if (finished) {
    return (
      <LayoutShell title={`${tr.scenarioQuizzes} 💬`} bgClass="bg-teens-bg" backTo="/teens">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-soft">
          <span className="text-5xl">🏆</span>
          <h2 className="text-2xl font-bold text-foreground">{tr.youScored.replace("{score}", String(score)).replace("{total}", String(scenarios.length * 2))}</h2>
          <p className="text-muted-foreground">{tr.greatPractice}</p>
          <div className="flex gap-3">
            <button onClick={() => startQuiz(selectedCategory!)} className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground">
              <RefreshCw className="h-4 w-4" /> {tr.newScenarios}
            </button>
            <button onClick={backToCategories} className="rounded-full bg-muted px-6 py-2.5 font-semibold text-foreground">{tr.changeTopic}</button>
          </div>
        </div>
      </LayoutShell>
    );
  }

  const scenario = scenarios[index];

  return (
    <LayoutShell title={`${tr.scenarioQuizzes} 💬`} bgClass="bg-teens-bg" backTo="/teens">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span className="font-medium">{tr.scenario} {index + 1} {tr.of} {scenarios.length}</span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary flex items-center gap-1">
          <span>🎯</span> {selectedCategory}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 w-full rounded-full bg-muted overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
          style={{ width: `${((index + 1) / scenarios.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl bg-card shadow-soft overflow-hidden">
        {/* Scenario illustration with gradient overlay */}
        {scenario.image && (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden">
            <img
              src={scenario.image}
              alt="Scenario illustration"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="mb-6 flex items-start gap-3">
            <p className="flex-1 text-lg font-semibold text-foreground leading-relaxed">{scenario.situation}</p>
            <SpeakButton text={scenario.situation} lang={speechLang} size="md" />
          </div>
          
          {/* Options */}
          <div className="space-y-3">
            {scenario.options.map((opt, i) => {
              const isChosen = chosen === i;
              let style = "bg-muted/40 hover:bg-muted/60 border border-transparent";
              let quality_icon = "❓";
              
              if (chosen !== null && isChosen) {
                if (opt.quality === "great") {
                  style = "bg-accent/20 border-2 border-accent ring-2 ring-accent/30";
                  quality_icon = "✅";
                } else if (opt.quality === "ok") {
                  style = "bg-secondary/30 border-2 border-secondary ring-2 ring-secondary/30";
                  quality_icon = "👍";
                } else {
                  style = "bg-destructive/15 border-2 border-destructive/50 ring-2 ring-destructive/30";
                  quality_icon = "❌";
                }
              }
              
              return (
                <div key={i}>
                  <button onClick={() => choose(i)}
                    className={`w-full rounded-xl p-4 text-left font-medium text-foreground transition-all ${style} focus:outline-none focus:ring-4 focus:ring-ring/20`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{quality_icon}</span>
                      <span className="flex-1">{opt.text}</span>
                      <SpeakButton text={opt.text} lang={speechLang} size="sm" />
                    </div>
                  </button>

                  {/* Feedback with styling */}
                  {chosen === i && (
                    <div className={`mt-3 rounded-lg p-4 text-sm border-l-4 ${
                      opt.quality === "great" 
                        ? "bg-accent/10 border-accent text-foreground" 
                        : opt.quality === "ok"
                        ? "bg-secondary/20 border-secondary text-foreground"
                        : "bg-destructive/10 border-destructive/50 text-foreground"
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 text-lg shrink-0">
                          {opt.quality === "great" ? "💡" : opt.quality === "ok" ? "💭" : "⚠️"}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{opt.quality === "great" ? "Great choice!" : opt.quality === "ok" ? "Good try!" : "Let's learn..."}</p>
                          <span className="text-muted-foreground">{opt.feedback}</span>
                        </div>
                        <SpeakButton text={opt.feedback} lang={speechLang} size="sm" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {chosen !== null && (
            <button onClick={next} className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 font-semibold text-primary-foreground hover:scale-105 transition-transform">
              {tr.next} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </LayoutShell>
  );
};

export default ScenarioQuiz;
