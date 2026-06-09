import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { metadata, jsonLd } from "./metadata";

// Variable fonts (no fixed `weight`) so the full wght range loads — and, for
// Newsreader, the `opsz` optical-size axis, which gives large display headings
// the refined high-contrast cut the design relies on (font-optical-sizing: auto).
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export { metadata };

// Sets data-theme before first paint so Dusk never flashes Sand on reload.
const themeScript = `(function(){try{var t=localStorage.getItem('aura-theme');if(t!=='sand'&&t!=='dusk'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dusk':'sand';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','sand');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics gaId="G-QNX4KVJTK5" />
      </body>
    </html>
  );
}
