import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useT } from "@/hooks/useT";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Users } from "lucide-react";

const ChildManager = () => {
  const { user, children, activeChild, setActiveChild, refreshChildren, isDemo } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const tr = useT();

  const addChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name || !age) return;
    const { error } = await supabase.from("children").insert({ parent_id: user.id, name, age: parseInt(age) });
    if (error) { toast.error("Failed to add child"); return; }
    toast.success(`${name} added!`);
    setName(""); setAge(""); setShowAdd(false);
    await refreshChildren();
  };

  const removeChild = async (childId: string, childName: string) => {
    const { error } = await supabase.from("children").delete().eq("id", childId);
    if (error) { toast.error("Failed to remove child"); return; }
    toast.success(`${childName} removed`);
    if (activeChild?.id === childId) setActiveChild(null);
    await refreshChildren();
  };

  return (
    <div className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">{tr.myChildren}</h2>
        </div>
        {!isDemo && (
          <button onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1 rounded-full bg-primary/20 hover:bg-primary/30 px-4 py-2 text-sm font-semibold text-primary transition-colors">
            <Plus className="h-4 w-4" /> {tr.addChild}
          </button>
        )}
      </div>

      {showAdd && !isDemo && (
        <form onSubmit={addChild} className="mb-5 flex gap-2 p-4 bg-secondary/15 rounded-lg">
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={tr.childsName}
            className="flex-1 rounded-lg border border-input bg-white/90 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input type="number" required min={1} max={18} value={age} onChange={(e) => setAge(e.target.value)} placeholder={tr.age}
            className="w-20 rounded-lg border border-input bg-white/90 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button type="submit" className="rounded-lg bg-primary hover:bg-primary/90 px-5 py-2 text-sm font-semibold text-primary-foreground transition-all active:scale-95">{tr.add}</button>
        </form>
      )}

      {children.length === 0 ? (
        <p className="text-sm text-muted-foreground">{tr.noChildrenYet}</p>
      ) : (
        <div className="space-y-2">
          {children.map((child) => (
            <div key={child.id}
              className={`flex items-center justify-between rounded-lg p-4 transition-all cursor-pointer ${activeChild?.id === child.id ? "bg-primary/20 border-2 border-primary" : "bg-muted/40 hover:bg-muted/60 border border-transparent"}`}
              onClick={() => setActiveChild(child)}>
              <div>
                <span className="font-semibold text-foreground">{child.name}</span>
                <span className="ml-3 text-sm text-muted-foreground">{tr.age} {child.age}</span>
              </div>
              {!isDemo && (
                <button onClick={(e) => { e.stopPropagation(); removeChild(child.id, child.name); }}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildManager;
