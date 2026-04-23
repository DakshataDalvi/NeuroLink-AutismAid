import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useT } from "@/hooks/useT";
import { toast } from "sonner";
import { LogIn, UserPlus, ArrowLeft, Play } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import BlobBackground from "@/components/BlobBackground";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { enterDemo } = useAuth();
  const navigate = useNavigate();
  const tr = useT();

  const handleDemo = () => {
    enterDemo();
    toast.success(tr.welcomeBackToast);
    navigate("/parent");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { display_name: displayName || "Parent" }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success(tr.accountCreated);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(tr.welcomeBackToast);
        navigate("/parent");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <BlobBackground />
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> {tr.backToHome}
          </button>
          <LanguageSelector />
        </div>

        <div className="rounded-2xl bg-white/85 p-8 shadow-soft backdrop-blur-md">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            {isSignUp ? tr.createAccount : tr.welcomeBack}
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {isSignUp ? tr.signUpDesc : tr.signInDesc}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">{tr.yourName}</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-white/90 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="e.g. Sarah" />
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{tr.email}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-white/90 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="parent@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">{tr.password}</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-white/90 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50">
              {loading ? tr.pleaseWait : isSignUp ? (<><UserPlus className="h-4 w-4" /> {tr.createAccount}</>) : (<><LogIn className="h-4 w-4" /> {tr.signIn}</>)}
            </button>
          </form>

          <div className="mt-6">
            <button onClick={handleDemo}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary/30 py-3 font-semibold text-primary transition-all hover:bg-primary/10 active:scale-95">
              <Play className="h-4 w-4" /> Try Demo
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? tr.alreadyHaveAccount : tr.dontHaveAccount}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-primary hover:underline">
              {isSignUp ? tr.signIn : tr.signUp}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
