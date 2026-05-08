"use client";

import { useEffect } from "react";

export function RegisterPWA() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations?.().then((registrations) => {
          registrations.forEach((registration) => registration.unregister());
        }).catch(() => undefined);
      }
      if ("caches" in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key))).catch(() => undefined);
      }
      return;
    }

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => undefined);
      });
    }
  }, []);

  return null;
}
