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
        <body className={inter.className + " bg-gray-900 text-white"}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </HistoryProvider>
  );
}