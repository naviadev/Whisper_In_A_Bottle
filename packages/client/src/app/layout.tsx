import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

import { Title } from "../components/background/title";
import { Sound } from "../components/background/sound";
import { CopyRight } from "../components/background/copyright";
import { CoolongFan } from "../components/background/cooling_fan";


const PressStart2P = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Whisper In A Bottle",
  description: "Your Letter To Someone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={PressStart2P.className}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-[1053px] h-[652px] gameboy-container1 flex justify-center items-center">
            <div className=" w-[1024px] h-[628px] gameboy-container2 flex flex-col justify-center">
              <header className="h-[12%] flex justify-center items-center">
                <Title />
              </header>
              <main className="h-[79%] flex flex-row">
                <div className="w-[70px] flex justify-center items-center">
                  <Sound />
                </div>
                <div className="w-[954px] bg-slate-950">{children}</div>
              </main>
              <footer className="h-[9%] flex flex-row">
                <div className="w-[70px]" />
                <CopyRight />
                <div className="w-[350px]" />
                <CoolongFan />
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
