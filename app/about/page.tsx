import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "About Vetora AI - Veterinary Intelligence, Connected",
  description:
    "Learn how Vetora AI brings veterinary clinical knowledge together to help explore relationships and make informed decisions about animal health.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#14201C] flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 space-y-12">
          {/* Breadcrumb / Back Link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1F4D3D] transition hover:text-[#173B2E] hover:underline"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to Diagnosis Assistant</span>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl border border-[#E3DED3] bg-white p-8 sm:p-12 shadow-xl shadow-[#14201C]/5 ring-1 ring-[#14201C]/5 space-y-6">
            {/* Background radial accent */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1F4D3D]/5 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-[#4C5FD6]/5 blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1F4D3D]/30 bg-[#EBF2EE] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#1F4D3D]">
                <span className="h-2 w-2 rounded-full bg-[#1F4D3D]" />
                About Vetora AI
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#14201C] tracking-tight">
                Veterinary Intelligence, <span className="text-[#1F4D3D]">Connected.</span>
              </h1>

              <p className="text-base sm:text-xl text-[#485852] leading-relaxed pt-2">
                Vetora AI is a modern veterinary clinical assistant designed to help organize and interpret complex relationships between animal species, symptoms, diseases, and clinical information.
              </p>
            </div>

            {/* How Vetora AI Works */}
            <div className="pt-8 border-t border-[#E3DED3] space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#4C5FD6]">
                  Platform Capabilities
                </p>
                <h2 className="text-2xl font-bold text-[#14201C]">
                  How Vetora AI Works
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Connected Knowledge */}
                <div className="flex flex-col justify-between rounded-2xl border border-[#E3DED3] bg-[#F6F4EF] p-6 transition hover:shadow-md hover:border-[#1F4D3D]/30">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F4D3D] text-white shadow-md shadow-[#1F4D3D]/20">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#14201C]">Connected Knowledge</h3>
                      <p className="mt-2 text-sm text-[#485852] leading-relaxed">
                        Understands relationships between symptoms, diseases, and animal species.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E3DED3]/60 text-[11px] font-bold uppercase tracking-wider text-[#1F4D3D]">
                    Graph Topology
                  </div>
                </div>

                {/* 2. Intelligent Analysis */}
                <div className="flex flex-col justify-between rounded-2xl border border-[#E3DED3] bg-[#F6F4EF] p-6 transition hover:shadow-md hover:border-[#4C5FD6]/30">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4C5FD6] text-white shadow-md shadow-[#4C5FD6]/20">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#14201C]">Intelligent Analysis</h3>
                      <p className="mt-2 text-sm text-[#485852] leading-relaxed">
                        Evaluates reported symptoms to identify relevant possible conditions.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E3DED3]/60 text-[11px] font-bold uppercase tracking-wider text-[#4C5FD6]">
                    Match Engine
                  </div>
                </div>

                {/* 3. Clear Insights */}
                <div className="flex flex-col justify-between rounded-2xl border border-[#E3DED3] bg-[#F6F4EF] p-6 transition hover:shadow-md hover:border-[#B98B4E]/30">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#B98B4E] text-white shadow-md shadow-[#B98B4E]/20">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#14201C]">Clear Insights</h3>
                      <p className="mt-2 text-sm text-[#485852] leading-relaxed">
                        Presents results in an easy-to-understand format to support veterinary decision-making.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E3DED3]/60 text-[11px] font-bold uppercase tracking-wider text-[#B98B4E]">
                    Clinical Decision Support
                  </div>
                </div>
              </div>
            </div>

            {/* Summary & Call to action */}
            <div className="rounded-2xl border border-[#E3DED3] bg-[#F6F4EF] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#14201C]">
                  One Unified Platform
                </h3>
                <p className="text-sm text-[#485852] leading-relaxed max-w-xl">
                  Vetora AI brings veterinary knowledge together in one intelligent platform, helping users explore clinical relationships and make more informed decisions about animal health.
                </p>
              </div>

              <Link
                href="/"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#1F4D3D] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#173B2E] active:scale-[0.98]"
              >
                <span>Launch Assistant</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Clinical Disclaimer */}
          <Disclaimer />
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E3DED3] bg-white py-8 text-center text-xs text-[#485852]">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#14201C]">Vetora AI</span>
            <span>•</span>
            <span>Veterinary Clinical Knowledge Graph</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#485852]">
            <Link href="/" className="hover:text-[#1F4D3D] transition">
              Diagnosis Assistant
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#1F4D3D] transition">
              About Platform
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
