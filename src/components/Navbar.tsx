"use client";

import { useState, useEffect } from "react";
import { Terminal, Menu, X, Shield, Zap, Database, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Entities", href: "#entities", icon: Database },
    { name: "Integration", href: "#integration", icon: Zap },
    { name: "Protocol", href: "#protocol", icon: Shield },
    { name: "Contribute", href: "#contribute", icon: GitBranch },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
        isScrolled 
          ? "bg-black/90 backdrop-blur-md py-4 border-white/10" 
          : "bg-transparent py-8 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="size-10 bg-red-600 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <Terminal className="size-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">FORGOTTEN</span>
            <span className="text-[8px] font-bold text-red-600 tracking-[0.3em] uppercase">Arsenal v4.0</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <link.icon className="size-3" />
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 border border-red-600 text-red-600 text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            Initialize Access
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-black z-[110] transition-transform duration-500 md:hidden flex flex-col p-12",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-24">
          <div className="text-xl font-black tracking-tighter uppercase">FORGOTTEN</div>
          <button onClick={() => setIsMobileMenuOpen(false)}><X className="size-8" /></button>
        </div>
        
        <div className="flex flex-col gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="mt-auto border-t border-white/10 pt-12">
           <div className="text-red-600 font-bold text-xs tracking-widest uppercase mb-4">System Status</div>
           <div className="font-mono text-[10px] text-muted-foreground uppercase leading-relaxed">
             CORE: ONLINE<br />
             ENCRYPTION: ACTIVE<br />
             UPLINK: STABLE
           </div>
        </div>
      </div>
    </nav>
  );
}
