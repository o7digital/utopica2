"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/Link";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackConversion } from "@/lib/analytics";

interface NavigationProps {
  pathname?: string;
}

export function Navigation({ pathname: _pathname = "/" }: NavigationProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("utopica-theme");
    const initialTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("utopica-theme", nextTheme);
  };

  const ctaHref =
    (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_RECLAIM_URL) ||
    "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60"
          : "border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60"
      )}
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Ir a la página de inicio"
          className="text-sm font-semibold tracking-[0.22em] text-[#111111] dark:text-white"
        >
          UTOPICA
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            className="inline-flex rounded-full border border-black/10 p-2 text-[#111111]/80 transition hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion.agendarSesion("navigation_desktop")}
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Agendar
          </Link>
        </div>
      </div>
    </header>
  );
}
