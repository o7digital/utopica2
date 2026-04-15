/**
 * Primitivas visuales — "Archivo Académico / Type Specimen".
 * Monospace para metadata, serif para prosa, marker highlight para emphasis selectiva.
 * Cero ornamentos: hairlines, bordes finos, espacio generoso.
 */

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/* ---------- Labels / encabezados ---------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/55',
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        'font-serif text-3xl md:text-4xl lg:text-[2.5rem] font-normal text-foreground mt-20 md:mt-24 mb-7 leading-[1.1] tracking-[-0.015em]',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'font-mono text-[10.5px] tracking-[0.18em] uppercase text-foreground/55 mt-7 mb-3',
        className
      )}
    >
      {children}
    </p>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-base md:text-lg leading-[1.65] text-foreground/80',
        className
      )}
    >
      {children}
    </p>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55">
      {children}
    </span>
  );
}

/* ---------- Bloques de contenido ---------- */

export function PrincipleBar({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-t border-b border-foreground/85 py-7 md:py-8 my-10 md:my-12',
        className
      )}
    >
      <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-4">
        {label}
      </p>
      <div className="text-lg md:text-xl leading-[1.55] text-foreground/90">{children}</div>
    </div>
  );
}

export function FormulaBlock({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono bg-foreground/[0.035] border-l-2 border-primary px-5 md:px-6 py-5 my-8 text-[15px] md:text-base leading-[1.65] text-foreground/85">
      {children}
    </div>
  );
}

export function Mantra({ children }: { children: ReactNode }) {
  return (
    <div className="font-serif italic text-xl md:text-2xl leading-[1.75] text-foreground/85 pl-5 border-l border-foreground/30">
      {children}
    </div>
  );
}

export function ObjBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'text-base md:text-lg leading-[1.7] text-foreground/80 pl-5 border-l border-foreground/15 py-1',
        className
      )}
    >
      {children}
    </div>
  );
}

export function OutcomeBlock({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 pt-4 border-t border-foreground/85">
      <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-2">
        Resultado
      </p>
      <p className="text-base md:text-lg leading-[1.65] text-foreground/85">{children}</p>
    </div>
  );
}

export function WarnBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5 pt-4 border-t border-foreground/25">
      <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/70 mb-2">
        <span aria-hidden className="mr-1.5">⚠</span>
        {label}
      </p>
      <p className="text-base md:text-lg leading-[1.65] text-foreground/75">{children}</p>
    </div>
  );
}

/* ---------- Mini cards (presentadas como "entries") ---------- */

export function MiniCard({
  label,
  title,
  children,
  className,
}: {
  label?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-t border-foreground/20 pt-4 pr-2 pb-5',
        className
      )}
    >
      {label && (
        <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mb-1.5">
          {label}
        </p>
      )}
      {title && (
        <p className="font-serif text-lg md:text-xl leading-snug text-foreground mb-1.5">
          {title}
        </p>
      )}
      {children && (
        <p className="text-sm md:text-base text-foreground/65 leading-[1.6]">{children}</p>
      )}
    </div>
  );
}

export function CardGrid({
  cols = 2,
  children,
  className,
}: {
  cols?: 2 | 3;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid gap-x-8 gap-y-1 my-5 grid-cols-1',
        cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Step list (tabla numerada) ---------- */

export interface Step {
  name: string;
  desc: ReactNode;
}

export function StepList({ steps }: { steps: Step[]; marker?: 'number' | 'dot' }) {
  return (
    <ol className="my-3 border-t border-foreground/85">
      {steps.map((s, i) => (
        <li
          key={i}
          className="border-b border-foreground/15 grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-5"
        >
          <span className="font-mono text-sm tabular-nums text-foreground/55 pt-1">
            [ {String(i + 1).padStart(2, '0')} ]
          </span>
          <div>
            <p className="font-serif text-lg md:text-xl text-foreground leading-snug mb-1.5">
              {s.name}
            </p>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.6]">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Metrics — presentadas como citations ---------- */

export interface Metric {
  val: string;
  label: ReactNode;
  accent?: boolean;
}

export function MetricsRow({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="my-12 md:my-16 border-t border-b border-foreground/85 divide-y md:divide-y-0 md:divide-x divide-foreground/15 grid grid-cols-1 md:grid-cols-3">
      {metrics.map((m, i) => (
        <div key={i} className="py-7 md:py-10 px-4 md:px-8">
          <dt className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-foreground/55 mb-3 flex items-center gap-2">
            <span className="tabular-nums">[ {String(i + 1).padStart(2, '0')} ]</span>
          </dt>
          <dd>
            <p className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[0.95] tracking-[-0.015em] text-foreground mb-3 tabular-nums">
              {m.val}
            </p>
            <p className="text-sm text-foreground/65 leading-[1.5]">{m.label}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Accordion — "capítulos" con numeral romano ---------- */

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export interface ConvItem {
  number: string | number;
  title: string;
  subtitle: string;
  body: ReactNode;
}

export function ConvAccordion({
  items,
  defaultOpen = 0,
}: {
  items: ConvItem[];
  defaultOpen?: number;
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={`conv-${defaultOpen}`}
      className="my-8 border-t border-foreground/85"
    >
      {items.map((item, i) => {
        const roman = typeof item.number === 'string' ? item.number : ROMAN[i] ?? String(i + 1);
        return (
          <AccordionPrimitive.Item
            key={i}
            value={`conv-${i}`}
            className="border-b border-foreground/15"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group w-full grid grid-cols-[56px_1fr_auto] gap-3 md:gap-6 items-baseline text-left py-6 md:py-7 transition-colors hover:bg-primary/[0.045]">
                <span className="font-mono text-sm md:text-base text-foreground/55 tabular-nums tracking-[0.08em]">
                  {roman}.
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-xl md:text-2xl text-foreground leading-snug tracking-[-0.005em] group-hover:text-foreground">
                    {item.title}
                  </span>
                  <span className="block text-sm md:text-base text-foreground/60 mt-1 leading-snug">
                    {item.subtitle}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="font-mono text-lg text-foreground/40 transition-transform group-data-[state=open]:rotate-45 self-center"
                >
                  +
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="pl-0 md:pl-[68px] pr-2 pb-10 pt-2">{item.body}</div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
