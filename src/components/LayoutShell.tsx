import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import BlobBackground from "@/components/BlobBackground";

interface LayoutShellProps {
  children: React.ReactNode;
  title: string;
  bgClass?: string;
  backTo?: string;
}

const LayoutShell = ({ children, title, bgClass = "bg-background", backTo }: LayoutShellProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1); // Go to previous page
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${bgClass}`}>
      <BlobBackground />
      <nav className="sticky top-0 z-20 flex items-center gap-3 bg-white/70 px-5 py-3 shadow-card backdrop-blur-xl border-b border-border/40">
        {/* Logo at top left */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-lg px-2 py-1"
          aria-label="NeuroLink Home"
        >
          <Sparkles className="h-5 w-5" />
          <span className="hidden sm:inline">NeuroLink</span>
        </Link>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>

        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        
        <div className="ml-auto flex items-center gap-2">
          <LanguageSelector />
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40"
            aria-label="Home"
          >
            <Home className="h-5 w-5 text-foreground" />
          </Link>
        </div>
      </nav>
      <main className="relative z-10 mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
};

export default LayoutShell;
