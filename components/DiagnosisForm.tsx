"use client";

type DiagnosisFormProps = {
  selectedSpecies: string;
  setSelectedSpecies: (species: string) => void;
  selectedSymptoms: string[];
  toggleSymptom: (symptom: string) => void;
  diagnose: () => void;
  resetDiagnosis: () => void;
  loading: boolean;
  error: string;
  speciesList: string[];
  symptomsList: string[];
};

// SVG icons for animals
function AnimalIcon({ animal }: { animal: string }) {
  switch (animal) {
    case "Dog":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 1.105-1.12 2-2.5 2S7 12.105 7 11s1.12-2 2.5-2 2.5.895 2.5 2zM17 11c0 1.105-1.12 2-2.5 2S12 12.105 12 11s1.12-2 2.5-2 2.5.895 2.5 2zM12 18c-2.5 0-4.5-1.5-4.5-3s2-1.5 4.5-1.5 4.5 0 4.5 1.5-2 3-4.5 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
        </svg>
      );
    case "Cat":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.657 0-3 1.12-3 2.5s1.343 2.5 3 2.5 3-1.12 3-2.5-1.343-2.5-3-2.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25l2.25-4.5 3 3.75h4.5l3-3.75 2.25 4.5c.5 1 1 2.25 1 3.75 0 5-4.25 9-10.5 9S1.5 17 1.5 12c0-1.5.5-2.75 1-3.75z" />
        </svg>
      );
    case "Horse":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "Cow":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "Goat":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

// Symptom visual icons
function SymptomIcon({ symptom }: { symptom: string }) {
  switch (symptom) {
    case "Vomiting":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      );
    case "Diarrhea":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      );
    case "Fever":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      );
    case "Coughing":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "Lethargy":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      );
    case "Loss of appetite":
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
    default:
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      );
  }
}

export default function DiagnosisForm({
  selectedSpecies,
  setSelectedSpecies,
  selectedSymptoms,
  toggleSymptom,
  diagnose,
  resetDiagnosis,
  loading,
  error,
  speciesList,
  symptomsList,
}: DiagnosisFormProps) {
  return (
    <section className="rounded-3xl border border-[#E3DED3] bg-white p-6 sm:p-8 shadow-xl shadow-[#14201C]/5 transition-all">
      {/* Step 1: Select Animal */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Primary deep pine green #1F4D3D */}
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1F4D3D] text-xs font-bold text-white shadow-xs">
              1
            </span>
            <h2 className="text-base font-bold text-[#14201C] sm:text-lg">
              Select Animal Species
            </h2>
          </div>
          <span className="text-xs font-medium text-[#485852]">Target host</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {speciesList.map((animal) => {
            const selected = selectedSpecies === animal;

            return (
              <button
                key={animal}
                type="button"
                onClick={() => setSelectedSpecies(animal)}
                className={`group relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 font-semibold text-sm transition-all duration-150 active:scale-[0.98] ${
                  selected
                    ? "border-[#1F4D3D] bg-[#1F4D3D] text-white shadow-md shadow-[#1F4D3D]/20 ring-2 ring-[#1F4D3D] ring-offset-2 ring-offset-[#F6F4EF]"
                    : "border-[#E3DED3] bg-[#F6F4EF]/60 text-[#14201C] hover:border-[#1F4D3D]/50 hover:bg-[#EBF2EE] hover:text-[#1F4D3D]"
                }`}
              >
                <div className={`transition-transform duration-150 group-hover:scale-110 ${selected ? "text-white" : "text-[#485852] group-hover:text-[#1F4D3D]"}`}>
                  <AnimalIcon animal={animal} />
                </div>
                <span>{animal}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Symptoms */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Primary deep pine green #1F4D3D */}
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1F4D3D] text-xs font-bold text-white shadow-xs">
              2
            </span>
            <h2 className="text-base font-bold text-[#14201C] sm:text-lg">
              Select Observed Symptoms
            </h2>
          </div>

          {selectedSymptoms.length > 0 && (
            /* Warm ochre #B98B4E badge for symptom selection */
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B98B4E]/40 bg-[#F9F5EE] px-3 py-1 text-xs font-semibold text-[#B98B4E]">
              <span className="h-2 w-2 rounded-full bg-[#B98B4E]" />
              {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {symptomsList.map((symptom) => {
            const selected = selectedSymptoms.includes(symptom);

            return (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`flex items-center justify-between rounded-2xl border p-4 text-left font-medium text-sm transition-all duration-150 active:scale-[0.99] ${
                  selected
                    ? "border-[#B98B4E] bg-[#F9F5EE] text-[#14201C] shadow-xs ring-1 ring-[#B98B4E]/40"
                    : "border-[#E3DED3] bg-white text-[#14201C] hover:border-[#B98B4E]/50 hover:bg-[#F9F5EE]/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                    selected ? "bg-[#B98B4E] text-white" : "bg-[#F6F4EF] text-[#485852]"
                  }`}>
                    <SymptomIcon symptom={symptom} />
                  </div>
                  <span>{symptom}</span>
                </div>

                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                    selected
                      ? "border-[#B98B4E] bg-[#B98B4E] text-white"
                      : "border-[#E3DED3] text-transparent"
                  }`}
                >
                  ✓
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-900 animate-in fade-in">
          <svg className="h-5 w-5 shrink-0 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Primary Deep Pine Green #1F4D3D button */}
        <button
          type="button"
          onClick={diagnose}
          disabled={loading}
          className="group relative flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-[#1F4D3D] px-6 py-4 font-bold text-white shadow-lg shadow-[#1F4D3D]/20 transition-all duration-150 hover:bg-[#173B2E] hover:shadow-xl hover:shadow-[#1F4D3D]/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Traversing Knowledge Graph...</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>Diagnose {selectedSpecies}</span>
            </>
          )}
        </button>

        {(selectedSymptoms.length > 0 || error) && (
          <button
            type="button"
            onClick={resetDiagnosis}
            className="rounded-2xl border border-[#E3DED3] bg-[#F6F4EF] px-6 py-4 font-semibold text-[#14201C] shadow-xs transition hover:bg-[#EBF2EE] hover:text-[#1F4D3D] active:scale-[0.98]"
          >
            Reset Form
          </button>
        )}
      </div>
    </section>
  );
}
