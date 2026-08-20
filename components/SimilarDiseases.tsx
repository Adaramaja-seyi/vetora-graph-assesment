"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SimilarDisease = {
  name: string;
  description: string;
  sharedSymptoms: string[];
  allSymptoms: string[];
  affectedSpecies: string[];
  similarity: {
    score: number;
    sharedSymptomCount: number;
    totalUniqueSymptoms: number;
  };
};

type SimilarDiseasesProps = {
  diseaseName: string;
};

export default function SimilarDiseases({ diseaseName }: SimilarDiseasesProps) {
  const [similarDiseases, setSimilarDiseases] = useState<SimilarDisease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSimilarDiseases() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/diseases/${encodeURIComponent(diseaseName)}/similar`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load similar diseases");
        }

        setSimilarDiseases(data.similarDiseases || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load similar diseases"
        );
      } finally {
        setLoading(false);
      }
    }

    if (diseaseName) {
      fetchSimilarDiseases();
    }
  }, [diseaseName]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-[#E3DED3] bg-white p-8 text-center shadow-xs">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-[#EBF2EE] border-t-[#1F4D3D]" />
        <p className="text-sm font-semibold text-[#14201C]">
          Finding Similar Diseases...
        </p>
        <p className="mt-1 text-xs text-[#485852]">
          Traversing symptom connections in the knowledge graph
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50/80 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (similarDiseases.length === 0) {
    return (
      <div className="rounded-3xl border border-[#E3DED3] bg-white p-8 text-center shadow-xs">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F6F4EF] text-[#485852]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#485852]">
          No similar diseases found based on symptom overlap
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#4C5FD6]">
            Graph Analysis
          </p>
          <span className="rounded-full bg-[#EEF0FD] px-2 py-0.5 text-[10px] font-bold text-[#4C5FD6] border border-[#4C5FD6]/20">
            Multi-Hop Query
          </span>
        </div>
        <h2 className="text-2xl font-bold text-[#14201C]">
          Similar Diseases
        </h2>
        <p className="text-xs sm:text-sm text-[#485852]">
          Diseases with overlapping symptoms, ranked by Jaccard similarity
        </p>
      </div>

      {/* Similar Disease Cards */}
      <div className="space-y-3">
        {similarDiseases.map((disease, index) => (
          <Link
            key={disease.name}
            href={`/diseases/${encodeURIComponent(disease.name)}`}
            className="block rounded-2xl border border-[#E3DED3] bg-white p-5 shadow-sm transition hover:border-[#1F4D3D] hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Disease Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-3">
                  {/* Rank Badge */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#EBF2EE] text-xs font-bold text-[#1F4D3D]">
                    #{index + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#14201C] group-hover:text-[#1F4D3D]">
                      {disease.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#485852] leading-relaxed">
                      {disease.description}
                    </p>
                  </div>
                </div>

                {/* Shared Symptoms */}
                <div className="pl-11">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#485852] mb-1.5">
                    Shared Symptoms ({disease.similarity.sharedSymptomCount})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {disease.sharedSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#1F4D3D]/30 bg-[#EBF2EE] px-2 py-0.5 text-[10px] font-semibold text-[#1F4D3D]"
                      >
                        <span className="text-[#1F4D3D]">✓</span>
                        {symptom}
                      </span>
                    ))}
                  </div>

                  {/* Affected Species */}
                  {disease.affectedSpecies.length > 0 && (
                    <div className="mt-2">
                      <p className="text-[10px] font-semibold text-[#485852] mb-1">
                        Affects: {disease.affectedSpecies.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Similarity Score */}
              <div className="flex-shrink-0 rounded-xl border-2 border-[#4C5FD6]/30 bg-[#EEF0FD] px-4 py-3 text-center">
                <div className="text-2xl font-extrabold text-[#4C5FD6]">
                  {disease.similarity.score}%
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#4C5FD6]/80">
                  Similar
                </div>
                <div className="mt-1 text-[9px] text-[#485852]">
                  {disease.similarity.sharedSymptomCount}/
                  {disease.similarity.totalUniqueSymptoms} symptoms
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Technical Note */}
      <div className="rounded-xl border border-[#4C5FD6]/20 bg-[#EEF0FD]/40 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[#4C5FD6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-[#4C5FD6]">
              Powered by Graph Algorithms
            </p>
            <p className="mt-1 text-xs text-[#485852] leading-relaxed">
              This similarity analysis uses a <strong>3-hop graph traversal</strong> pattern:
              Disease → Symptom ← Disease. The Jaccard similarity coefficient measures
              symptom overlap. This type of bidirectional pattern matching is natural in
              graph databases but requires complex self-joins in SQL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
