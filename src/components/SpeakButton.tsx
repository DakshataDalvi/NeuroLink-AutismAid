import { Volume2, VolumeX } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";

interface SpeakButtonProps {
  text: string;
  lang?: string;
  size?: "sm" | "md";
  className?: string;
}

const SpeakButton = ({ text, lang = "en-US", size = "sm", className = "" }: SpeakButtonProps) => {
  const { speak, stop, speaking } = useSpeech();

  const handleClick = () => {
    if (speaking) {
      stop();
    } else {
      speak(text, lang);
    }
  };

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnSize = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${
        speaking
          ? "bg-primary text-primary-foreground animate-pulse"
          : "bg-primary/10 text-primary hover:bg-primary/20"
      } ${btnSize} ${className}`}
      title={speaking ? "Stop" : "Listen"}
      aria-label={speaking ? "Stop speaking" : "Listen to this text"}
    >
      {speaking ? <VolumeX className={iconSize} /> : <Volume2 className={iconSize} />}
    </button>
  );
};

export default SpeakButton;
