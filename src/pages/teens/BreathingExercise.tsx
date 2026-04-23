import { useState, useEffect, useRef } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";

const BreathingExercise = () => {
  const tr = useT();
  const phases = [
    { label: tr.breatheIn, duration: 4, color: "bg-teens-primary/20" },
    { label: tr.hold, duration: 4, color: "bg-teens-primary/40" },
    { label: tr.breatheOut, duration: 6, color: "bg-teens-primary/10" },
  ];

  const [active, setActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(phases[0].duration);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!active) return;
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPhaseIdx((pi) => {
            const next = (pi + 1) % phases.length;
            if (next === 0) setCycles((c) => c + 1);
            setCountdown(phases[next].duration);
            return next;
          });
          return 1;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const toggle = () => {
    if (active) { clearInterval(intervalRef.current); setActive(false); }
    else { setPhaseIdx(0); setCountdown(phases[0].duration); setActive(true); }
  };

  const phase = phases[phaseIdx];

  return (
    <LayoutShell title={`${tr.breathingExercise} 🌬️`} bgClass="bg-background">
      <div className="flex flex-col items-center gap-12">
        <p className="text-center text-muted-foreground max-w-md">{tr.guidedBreathingDesc}</p>
        <div className={`flex h-56 w-56 items-center justify-center rounded-full transition-all duration-1000 ${phase.color} ${active ? "scale-110 shadow-card" : "scale-100 shadow-soft"} border-4 border-white/40`}>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{active ? phase.label : `${tr.ready}?`}</p>
            {active && <p className="text-5xl font-extrabold text-primary mt-4">{countdown}</p>}
          </div>
        </div>
        <div className="rounded-full bg-white/80 px-6 py-3 shadow-soft text-sm font-semibold text-muted-foreground">{tr.cyclesCompleted}: <span className="text-foreground font-bold">{cycles}</span></div>
        <button onClick={toggle} className="rounded-full bg-primary hover:bg-primary/90 px-10 py-4 font-semibold text-primary-foreground transition-all active:scale-95 shadow-soft">
          {active ? tr.stop : tr.start}
        </button>
      </div>
    </LayoutShell>
  );
};

export default BreathingExercise;
