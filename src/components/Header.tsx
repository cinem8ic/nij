import React, { useState } from 'react';
import { Magnetic } from './Magnetic';

export type PageRoute = 'dance-fitness' | 'wedding-fiestas' | 'portfolio';

interface HeaderProps {
  theme?: 'dark' | 'white';
  activePage: PageRoute;
  onSelectPage: (page: PageRoute) => void;
  onOpenInquiry?: (topic?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme = 'dark',
  activePage,
  onSelectPage,
}) => {
  const isWhite = theme === 'white';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // All 3 Menu Options with compact code (DF / WF / P) and full names on hover
  const marqueeItems = [
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
    { id: 'dance-fitness' as PageRoute, short: 'DF', label: 'DANCE & FITNESS' },
    { id: 'wedding-fiestas' as PageRoute, short: 'WF', label: 'WEDDING FIESTAS' },
    { id: 'portfolio' as PageRoute, short: 'P', label: 'PORTFOLIO' },
  ];

  const handleSelect = (pageId: PageRoute) => {
    onSelectPage(pageId);
    if (typeof window !== 'undefined') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2.5 sm:py-3.5 pointer-events-none border-none transition-all duration-300">
      <div className="max-w-[1720px] mx-auto px-4 flex items-center justify-center relative">
          
        {/* ============================================================== */}
        {/* ULTRA-SLEEK AESTHETIC FLOATING PILL (RESTORED ORIGINAL DESIGN) */}
        {/* ============================================================== */}
        <div className="pointer-events-auto z-30 flex items-center justify-center relative">
          <Magnetic strength={0.12}>
            <div className="relative">
              {/* Soft feathered ambient blur shadow on pill corners merging into background */}
              <div 
                aria-hidden="true" 
                className={`absolute inset-0 rounded-full blur-[10px] pointer-events-none transition-all duration-500 scale-102 ${
                  isWhite ? 'bg-black/20' : 'bg-black/60'
                }`} 
              />

              {/* Feathered edge blur specifically on left and right corner caps merging with bg */}
              <div 
                aria-hidden="true" 
                className={`absolute -inset-x-2 -inset-y-0.5 rounded-full blur-[8px] pointer-events-none transition-all duration-500 ${
                  isWhite ? 'bg-black/15' : 'bg-black/50'
                }`} 
              />

              <div 
                className={`relative overflow-hidden rounded-full px-3.5 sm:px-4 h-7.5 sm:h-8.5 w-52 sm:w-64 md:w-72 flex items-center transition-all duration-500 ease-out cursor-pointer ${
                  isWhite
                    ? 'bg-stone-900/70 hover:bg-stone-900/80 text-white border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-2xl'
                    : 'bg-black/60 hover:bg-black/75 text-white border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl'
                }`}
              >
                
                {/* Soft blurred edge corners that seamlessly fade and merge with background */}
                <div 
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-r from-black/80 via-black/40 to-transparent backdrop-blur-[3px]" 
                />
                <div 
                  aria-hidden="true"
                  className="absolute right-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-l from-black/80 via-black/40 to-transparent backdrop-blur-[3px]" 
                />

                {/* Automatic marquee track with smooth hover pause */}
                <div className="flex items-center gap-3 sm:gap-4 animate-marquee w-max hover:[animation-play-state:paused] whitespace-nowrap">
                  {marqueeItems.map((item, idx) => {
                    const isActive = activePage === item.id;
                    const isItemHovered = hoveredIdx === idx;

                    return (
                      <button
                        key={`menu-${item.id}-${idx}`}
                        type="button"
                        onClick={() => handleSelect(item.id)}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className={`flex items-center gap-1 font-['Montserrat',_sans-serif] uppercase text-[8.5px] sm:text-[9.5px] tracking-[0.22em] transition-colors duration-200 cursor-pointer ${
                          isActive
                            ? 'text-white font-bold'
                            : 'text-stone-300 hover:text-white font-medium'
                        }`}
                      >
                        {isActive && (
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 mr-0.5 bg-white ${
                            isWhite ? 'shadow-none ring-0' : 'shadow-[0_0_8px_rgba(255,255,255,0.85)]'
                          }`} />
                        )}
                        <span className="inline-block transition-all duration-200">
                          {isItemHovered ? item.label : item.short}
                        </span>
                        <span className="text-[6.5px] ml-1 text-white/30">·</span>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          </Magnetic>
        </div>

      </div>
    </header>
  );
};
