import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Pulse – Token Discovery Table",
  description: "Axiom-style token discovery table with real-time updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-[#050509] text-gray-100 h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
