import { Inter } from "next/font/google";
import "./globals.css";
import { HistoryProvider } from './contexts/HistoryContext'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HistoryProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <title>Quote Generator</title>
        </head>
        <body className={inter.className + " bg-gradient-hero min-h-screen text-white relative overflow-x-hidden"}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/20 via-transparent to-primary-brown/20"></div>
          <div className="relative z-10">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </HistoryProvider>
  );
}