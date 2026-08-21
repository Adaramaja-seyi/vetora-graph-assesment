"use client";

import Link from "next/link";

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14201C]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-[#14201C]/10 border border-[#E3DED3] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F6F4EF] text-[#485852] transition hover:bg-[#EBF2EE] hover:text-[#1F4D3D]"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F4D3D] text-white shadow-md shadow-[#1F4D3D]/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#14201C]">About Vetora AI</h2>
              <span className="rounded-md bg-[#EEF0FD] px-2 py-0.5 text-xs font-extrabold text-[#4C5FD6] border border-[#4C5FD6]/20">
                AI
              </span>
            </div>
            <p className="text-sm font-semibold text-[#1F4D3D] mt-0.5">Veterinary Intelligence, Connected.</p>
          </div>
        </div>

        {/* Main Body */}
        <div className="mt-6 space-y-5 text-sm text-[#485852] leading-relaxed">
          <p className="text-base text-[#14201C] font-normal leading-relaxed">
            <strong className="font-semibold text-[#14201C]">Vetora AI</strong> is a modern veterinary clinical assistant designed to help organize and interpret complex relationships between animal species, symptoms, diseases, and clinical information.
          </p>

          {/* How Vetora AI Works Section */}
          <div className="rounded-2xl border border-[#E3DED3] bg-[#F6F4EF] p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#14201C] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1F4D3D]"></span>
              How Vetora AI Works
            </h3>

            <div className="grid gap-3.5 sm:gap-4">
              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-[#E3DED3]/60 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EBF2EE] text-[#1F4D3D] font-bold text-xs">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#14201C]">Connected Knowledge</h4>
                  <p className="text-xs text-[#485852] mt-0.5">
                    Understands relationships between symptoms, diseases, and animal species.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-[#E3DED3]/60 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FD] text-[#4C5FD6] font-bold text-xs">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#14201C]">Intelligent Analysis</h4>
                  <p className="text-xs text-[#485852] mt-0.5">
                    Evaluates reported symptoms to identify relevant possible conditions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-[#E3DED3]/60 shadow-2xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F9F5EE] text-[#B98B4E] font-bold text-xs">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#14201C]">Clear Insights</h4>
                  <p className="text-xs text-[#485852] mt-0.5">
                    Presents results in an easy-to-understand format to support veterinary decision-making.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#485852] leading-relaxed">
            Vetora AI brings veterinary knowledge together in one intelligent platform, helping users explore clinical relationships and make more informed decisions about animal health.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-[#E3DED3] pt-5">
          <Link
            href="/about"
            onClick={onClose}
            className="text-xs font-bold text-[#1F4D3D] hover:underline"
          >
            View Full Dedicated Page →
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-[#1F4D3D] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#173B2E] active:scale-[0.98]"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
