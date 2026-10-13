import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SectionTitleLockup } from './SectionTitleLockup';
import { assetUrl } from '../utils/assets';

// 24 Curated Choreography Movement Photographs
export interface PortfolioArchiveItem {
  id: string;
  src: string;
  title: string;
  category: string;
  year: string;
}

export const PORTFOLIO_ARCHIVE_ITEMS: PortfolioArchiveItem[] = [
  { id: 'p-1', src: assetUrl('/classes/1.jpg'), title: 'DYNAMIC FLOW', category: 'CHOREOGRAPHY & FORM', year: '2025' },
  { id: 'p-2', src: assetUrl('/destinations/dest-1.jpg'), title: 'ROYAL SANGEET', category: 'DESTINATION PRODUCTION', year: '2024' },
  { id: 'p-3', src: assetUrl('/artists/art-1.jpg'), title: 'SOLO INVERSION', category: 'ATHLETIC CONTEMPORARY', year: '2024' },
  { id: 'p-4', src: assetUrl('/classes/2.jpg'), title: 'RHYTHM CADENCE', category: 'DANCE FITNESS REPERTOIRE', year: '2024' },
  { id: 'p-5', src: assetUrl('/destinations/dest-2.jpg'), title: 'PALATIAL SPLENDOR', category: 'UDAIPUR RESIDENCY', year: '2024' },
  { id: 'p-6', src: assetUrl('/artists/art-2.jpg'), title: 'EXPRESSIVE FORM', category: 'EDITORIAL SPOTLIGHT', year: '2023' },
  { id: 'p-7', src: assetUrl('/classes/3.jpg'), title: 'PRECISION HARMONY', category: 'MASTERCLASS REPERTOIRE', year: '2023' },
  { id: 'p-8', src: assetUrl('/destinations/dest-3.jpg'), title: 'BESPOKE FINALE', category: 'HERITAGE ARCHIVE', year: '2023' },
  { id: 'p-9', src: assetUrl('/artists/art-3.jpg'), title: 'KINETIC BALANCE', category: 'ACROBATIC EXTENSION', year: '2023' },
  { id: 'p-10', src: assetUrl('/classes/4.jpg'), title: 'SYNCHRONICITY', category: 'STUDIO ENSEMBLE', year: '2023' },
  { id: 'p-11', src: assetUrl('/destinations/dest-4.jpg'), title: 'FALAKNUMA SUITE', category: 'ROYAL BLOCKING', year: '2022' },
  { id: 'p-12', src: assetUrl('/artists/art-4.jpg'), title: 'FESTIVAL APEX', category: 'STAGE DIRECTION', year: '2022' },
  { id: 'p-13', src: assetUrl('/classes/5.jpg'), title: 'URBAN BEAT', category: 'COMMERCIAL BLOCKING', year: '2022' },
  { id: 'p-14', src: assetUrl('/destinations/dest-5.jpg'), title: 'SUNSET SYMPHONY', category: 'OPEN AIR PRODUCTION', year: '2022' },
  { id: 'p-15', src: assetUrl('/artists/art-5.jpg'), title: 'GRACE & GRAVITY', category: 'SCREEN ADAPTATION', year: '2022' },
  { id: 'p-16', src: assetUrl('/classes/8.jpg'), title: 'POWER STRIKE', category: 'INTENSIVE WORKSHOP', year: '2021' },
  { id: 'p-17', src: assetUrl('/studio/9.jpg'), title: 'STUDIO SANCTUM', category: 'HYDERABAD LAB', year: '2021' },
  { id: 'p-18', src: assetUrl('/artists/art-6.jpg'), title: 'ELEVATION', category: 'SOLO MASTERY', year: '2021' },
  { id: 'p-19', src: assetUrl('/classes/1.jpg'), title: 'FUSION HARMONY', category: 'CONTEMPORARY FUSION', year: '2021' },
  { id: 'p-20', src: assetUrl('/destinations/dest-1.jpg'), title: 'GRAND RECEPTION', category: 'MONUMENTAL FINALE', year: '2020' },
  { id: 'p-21', src: assetUrl('/classes/3.jpg'), title: 'PRECISION PULSE', category: 'ENSEMBLE CADENCE', year: '2020' },
  { id: 'p-22', src: assetUrl('/destinations/dest-2.jpg'), title: 'REGAL OVERTURE', category: 'STAGE ENSEMBLE', year: '2020' },
  { id: 'p-23', src: assetUrl('/classes/5.jpg'), title: 'EXPRESSION LAB', category: 'MOVEMENT ART', year: '2020' },
  { id: 'p-24', src: assetUrl('/destinations/dest-4.jpg'), title: 'ARCHIVAL CURATION', category: 'SIGNATURE REPERTOIRE', year: '2019' },
];

