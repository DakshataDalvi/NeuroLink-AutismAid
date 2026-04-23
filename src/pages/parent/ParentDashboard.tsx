import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutShell from "@/components/LayoutShell";
import ChildManager from "@/components/ChildManager";
import { useAuth } from "@/contexts/AuthContext";
import { useT } from "@/hooks/useT";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Brain, Heart, MessageSquare, Lightbulb, BookOpen, LogOut, Loader2 } from "lucide-react";
import SpeakButton from "@/components/SpeakButton";

const MOOD_COLORS: Record<string, string> = {
  Happy: "hsl(45, 93%, 55%)",
  Excited: "hsl(152, 55%, 50%)",
  Anxious: "hsl(280, 45%, 60%)",
  Sad: "hsl(217, 50%, 60%)",
  Angry: "hsl(0, 72%, 58%)",
};

const DUMMY_MOOD_DATA = [
  { name: "Happy", value: 12, color: MOOD_COLORS.Happy },
  { name: "Excited", value: 8, color: MOOD_COLORS.Excited },
  { name: "Anxious", value: 4, color: MOOD_COLORS.Anxious },
  { name: "Sad", value: 2, color: MOOD_COLORS.Sad },
];
const DUMMY_QUIZ_DATA = [
  { date: "Mar 1", score: 45 },
  { date: "Mar 5", score: 52 },
  { date: "Mar 10", score: 58 },
  { date: "Mar 14", score: 65 },
  { date: "Mar 18", score: 70 },
  { date: "Mar 22", score: 78 },
  { date: "Mar 26", score: 85 },
  { date: "Mar 30", score: 92 },
];
const DUMMY_GAME_DATA = [
  { game: "Memory", score: 78 },
  { game: "Pattern", score: 85 },
  { game: "Attention", score: 72 },
  { game: "Problem Solving", score: 90 },
];
const DUMMY_STATS = { games: 24, quizzes: 8, moods: 26 };

