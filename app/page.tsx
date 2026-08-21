"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import DiagnosisForm from "@/components/DiagnosisForm";
import TopMatchCard from "@/components/TopMatchCard";
import DiseaseCard from "@/components/DiseaseCard";
import Disclaimer from "@/components/Disclaimer";

const speciesList = ["Dog", "Cat", "Horse", "Cow", "Goat"];

const symptomsList = [
  "Vomiting",
  "Diarrhea",
  "Fever",
  "Coughing",
  "Lethargy",
  "Loss of appetite",
];

type Diagnosis = {
  disease: string;
  description: string;
  matchedSymptoms: number;
  totalSymptoms: number;
  matchPercentage: number;
  symptoms: string[];
  matchingSymptoms: string[];
};

export default function Home() {
  const [selectedSpecies, setSelectedSpecies] = useState("Dog");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom]
    );
  }

  async function diagnose() {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom to perform a diagnosis.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        species: selectedSpecies,
        symptoms: selectedSymptoms.join(","),
      });

      const response = await fetch(`/api/diagnose?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Diagnosis failed");
      }

      setResults(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetDiagnosis() {
    setSelectedSpecies("Dog");
    setSelectedSymptoms([]);
    setResults([]);
    setError("");
    setHasSearched(false);
  }

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#14201C] selection:bg-[#EBF2EE] selection:text-[#1F4D3D]">
      {/* Header Bar */}
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        {/* Hero Section */}
        <section className="mb-10 text-center">
          {/* AI Knowledge Graph Powered Pill in restrained indigo #4C5FD6 */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4C5FD6]/30 bg-[#EEF0FD] px-4 py-1.5 text-xs font-semibold text-[#4C5FD6] shadow-xs mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4C5FD6] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4C5FD6]"></span>
            </span>
            <svg className="h-3.5 w-3.5 text-[#4C5FD6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Powered by Veterinary AI Knowledge Graph</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#14201C] sm:text-5xl">
            Veterinary Disease Assistant
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-[#485852] sm:text-lg leading-relaxed">
            Explore possible veterinary conditions using symptom-based analysis powered by a veterinary knowledge graph.
          </p>
        </section>

        {/* Diagnosis Interface Form Card */}
        <DiagnosisForm
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
          selectedSymptoms={selectedSymptoms}
          toggleSymptom={toggleSymptom}
          diagnose={diagnose}
          resetDiagnosis={resetDiagnosis}
          loading={loading}
          error={error}
          speciesList={speciesList}
          symptomsList={symptomsList}
        />

        {/* Loading Indicator Card */}
        {loading && (
          <div className="mt-8 rounded-3xl border border-[#E3DED3] bg-white p-10 text-center shadow-md animate-pulse-subtle">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF2EE] text-[#1F4D3D]">
              <svg className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-[#14201C]">Traversing Knowledge Graph</h3>
            <p className="mt-1 text-sm text-[#485852]">
              Querying CognoDB database for matching disease nodes for <strong>{selectedSpecies}</strong>...
            </p>
          </div>
        )}

        {/* Results Section */}
        {!loading && results.length > 0 && (
          <section className="mt-12 space-y-8 animate-in fade-in duration-300">
            {/* Results Header */}
            <div className="border-b border-[#E3DED3] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1F4D3D]">
                    Clinical Analysis
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#14201C] sm:text-3xl">
                    Diagnosis Results
                  </h2>
                </div>

                <div className="rounded-full bg-[#F9F5EE] border border-[#B98B4E]/30 px-4 py-1.5 text-xs font-semibold text-[#B98B4E]">
                  {results.length} condition{results.length !== 1 ? "s" : ""} identified
                </div>
              </div>

              <p className="mt-2 text-sm text-[#485852]">
                Evaluation for <strong className="text-[#14201C]">{selectedSpecies}</strong> based on{" "}
                <strong className="text-[#14201C]">
                  {selectedSymptoms.length} selected symptom{selectedSymptoms.length !== 1 ? "s" : ""}
                </strong>
                .
              </p>
            </div>

            {/* Prominent Top Match Card */}
            <TopMatchCard topMatch={results[0]} selectedSpecies={selectedSpecies} />

            {/* Remaining Possible Conditions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pt-4">
                <h3 className="text-lg font-bold text-[#14201C]">
                  All Possible Conditions ({results.length})
                </h3>
                <span className="text-xs text-[#485852] font-medium">Ranked by symptom overlap</span>
              </div>

              {results.map((result, index) => (
                <DiseaseCard key={result.disease} result={result} index={index} />
              ))}
            </div>

            {/* Veterinary Disclaimer */}
            <Disclaimer />
          </section>
        )}

        {/* No Results Empty State */}
        {!loading && hasSearched && results.length === 0 && !error && (
          <div className="mt-8 rounded-3xl border border-[#E3DED3] bg-white p-10 text-center shadow-xs">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F4EF] text-[#485852]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-[#14201C]">No Matching Diseases Found</h3>
            <p className="mt-1 text-sm text-[#485852] max-w-md mx-auto">
              No conditions in the CognoDB graph matched the combination of <strong>{selectedSpecies}</strong> and selected symptoms. Try adjusting selected symptoms.
            </p>

            <button
              type="button"
              onClick={resetDiagnosis}
              className="mt-5 rounded-xl bg-[#1F4D3D] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#173B2E]"
            >
              Reset Selection
            </button>
          </div>
        )}
      </main>

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
              About Vetora AI
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
