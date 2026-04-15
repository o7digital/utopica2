"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/ui/Link";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { trackConversion } from "@/lib/analytics";

/**
 * Estructura de navegación — "Servicios" + "Recursos" + "Nosotros" + CTA.
 * Lenguaje mono/editorial en línea con el rediseño.
 */
const services = [
  {
    href: "/servicios/prospeccion",
    label: "Prospección",
    desc: "Reuniones con tu cliente ideal sin depender del fundador.",
    meta: "S.01",
  },
  {
    href: "/servicios/calificacion",
    label: "Calificación",
    desc: "Saber qué oportunidad vale propuesta antes de invertir preventa.",
    meta: "S.02",
  },
  {
    href: "/servicios/venta-consultiva",
    label: "Venta consultiva",
    desc: "Equipo que cierra sin descontar, con business case propio.",
    meta: "S.03",
  },
  {
    href: "/servicios/coaching-ia",
    label: "Coaching IA",
    desc: "Feedback automático post-reunión. Permanece después del programa.",
    meta: "S.04",
  },
  {
    href: "/servicios/proyectos-ia",
    label: "Proyectos IA (custom)",
    desc: "Agentes y skills para procesos específicos — comerciales o no.",
    meta: "S.05",
  },
];

const resources = [
  {
    href: "/marcos-venta",
    label: "Marcos de Venta",
    desc: "Biblioteca curada de 5 metodologías B2B, 1988—2024.",
    meta: "R.01",
  },
  {
    href: "/blog",
    label: "Blog",
    desc: "Ensayos sobre ventas, IA y lo que funciona en B2B.",
    meta: "R.02",
  },
];

interface NavigationProps {
  pathname?: string;
}

export function Navigation({ pathname = "/" }: NavigationProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<"services" | "resources" | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref =
    (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_RECLAIM_URL) ||
    "https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial";

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-foreground/15"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent"
      )}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className={cn(
            "flex justify-between items-center transition-all duration-300",
            scrolled ? "h-14" : "h-16"
          )}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Ir a la página de inicio">
              <Logo className="w-[120px] h-[32px]" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <NavigationMenu.Root
            className="hidden lg:flex relative z-[1]"
            delayDuration={80}
          >
            <NavigationMenu.List className="flex items-center gap-2">
              {/* Servicios dropdown */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
                    pathname.startsWith("/servicios")
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  Servicios
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className="absolute top-full left-0 mt-2 data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:fade-in-0 data-[motion=from-end]:fade-in-0 data-[motion=to-start]:fade-out-0 data-[motion=to-end]:fade-out-0 data-[motion=from-start]:slide-in-from-top-1"
                >
                  <DropdownPanel
                    eyebrow="Servicios · cinco capacidades"
                    items={services}
                    isActive={isActive}
                  />
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Recursos dropdown */}
              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={cn(
                    "group inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
                    pathname.startsWith("/marcos-venta") || pathname.startsWith("/blog")
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  Recursos
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className="absolute top-full left-0 mt-2"
                >
                  <DropdownPanel
                    eyebrow="Recursos · biblioteca abierta"
                    items={resources}
                    isActive={isActive}
                    narrow
                  />
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {/* Nosotros direct link (points to /equipo) */}
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    href="/equipo"
                    className={cn(
                      "inline-flex items-center px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
                      isActive("/equipo")
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    Nosotros
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              {/* CTA — diagonal strip */}
              <NavigationMenu.Item className="ml-4">
                <NavigationMenu.Link asChild>
                  <Link
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion.agendarSesion("navigation_desktop")}
                    className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2 transition-all hover:bg-background hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  >
                    Agendar diagnóstico
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>

            {/* Viewport (dropdown container) */}
            <div className="absolute top-full left-0 flex justify-start perspective-[2000px] w-full">
              <NavigationMenu.Viewport
                className="origin-top-left relative mt-0 w-full data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in"
              />
            </div>
          </NavigationMenu.Root>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-foreground/15 bg-background"
            id="mobile-menu"
            role="menu"
            aria-label="Menú móvil"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {/* Services group */}
              <MobileGroup
                label="Servicios"
                items={services}
                open={mobileOpenGroup === "services"}
                onToggle={() =>
                  setMobileOpenGroup(mobileOpenGroup === "services" ? null : "services")
                }
                onClickItem={() => setIsOpen(false)}
                isActive={isActive}
              />
              {/* Resources group */}
              <MobileGroup
                label="Recursos"
                items={resources}
                open={mobileOpenGroup === "resources"}
                onToggle={() =>
                  setMobileOpenGroup(mobileOpenGroup === "resources" ? null : "resources")
                }
                onClickItem={() => setIsOpen(false)}
                isActive={isActive}
              />
              {/* Nosotros direct */}
              <Link
                href="/equipo"
                className={cn(
                  "block py-3 font-mono text-xs tracking-[0.14em] uppercase border-b border-foreground/15",
                  isActive("/equipo") ? "text-foreground" : "text-foreground/70"
                )}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                Nosotros
              </Link>
              {/* CTA */}
              <Link
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-between w-full border border-foreground bg-foreground text-background font-mono text-xs tracking-[0.14em] uppercase px-4 py-3"
                onClick={() => {
                  setIsOpen(false);
                  trackConversion.agendarSesion("navigation_mobile");
                }}
                role="menuitem"
              >
                Agendar diagnóstico
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ----------------------------- Dropdown Panel ----------------------------- */

interface DropdownItem {
  href: string;
  label: string;
  desc: string;
  meta: string;
}

function DropdownPanel({
  eyebrow,
  items,
  isActive,
  narrow = false,
}: {
  eyebrow: string;
  items: DropdownItem[];
  isActive: (href: string) => boolean;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-background border border-foreground/20 shadow-lg",
        narrow ? "w-[420px]" : "w-[560px]"
      )}
    >
      {/* Eyebrow row */}
      <div className="px-5 py-3 border-b border-foreground/15 flex items-center justify-between">
        <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/50">
          {eyebrow}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/40 tabular-nums">
          {items.length.toString().padStart(2, "0")} entradas
        </span>
      </div>

      {/* Items */}
      <ul>
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-start gap-4 px-5 py-4 border-b border-foreground/10 last:border-b-0 transition-colors",
                  active ? "bg-primary/[0.06]" : "hover:bg-primary/[0.04]"
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground/50 tabular-nums mt-0.5 w-10 flex-shrink-0">
                  {item.meta}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-serif text-lg text-foreground leading-snug mb-0.5 group-hover:text-foreground">
                    {item.label}
                  </span>
                  <span className="block text-[13px] text-foreground/60 leading-snug">
                    {item.desc}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 text-foreground/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ----------------------------- Mobile Group ----------------------------- */

function MobileGroup({
  label,
  items,
  open,
  onToggle,
  onClickItem,
  isActive,
}: {
  label: string;
  items: DropdownItem[];
  open: boolean;
  onToggle: () => void;
  onClickItem: () => void;
  isActive: (href: string) => boolean;
}) {
  return (
    <div className="border-b border-foreground/15">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-xs tracking-[0.14em] uppercase text-foreground/80">
          {label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-foreground/60 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClickItem}
                    className="flex items-start gap-3 py-3 pl-3 pr-2 border-t border-foreground/10"
                    role="menuitem"
                  >
                    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/45 tabular-nums mt-1 w-9 flex-shrink-0">
                      {item.meta}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={cn(
                          "block font-serif text-base leading-snug",
                          active ? "text-foreground" : "text-foreground/85"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="block text-[12.5px] text-foreground/55 leading-snug mt-0.5">
                        {item.desc}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
