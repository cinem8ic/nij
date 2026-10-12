import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { SectionTitleLockup } from './SectionTitleLockup';
import { assetUrl } from '../utils/assets';

// Curated Archive Slide Panels populated with valid studio & dance photos (1, 2, 3, 4, 5, 8; no 6 or 7)
const VALID_ARCHIVE_PHOTOS = [
  assetUrl('/classes/1.jpg'),
  assetUrl('/classes/2.jpg'),
  assetUrl('/classes/3.jpg'),
  assetUrl('/classes/4.jpg'),
  assetUrl('/classes/5.jpg'),
  assetUrl('/classes/8.jpg'),
];

const ARCHIVE_IMAGES = Array.from({ length: 18 }, (_, i) => ({
  id: `arch-${i + 1}`,
  image: VALID_ARCHIVE_PHOTOS[i % VALID_ARCHIVE_PHOTOS.length],
}));

interface HonourItem {
  id: string;
  name: string;
  detail: string;
  category: string;
  quote: string;
  citation: string;
  link?: string;
}

const HONOURS: HonourItem[] = [
  {
    id: 'h-1',
    name: 'BRIDES TODAY',
    detail: 'Premier Wedding Choreographers in India',
    category: 'NATIONAL PRESS',
    quote: 'Recognized among the country’s premier wedding choreographers for transforming royal sangeet stages into majestic cinematic masterworks.',
    citation: 'Brides Today Magazine · Editorial Curation',
    link: 'https://www.bridestoday.in'
  },
  {
    id: 'h-2',
    name: 'SANIA MIRZA',
    detail: 'Athletic Inversion & Handstand Technique',
    category: 'CELEBRITY DIRECTION',
    quote: 'Tennis Grand Slam icon Sania Mirza publicly credited Nicy Joseph Dance & Fitness for foundational handstand balance, scapular control, and core inversion technique.',
    citation: 'Public Acknowledgment & Republic World Feature'
  },
  {
    id: 'h-3',
    name: 'TAJ FALAKNUMA PALACE',
    detail: 'Bespoke Royal Sangeet Residency',
    category: 'PALACE COMMISSIONS',
    quote: 'Directing bespoke couple entrances and grand 50-dancer ensemble choreographies beneath imperial Belgian crystal chandeliers.',
    citation: 'Hyderabad Heritage Estates & Luxury Venues'
  },
  {
    id: 'h-4',
    name: 'UMAID BHAWAN PALACE',
    detail: 'Destination Sangeet Productions',
    category: 'DESTINATION CINEMA',
    quote: 'Curating turnkey multi-day wedding theatricals and bridal solos across Jodhpur, Jaipur, and luxury destinations in Oman.',
    citation: 'Royal Rajasthan Destination Commissions'
  },
  {
    id: 'h-5',
    name: 'HYDERABAD DANCE FESTIVAL',
    detail: 'Official Studio Partner & Arena Lead',
    category: 'FESTIVAL APPOINTMENT',
    quote: 'Appointed official studio partner and Garba Arena leader, conducting synchronous festival dancers across amphitheatre productions.',
    citation: 'Hyderabad Cultural Amphitheatre',
    link: 'https://hyddancefestival.com'
  },
  {
    id: 'h-6',
    name: 'WOW HYDERABAD',
    detail: 'Exclusive Editorial Cover Spotlight',
    category: 'MAGAZINE FEATURE',
    quote: 'In-depth profile tracing Nicy Joseph’s choreographic philosophy, Jubilee Hills studio sanctuary, and Tollywood industry presence.',
    citation: 'WOW Hyderabad · Editorial Feature',
    link: 'https://wowhyderabad.com'
  },
  {
    id: 'h-7',
    name: 'TOLLYWOOD CINEMA',
    detail: 'Camera Blocking & Actor Coaching',
    category: 'SCREEN MOVEMENT',
    quote: 'Movement blocking and camera choreography for high-profile music videos, actors, and commercial dance productions.',
    citation: 'Telugu Cinema & Independent Screen Productions'
  },
  {
    id: 'h-8',
    name: 'WORLD OF DANCE',
    detail: 'International Movement Repertoire',
    category: 'GLOBAL SELECTION',
    quote: 'Celebrated stage direction and contemporary movement aesthetics spotlighting Indian choreographic excellence.',
    citation: 'Global Dance Showcase'
  }
];