interface AboutPortfolioSectionProps {
  theme?: 'dark' | 'white';
}

export const AboutPortfolioSection: React.FC<AboutPortfolioSectionProps> = ({ theme = 'dark' }) => {
  const isWhite = theme === 'white';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalCount = PORTFOLIO_ARCHIVE_ITEMS.length;

  // Track scroll through the pinned section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Butter-smooth spring interpolation for the scroll progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.0001,
  });

  const [activeFloatIndex, setActiveFloatIndex] = useState(0);

  // Sync active float index for captions and indicators
  useEffect(() => {
    return smoothProgress.on('change', (v) => {
      const idx = Math.max(0, Math.min(totalCount - 1, v * (totalCount - 1)));
      setActiveFloatIndex(idx);
    });
  }, [smoothProgress, totalCount]);

  const activeIndex = Math.min(totalCount - 1, Math.max(0, Math.round(activeFloatIndex)));
  const activeItem = PORTFOLIO_ARCHIVE_ITEMS[activeIndex] || PORTFOLIO_ARCHIVE_ITEMS[0];

  // Touch & Pointer Drag Scrub for direct tactile interactivity
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartX.current = e.clientX;
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dy = dragStartY.current - e.clientY;
    const dx = dragStartX.current - e.clientX;
    const delta = Math.abs(dy) > Math.abs(dx) ? dy : dx;

    if (typeof window !== 'undefined') {
      window.scrollBy({ top: delta * 0.7, behavior: 'auto' });
      dragStartY.current = e.clientY;
      dragStartX.current = e.clientX;
    }
  }, []);

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Keyboard navigation for power users
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (typeof window !== 'undefined' && containerRef.current) {
        window.scrollBy({ top: 180, behavior: 'smooth' });
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (typeof window !== 'undefined' && containerRef.current) {
        window.scrollBy({ top: -180, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      id="about-portfolio"
      aria-label="Portfolio & Choreography Archive"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      // Generous scroll height so each image has ample room to zoom in, adjust, and transition
      className="relative w-full outline-none select-none"
      style={{ height: `${totalCount * 130 + 1000}px` }}
    >
      {/* ============================================================== */}
      {/* STICKY FULLSCREEN SHOWCASE STAGE: ZERO SHADOWS AT EDGES       */}
      {/* Images flow from top-left (30%) to bottom-right (70%)         */}
      {/* Each image zooms in, adjusts, and yields to the next on scroll */}
      {/* ============================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent z-20">
        
        {/* TOP BAR: MONUMENTAL SECTION TITLE LOCKUP */}
        <div className="pt-20 sm:pt-24 md:pt-28 pb-2 w-full flex flex-col items-center justify-center px-4 relative z-30 pointer-events-none">
          <SectionTitleLockup
            title="PORTFOLIO"
            subtitle="CHOREOGRAPHY"
            align="center"
            theme={theme}
          />
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE ZOOM & FLOW STAGE                                  */}
        {/* Flow from Top-Left (~30%) to Bottom-Right (~70%)               */}
        {/* Each image enters, zooms in & adjusts, then fades to next      */}
        {/* Zero edge shadows, zero corner vignettes                       */}
        {/* ============================================================== */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
          
          {/* Render active and nearby images in the sequence */}
          {PORTFOLIO_ARCHIVE_ITEMS.map((item, idx) => {
            // Distance from active fractional index
            const diff = idx - activeFloatIndex;

            // Cull images outside the immediate visual window
            if (diff < -2.2 || diff > 2.2) return null;

            // Coordinate trajectory:
            // Upcoming (diff > 0): starts towards top-left (left: ~30%, top: ~24%)
            // Focus (diff === 0): adjusts into crisp, centered focus (left: ~50%, top: ~50%)
            // Outgoing (diff < 0): exits towards bottom-right (left: ~70%, top: ~76%)
            const progressRatio = Math.max(-1, Math.min(1, diff)); // -1 to +1

            // Diagonal coordinates mapping from 30% top-left to 70% bottom-right
            const posXPercent = 50 - progressRatio * 22; // 28% to 72%
            const posYPercent = 50 - progressRatio * 24; // 26% to 74%

            // Interactive Zoom In & Adjust physics:
            // When diff approaches 0: zooms in to scale 1.05 and adjusts sharply into crisp focus!
            const absDiff = Math.abs(diff);
            const scale = Math.max(0.72, 1.06 - absDiff * 0.22);
            
            // Opacity: high clarity near 0, graceful feather at extremities
            const opacity = Math.max(0, 1 - Math.pow(absDiff / 1.3, 1.8));

            // Layering: active card sits highest
            const zIndex = Math.round(50 - absDiff * 20);

            // Subtle dynamic tilt adjusting with scroll
            const rotateDeg = (idx % 2 === 0 ? -1.5 : 1.5) + progressRatio * 2.5;

            return (
              <div
                key={`scroll-img-${item.id}`}
                style={{
                  position: 'absolute',
                  left: `${posXPercent}%`,
                  top: `${posYPercent}%`,
                  transform: `translate(-50%, -50%) scale(${scale.toFixed(3)}) rotate(${rotateDeg.toFixed(2)}deg)`,
                  opacity: Number(opacity.toFixed(3)),
                  zIndex,
                  willChange: 'transform, opacity',
                  transition: 'none',
                }}
                className="pointer-events-auto cursor-pointer group"
              >
                {/* Image Frame: Pure clean styling without harsh edge shadows */}
                <div 
                  className={`relative overflow-hidden transition-all duration-300 w-[240px] h-[340px] sm:w-[320px] sm:h-[450px] md:w-[390px] md:h-[540px] lg:w-[440px] lg:h-[610px] ${
                    isWhite
                      ? 'border border-black/15 bg-white'
                      : 'border border-white/20 bg-stone-950'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading={Math.abs(diff) < 1 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out brightness-[0.98] contrast-[1.03]"
                  />

                  {/* Micro architectural corner markers for high fashion aesthetic */}
                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none">
                    <div className="w-full flex justify-between">
                      <span className={`w-2 h-2 border-t border-l ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                      <span className={`w-2 h-2 border-t border-r ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                    </div>
                    <div className="w-full flex justify-between">
                      <span className={`w-2 h-2 border-b border-l ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                      <span className={`w-2 h-2 border-b border-r ${isWhite ? 'border-black/30' : 'border-white/30'}`} />
                    </div>
                  </div>

                  {/* Glass metadata strip on focused card */}
                  {absDiff < 0.4 && (
                    <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-2.5 sm:p-3 backdrop-blur-md transition-opacity duration-300 bg-black/40 text-white flex items-center justify-between">
                      <div className="flex flex-col text-left">
                        <span className="font-['Bebas_Neue',_'Montserrat',_sans-serif] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-white">
                          {item.title}
                        </span>
                        <span className="text-[8px] sm:text-[9.5px] font-mono tracking-widest uppercase text-white/70">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#dfba73]">
                        {item.year}
                      </span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

        {/* ============================================================== */}
        {/* BOTTOM INTERACTIVE SCRUB & PROGRESS LOCKUP                     */}
        {/* Minimal text, reactive progress line, zero boxes               */}
        {/* ============================================================== */}
        <div className="pb-6 sm:pb-8 pt-2 w-full max-w-5xl mx-auto px-6 relative z-30 flex flex-col items-center gap-3">
          
          {/* Active Piece Counter & Title: Clean, minimal text without boxes */}
          <div className="flex items-center justify-between w-full text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase">
            <span className={isWhite ? 'text-stone-800 font-bold' : 'text-stone-300 font-semibold'}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
            </span>

            <span className={`transition-opacity duration-300 font-semibold tracking-[0.25em] ${
              isWhite ? 'text-stone-600' : 'text-white/60'
            }`}>
              {activeItem.title}
            </span>

            <span className={isWhite ? 'text-stone-400' : 'text-white/40'}>
              SCROLL TO EXPLORE
            </span>
          </div>

          {/* Minimal Interactive Progress Track */}
          <div 
            onClick={(e) => {
              if (containerRef.current) {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickRatio = (e.clientX - rect.left) / rect.width;
                const containerTop = containerRef.current.offsetTop;
                const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
                window.scrollTo({
                  top: containerTop + clickRatio * containerHeight,
                  behavior: 'smooth',
                });
              }
            }}
            className={`w-full h-1 rounded-full cursor-pointer relative overflow-hidden transition-colors ${
              isWhite ? 'bg-stone-300/60' : 'bg-white/10'
            }`}
          >
            <motion.div
              style={{
                width: `${((activeFloatIndex) / (totalCount - 1)) * 100}%`,
              }}
              className={`h-full rounded-full transition-all duration-75 ${
                isWhite ? 'bg-black' : 'bg-[#dfba73]'
              }`}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
