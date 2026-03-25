import type { Metadata } from "next";
import { Poppins, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prospex ML — Machine Learning Prediction Platform",
  description: "Innovating the spirit of prediction. A cutting-edge ML platform for data-driven insights.",
  keywords: ["Machine Learning", "AI", "Prediction", "Data Science"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${sourceSerif.variable} font-sans antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
