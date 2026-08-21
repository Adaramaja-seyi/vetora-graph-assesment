"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import SimilarDiseases from "@/components/SimilarDiseases";
import Disclaimer from "@/components/Disclaimer";

type Disease = {
  name: string;
  description: string;
  species: string[];
  symptoms: string[];
};

export default function DiseaseDetailsPage() {
  const routeParams = useParams();
  const diseaseName = routeParams.diseaseName as string;

  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDiseaseDetails() {
      try {
        const response = await fetch(
          `/api/diseases/${encodeURIComponent(diseaseName)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Disease not found");
        }

        setDisease(data.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    if (diseaseName) {
      fetchDiseaseDetails();
    }
  }, [diseaseName]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F4EF] text-[#14201C]">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#EBF2EE] border-t-[#1F4D3D]" />
          <p className="font-semibold text-[#14201C]">Loading Disease Profile...</p>
          <p className="mt-1 text-xs text-[#485852]">Fetching records from CognoDB graph engine</p>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !disease) {
    return (
      <div className="min-h-screen bg-[#F6F4EF] text-[#14201C]">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1F4D3D] transition hover:text-[#173B2E] hover:underline mb-6"
          >
            <span>← Back to Diagnosis Assistant</span>
          </Link>

          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-md">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#14201C]">Disease Profile Not Found</h1>
            <p className="mt-2 text-sm text-[#485852]">{error || "We couldn't locate this disease node in the knowledge graph."}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#14201C]">
      {/* Navigation Header */}
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 space-y-8">
        {/* Back Link */}
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

        {/* Disease Overview Card */}
        <section className="rounded-3xl border border-[#E3DED3] bg-white p-6 sm:p-8 shadow-xl shadow-[#14201C]/5 ring-1 ring-[#14201C]/5 space-y-6">
          <div className="space-y-2 border-b border-[#E3DED3] pb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1F4D3D]/30 bg-[#EBF2EE] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#1F4D3D]">
              <span className="h-2 w-2 rounded-full bg-[#1F4D3D]" />
              Disease Information Record
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14201C] tracking-tight">
              {disease.name}
            </h1>

            <p className="text-base sm:text-lg text-[#485852] leading-relaxed pt-2">
              {disease.description}
            </p>
          </div>

          {/* Affected Species & Known Symptoms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Affected Species in warm ochre #B98B4E */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#485852]">
                Susceptible Species ({disease.species.length})
              </h3>

              <div className="flex flex-wrap gap-2">
                {disease.species.map((animal, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#B98B4E]/40 bg-[#F9F5EE] px-3.5 py-2 text-xs font-bold text-[#B98B4E] shadow-xs"
                  >
                    <svg className="h-4 w-4 text-[#B98B4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
                    </svg>
                    <span>{animal}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Known Symptoms */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#485852]">
                Associated Clinical Symptoms ({disease.symptoms.length})
              </h3>

              <div className="flex flex-wrap gap-2">
                {disease.symptoms.map((symptom, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E3DED3] bg-[#F6F4EF] px-3.5 py-2 text-xs font-bold text-[#14201C] shadow-xs"
                  >
                    <span className="text-[#1F4D3D] font-extrabold">✓</span>
                    <span>{symptom}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Graph Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            {/* AI element in restrained indigo #4C5FD6 */}
            <p className="text-xs font-bold uppercase tracking-widest text-[#4C5FD6]">
              AI Relationship Topology
            </p>
            <h2 className="text-2xl font-bold text-[#14201C]">
              Knowledge Graph
            </h2>
            <p className="text-xs sm:text-sm text-[#485852]">
              Explore how <strong>{disease.name}</strong> connects to animal species and symptoms in CognoDB.
            </p>
          </div>

          <KnowledgeGraph diseaseName={disease.name} />
        </section>

        {/* Similar Diseases Section */}
        <section>
          <SimilarDiseases diseaseName={disease.name} />
        </section>

        {/* Disclaimer */}
        <Disclaimer />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E3DED3] bg-white py-8 text-center text-xs text-[#485852]">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#14201C]">Vetora AI</span>
            <span>•</span>
            <span>Veterinary Clinical Knowledge Graph</span>
          </div>
          <p>© 2026 Vetora AI • Powered by CognoDB & React Flow</p>
        </div>
      </footer>
    </div>
  );
}