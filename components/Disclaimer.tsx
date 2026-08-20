"use client";

export default function Disclaimer() {
  return (
    <div className="rounded-2xl border border-[#B98B4E]/40 bg-[#F9F5EE] p-4 sm:p-5 shadow-xs transition-all">
      <div className="flex gap-3.5 items-start">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B98B4E]/20 text-[#B98B4E]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#14201C]">Veterinary Clinical Notice</h4>
          <p className="text-xs sm:text-sm text-[#485852] leading-relaxed">
            <strong>Important:</strong> These results are possible matches based on the selected symptoms and should not replace evaluation by a qualified veterinarian.
          </p>
        </div>
      </div>
    </div>
  );
}
