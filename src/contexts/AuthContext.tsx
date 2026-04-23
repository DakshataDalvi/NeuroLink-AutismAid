import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Child {
  id: string;
  name: string;
  age: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  children: Child[];
  activeChild: Child | null;
  setActiveChild: (child: Child | null) => void;
  refreshChildren: () => Promise<void>;
  signOut: () => Promise<void>;
  isDemo: boolean;
  enterDemo: () => void;
}

const DEMO_CHILD: Child = { id: "demo-child-1", name: "Alex (Demo)", age: 9 };

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  children: [],
  activeChild: null,
  setActiveChild: () => {},
  refreshChildren: async () => {},
  signOut: async () => {},
  isDemo: false,
  enterDemo: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children: childrenNodes }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [childProfiles, setChildProfiles] = useState<Child[]>([]);
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const enterDemo = () => {
    setIsDemo(true);
    setChildProfiles([DEMO_CHILD]);
    setActiveChild(DEMO_CHILD);
    setLoading(false);
  };

  const fetchChildren = async () => {
    if (!user) {
      setChildProfiles([]);
      return;
    }
    const { data } = await supabase
      .from("children")
      .select("id, name, age")
      .eq("parent_id", user.id)
      .order("created_at");
    if (data) {
      setChildProfiles(data);
      if (data.length > 0 && !activeChild) {
        setActiveChild(data[0]);
      }
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchChildren();
  }, [user]);

  const signOut = async () => {
    if (isDemo) {
      setIsDemo(false);
      setChildProfiles([]);
      setActiveChild(null);
      return;
    }
    await supabase.auth.signOut();
    setChildProfiles([]);
    setActiveChild(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        children: childProfiles,
        activeChild,
        setActiveChild,
        refreshChildren: fetchChildren,
        signOut,
        isDemo,
        enterDemo,
      }}
    >
      {childrenNodes}
    </AuthContext.Provider>
  );
};
