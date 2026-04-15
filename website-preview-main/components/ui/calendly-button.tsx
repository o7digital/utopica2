'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleButtonProps {
  text?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  meetingType?: 'diagnostic' | 'sprint' | 'general';
}

export function ScheduleButton({ 
  text = 'Agendar Reunión',
  className,
  variant = 'default',
  size = 'default',
  meetingType = 'general'
}: ScheduleButtonProps) {
  // URL específica para la sesión estratégica
  const meetingUrl = 'https://app.reclaim.ai/m/gael/sesion-estrategica-claridad-comercial';

  const handleClick = () => {
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn('gap-2', className)}
    >
      <Calendar className="h-4 w-4" />
      {text}
    </Button>
  );
}

// Mantener el nombre anterior para compatibilidad
export const CalendlyButton = ScheduleButton;