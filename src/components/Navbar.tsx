
"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@/firebase";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Terminal, Menu, X, Shield, Zap, Database, GitBranch, User as UserIcon, LogOut, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { auth } = useAuth();
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  const handleLogout = () => auth && signOut(auth);

  const navLinks = [
    { name: "Entities", href: "#entities", icon: Database },
    { name: "Integration", href: "#integration", icon: Zap },
    { name: "Protocol", href: "#protocol", icon: Shield },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
          isScrolled 
            ? "bg-black/95 backdrop-blur-md py-4 border-white/10" 
            : "bg-transparent py-8 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="size-10 bg-red-600 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <Terminal className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-[0.7]">FORGOTTEN</span>
              <span className="text-[8px] font-bold text-red-600 tracking-[0.4em] uppercase">Arsenal v4.0</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <link.icon className="size-3" />
                {link.name}
              </a>
            ))}
            
            <div className="h-4 w-px bg-white/10" />

            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <img src={user.photoURL || ""} alt="" className="size-7 border border-white/20 grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-tighter text-white leading-none">{user.displayName}</span>
                    <span className="text-[7px] font-mono text-red-600 uppercase">Authenticated</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-muted-foreground hover:text-red-600 transition-colors"
                  title="Disconnect"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button 
                id="login-trigger"
                onClick={handleLogin}
                className="px-6 py-2 border-2 border-red-600 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                <Github className="size-3" /> Initialize Access
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black flex flex-col items-center justify-center p-6 space-y-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors flex items-center gap-4"
            >
              <link.icon size={24} className="text-red-600" />
              {link.name}
            </a>
          ))}
          <div className="h-px w-24 bg-red-600/30" />
          {user ? (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <img src={user.photoURL || ""} alt="" className="size-12 border border-white/20 grayscale" />
                <span className="text-xl font-black uppercase">{user.displayName}</span>
              </div>
              <button onClick={handleLogout} className="text-red-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <LogOut size={16} /> Disconnect_Session
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="px-10 py-5 border-2 border-red-600 text-red-600 text-sm font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"
            >
              <Github size={20} /> Initialize Access
            </button>
          )}
        </div>
      )}
    </>
  );
}
