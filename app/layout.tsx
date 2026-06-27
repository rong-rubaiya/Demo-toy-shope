import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ens Toys (Huizhou) Co., Ltd. | Premium B2B Toy Manufacturer",
  description: "Global manufacturing partner for custom PVC figures, soft vinyl toys, action figures, plush toys, and educational STEM sets. Fully certified ISO 9001, BSCI, & EN71 facilities.",
  keywords: "toy manufacturer, PVC toys, vinyl toys, action figures, custom toys, B2B toy supplier, educational toys, blind box, OEM toy factory, ODM toy design",
  authors: [{ name: "Ens Toys Co., Ltd." }],
  openGraph: {
    title: "Ens Toys | Premium B2B Toy Manufacturer",
    description: "Exporting custom high-fidelity toys to 100+ countries. Custom molds, prototyping, and ethical production.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-light text-dark font-inter">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
