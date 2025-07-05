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
import { useEffect, useState } from "react";

export default function Navbar() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const gradientColors = [
    'from-blue-500 to-teal-400',
    'from-teal-400 to-purple-500',
    'from-purple-500 to-blue-500',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % gradientColors.length);
    }, 2000); // Rotate colors every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="group">
          <div className="flex flex-col items-center">
            <h1 
              className={`text-3xl font-bold bg-gradient-to-r ${gradientColors[currentColorIndex]} bg-clip-text text-transparent transition-all duration-1000`}
            >
              Nexium
            </h1>
            <div 
              className={`h-1 w-full bg-gradient-to-r ${gradientColors[currentColorIndex]} mt-1 rounded-full opacity-80 transition-all duration-1000`}
            ></div>
          </div>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-gray-700"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end"
            className="w-48 bg-gray-800 border-gray-700"
          >
            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 text-white cursor-pointer">
              <Link href="/history" className="w-full">History</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 text-white cursor-pointer">
              <Link href="/favorites" className="w-full">My Favorites</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 text-white cursor-pointer">
              <Link href="/my-quotes" className="w-full">My Own Quotes</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}