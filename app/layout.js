import { Inter, JetBrains_Mono } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SimWork | Future of Work Simulation",
  description: "AI-driven immersive work simulation platform for hiring and training",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <div id="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
