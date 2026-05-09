"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { AudioButton } from "@/components/learning/audio-tools";
import { CompleteButton } from "@/components/learning/progress-badges";
import { makeProgressId } from "@/lib/progress";
import type { ReadingStory } from "@/data/reading-library";

function storyText(story: ReadingStory) {
  return story.paragraphs.join(" ");
}

export function ReadingLibraryClient({
  grade,
  stories,
}: {
  grade: number;
  stories: ReadingStory[];
}) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("All");
  const [selectedId, setSelectedId] = useState(stories[0]?.id ?? "");

  const themes = useMemo(() => {
    return ["All", ...Array.from(new Set(stories.map((story) => story.theme)))];
  }, [stories]);

  const filteredStories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesTheme = theme === "All" || story.theme === theme;
      const haystack = `${story.title} ${story.theme} ${story.vocabulary.join(" ")}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesTheme && matchesQuery;
    });
  }, [stories, query, theme]);

  const selected = stories.find((story) => story.id === selectedId) ?? filteredStories[0] ?? stories[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 pt-28 text-slate-800">
      <Container>
        <section className="relative overflow-hidden rounded-[3rem] bg-white/85 p-8 shadow-[0_18px_45px_rgba(14,165,233,0.12)] md:p-12">
          <div className="absolute right-8 top-8 text-7xl opacity-20">📚</div>
          <p className="font-bold text-sky-600">Grade {grade} Reading Library / 読書ライブラリー</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black md:text-7xl">
            Longer stories for stronger English.
          </h1>
          <p className="mt-5 max-w-3xl text-slate-600">
            Read popular public-domain inspired classics and original learning stories. Use slow audio, answer questions, and collect stars. No login needed.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-slate-500">
            日本語サポート: 人気の昔話・名作を英語学習用にやさしく調整しています。音声を聞いて、読んで、質問に答えましょう。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/learn/${grade}`} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white">
              Back to Grade {grade}
            </Link>
            <Link href="/learn" className="rounded-full bg-sky-100 px-5 py-3 text-sm font-bold text-sky-700">
              All grades
            </Link>
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[380px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Card>
              <label className="text-sm font-black text-slate-700" htmlFor="story-search">
                Search stories
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-sky-50 px-4 py-3">
                <Search className="h-4 w-4 text-sky-600" />
                <input
                  id="story-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="lion, courage, garden..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {themes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTheme(item)}
                    className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                      theme === item
                        ? "bg-sky-500 text-white"
                        : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-sky-600" />
                <h2 className="text-xl font-black">{filteredStories.length} stories</h2>
              </div>
              <div className="mt-4 max-h-[560px] space-y-2 overflow-auto pr-1">
                {filteredStories.map((story, index) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setSelectedId(story.id)}
                    className={`w-full rounded-2xl p-3 text-left text-sm transition ${
                      selected?.id === story.id
                        ? "bg-sky-500 text-white shadow-lg"
                        : "bg-sky-50 text-slate-700 hover:bg-sky-100"
                    }`}
                  >
                    <span className="font-black">{index + 1}. {story.title}</span>
                    <span className="mt-1 block text-xs opacity-80">{story.estimatedMinutes} min · {story.theme}</span>
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          {selected && (
            <article className="space-y-6">
              <Card className="p-7 md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
                      {selected.level} · {selected.source}
                    </p>
                    <h2 className="mt-3 text-4xl font-black md:text-5xl">{selected.title}</h2>
                    <p className="mt-3 text-slate-500">
                      Theme: {selected.theme} · Estimated reading: {selected.estimatedMinutes} minutes
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AudioButton text={storyText(selected)} label="Read aloud" />
                    <CompleteButton id={makeProgressId("story", grade, selected.id)} label="Story done" />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.vocabulary.map((word) => (
                    <span key={word} className="rounded-full bg-amber-100 px-3 py-2 text-xs font-bold text-amber-700">
                      {word}
                    </span>
                  ))}
                </div>

                <div className="mt-8 space-y-5 text-lg leading-9 text-slate-700">
                  {selected.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="flex items-center gap-2 text-2xl font-black">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  Comprehension check
                </h3>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {selected.comprehension.map((item) => (
                    <div key={item.question} className="rounded-2xl bg-emerald-50 p-4">
                      <p className="font-bold text-emerald-900">{item.question}</p>
                      <p className="mt-3 text-sm text-emerald-700">Answer: {item.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-purple-50 p-5">
                  <p className="font-black text-purple-800">After-reading activity</p>
                  <p className="mt-2 text-purple-700">{selected.activity}</p>
                </div>
              </Card>
            </article>
          )}
        </section>
      </Container>
    </main>
  );
}
