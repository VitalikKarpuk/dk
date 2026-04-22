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
  title: "Дарья Карпук — клинический психолог, психотерапевт",
  description:
    "Индивидуальные консультации, курсы и интенсивы. Бережно и без оценок — о тревоге, отношениях, опоре и росте.",
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
      <body className="min-h-full flex flex-col bg-[#F4F6F9] text-[#151922]">
        {children}
      </body>
    </html>
  );
}
