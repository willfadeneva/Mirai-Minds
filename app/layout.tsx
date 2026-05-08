import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MascotGuide } from "@/components/learning/mascot-guide";
import { RegisterPWA } from "@/components/learning/register-pwa";

export const metadata: Metadata = {
  title: "Mirai Minds | Magical Learning in Hadano",
  description: "A free no-login futuristic English learning platform for children Grades 1–12 in Hadano, Japan.",
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = { themeColor: "#22d3ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><RegisterPWA/><Navbar/><main>{children}</main><Footer/><MascotGuide/></body></html>;
}
