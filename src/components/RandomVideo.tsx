// components/RandomVideo.tsx
import { useEffect, useState } from 'react';

type Props = {
  type: 'mobile' | 'desktop';
};

const mobileVideos = [
  '/videos/video_mobile1.mp4',
  '/videos/video_mobile2.mp4',
  '/videos/video_mobile3.mp4',
];

const desktopVideos = [
  '/videos/video_desktop1.mp4',
  '/videos/video_desktop2.mp4',
  '/videos/video_desktop3.mp4',
];

export default function RandomVideo({ type }: Props) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const list = type === 'mobile' ? mobileVideos : desktopVideos;
    const randomIndex = Math.floor(Math.random() * list.length);
    setVideoSrc(list[randomIndex]);
  }, [type]);

  if (!videoSrc) return null;

  return (
    <video
      className={`absolute inset-0 w-full h-full object-cover ${
        type === 'mobile' ? 'md:hidden' : 'hidden md:block'
      }`}
      autoPlay
      muted
      loop
      playsInline
      key={videoSrc}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
