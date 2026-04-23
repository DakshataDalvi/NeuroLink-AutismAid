import LayoutShell from "@/components/LayoutShell";
import { useT } from "@/hooks/useT";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAwarenessContent } from "@/i18n/quizTranslations";
import { BookOpen, Heart, Brain, MessageCircle, Shield, Lightbulb, Play } from "lucide-react";

const iconMap: Record<string, any> = {
  understandingAutism: Brain,
  communicationStrategies: MessageCircle,
  emotionalRegulation: Heart,
  behavioralSupport: Shield,
  supportingIndependence: Lightbulb,
  helpfulResources: BookOpen,
};

const videosMap: Record<string, { title: string; url: string; description: string }[]> = {
  understandingAutism: [
    { title: "What is Autism? | Quick Learner", url: "https://www.youtube.com/embed/TJuwhCIQQTs", description: "Quick learner guide explaining autism spectrum disorder by Duke University" },
    { title: "What is Autism? | APA", url: "https://www.youtube.com/embed/MTW7H5UQ8Ts", description: "From an accredited US healthcare educator at the American Psychiatric Association" },
  ],
  communicationStrategies: [
    { title: "Tips for Communication Challenges - Real Life Tips for Kids", url: "https://www.youtube.com/embed/nH5tn5nJ9ys", description: "Practical tips for communication challenges from Children's Specialized Hospital" },
    { title: "6 Effective Communication Strategies for Parents of Children with Autism", url: "https://www.youtube.com/embed/5W8QjNZ3boA", description: "Effective strategies for parents from Helping Autism" },
  ],
  emotionalRegulation: [
    { title: "Emotional Regulation for Kids with ADHD and Autism", url: "https://www.youtube.com/embed/6v_-GhzM728", description: "More than calming down - teaching emotional regulation skills by Teach Social Skills" },
    { title: "Managing Anxiety and Autism: Effective Techniques", url: "https://www.youtube.com/embed/tl2VMwx95ZE", description: "Effective techniques for managing anxiety from Autism From The Inside" },
  ],
  behavioralSupport: [
    { title: "Behavioural Support for Students with Autism Spectrum", url: "https://www.youtube.com/embed/3KMKPJAVLq4", description: "Behavioural support strategies for activities by Behaviour Help" },
    { title: "Managing Child Meltdowns & Tantrums - Tips From A Board", url: "https://www.youtube.com/embed/cv9U_VBTWas", description: "Tips for helping a child in meltdown mode by The Autism Helper" },
  ],
  supportingIndependence: [
    { title: "Top 10 Life Skills for Teens on the Autism Spectrum", url: "https://www.youtube.com/embed/oiZHroHeFPk", description: "Parent to parent guide on life skills by Autism Live" },
    { title: "What Helps Autistic Children Transition to Independent Adulthood", url: "https://www.youtube.com/embed/bqnfjH7qwvY", description: "Supporting transition to independent adulthood by Answers About Autism" },
  ],
  helpfulResources: [
    { title: "Practical Strategies for Working with Autistic Children & Young People", url: "https://www.youtube.com/embed/T9bu02vAVdk", description: "Practical strategies by Dr Emma Goodall from Generation Next" },
  ],
};

const AutismAwareness = () => {
  const tr = useT();
  const { lang } = useLanguage();
  const sections = getAwarenessContent(lang);

  return (
    <LayoutShell title={tr.autismAwareness} bgClass="bg-background" backTo="/parent">
      <p className="mb-8 text-center text-muted-foreground max-w-lg mx-auto">{tr.educationalResources}</p>
      <div className="space-y-4">
        {sections.map((s) => {
          const Icon = iconMap[s.titleKey] || BookOpen;
          const title = (tr as any)[s.titleKey] || s.titleKey;
          const videos = videosMap[s.titleKey] || [];
          
          return (
            <details key={s.titleKey} className="group rounded-xl bg-white/80 shadow-soft hover:shadow-card transition-all">
              <summary className="flex cursor-pointer items-center gap-3 p-6 list-none hover:bg-white/50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 group-open:bg-primary/25 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground flex-1 text-left">{title}</h2>
                <span className="ml-auto text-muted-foreground transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-6 pt-2 space-y-6">
                {/* Text content */}
                <ul className="space-y-3">
                  {s.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Video content */}
                {videos.length > 0 && (
                  <div className="pt-4 border-t border-border/40">
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" />
                      Recommended Videos
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {videos.map((video, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden bg-muted/30 border border-border/40 hover:border-primary/30 transition-all group/video">
                          <div className="aspect-video bg-black/5 relative overflow-hidden">
                            <iframe
                              className="w-full h-full"
                              src={video.url}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-sm font-semibold text-foreground mb-1 group-hover/video:text-primary transition-colors">{video.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{video.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </LayoutShell>
  );
};

export default AutismAwareness;
