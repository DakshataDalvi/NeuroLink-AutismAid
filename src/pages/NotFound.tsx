import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useT } from "@/hooks/useT";
import BlobBackground from "@/components/BlobBackground";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const tr = useT();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <BlobBackground />
      <div className="relative z-10 text-center px-6">
        <h1 className="mb-4 text-7xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground max-w-sm mx-auto">{tr.goBack}</p>
        <a href="/" className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-3 font-semibold text-primary-foreground transition-all active:scale-95 shadow-soft">
          <Home className="h-5 w-5" />
          {tr.goToHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
