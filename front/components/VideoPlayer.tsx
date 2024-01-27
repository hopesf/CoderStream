"use client";
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer: React.FC = () => {
  const videoSrc = 'http://192.168.1.158:80/hls/test.m3u8';
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      if (videoEl.current) {
        hls.attachMedia(videoEl.current);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(videoSrc);
        });
      }

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
      };
    } else if (videoEl.current && videoEl.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.current.src = videoSrc;
    }
  }, []);

  return (
    <div className="App">
      <video ref={videoEl} controls width={1400} height={768} />
    </div>
  );
}

export default VideoPlayer;