// Film Festival Laurel Wreath Branch (Left) - Refined Smaller Luxury Scale
const LaurelLeft: React.FC = () => (
  <svg 
    width="13" 
    height="26" 
    viewBox="0 0 30 70" 
    fill="currentColor" 
    className="shrink-0 transition-colors duration-300 text-stone-400 group-hover:text-[#dfba73]"
    aria-hidden="true"
  >
    <path d="M27 68 C23 52 17 37 11 23 C7 15 3 7 1 0 C0.5 0 0 0.5 0 1 C2 9 6 19 11 29 C17 43 23 57 26 69 Z" fill="currentColor" opacity="0.45"/>
    <path d="M11 8 C8 4 4 2 0 1 C0 4 3 7 7 9 C9 10 10 9 11 8 Z"/>
    <path d="M15 16 C12 12 7 10 3 9 C3 12 6 15 10 17 C12 18 14 17 15 16 Z"/>
    <path d="M19 25 C16 21 11 19 7 18 C7 21 10 24 14 26 C16 27 18 26 19 25 Z"/>
    <path d="M22 35 C19 31 14 29 10 28 C10 31 13 34 17 36 C19 37 21 36 22 35 Z"/>
    <path d="M25 46 C22 42 17 40 13 39 C13 42 16 45 20 47 C22 48 24 47 25 46 Z"/>
    <path d="M27 58 C24 54 19 52 15 51 C15 54 18 57 22 59 C24 60 26 59 27 58 Z"/>
  </svg>
);

// Film Festival Laurel Wreath Branch (Right) - Refined Smaller Luxury Scale
const LaurelRight: React.FC = () => (
  <svg 
    width="13" 
    height="26" 
    viewBox="0 0 30 70" 
    fill="currentColor" 
    className="shrink-0 transform -scale-x-100 transition-colors duration-300 text-stone-400 group-hover:text-[#dfba73]"
    aria-hidden="true"
  >
    <path d="M27 68 C23 52 17 37 11 23 C7 15 3 7 1 0 C0.5 0 0 0.5 0 1 C2 9 6 19 11 29 C17 43 23 57 26 69 Z" fill="currentColor" opacity="0.45"/>
    <path d="M11 8 C8 4 4 2 0 1 C0 4 3 7 7 9 C9 10 10 9 11 8 Z"/>
    <path d="M15 16 C12 12 7 10 3 9 C3 12 6 15 10 17 C12 18 14 17 15 16 Z"/>
    <path d="M19 25 C16 21 11 19 7 18 C7 21 10 24 14 26 C16 27 18 26 19 25 Z"/>
    <path d="M22 35 C19 31 14 29 10 28 C10 31 13 34 17 36 C19 37 21 36 22 35 Z"/>
    <path d="M25 46 C22 42 17 40 13 39 C13 42 16 45 20 47 C22 48 24 47 25 46 Z"/>
    <path d="M27 58 C24 54 19 52 15 51 C15 54 18 57 22 59 C24 60 26 59 27 58 Z"/>
  </svg>
);

interface AboutPortfolioSectionProps {
  theme?: 'dark' | 'white';
}

