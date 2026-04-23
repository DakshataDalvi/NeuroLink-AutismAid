import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { Eye, MessageCircle, Heart, Users, AlertCircle } from "lucide-react";

const CommunicationSkills = () => {
  const tr = useT();

  const skills = [
    { 
      icon: MessageCircle, 
      title: tr.startingConversation, 
      tips: [tr.convTip1, tr.convTip2, tr.convTip3, tr.convTip4],
      color: "bg-blue-100/40",
      visual: "👋 → 😊 → 💬",
      example: "Try: 'Hi! What's your name?' or 'I noticed you like [topic]. Tell me more!'"
    },
    { 
      icon: Eye, 
      title: tr.eyeContact, 
      tips: [tr.eyeTip1, tr.eyeTip2, tr.eyeTip3, tr.eyeTip4],
      color: "bg-purple-100/40",
      visual: "👁️ ↔️ 👁️",
      example: "Make a soft gaze for 3-5 seconds. It's okay to look away sometimes. Try the 'triangle technique': look at eyes, nose, mouth."
    },
    { 
      icon: Heart, 
      title: tr.expressingFeelings, 
      tips: [tr.feelTip1, tr.feelTip2, tr.feelTip3, tr.feelTip4],
      color: "bg-pink-100/40",
      visual: "😢 → 💭 → 💬",
      example: "Say: 'I feel [emotion] because [reason]. I need [help/space].'"
    },
    { 
      icon: Users, 
      title: tr.understandingSocialCues, 
      tips: [tr.cueTip1, tr.cueTip2, tr.cueTip3, tr.cueTip4],
      color: "bg-green-100/40",
      visual: "🤔 → 👀 → ✓",
      example: "Watch for: body language, tone of voice, facial expressions. When in doubt, ask: 'Are you joking or serious?'"
    },
  ];

  return (
    <LayoutShell title={`${tr.communicationSkills} 💡`} bgClass="bg-background" backTo="/teens">
      <p className="mb-8 text-center text-muted-foreground">{tr.practicalTips}</p>
      <div className="space-y-5">
        {skills.map((s) => (
          <div key={s.title} className={`rounded-2xl ${s.color} p-6 shadow-soft hover:shadow-card transition-all backdrop-blur-sm`}>
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/80 shadow-card">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground mb-1">{s.title}</h2>
                <div className="text-3xl font-bold text-primary opacity-70">{s.visual}</div>
              </div>
            </div>

            {/* Example section */}
            <div className="mb-4 p-4 rounded-lg bg-white/50 border-l-4 border-primary/40">
              <p className="text-sm text-foreground font-medium flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{s.example}</span>
              </p>
            </div>

            {/* Tips section */}
            <ul className="space-y-2">
              {s.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Reference Card */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 shadow-soft border border-primary/20">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Communication Checklist</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { emoji: "🎯", text: "Be clear and specific" },
            { emoji: "⏱️", text: "Give people time to respond" },
            { emoji: "❓", text: "Ask for clarification when confused" },
            { emoji: "😌", text: "Take breaks if overwhelmed" },
            { emoji: "👂", text: "Listen actively" },
            { emoji: "🙏", text: "It's okay to ask for help" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-sm text-foreground">
              <span className="text-2xl">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </LayoutShell>
  );
};

export default CommunicationSkills;
