"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type Props = {
  type: 'mobile' | 'desktop';
  videos?: Array<{ src: string; poster?: string }>;
};

// Fallback videos locales (solo se usan si no se pasan videos desde Contentful)
const mobileVideosFallback = [
  { src: '/videos/video_mobile1.mp4', poster: '/videos/video_mobile1_poster.jpg' },
  { src: '/videos/video_mobile2.mp4', poster: '/videos/video_mobile2_poster.jpg' },
];

const desktopVideosFallback = [
  { src: '/videos/video_desktop1.mp4', poster: '/videos/video_desktop1_poster.jpg' },
  { src: '/videos/video_desktop3.mp4', poster: '/videos/video_desktop3_poster.jpg' },
];

export default function RandomVideo({ type, videos }: Props) {
  const [videoData, setVideoData] = useState<{ src: string; poster?: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use Intersection Observer to only load video when in viewport
  // Hero videos are always visible, so we'll always load them but with delay
  const { ref: containerRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px', // Start loading slightly before entering viewport
    triggerOnce: true,
  });

  useEffect(() => {
    setIsMounted(true);

    // Usar videos de Contentful si están disponibles, sino usar fallback locales
    const videoList = videos && videos.length > 0
      ? videos
      : (type === 'mobile' ? mobileVideosFallback : desktopVideosFallback);

    const randomIndex = Math.floor(Math.random() * videoList.length);
    setVideoData(videoList[randomIndex]);
  }, [type, videos]);

  useEffect(() => {
    // Delay video loading until after critical resources (poster image/LCP) have loaded
    // This significantly improves LCP by not competing for bandwidth
    if (isMounted && videoData) {
      // Use requestIdleCallback to load video when browser is idle
      // Falls back to 2 second delay if requestIdleCallback not supported
      if ('requestIdleCallback' in window) {
        const idleCallback = requestIdleCallback(
          () => {
            setShouldLoad(true);
          },
          { timeout: 2000 } // Max 2 seconds even if not idle
        );
        return () => cancelIdleCallback(idleCallback);
      } else {
        const timer = setTimeout(() => {
          setShouldLoad(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isMounted, videoData]);

  useEffect(() => {
    // Start loading video once shouldLoad is true
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
    }
  }, [shouldLoad]);

  // Don't render anything until we're on the client
  if (!isMounted || !videoData) return null;

  // Check if we should render this video based on screen size
  // Only render mobile video on mobile, desktop video on desktop
  const shouldRenderMobile = type === 'mobile';

  // Aplicar zoom específico a videos para ocultar información lumínica detrás del navbar
  const isVideo2Desktop = videoData.src === '/videos/video_desktop2.mp4';

  // Zoom para desktop específico
  const getVideoStyle = () => {
    if (isVideo2Desktop) {
      return { transform: 'scale(1.20)', transformOrigin: 'center center' };
    }
    return {};
  };

  const videoStyle = getVideoStyle();

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover ${
        shouldRenderMobile ? 'md:hidden' : 'hidden md:block'
      }`}
      style={{
        ...videoStyle,
        // Optimizaciones de renderizado para máxima calidad visual
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        willChange: 'auto',
        WebkitFontSmoothing: 'antialiased',
        perspective: '1000px',
        WebkitPerspective: '1000px',
        // Asegurar renderizado de alta calidad
        imageRendering: 'crisp-edges',
      } as React.CSSProperties}
      poster={videoData.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      key={videoData.src}
      aria-label={`Video de fondo ${type === 'mobile' ? 'móvil' : 'de escritorio'} de Grupo Frali`}
    >
      {shouldLoad && <source src={videoData.src} type="video/mp4" />}
      <track kind="captions" />
    </video>
    </div>
  );
}
