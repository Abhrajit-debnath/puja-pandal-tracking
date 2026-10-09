import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import App from "./App";
import SocketProvider from "./providers/SocketProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Jagadhatri Puja Trail | Chandannagar",
  description: "Explore the best pandals, live darshan, and crowd levels in Chandannagar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable}  antialiased`}
    >
      <body className="bg-alpona-ivory min-h-screen">
        <App>
          <SocketProvider>
            {children}
          </SocketProvider>
          
        </App>
      </body>
    </html>
  );
}
