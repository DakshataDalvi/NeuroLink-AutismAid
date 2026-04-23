import { useNavigate } from "react-router-dom";
import { Brain, Heart, Users, Sparkles, Star, Shield, ClipboardCheck, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useT } from "@/hooks/useT";
import LanguageSelector from "@/components/LanguageSelector";
import BlobBackground from "@/components/BlobBackground";

const RoleCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  cta,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
  cta: string;
}) => (
  <button
    onClick={onClick}
    className="group relative flex flex-col items-center gap-4 rounded-3xl bg-white/85 p-8 md:p-10 shadow-soft backdrop-blur-md transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:bg-white focus:outline-none focus:ring-4 focus:ring-primary/20"
    aria-label={`Enter as ${title}`}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 group-hover:bg-primary/20 transition-colors">
      <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
    </div>
    <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
    <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-xs">{description}</p>
    <div className="mt-3 rounded-full bg-primary/85 px-6 py-2 text-sm font-semibold text-white transition-all group-hover:bg-primary">
      {cta}
    </div>
  </button>
);

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tr = useT();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BlobBackground />
      <div className="relative z-50 flex items-center justify-end gap-3 px-6 pt-5">
        <LanguageSelector />
        {user ? (
          <button
            onClick={() => navigate("/parent")}
            className="flex items-center gap-2 rounded-full bg-white/85 px-5 py-2 text-sm font-semibold text-primary shadow-soft backdrop-blur-sm hover:bg-white transition-colors"
          >
            {tr.dashboard}
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 rounded-full bg-white/85 px-5 py-2 text-sm font-semibold text-primary shadow-soft backdrop-blur-sm hover:bg-white transition-colors"
          >
            <LogIn className="h-4 w-4" /> {tr.parentLogin}
          </button>
        )}
      </div>
      <header className="relative z-10 overflow-hidden px-6 pb-12 pt-12 md:pt-28 text-center">
        <div className="relative mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            {tr.appName}
          </h1>
          <p className="mx-auto max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            {tr.appDescription}
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 px-8 py-3 font-semibold text-secondary-foreground shadow-soft transition-all hover:scale-105 active:scale-95"
          >
            <ClipboardCheck className="h-5 w-5" />
            {tr.takeQuiz}
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12">
          <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold text-foreground">
            {tr.whoAreYou}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <RoleCard title={tr.kids} description={tr.kidsDesc} icon={Star} onClick={() => navigate("/kids")} cta={tr.getStarted} />
            <RoleCard title={tr.teens} description={tr.teensDesc} icon={Brain} onClick={() => navigate("/teens")} cta={tr.getStarted} />
            <RoleCard title={tr.parents} description={tr.parentsDesc} icon={Shield} onClick={() => navigate("/parent")} cta={tr.getStarted} />
          </div>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Brain, title: tr.cognitiveGrowth, desc: tr.cognitiveGrowthDesc },
            { icon: Heart, title: tr.emotionalAwareness, desc: tr.emotionalAwarenessDesc },
            { icon: Users, title: tr.familyConnected, desc: tr.familyConnectedDesc },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-4 rounded-2xl bg-white/80 p-6 md:p-8 shadow-card backdrop-blur-sm hover:shadow-soft transition-all">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15">
                <f.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;
