"use client";

import { useState } from "react";
import Link from "next/link";
import AboutModal from "./AboutModal";

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E3DED3] bg-[#F6F4EF]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F4D3D] text-white shadow-md shadow-[#1F4D3D]/20 transition group-hover:bg-[#173B2E] group-hover:scale-105">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-[#14201C]">Vetora</span>
                {/* AI element in restrained indigo #4C5FD6 */}
                <span className="rounded-md bg-[#EEF0FD] px-1.5 py-0.5 text-xs font-extrabold text-[#4C5FD6] border border-[#4C5FD6]/20">
                  AI
                </span>
              </div>
              <p className="hidden text-[11px] font-medium text-[#485852] sm:block">
                Veterinary Knowledge Graph
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#14201C] transition hover:bg-[#EBF2EE] hover:text-[#1F4D3D] sm:text-sm"
            >
              Diagnosis Assistant
            </Link>

            <Link
              href="/about"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#485852] transition hover:bg-[#EBF2EE] hover:text-[#1F4D3D] sm:text-sm"
            >
              About Vetora AI
            </Link>

            {/* DB Status Badge */}
            <div className="hidden items-center gap-2 rounded-full border border-[#1F4D3D]/30 bg-[#EBF2EE] px-3 py-1 text-xs font-medium text-[#1F4D3D] md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1F4D3D] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1F4D3D]"></span>
              </span>
              <span>CognoDB Active</span>
            </div>
          </nav>
        </div>
      </header>

      {/* About Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
