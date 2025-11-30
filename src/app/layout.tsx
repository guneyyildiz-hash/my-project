import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guney Yildiz | Journalist & Political Risk Consultant",
  description: "Portfolio of Guney Yildiz - Journalist, Political Risk Consultant, and PhD Candidate at Cambridge University. Covering Turkey, Middle East, and Gulf politics.",
  keywords: ["Guney Yildiz", "journalist", "Turkey", "Middle East", "political risk", "Cambridge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
