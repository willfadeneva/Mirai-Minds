"use client";

import { useEffect, useMemo, useState } from "react";

export { makeProgressId } from "@/lib/progress";
export type { ProgressKind } from "@/lib/progress";

export type ProgressRecord = Record<string, boolean>;

const STORAGE_KEY = "mirai-minds-progress-v1";
const REVIEW_KEY = "mirai-minds-review-v1";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<ProgressRecord>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(readJson<ProgressRecord>(STORAGE_KEY, {}));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeJson(STORAGE_KEY, progress);
  }, [progress, loaded]);

  const completedCount = useMemo(
    () => Object.values(progress).filter(Boolean).length,
    [progress]
  );

  function isDone(id: string) {
    return Boolean(progress[id]);
  }

  function markDone(id: string) {
    setProgress((current) => ({ ...current, [id]: true }));
  }

  function toggleDone(id: string) {
    setProgress((current) => ({ ...current, [id]: !current[id] }));
  }

  function resetProgress() {
    setProgress({});
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(REVIEW_KEY);
    }
  }

  function countByPrefix(prefix: string) {
    return Object.entries(progress).filter(
      ([key, value]) => key.startsWith(prefix) && value
    ).length;
  }

  return {
    progress,
    completedCount,
    isDone,
    markDone,
    toggleDone,
    resetProgress,
    countByPrefix,
  };
}

export type ReviewRating = "again" | "good" | "easy";

export type ReviewItemState = {
  due: number;
  box: number;
  lastRating?: ReviewRating;
  reviews: number;
};

export type ReviewState = Record<string, ReviewItemState>;

const intervalsByBox = [0, 1, 2, 4, 7, 14, 30];

export function useSpacedReview() {
  const [review, setReview] = useState<ReviewState>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setReview(readJson<ReviewState>(REVIEW_KEY, {}));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeJson(REVIEW_KEY, review);
  }, [review, loaded]);

  function rate(id: string, rating: ReviewRating) {
    setReview((current) => {
      const old = current[id] ?? {
        due: Date.now(),
        box: 0,
        reviews: 0,
      };

      const nextBox =
        rating === "again"
          ? 0
          : rating === "good"
            ? Math.min(old.box + 1, 5)
            : Math.min(old.box + 2, 6);

      const days = intervalsByBox[nextBox] ?? 1;

      return {
        ...current,
        [id]: {
          due: Date.now() + days * 24 * 60 * 60 * 1000,
          box: nextBox,
          lastRating: rating,
          reviews: old.reviews + 1,
        },
      };
    });
  }

  function getItem(id: string) {
    return review[id];
  }

  function isDue(id: string) {
    const item = review[id];
    return !item || item.due <= Date.now();
  }

  return {
    review,
    rate,
    getItem,
    isDue,
  };
}