export const AboutPortfolioSection: React.FC<AboutPortfolioSectionProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [selectedHonour, setSelectedHonour] = useState<HonourItem | null>(null);

  // Smooth Interactive Pan & Drag Physics
  const scrollOffset = useRef(0);
  const targetOffset = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafId = useRef<number>(0);

  const totalItems = ARCHIVE_IMAGES.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const updateStage = () => {
      const diff = targetOffset.current - scrollOffset.current;
      if (Math.abs(diff) > 0.05) {
        scrollOffset.current += diff * 0.14;
      } else {
        scrollOffset.current = targetOffset.current;
      }

      const container = stageRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const centerX = containerWidth / 2;
        
        const isMobile = containerWidth < 768;
        const cardWidth = isMobile 
          ? Math.max(140, containerWidth * 0.40) 
          : Math.min(260, Math.max(180, containerWidth * 0.185));
        const gap = isMobile ? 16 : 24;
        const cardStride = cardWidth + gap;
        const totalTrackWidth = totalItems * cardStride;
        const startX = centerX - totalTrackWidth / 2 + cardWidth / 2;

        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;

          const itemBasePos = startX + idx * cardStride;
          const currentPos = itemBasePos + scrollOffset.current;
          
          const offsetFromCenter = currentPos - centerX;
          const normDist = offsetFromCenter / (containerWidth * 0.44);
          const absDist = Math.abs(normDist);

          // Harmonious symmetrical amphitheater curve with center card prominent
          const angleY = Math.max(-32, Math.min(32, normDist * -24));
          const translateZ = -Math.min(absDist * 125, 250);
          const translateY = Math.min(absDist * 14, 28);
          const scale = Math.max(0.84, 1.03 - absDist * 0.12);
          const opacity = absDist > 2.2 ? Math.max(0, 1 - (absDist - 2.2) * 1.6) : 1;

          cardEl.style.width = `${cardWidth}px`;
          cardEl.style.transform = `translate3d(${currentPos - cardWidth / 2}px, ${translateY}px, ${translateZ}px) rotateY(${angleY}deg) scale(${scale})`;
          cardEl.style.opacity = `${opacity}`;
          cardEl.style.zIndex = `${Math.round(20 - Math.min(15, absDist * 6))}`;
        });
      }

      rafId.current = requestAnimationFrame(updateStage);
    };

    rafId.current = requestAnimationFrame(updateStage);
    return () => cancelAnimationFrame(rafId.current);
  }, [isInView, totalItems]);

  // Interactive Mouse Pan
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const maxPan = (totalItems - 1) * 55;
    targetOffset.current = (0.5 - relativeX) * maxPan * 2.2;
  }, [totalItems]);

  // Touch / Pointer Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = targetOffset.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const containerWidth = stageRef.current?.clientWidth || 1000;
    const isMobile = containerWidth < 768;
    const cardWidth = isMobile ? containerWidth * 0.40 : containerWidth * 0.185;
    const maxBound = ((totalItems - 1) * (cardWidth + 24)) / 2 + 60;
    
    const nextOffset = dragStartOffset.current + deltaX * 1.35;
    targetOffset.current = Math.max(-maxBound, Math.min(maxBound, nextOffset));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const renderHonourCard = (item: HonourItem, idx: number, trackId: string) => (
    <div
      key={`${trackId}-${item.id}-${idx}`}
      onClick={() => setSelectedHonour(item)}
      className="inline-flex shrink-0 items-center justify-center px-2.5 sm:px-4 md:px-5 cursor-pointer group select-none whitespace-nowrap transition-transform duration-200 hover:scale-105"
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <LaurelLeft />
        <span className={`text-[11px] sm:text-xs md:text-[13px] font-['Bebas_Neue',_'Montserrat',_sans-serif] tracking-[0.20em] uppercase font-bold transition-colors ${
          isWhite ? 'text-stone-900 group-hover:text-black' : 'text-stone-300 group-hover:text-white'
        }`}>
          {item.name}
        </span>
        <LaurelRight />
      </div>
    </div>
  );

  return (
    <section
      id="about-portfolio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Portfolio & Choreography Archive"
      className="pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 select-none relative overflow-hidden bg-transparent w-full flex flex-col items-center justify-center transition-colors duration-500"
    >
      <style>{`
        .portfolio-3d-stage {
          position: relative;
          width: 100%;
          height: clamp(340px, 48vh, 520px);
          z-index: 10;
          perspective: 1200px;
          perspective-origin: 50% 50%;
          overflow: visible;
          cursor: grab;
          touch-action: pan-y;
        }

        .portfolio-3d-stage:active {
          cursor: grabbing;
        }

        .portfolio-3d-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .portfolio-curved-card {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform;
          transform-style: preserve-3d;
        }

        .portfolio-card-shell {
          width: 100%;
          aspect-ratio: 0.70;
          border-radius: 0px !important;
          overflow: hidden;
          background-color: ${isWhite ? '#FFFFFF' : '#0c0c10'};
          position: relative;
          border: 1px solid ${isWhite ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)'};
          box-shadow: ${isWhite ? '0 16px 36px rgba(0, 0, 0, 0.06)' : '0 16px 36px rgba(0, 0, 0, 0.85)'};
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }

        .portfolio-curved-card:hover .portfolio-card-shell {
          border-color: ${isWhite ? 'rgba(0, 0, 0, 0.28)' : 'rgba(255, 255, 255, 0.35)'};
        }

        .portfolio-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 0px !important;
          transition: transform 0.4s ease-out;
        }

        .portfolio-curved-card:hover .portfolio-card-image {
          transform: scale(1.04);
        }

        .portfolio-card-glare {
          position: absolute;
          inset: 0;
          background: ${isWhite
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 50%, rgba(0, 0, 0, 0.06) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)'};
          pointer-events: none;
        }

        @media (max-width: 767px) {
          .portfolio-3d-stage {
            height: 310px !important;
            margin-top: 14px !important;
          }
        }
      `}</style>

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center space-y-4 sm:space-y-6 relative z-20">
        
        {/* ============================================================== */}
        {/* MONUMENTAL TITLE LOCKUP: "CHOREOGRAPHY" ONLY ABOVE "PORTFOLIO" */}
        {/* ============================================================== */}
        <div className="w-full flex items-center justify-center">
          <SectionTitleLockup
            title="PORTFOLIO"
            subtitle="CHOREOGRAPHY"
            align="center"
            theme={theme}
          />
        </div>

        {/* ============================================================== */}
        {/* 3D BALANCED AMPHITHEATER CAROUSEL (Center prominent, smooth)    */}
        {/* ============================================================== */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="portfolio-3d-stage"
          role="region"
          aria-label="3D Portfolio Choreography Archive"
        >
          <div className="portfolio-3d-track">
            {ARCHIVE_IMAGES.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="portfolio-curved-card"
              >
                <div className="portfolio-card-shell">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={`Portfolio Visual ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                      className="portfolio-card-image"
                    />
                  )}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                    <div className="w-full flex justify-between">
                      <span className={`w-2 h-2 border-t border-l ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                      <span className={`w-2 h-2 border-t border-r ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                    </div>
                    <div className="w-full flex justify-between">
                      <span className={`w-2 h-2 border-b border-l ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                      <span className={`w-2 h-2 border-b border-r ${isWhite ? 'border-black/20' : 'border-white/20'}`} />
                    </div>
                    <div className="portfolio-card-glare" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator Bar */}
        <div className="flex sm:hidden items-center justify-center gap-2.5 mt-1 select-none">
          <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
          <span className={`text-[10px] tracking-[0.28em] uppercase font-['Montserrat',_sans-serif] font-black transition-colors ${
            isWhite ? 'text-stone-950 font-black' : 'text-white font-bold'
          }`}>
            SWIPE TO EXPLORE
          </span>
          <span className={`h-px w-8 transition-colors ${isWhite ? 'bg-stone-900' : 'bg-white/50'}`} />
        </div>

        {/* ============================================================== */}
        {/* AWARDS SCROLL UNDER PORTFOLIO IMAGES: SINGLE CONTINUOUS ROW    */}
        {/* Smaller size, strictly single horizontal row, smooth flow      */}
        {/* ============================================================== */}
        <div className="w-full relative z-30 -mt-4 sm:-mt-6 md:-mt-8 overflow-hidden py-2 select-none flex items-center justify-center">
          
          {/* Subtle edge fades in dark theme */}
          {!isWhite && (
            <>
              <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#060608] via-[#060608]/80 to-transparent" />
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#060608] via-[#060608]/80 to-transparent" />
            </>
          )}

          {/* Strictly Single Continuous Infinite Row */}
          <div className="flex items-center w-max animate-awards-marquee whitespace-nowrap will-change-transform">
            {[...HONOURS, ...HONOURS].map((item, idx) => renderHonourCard(item, idx, 'row-a'))}
          </div>
        </div>

      </div>

      {/* Citation Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedHonour && (
          <div 
            onClick={() => setSelectedHonour(null)}
            className={`fixed inset-0 z-[120] backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 ${
              isWhite ? 'bg-black/40' : 'bg-black/85'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-5 rounded-none ${
                isWhite 
                  ? 'bg-[#FAF8F5] border border-stone-300 text-stone-900' 
                  : 'bg-[#0d0d10] border border-white/15 text-white'
              }`}
            >
              <button
                onClick={() => setSelectedHonour(null)}
                aria-label="Close modal"
                className={`absolute top-4 right-4 p-2 transition-colors cursor-pointer ${
                  isWhite ? 'text-stone-400 hover:text-black' : 'text-stone-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1.5 text-center">
                <span className={`text-[9px] font-wide tracking-[0.26em] uppercase font-bold ${
                  isWhite ? 'text-amber-700' : 'text-gradient-gold'
                }`}>
                  {selectedHonour.category}
                </span>
                <h3 className={`text-xl sm:text-2xl font-display uppercase tracking-tight font-bold ${
                  isWhite ? 'text-stone-900' : 'text-white'
                }`}>
                  {selectedHonour.name}
                </h3>
                <div className={`text-xs font-sans ${
                  isWhite ? 'text-stone-600' : 'text-stone-400'
                }`}>
                  {selectedHonour.detail}
                </div>
              </div>

              <div className={`p-4 border-l-2 text-xs sm:text-sm italic leading-relaxed ${
                isWhite
                  ? 'border-amber-600/60 bg-black/[0.03] text-stone-700'
                  : 'border-[#dfba73] bg-white/[0.04] text-stone-300'
              }`}>
                &ldquo;{selectedHonour.quote}&rdquo;
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-sans">
                <span className={isWhite ? 'text-stone-500' : 'text-stone-400'}>
                  {selectedHonour.citation}
                </span>
                {selectedHonour.link && (
                  <a
                    href={selectedHonour.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 font-semibold uppercase tracking-wider hover:underline ${
                      isWhite ? 'text-amber-800' : 'text-[#dfba73]'
                    }`}
                  >
                    <span>Read Press</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
