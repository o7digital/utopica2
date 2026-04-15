"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { trackConversion } from '@/lib/analytics';

const mainRoutes = [
  { href: '/', label: 'Inicio' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#metodo', label: 'Método' },
  { href: '/equipo', label: 'Equipo' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-black/10 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#0b0c0e]/85"
      role="banner"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em]" aria-label="Ir a la página de inicio">
          UTOPICA
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {mainRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm transition-colors hover:text-black/70 dark:hover:text-white/80',
                pathname === route.href ? 'font-medium text-black dark:text-white' : 'text-black/60 dark:text-white/65'
              )}
            >
              {route.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="rounded-full border border-black/10 p-2 text-black/75 transition hover:bg-black/5 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10"
            aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href={process.env.NEXT_PUBLIC_RECLAIM_URL || 'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={() => trackConversion.agendarSesion('navigation_desktop')}
          >
            Agendar
          </a>
        </nav>

        <button
          className="lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="border-t border-black/10 bg-white px-4 pb-4 pt-3 dark:border-white/10 dark:bg-[#0b0c0e] lg:hidden"
          id="mobile-menu"
          role="menu"
          aria-label="Menú de navegación móvil"
        >
          <div className="space-y-2">
            {mainRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="block rounded-md px-3 py-2 text-sm text-black/75 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                {route.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-black/75 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10"
              role="menuitem"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              <span>{isDark ? 'Tema claro' : 'Tema oscuro'}</span>
            </button>

            <a
              href={process.env.NEXT_PUBLIC_RECLAIM_URL || 'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
              onClick={() => {
                setIsOpen(false);
                trackConversion.agendarSesion('navigation_mobile');
              }}
              role="menuitem"
            >
              Agendar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
