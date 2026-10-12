import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  onPlay: (title: string, embedUrl: string) => void;
}> = ({ item, index, isWhite = false, onPlay }) => {
  const [imgSrc] = useState<string>(`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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

  const embedUrl = `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&mute=0`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(item.title, embedUrl)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative w-64 sm:w-76 md:w-84 aspect-[16/10] overflow-hidden shrink-0 group cursor-pointer outline-none ring-0 transition-all duration-300 will-change-transform ${
        isWhite
          ? 'border border-black/10 bg-white shadow-none sm:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-black/25'
          : 'border border-white/10 bg-stone-950 shadow-none sm:shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-white/30'
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

      {/* Top Right Corner Arrow Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl ${
          isWhite
            ? 'bg-white/80 border border-black/15 text-stone-900 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900'
            : 'bg-black/50 border border-white/30 text-white group-hover:bg-white group-hover:text-black group-hover:border-white'
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block shrink-0">
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
          </svg>
        </div>
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

  // Mouse Reactive Pan & Scrub Physics
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafId = useRef<number>(0);
  const [isInView, setIsInView] = useState(false);

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

  // Butter-smooth 120fps RAF loop that nudges and glides rows with mouse movements
  useEffect(() => {
    if (!isInView) return;

    const animateTracks = () => {
      const diff = targetOffset.current - currentOffset.current;
      if (Math.abs(diff) > 0.1) {
        currentOffset.current += diff * 0.12;
      } else {
        currentOffset.current = targetOffset.current;
      }

      // Smooth hardware-accelerated dual counter-reaction
      if (row1TrackRef.current) {
        row1TrackRef.current.style.transform = `translate3d(${currentOffset.current.toFixed(2)}px, 0, 0)`;
      }
      if (row2TrackRef.current) {
        row2TrackRef.current.style.transform = `translate3d(${(-currentOffset.current * 0.9).toFixed(2)}px, 0, 0)`;
      }

      rafId.current = requestAnimationFrame(animateTracks);
    };

    rafId.current = requestAnimationFrame(animateTracks);
    return () => cancelAnimationFrame(rafId.current);
  }, [isInView]);

  // React smoothly to mouse move across section
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isDragging.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    // Glides dynamically up to 180px with mouse position
    targetOffset.current = (0.5 - relativeX) * 220;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging.current) {
      targetOffset.current = 0;
    }
  }, []);

  // Pointer Drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = targetOffset.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    targetOffset.current = dragStartOffset.current + deltaX * 1.2;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePlay = (title: string, url: string) => {
    onPlayVideo?.(title, url);
  };

  const row1Items = CHANNEL_VIDEOS_ROW_1.slice(0, 16);
  const row2Items = CHANNEL_VIDEOS_ROW_2.slice(0, 16);

  return (
    <section 
      id="studio" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

      {/* Floating 3D Scrolling Rows Reacting with Mouse */}
      <div className="relative z-10 mt-3 sm:mt-5 md:mt-6 w-full overflow-hidden space-y-4 sm:space-y-5">
        
        {/* ROW 1: Scrolling RIGHT + Mouse Interactive Glide */}
        <div 
          ref={row1TrackRef}
          className="will-change-transform"
        >
          <div className="animate-marquee-reverse flex gap-4 shrink-0 px-4">
            {row1Items.concat(row1Items).map((item, idx) => (
              <VideoRepertoireCard
                key={`r1-${item.id}-${idx}`}
                item={item}
                index={idx}
                isWhite={isWhite}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling LEFT + Mouse Interactive Glide */}
        <div 
          ref={row2TrackRef}
          className="will-change-transform"
        >
          <div className="animate-marquee flex gap-4 shrink-0 px-4">
            {row2Items.concat(row2Items).map((item, idx) => (
              <VideoRepertoireCard
                key={`r2-${item.id}-${idx}`}
                item={item}
                index={idx + 10}
                isWhite={isWhite}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
