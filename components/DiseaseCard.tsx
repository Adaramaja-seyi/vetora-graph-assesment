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

type DiseaseCardProps = {
  result: Diagnosis;
  index: number;
};

export default function DiseaseCard({ result, index }: DiseaseCardProps) {
  const percentage = result.matchPercentage || 0;
  const matchingSymptoms = result.matchingSymptoms || [];
  const symptoms = result.symptoms || [];
  const isTopRank = index === 0;

  return (
    <article
      className={`group rounded-3xl border transition-all duration-200 p-6 sm:p-7 shadow-xs hover:shadow-md ${
        isTopRank
          ? "border-[#1F4D3D]/50 bg-white ring-1 ring-[#1F4D3D]/20"
          : "border-[#E3DED3] bg-white hover:border-[#1F4D3D]/40"
      }`}
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        {/* Left info */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                isTopRank
                  ? "bg-[#1F4D3D] text-white shadow-xs"
                  : "bg-[#F6F4EF] text-[#14201C] border border-[#E3DED3]"
              }`}
            >
              #{index + 1}
            </span>

            <Link
              href={`/diseases/${encodeURIComponent(result.disease)}`}
              className="text-xl font-bold text-[#14201C] transition hover:text-[#1F4D3D] hover:underline"
            >
              {result.disease}
            </Link>

            {isTopRank && (
              <span className="rounded-full bg-[#EBF2EE] px-2.5 py-0.5 text-[11px] font-bold text-[#1F4D3D] border border-[#1F4D3D]/20">
                Top Match
              </span>
            )}
          </div>

          <p className="text-sm text-[#485852] leading-relaxed">
            {result.description}
          </p>
        </div>

        {/* Right score - AI Match Score in restrained indigo #4C5FD6 */}
        <div className="shrink-0 text-left sm:text-right">
          <div className="inline-flex flex-col items-start sm:items-end">
            <span className="text-3xl font-extrabold text-[#4C5FD6] tracking-tight">
              {percentage}%
            </span>
            <span className="text-xs font-semibold text-[#4C5FD6]/80">
              AI match score
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar - AI progress fill in restrained indigo #4C5FD6 */}
      <div className="mt-5 space-y-1.5">
        <div className="flex justify-between text-xs font-medium text-[#485852]">
          <span>Match confidence ratio</span>
          <span>
            {result.matchedSymptoms || 0} / {result.totalSymptoms || 0} known symptoms
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-[#F6F4EF] p-0.5 border border-[#E3DED3]/60">
          <div
            className="h-full rounded-full bg-[#4C5FD6] transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Symptoms breakdown */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matched symptoms in warm ochre #B98B4E */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#485852]">
            Matching Symptoms ({matchingSymptoms.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {matchingSymptoms.map((symptom) => (
              <span
                key={symptom}
                className="inline-flex items-center gap-1 rounded-lg bg-[#F9F5EE] border border-[#B98B4E]/40 px-2.5 py-1 text-xs font-semibold text-[#B98B4E]"
              >
                <span>✓</span>
                <span>{symptom}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Known symptoms */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#485852]">
            All Known Symptoms ({symptoms.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {symptoms.map((symptom) => {
              const isMatched = matchingSymptoms.includes(symptom);

              return (
                <span
                  key={symptom}
                  className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
                    isMatched
                      ? "bg-[#E3DED3] text-[#14201C] font-semibold"
                      : "bg-[#F6F4EF] text-[#485852]"
                  }`}
                >
                  {symptom}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-end">
        <Link
          href={`/diseases/${encodeURIComponent(result.disease)}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E3DED3] bg-[#F6F4EF] px-4 py-2 text-xs font-bold text-[#14201C] transition hover:border-[#1F4D3D]/40 hover:bg-[#EBF2EE] hover:text-[#1F4D3D] active:scale-[0.98]"
        >
          <span>View disease details</span>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
