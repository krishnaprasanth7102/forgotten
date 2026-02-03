
"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@/firebase";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Terminal, Menu, X, Shield, Zap, Database, LogOut, Github } from "lucide-react";
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
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
          isScrolled 
            ? "bg-black/95 backdrop-blur-xl py-4 border-white/10" 
            : "bg-transparent py-8 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-4 group shrink-0">
            <div className="size-10 bg-red-600 flex items-center justify-center group-hover:rotate-90 transition-transform duration-700">
              <Terminal className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-[0.7]">FORGOTTEN</span>
              <span className="text-[8px] font-bold text-red-600 tracking-[0.4em] uppercase">Tactical Arsenal v4.0</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <link.icon className="size-3 text-red-600 group-hover:scale-125 transition-transform" />
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="h-6 w-px bg-white/10" />

            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-black uppercase tracking-tight text-white leading-none">
                      {user.displayName}
                    </span>
                    <span className="text-[8px] font-mono text-red-600 uppercase tracking-widest mt-1">Authorized</span>
                  </div>
                  <img 
                    src={user.photoURL || ""} 
                    alt="" 
                    className="size-9 border border-red-600/30 grayscale hover:grayscale-0 transition-all cursor-crosshair" 
                  />
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-muted-foreground hover:text-red-600 transition-all"
                  title="Disconnect"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button 
                id="login-trigger"
                onClick={handleLogin}
                className="px-6 py-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3"
              >
                <Github className="size-4" /> Initialize Access
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 hover:bg-red-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "fixed inset-0 z-[150] bg-black transition-transform duration-700 ease-in-out md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-4">
              <div className="size-10 bg-red-600 flex items-center justify-center">
                <Terminal className="size-6 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase">FORGOTTEN</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-red-600">
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-10 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-5xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors flex items-center gap-6"
              >
                <link.icon size={32} className="text-red-600" />
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <img src={user.photoURL || ""} alt="" className="size-16 border border-red-600 grayscale" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-black uppercase">{user.displayName}</span>
                    <span className="text-[10px] font-mono text-red-600 tracking-widest">ID: {user.uid.slice(0, 12)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full h-16 border border-red-600 text-red-600 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all"
                >
                  <LogOut size={20} /> Terminate_Session
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                className="w-full h-16 bg-red-600 text-white font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all"
              >
                <Github size={24} /> Initialize Access
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
