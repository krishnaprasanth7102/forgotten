
"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@/firebase";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Terminal, Menu, X, Shield, Zap, Database, User as UserIcon, LogOut, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { auth } = useAuth();
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      // Errors handled by listener
    }
  };

  const handleLogout = () => {
    if (auth) {
      signOut(auth);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Entities", href: "#entities", icon: Database },
    { name: "Integration", href: "#integration", icon: Zap },
    { name: "Protocol", href: "#protocol", icon: Shield },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b px-4 sm:px-6 lg:px-8",
          isScrolled 
            ? "bg-black/90 backdrop-blur-xl py-3 border-white/10" 
            : "bg-transparent py-6 sm:py-8 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="size-8 sm:size-10 bg-red-600 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <Terminal className="size-5 sm:size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase leading-[0.8]">FORGOTTEN</span>
              <span className="text-[7px] sm:text-[8px] font-bold text-red-600 tracking-[0.4em] uppercase">Arsenal v4.0</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
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
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <img 
                    src={user.photoURL || ""} 
                    alt="" 
                    className="size-7 border border-white/20 grayscale hover:grayscale-0 transition-all" 
                  />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-tighter text-white leading-none truncate max-w-[80px] lg:max-w-[120px]">
                      {user.displayName}
                    </span>
                    <span className="text-[7px] font-mono text-red-600 uppercase">Authorized</span>
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
                className="px-5 py-2 border border-red-600 text-red-600 text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                <Github className="size-3" /> Initialize Access
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 hover:bg-white/5 transition-colors rounded-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "fixed inset-0 z-[150] bg-black transition-transform duration-500 md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6 sm:p-10">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-red-600 flex items-center justify-center">
                <Terminal className="size-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">FORGOTTEN</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:text-red-600 transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl sm:text-4xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors flex items-center gap-4"
              >
                <link.icon size={24} className="text-red-600" />
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img src={user.photoURL || ""} alt="" className="size-12 border border-white/20 grayscale" />
                  <div className="flex flex-col">
                    <span className="text-xl font-black uppercase">{user.displayName}</span>
                    <span className="text-xs font-mono text-red-600">SECURE_ID: {user.uid.slice(0, 8)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full h-14 border border-red-600 text-red-600 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"
                >
                  <LogOut size={16} /> Disconnect_Session
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                className="w-full h-14 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
              >
                <Github size={18} /> Initialize Access
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
