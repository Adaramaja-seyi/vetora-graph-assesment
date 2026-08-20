import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vetora AI - Veterinary Disease Assistant & Knowledge Graph",
  description:
    "Explore possible veterinary conditions using symptom-based analysis powered by a graph database.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#F6F4EF] text-[#14201C]">
      <body className="min-h-full font-sans antialiased selection:bg-[#EBF2EE] selection:text-[#1F4D3D]">
        {children}
      </body>
    </html>
  );
}