import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Mail, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-gradient-to-br from-white via-sky-50 to-amber-50 py-10 text-slate-700">
      <Container className="grid gap-6 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xl font-black text-slate-900">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-200 to-violet-200 text-slate-900 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            Mirai Minds
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Free, no-login English learning for kids in Hadano, Kanagawa.
          </p>
          <p className="text-sm leading-6 text-slate-600">
            秦野市・神奈川県の子どもたちのための、無料・ログイン不要の英語学習サイトです。
          </p>
        </div>

        <div className="space-y-2 rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-sky-100">
          <h2 className="text-sm font-black uppercase tracking-wide text-sky-700">Contact / お問い合わせ</h2>
          <a
            href="mailto:charanjotsingh@gmail.com"
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-sm font-bold text-sky-700 transition hover:bg-sky-100"
          >
            <Mail className="h-4 w-4" />
            charanjotsingh@gmail.com
          </a>
          <p className="text-xs leading-5 text-slate-500">
            Questions, feedback, or local collaboration ideas are welcome.
          </p>
          <p className="text-xs leading-5 text-slate-500">
            ご質問・ご意見・地域での連携について、お気軽にご連絡ください。
          </p>
        </div>

        <div className="space-y-2 rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-violet-100">
          <h2 className="text-sm font-black uppercase tracking-wide text-violet-700">Credits</h2>
          <p className="text-sm text-slate-600">
            Designed by{" "}
            <a
              href="https://mir-ai.cloud/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-violet-700 underline decoration-violet-300 underline-offset-4 transition hover:text-violet-900"
            >
              mir-ai.cloud
            </a>
          </p>
          <p className="text-xs leading-5 text-slate-500">
            Built with free and open-source tools for a safe, friendly learning experience.
          </p>
        </div>
      </Container>
      <Container className="mt-6 border-t border-sky-100 pt-5 text-xs text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mirai Minds. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-bold hover:text-sky-700">Privacy / 安全とプライバシー</Link>
            <Link href="/how-to-use" className="font-bold hover:text-sky-700">How to use / 使い方</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
