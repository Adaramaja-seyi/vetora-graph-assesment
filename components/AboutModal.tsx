"use client";

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14201C]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-2xl ring-1 ring-[#14201C]/10 border border-[#E3DED3]">
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
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F4D3D] text-white shadow-md shadow-[#1F4D3D]/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#14201C]">About Vetora AI</h2>
            {/* AI badge in restrained indigo #4C5FD6 */}
            <p className="text-xs font-semibold text-[#4C5FD6]">Veterinary Knowledge Graph Platform</p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4 text-sm text-[#485852] leading-relaxed">
          <p>
            <strong className="text-[#14201C]">Vetora AI</strong> is a modern clinical assistant that leverages graph database architecture to model complex relationships between animal species, clinical symptoms, and diseases.
          </p>

          <div className="rounded-xl border border-[#E3DED3] bg-[#F6F4EF] p-4 space-y-2">
            <h3 className="font-semibold text-[#14201C] text-xs uppercase tracking-wider">Key Architecture</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#14201C]">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1F4D3D]" />
                <strong>CognoDB / Neo4j</strong> backend engine
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#B98B4E]" />
                <strong>React Flow</strong> interactive visualizer
              </li>
              <li className="flex items-center gap-2">
                {/* AI element in restrained indigo #4C5FD6 */}
                <span className="h-2 w-2 rounded-full bg-[#4C5FD6]" />
                <strong>AI Match Ratio</strong> algorithm
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1F4D3D]" />
                <strong>Next.js 16</strong> App Router architecture
              </li>
            </ul>
          </div>

          <p>
            When symptoms are submitted, Vetora AI traverses the graph network to query all connected disease nodes, calculates symptom overlap ratios, and ranks conditions by likelihood.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#1F4D3D] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173B2E]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
