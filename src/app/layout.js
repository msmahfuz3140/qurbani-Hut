import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "QurbaniHut — Trusted Qurbani Livestock",
  description:
    "QurbaniHut helps you discover healthy cows, bulls, and goats for Eid al-Adha. Transparent listings, fair guidance, and a smooth path from browse to booking — with care for both customer and animal.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" data-theme="light">
      <body
        className={`${dmSans.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 4000,
              iconTheme: {
                primary: '#4aed88',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
