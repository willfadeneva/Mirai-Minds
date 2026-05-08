"use client";
export function PrintButton() {
  return <button onClick={() => window.print()} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-midnight">Print / Save PDF</button>;
}
