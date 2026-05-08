"use client";

import { Volume2 } from "lucide-react";

const DEFAULT_VOICE_RATE = 0.68;
const DEFAULT_VOICE_PITCH = 1.12;
const DEFAULT_VOICE_VOLUME = 1;

const preferredFemaleVoiceNames = [
  "samantha",
  "google us english female",
  "google uk english female",
  "microsoft aria",
  "microsoft jenny",
  "microsoft zira",
  "karen",
  "moira",
  "tessa",
  "susan",
  "female",
];

function getBestEnglishFemaleVoice(lang = "en-US") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  const sameLocaleVoices = voices.filter((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const candidates = sameLocaleVoices.length ? sameLocaleVoices : englishVoices;

  return (
    candidates.find((voice) =>
      preferredFemaleVoiceNames.some((name) => voice.name.toLowerCase().includes(name))
    ) ||
    englishVoices.find((voice) =>
      preferredFemaleVoiceNames.some((name) => voice.name.toLowerCase().includes(name))
    ) ||
    candidates[0] ||
    englishVoices[0]
  );
}

export function speakText(text: string, lang = "en-US") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = DEFAULT_VOICE_RATE;
    utterance.pitch = DEFAULT_VOICE_PITCH;
    utterance.volume = DEFAULT_VOICE_VOLUME;

    const bestVoice = getBestEnglishFemaleVoice(lang);
    if (bestVoice) utterance.voice = bestVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Some browsers load voices after the first click. Retry once when voices arrive.
  if (!window.speechSynthesis.getVoices().length) {
    window.speechSynthesis.onvoiceschanged = speak;
    setTimeout(speak, 120);
    return;
  }

  speak();
}

export function AudioButton({ text, label = "Slow listen", className = "" }: { text: string; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        speakText(text);
      }}
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white/80 transition hover:bg-white/20 ${className}`}
      aria-label={`Listen slowly to: ${text}`}
    >
      <Volume2 className="h-4 w-4" />
      {label}
    </button>
  );
}

export function SpeakButton({ text, label = "Slow listen" }: { text: string; label?: string }) {
  return <AudioButton text={text} label={label} />;
}
