'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui/button';
import { trackConversion } from '@/lib/analytics';

interface TrackedCTAButtonProps extends ButtonProps {
  href: string;
  trackingLocation: string;
  children: React.ReactNode;
  target?: string;
}

export const TrackedCTAButton = forwardRef<HTMLButtonElement, TrackedCTAButtonProps>(
  ({ href, trackingLocation, children, target, ...props }, ref) => {
    const handleClick = () => {
      // Track the conversion event
      trackConversion.agendarSesion(trackingLocation);
    };

    return (
      <Button ref={ref} asChild {...props}>
        <Link 
          href={href} 
          target={target}
          onClick={handleClick}
        >
          {children}
        </Link>
      </Button>
    );
  }
);

TrackedCTAButton.displayName = 'TrackedCTAButton';