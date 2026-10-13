import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { FadeInUp } from './EditorialReveal';
import { SectionTitleLockup } from './SectionTitleLockup';
import {
  CHANNEL_VIDEOS_ROW_1,
  CHANNEL_VIDEOS_ROW_2,
  YouTubeRepertoireVideo
} from '../data/youtubeData';

interface DanceFitnessSectionProps {
  theme?: 'dark' | 'white';
  onOpenInquiry?: (topic?: string) => void;
  onPlayVideo?: (title: string, url: string) => void;
}

// Highlighted Floating 3D Video Card Component
const VideoRepertoireCard: React.FC<{
  item: YouTubeRepertoireVideo;
  index: number;
  isWhite?: boolean;
  onCardClick: (item: YouTubeRepertoireVideo) => void;
}> = ({ item, isWhite = false, onCardClick }) => {
  const [imgSrc] = useState<string>(`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onCardClick(item)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative w-64 sm:w-76 md:w-84 aspect-[16/10] overflow-hidden shrink-0 group cursor-pointer outline-none ring-0 transition-all duration-300 will-change-transform select-none ${
        isWhite
          ? 'border border-black/10 bg-white shadow-none sm:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-black/30'
          : 'border border-white/10 bg-stone-950 shadow-none sm:shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-white/35'
      }`}
    >
      {/* Background Media */}
      {!hasError && (
        <img
          src={imgSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 filter brightness-[0.98] contrast-[1.06] saturate-[1.08] group-hover:brightness-[1.12] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle Specular Glare */}
      <div 
        aria-hidden="true" 
        className="hidden sm:block absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none group-hover:opacity-60 transition-opacity" 
      />

      {/* Top Right Play Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl ${
          isWhite
            ? 'bg-white/80 border border-black/15 text-stone-900 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900'
            : 'bg-black/60 border border-white/30 text-white group-hover:bg-white group-hover:text-black group-hover:border-white'
        }`}>
          <Play className="w-3 h-3 fill-current translate-x-0.5" />
        </div>
      </div>

      {/* Bottom Title & Style Bar on Hover */}
      <div className="absolute inset-x-0 bottom-0 p-3 pointer-events-none z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] font-mono tracking-widest uppercase text-stone-300 font-semibold block">
          {item.style}
        </span>
        <p className="text-xs font-semibold text-white truncate">
          {item.title}
        </p>
      </div>
    </motion.div>
  );
};

export const DanceFitnessSection: React.FC<DanceFitnessSectionProps> = ({
  theme = 'dark',
  onPlayVideo
}) => {
  const isWhite = theme === 'white';
  const sectionRef = useRef<HTMLElement | null>(null);
  const row1TrackRef = useRef<HTMLDivElement | null>(null);
  const row2TrackRef = useRef<HTMLDivElement | null>(null);

  // Position offsets
  const offset1 = useRef(0);
  const offset2 = useRef(0);

  // Steering & dragging state
  const steerVelocity = useRef(0); // responsive speed driven by mouse position
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragLastX = useRef(0);
  const dragVelocity = useRef(0);
  const dragDistance = useRef(0);
  const rafId = useRef<number>(0);
  const [isInView, setIsInView] = useState(false);

  const row1Items = CHANNEL_VIDEOS_ROW_1.slice(0, 16);
  const row2Items = CHANNEL_VIDEOS_ROW_2.slice(0, 16);

  // Approximate loop width for 16 cards (~336px stride = 5376px)
  const cardStride = 340;
  const singleLoopWidth = row1Items.length * cardStride;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 120fps hardware-accelerated RAF animation loop
  useEffect(() => {
    if (!isInView) return;

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 16.666; // normalize ~60fps step
      lastTime = now;

      if (isDragging.current) {
        // Dragging is actively controlling offsets directly
        dragVelocity.current *= 0.9;
      } else {
        // Apply inertia if any
        if (Math.abs(dragVelocity.current) > 0.1) {
          offset1.current += dragVelocity.current * dt;
          offset2.current -= dragVelocity.current * 0.9 * dt;
          dragVelocity.current *= 0.95;
        }

        // Apply mouse steer velocity if hovered, otherwise gentle ambient drift
        if (isHovered.current && Math.abs(steerVelocity.current) > 0.1) {
          offset1.current -= steerVelocity.current * dt;
          offset2.current += steerVelocity.current * 0.85 * dt;
        } else {
          // Relaxed ambient drift so it stays alive
          offset1.current -= 0.65 * dt;
          offset2.current += 0.55 * dt;
        }
      }

      // Continuous modular infinite wrap
      const wrap1 = ((offset1.current % singleLoopWidth) + singleLoopWidth) % singleLoopWidth;
      const wrap2 = ((offset2.current % singleLoopWidth) + singleLoopWidth) % singleLoopWidth;

      if (row1TrackRef.current) {
        row1TrackRef.current.style.transform = `translate3d(${-wrap1}px, 0, 0)`;
      }
      if (row2TrackRef.current) {
        row2TrackRef.current.style.transform = `translate3d(${-wrap2}px, 0, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [isInView, singleLoopWidth]);

  // Fast, responsive mouse interaction: cursor position steers the gallery smoothly across all videos
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isDragging.current || !sectionRef.current) return;
    isHovered.current = true;
    const rect = sectionRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width; // 0 (left) to 1 (right)

    // Center zone around 0.5 with high-speed scaling towards edges (up to 42px/frame)
    const factor = (relativeX - 0.5) * 2; // -1 to +1
    if (Math.abs(factor) > 0.12) {
      const sign = Math.sign(factor);
      const intensity = (Math.abs(factor) - 0.12) / 0.88;
      // Exponential responsiveness for fast and dynamic video exploration
      steerVelocity.current = sign * Math.pow(intensity, 1.25) * 38;
    } else {
      steerVelocity.current = 0;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    steerVelocity.current = 0;
  }, []);

  // Mouse Wheel / Trackpad scrub: allows instant exploration with wheel or two-finger swipe
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    offset1.current += delta * 2.2;
    offset2.current -= delta * 1.9;
  }, []);

  // Pointer Drag interactions (Desktop & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragLastX.current = e.clientX;
    dragDistance.current = 0;
    dragVelocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragLastX.current;
    dragDistance.current += Math.abs(delta);
    dragVelocity.current = delta * 2.2;
    dragLastX.current = e.clientX;

    // Direct 1:1 scrub
    offset1.current += delta * 2.0;
    offset2.current -= delta * 1.8;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleCardClick = (item: YouTubeRepertoireVideo) => {
    // Only open video if user wasn't actively dragging
    if (dragDistance.current < 8) {
      const embedUrl = `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&mute=0`;
      onPlayVideo?.(item.title, embedUrl);
    }
  };

  // Quick jump buttons (< and >)
  const handleNudge = (direction: 'prev' | 'next') => {
    const step = direction === 'next' ? 680 : -680;
    dragVelocity.current = (direction === 'next' ? 1 : -1) * 22;
    offset1.current += step;
    offset2.current -= step * 0.9;
  };

  return (
    <section 
      id="studio" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="py-16 sm:py-24 md:py-30 select-none relative overflow-hidden bg-transparent cursor-grab active:cursor-grabbing"
    >
      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 relative z-20 flex flex-col items-center justify-center text-center">
        
        {/* Section Header: Monolith CHOREOS (Centered on mobile and laptops/desktop) */}
        <div className="relative z-25 pointer-events-none w-full flex items-center justify-center text-center">
          <FadeInUp delay={0.05} yOffset={20}>
            <SectionTitleLockup
              title="CHOREOS"
              align="center"
              theme={theme}
            />
          </FadeInUp>
        </div>

      </div>

      {/* Floating 3D Scrolling Rows Reacting Responsively with Mouse */}
      <div className="relative z-10 mt-6 sm:mt-8 w-full overflow-hidden space-y-4 sm:space-y-5">
        
        {/* ROW 1: Responsive Interactive Glide Across All Videos */}
        <div 
          ref={row1TrackRef}
          className="will-change-transform"
        >
          <div className="flex gap-4 shrink-0 px-4 w-max">
            {/* 3 repeats for continuous, infinite wrapping */}
            {row1Items.concat(row1Items).concat(row1Items).map((item, idx) => (
              <VideoRepertoireCard
                key={`r1-${item.id}-${idx}`}
                item={item}
                index={idx}
                isWhite={isWhite}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: Responsive Interactive Glide Across All Videos */}
        <div 
          ref={row2TrackRef}
          className="will-change-transform"
        >
          <div className="flex gap-4 shrink-0 px-4 w-max">
            {/* 3 repeats for continuous, infinite wrapping */}
            {row2Items.concat(row2Items).concat(row2Items).map((item, idx) => (
              <VideoRepertoireCard
                key={`r2-${item.id}-${idx}`}
                item={item}
                index={idx + 10}
                isWhite={isWhite}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
