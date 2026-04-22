import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Студия — креатив, дизайн, брендинг",
  description:
    "Премиальная креативная студия: брендинг, дизайн, digital. Минимализм и внимание к деталям.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="video" href="/intro.mp4" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F2EFE9] text-[#141416]">
        {children}
      </body>
    </html>
  );
}
