import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/components/ThemeToggle";
import { SiteSettingsProvider } from "@/components/SiteSettings";
import { getContent } from "@/lib/content";

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

const SITE_TITLE = "Дарья Карпук — психолог и коуч";
const SITE_DESCRIPTION =
  "Дарья Карпук — дипломированный психолог и коуч, создатель и автор программ по профессиональному и финансовому росту, спикер республиканских проектов.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Дарья Карпук — психолог и коуч",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-home.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Читается здесь, один раз на дерево: подвал и секция диагностики
     стоят на каждой странице, и каждая из них внутри клиентской
     границы — сами до базы они не дотянутся. */
  const { settings } = await getContent();

  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Проставляет тему до первого кадра — иначе при выбранной тёмной
            странице браузер успевает мигнуть светлым фоном. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteSettingsProvider
          settings={{
            copyrightYears: settings.copyright_years,
            diagnosticFormUrl: settings.diagnostic_form_url,
          }}
        >
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
