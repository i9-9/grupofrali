"use client";

import { useEffect, useState, useRef } from 'react';

type Props = {
  type: 'mobile' | 'desktop';
};

const mobileVideos = [
  '/videos/video_mobile1.mp4',
  '/videos/video_mobile2.mp4',
];

const desktopVideos = [
  '/videos/video_desktop1.mp4',
  '/videos/video_desktop3.mp4',
];

export default function RandomVideo({ type }: Props) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const list = type === 'mobile' ? mobileVideos : desktopVideos;
    const randomIndex = Math.floor(Math.random() * list.length);
    setVideoSrc(list[randomIndex]);

    // Delay video loading slightly to prioritize other critical resources
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [type]);

  useEffect(() => {
    // Start loading video once shouldLoad is true
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
    }
  }, [shouldLoad]);

  // Don't render anything until we're on the client
  if (!isMounted || !videoSrc) return null;

  // Check if we should render this video based on screen size
  // Only render mobile video on mobile, desktop video on desktop
  const shouldRenderMobile = type === 'mobile';

  // Aplicar zoom específico a videos para ocultar información lumínica detrás del navbar
  const isVideo2Desktop = videoSrc === '/videos/video_desktop2.mp4';

  // Zoom para desktop específico
  const getVideoStyle = () => {
    if (isVideo2Desktop) {
      return { transform: 'scale(1.20)', transformOrigin: 'center center' };
    }
    return {};
  };

  const videoStyle = getVideoStyle();

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover ${
        shouldRenderMobile ? 'md:hidden' : 'hidden md:block'
      }`}
      style={{
        ...videoStyle,
        imageRendering: '-webkit-optimize-contrast',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        willChange: 'auto',
        WebkitFontSmoothing: 'antialiased',
        perspective: '1000px',
        WebkitPerspective: '1000px'
      }}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      key={videoSrc}
    >
      {shouldLoad && <source src={videoSrc} type="video/mp4" />}
    </video>
  );
}
