'use client';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/favorites", label: "Favorites" },
  { href: "/history", label: "History" },
  { href: "/my-quotes", label: "My Quotes" },
  { href: "/feedback", label: "Feedback" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-gradient-navbar backdrop-blur-xl shadow-professional sticky top-0 z-50 min-h-[70px] flex items-center">
      <div className="container-professional flex justify-between items-center w-full">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-start select-none">
          <span
            className="text-2xl font-extrabold uppercase tracking-wide text-white"
            style={{ letterSpacing: "0.03em" }}
          >
            Nexium
          </span>
          <div className="h-1 w-full mt-1 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-white hover:text-primary-gold transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold hover:shadow-lg hover:shadow-primary-gold/30"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Open menu"
        >
          <Menu className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-navbar border-b border-primary-gold/30 shadow-professional animate-fade-in z-50">
          <div className="flex flex-col items-center py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block w-full text-center text-lg font-medium text-white hover:text-primary-gold transition-colors duration-200 px-4 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold hover:shadow-lg hover:shadow-primary-gold/30"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes nexium-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-nexium-gradient {
          animation: nexium-gradient 4s ease-in-out infinite;
        }
        @keyframes nexium-underline {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-nexium-underline {
          background-size: 200% 200%;
          animation: nexium-underline 4s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}