const ParentDashboard = () => {
  const { user, loading, activeChild, signOut, isDemo } = useAuth();
  const navigate = useNavigate();
  const tr = useT();
  const [moodData, setMoodData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [quizData, setQuizData] = useState<{ date: string; score: number }[]>([]);
  const [gameData, setGameData] = useState<{ game: string; score: number }[]>([]);
  const [stats, setStats] = useState({ games: 0, quizzes: 0, moods: 0 });
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user && !isDemo) navigate("/auth");
  }, [user, loading, isDemo]);

  useEffect(() => {
    if (isDemo) return; // Use dummy data in demo mode
    if (!user || !activeChild) return;
    fetchDashboardData();
  }, [user, activeChild, isDemo]);

  const fetchDashboardData = async () => {
    if (!activeChild) return;
    setDataLoading(true);

    // Fetch mood logs
    const { data: moods } = await supabase
      .from("mood_logs")
      .select("mood")
      .eq("child_id", activeChild.id);

    if (moods) {
      const counts: Record<string, number> = {};
      moods.forEach((m) => { counts[m.mood] = (counts[m.mood] || 0) + 1; });
      setMoodData(
        Object.entries(counts).map(([name, value]) => ({
          name,
          value,
          color: MOOD_COLORS[name] || "hsl(200, 50%, 50%)",
        }))
      );
    }

    // Fetch quiz results
    const { data: quizzes } = await supabase
      .from("quiz_results")
      .select("score, max_score, created_at")
      .eq("child_id", activeChild.id)
      .order("created_at", { ascending: true })
      .limit(10);

    if (quizzes) {
      setQuizData(
        quizzes.map((q) => ({
          date: new Date(q.created_at).toLocaleDateString("en", { month: "short", day: "numeric" }),
          score: Math.round((q.score / q.max_score) * 100),
        }))
      );
    }

    // Fetch game scores
    const { data: games } = await supabase
      .from("game_scores")
      .select("game_type, score")
      .eq("child_id", activeChild.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (games) {
      const byType: Record<string, number[]> = {};
      games.forEach((g) => {
        if (!byType[g.game_type]) byType[g.game_type] = [];
        byType[g.game_type].push(g.score);
      });
      setGameData(
        Object.entries(byType).map(([game, scores]) => ({
          game,
          score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        }))
      );
    }

    // Stats
    const { count: moodCount } = await supabase
      .from("mood_logs")
      .select("*", { count: "exact", head: true })
      .eq("child_id", activeChild.id);
    const { count: quizCount } = await supabase
      .from("quiz_results")
      .select("*", { count: "exact", head: true })
      .eq("child_id", activeChild.id);
    const { count: gameCount } = await supabase
      .from("game_scores")
      .select("*", { count: "exact", head: true })
      .eq("child_id", activeChild.id);

    setStats({
      moods: moodCount || 0,
      quizzes: quizCount || 0,
      games: gameCount || 0,
    });

    setDataLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !isDemo) return null;

  return (
    <LayoutShell title={`${tr.parentDashboard} 📊`} bgClass="bg-background">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-3">
          <Link to="/parent/awareness" className="flex items-center gap-2 rounded-full bg-primary/15 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/25">
            <BookOpen className="h-4 w-4" /> {tr.awareness}
          </Link>
          <Link to="/quiz" className="flex items-center gap-2 rounded-full bg-secondary/40 px-5 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/55">
            <Brain className="h-4 w-4" /> {tr.assessment}
          </Link>
        </div>
        <button onClick={() => { signOut(); navigate("/"); }} className="flex items-center gap-2 rounded-full bg-muted hover:bg-muted/70 px-5 py-2 text-sm font-semibold text-foreground transition-colors">
          <LogOut className="h-4 w-4" /> {tr.signOut}
        </button>
      </div>

      <div className="mb-8"><ChildManager /></div>

      {!activeChild ? (
        <div className="rounded-2xl bg-white/80 p-8 text-center shadow-soft backdrop-blur-sm">
          <p className="text-lg text-muted-foreground">{tr.addChildToStart}</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">{tr.showingDataFor}: <span className="text-primary">{activeChild.name}</span></h2>
          </div>

          {(() => {
            const displayStats = (stats.games === 0 && stats.quizzes === 0 && stats.moods === 0) ? DUMMY_STATS : stats;
            const displayMood = moodData.length > 0 ? moodData : DUMMY_MOOD_DATA;
            const displayQuiz = quizData.length > 0 ? quizData : DUMMY_QUIZ_DATA;
            const displayGame = gameData.length > 0 ? gameData : DUMMY_GAME_DATA;
            const isDemoData = stats.games === 0 && stats.quizzes === 0 && stats.moods === 0;
            return (
              <>
                {isDemoData && (
                  <div className="mb-6 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-medium text-primary">
                    📊 {tr.sampleDataBanner}
                  </div>
                )}
                <div className="mb-8 grid grid-cols-3 gap-4">
                  {[
                    { label: tr.gamesPlayed, value: displayStats.games, icon: Brain },
                    { label: tr.quizzesTaken, value: displayStats.quizzes, icon: TrendingUp },
                    { label: tr.moodsLogged, value: displayStats.moods, icon: Heart },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-2 rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm hover:shadow-card transition-all">
                      <s.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                      <span className="text-3xl font-bold text-foreground">{dataLoading ? "..." : s.value}</span>
                      <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
                    <h2 className="mb-4 text-lg font-bold text-foreground">{tr.moodDistribution}</h2>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart><Pie data={displayMood} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                        {displayMood.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie><Tooltip /></PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      {displayMood.map((m) => (
                        <div key={m.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="h-3 w-3 rounded-full" style={{ background: m.color }} />{m.name} ({m.value})
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
                    <h2 className="mb-4 text-lg font-bold text-foreground">{tr.quizScoreTrend}</h2>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={displayQuiz}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" /><Tooltip />
                        <Line type="monotone" dataKey="score" stroke="hsl(152, 48%, 58%)" strokeWidth={2.5} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mb-8 rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
                  <h2 className="mb-4 text-lg font-bold text-foreground">{tr.gamePerformance}</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={displayGame}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                      <XAxis dataKey="game" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" /><Tooltip />
                      <Bar dataKey="score" fill="hsl(216, 70%, 45%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
                  <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                    {tr.insightsAndSuggestions}
                    <SpeakButton text={`${tr.insightMoods.replace("{name}", activeChild.name).replace("{count}", String(displayStats.moods))} ${tr.insightQuizzes.replace("{count}", String(displayStats.quizzes))} ${tr.insightGames.replace("{count}", String(displayStats.games))}`} size="md" />
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-secondary/20 p-4">
                      <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-foreground">{tr.insightMoods.replace("{name}", activeChild.name).replace("{count}", String(displayStats.moods))}</p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-accent/15 p-4">
                      <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-foreground">{tr.insightQuizzes.replace("{count}", String(displayStats.quizzes))}</p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-blue-100/30 p-4">
                      <Brain className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-foreground">{tr.insightGames.replace("{count}", String(displayStats.games))}</p>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-yellow-100/30 p-4">
                      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-foreground">{tr.insightTip.replace("{name}", activeChild.name)}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </>
      )}
    </LayoutShell>
  );
};

export default ParentDashboard;
