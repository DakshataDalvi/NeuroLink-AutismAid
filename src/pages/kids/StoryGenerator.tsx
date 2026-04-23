import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { Wand2, Volume2, VolumeX, Play } from "lucide-react";

const StoryGenerator = () => {
  const tr = useT();
  const themes = [
    { label: tr.kindness, emoji: "💝", key: "kindness" },
    { label: tr.honesty, emoji: "🌟", key: "honesty" },
    { label: tr.teamwork, emoji: "🤝", key: "teamwork" },
    { label: tr.patience, emoji: "🕊️", key: "patience" },
    { label: tr.bravery, emoji: "🦁", key: "bravery" },
  ];

  const stories: Record<string, string> = {
    kindness: tr.kindnessStory,
    honesty: tr.honestyStory,
    teamwork: tr.teamworkStory,
    patience: tr.patienceStory,
    bravery: tr.braveryStory,
  };

  const morals: Record<string, string> = {
    kindness: tr.kindnessMoral,
    honesty: tr.honestyMoral,
    teamwork: tr.teamworkMoral,
    patience: tr.patienceMoral,
    bravery: tr.braveryMoral,
  };

  // Story videos mapped to themes
  const storyVideos: Record<string, { title: string; url: string; description: string }[]> = {
    kindness: [
      { title: "Kindness Is Beautiful | Stories For Kids | TIA & TOFU", url: "https://www.youtube.com/embed/asjAHPXM-nA", description: "An animated story about the beauty of being kind - T-Series Kids Hut" },
      { title: "Ripple (Award Winning) - Kindness and good deeds", url: "https://www.youtube.com/embed/QMnEP2DYfmI", description: "How kindness comes back to you - Award winning short film by Daniel Yam" },
    ],
    honesty: [
      { title: "Honesty is the Best Policy! 🎯 | Fun Honesty Song for Kids", url: "https://www.youtube.com/embed/sZ_NJ117Zcw", description: "A fun and catchy honesty song from Gokidds" },
      { title: "Honesty is the best policy story | A short moral story", url: "https://www.youtube.com/embed/-9_mAXzHtQA", description: "A short moral story about honesty from The Moral of Life" },
    ],
    teamwork: [
      { title: "The Power of Teamwork | A Short Story for Kids", url: "https://www.youtube.com/embed/hk7jSjb319I", description: "A short story about teamwork from Meenu Cartoons" },
      { title: "Together, We Can Do Anything! | The Power of Teamwork", url: "https://www.youtube.com/embed/7E45d2mPi50", description: "How teamwork saves the day from Go Go Galaxy" },
    ],
    patience: [
      { title: "The Power of Patience | A Motivational Short Story in English", url: "https://www.youtube.com/embed/kPFHKmQdUeA", description: "A motivational story about patience from Storytelling 24x7" },
      { title: "The Very Impatient Caterpillar | Bedtime Story for kids in English", url: "https://www.youtube.com/embed/v5TBHoHfdc0", description: "A delightful bedtime story about learning patience from The Story Book" },
    ],
    bravery: [
      { title: "The Brave Little Fox | Short Story for Kids | Bedtime Stories", url: "https://www.youtube.com/embed/ot4nXeZUMcc", description: "A heartwarming story about a brave little fox from Toonshine Studio" },
      { title: "Brave | Animated Short Film", url: "https://www.youtube.com/embed/iD_tsK_aqIQ", description: "Award-winning animated film about bravery from Saerion" },
    ],
  };

  const [themeKey, setThemeKey] = useState<string | null>(null);
  const [showStory, setShowStory] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  const generate = (key: string) => {
    stopSpeaking();
    setThemeKey(key);
    setShowStory(false);
    setTimeout(() => setShowStory(true), 600);
  };

  const speakStory = () => {
    if (!themeKey || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stories[themeKey]);
    utterance.rate = 0.85; utterance.pitch = 1.1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => { window.speechSynthesis?.cancel(); setSpeaking(false); };

  const currentTheme = themes.find((t) => t.key === themeKey);

  return (
    <LayoutShell title={`${tr.storyTime} 📖`} bgClass="bg-kids-bg" backTo="/kids">
      <p className="mb-6 text-center text-muted-foreground">{tr.pickATheme}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {themes.map((t) => (
          <button key={t.key} onClick={() => generate(t.key)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-ring/20 ${themeKey === t.key ? "bg-primary text-primary-foreground shadow-soft" : "bg-card text-foreground shadow-card hover:scale-105"}`}>
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>
      {themeKey && (
        <div className={`mt-8 rounded-2xl bg-card shadow-soft overflow-hidden transition-all ${showStory ? "opacity-100" : "opacity-0"}`}>
          {/* Story and Videos Toggle */}
          <div className="flex border-b border-border">
            <button onClick={() => setShowVideos(false)}
              className={`flex-1 py-3 px-4 font-semibold text-center transition-colors ${!showVideos ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              📖 Story
            </button>
            <button onClick={() => setShowVideos(true)}
              className={`flex-1 py-3 px-4 font-semibold text-center transition-colors ${showVideos ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              🎬 Watch
            </button>
          </div>

          {/* Story Section */}
          {!showVideos && (
            <>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-kids-primary">
                    <Wand2 className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">{tr.aStoryAbout} {currentTheme?.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowSubtitles(!showSubtitles)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${showSubtitles ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      CC {showSubtitles ? "ON" : "OFF"}
                    </button>
                    {speaking ? (
                      <button onClick={stopSpeaking} className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">
                        <VolumeX className="h-4 w-4" /> {tr.stop}
                      </button>
                    ) : (
                      <button onClick={speakStory} className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:scale-105">
                        <Volume2 className="h-4 w-4" /> {tr.listen}
                      </button>
                    )}
                  </div>
                </div>
                {showSubtitles && <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">{stories[themeKey]}</p>}
                {!showSubtitles && speaking && (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 w-2 rounded-full bg-primary animate-pulse-gentle" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 rounded-xl bg-secondary/20 p-4 border-l-4 border-primary">
                  <p className="text-sm font-medium text-foreground"><span className="font-bold">💭 Lesson:</span> {morals[themeKey]}</p>
                </div>
              </div>
            </>
          )}

          {/* Videos Section */}
          {showVideos && storyVideos[themeKey] && (
            <div className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <Play className="h-5 w-5 text-primary" /> Animated Stories About {currentTheme?.label}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {storyVideos[themeKey].map((video, idx) => (
                  <div key={idx} className="rounded-lg bg-muted/20 p-4 overflow-hidden border border-border/50">
                    <iframe
                      width="100%"
                      height="200"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-foreground text-sm mb-1">{video.title}</h4>
                    <p className="text-xs text-muted-foreground">{video.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </LayoutShell>
  );
};

export default StoryGenerator;
