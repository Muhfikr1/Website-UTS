import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MAN 2 Pati · Madrasah Aliyah Negeri 2 Pati",
  description:
    "Madrasah Unggul Riset-Akademik, Berbudaya Lingkungan dan Layanan CERIA. Religius, Unggul, Berbasis Riset, dan Berbudaya Lingkungan.",
  keywords: [
    "MAN 2 Pati",
    "Madrasah Aliyah Negeri 2 Pati",
    "Madrasah Riset",
    "Adiwiyata",
    "Zona Integritas",
    "Tayu",
    "Pati",
  ],
  authors: [{ name: "MAN 2 Pati" }],
  openGraph: {
    title: "MAN 2 Pati · Madrasah Aliyah Negeri 2 Pati",
    description:
      "Madrasah Unggul Riset-Akademik, Berbudaya Lingkungan dan Layanan CERIA.",
    siteName: "MAN 2 Pati",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${jakartaSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
