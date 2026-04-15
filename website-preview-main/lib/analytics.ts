// Google Analytics event tracking functions

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: any
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_ID || import.meta.env.NEXT_PUBLIC_GA_ID || undefined;

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Conversion events
export const trackConversion = {
  // When user clicks on "Agendar Sesión de Claridad"
  agendarSesion: (location: string) => {
    event({
      action: 'agendar_sesion_claridad',
      category: 'conversion',
      label: location,
    });
  },

  // When user scrolls to a specific section
  scrollToSection: (sectionName: string) => {
    event({
      action: 'scroll_to_section',
      category: 'engagement',
      label: sectionName,
    });
  },

  // When user spends significant time on page
  timeOnPage: (seconds: number) => {
    event({
      action: 'time_on_page',
      category: 'engagement',
      label: `${seconds} seconds`,
      value: seconds,
    });
  },

  // When user views testimonials
  viewTestimonials: () => {
    event({
      action: 'view_testimonials',
      category: 'engagement',
      label: 'testimonials_section',
    });
  },

  // When user views pricing
  viewPricing: () => {
    event({
      action: 'view_pricing',
      category: 'engagement',
      label: 'pricing_section',
    });
  },

  // When user interacts with FAQ
  faqInteraction: (question: string) => {
    event({
      action: 'faq_interaction',
      category: 'engagement',
      label: question,
    });
  },
};

// Enhanced Ecommerce events (for future use)
export const ecommerce = {
  viewItem: (itemName: string, itemId: string, price: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'MXN',
        value: price,
        items: [
          {
            item_id: itemId,
            item_name: itemName,
            price: price,
            quantity: 1,
          },
        ],
      });
    }
  },

  beginCheckout: (itemName: string, itemId: string, price: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'MXN',
        value: price,
        items: [
          {
            item_id: itemId,
            item_name: itemName,
            price: price,
            quantity: 1,
          },
        ],
      });
    }
  },
};
