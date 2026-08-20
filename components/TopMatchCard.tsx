"use client";

import Link from "next/link";

type Diagnosis = {
  disease: string;
  description: string;
  matchedSymptoms: number;
  totalSymptoms: number;
  matchPercentage: number;
  symptoms: string[];
  matchingSymptoms: string[];
};

type TopMatchCardProps = {
  topMatch: Diagnosis;
  selectedSpecies: string;
};

export default function TopMatchCard({ topMatch, selectedSpecies }: TopMatchCardProps) {
  const percentage = topMatch.matchPercentage || 0;
  const matchingSymptoms = topMatch.matchingSymptoms || [];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#1F4D3D]/30 bg-gradient-to-br from-[#EBF2EE]/90 via-[#F9F5EE]/50 to-white p-6 sm:p-8 shadow-xl shadow-[#1F4D3D]/5 ring-1 ring-[#1F4D3D]/10">
      {/* Background radial highlight */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#1F4D3D]/10 blur-2xl pointer-events-none" />

      {/* Badge Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Deep Pine Green #1F4D3D badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1F4D3D] bg-[#1F4D3D] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.488-.415.87-.837.608l-4.685-2.915a.563.563 0 00-.582 0l-4.685 2.915c-.422.262-.953-.12-.837-.608l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          Top Match Result
        </div>

        <span className="text-xs font-semibold text-[#1F4D3D] bg-[#EBF2EE] rounded-full px-3 py-1 border border-[#1F4D3D]/20">
          Primary Clinical Correlation
        </span>
      </div>

      {/* Main Info Grid */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14201C] tracking-tight">
            {topMatch.disease}
          </h3>

          <p className="text-sm text-[#485852] leading-relaxed">
            {topMatch.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#14201C] font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-[#E3DED3] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1F4D3D]" />
              Species: <strong>{selectedSpecies}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-[#E3DED3] px-2.5 py-1">
              <strong>{topMatch.matchedSymptoms || 0} / {topMatch.totalSymptoms || 0}</strong> symptoms matched
            </span>
          </div>
        </div>

        {/* AI Percentage Metric in restrained indigo #4C5FD6 */}
        <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-[#EEF0FD] p-5 shadow-sm border border-[#4C5FD6]/30 min-w-[140px] text-center">
          <span className="text-4xl font-extrabold text-[#4C5FD6] tracking-tight">
            {percentage}%
          </span>
          <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#4C5FD6]">
            AI Match Score
          </span>
        </div>
      </div>

      {/* Matched Symptoms Pills in warm ochre #B98B4E */}
      <div className="mt-6 border-t border-[#E3DED3] pt-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#485852]">
          Matched Clinical Signs ({matchingSymptoms.length})
        </p>

        <div className="flex flex-wrap gap-2">
          {matchingSymptoms.map((symptom) => (
            <span
              key={symptom}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#B98B4E] text-white px-3 py-1.5 text-xs font-semibold shadow-xs"
            >
              <span>✓</span>
              <span>{symptom}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 flex justify-end">
        <Link
          href={`/diseases/${encodeURIComponent(topMatch.disease)}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1F4D3D] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#173B2E] active:scale-[0.98]"
        >
          <span>View Disease Details & Graph</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
