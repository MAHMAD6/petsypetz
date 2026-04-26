'use client';

import { useStore } from '@/store/useStore';

import Link from 'next/link';

interface HeroProps {
  isPreview: boolean;
  onEditHero: () => void;
  onEditVideo: () => void;
}

export default function Hero({ isPreview, onEditHero, onEditVideo }: HeroProps) {
  const content = useStore((state) => state.content.hero);

  return (
    <section className="hero">
      <div className="hero-left">
        <button className="hero-edit-pin" onClick={onEditHero}>✏️ Edit Hero Text</button>
        <div className="hero-particles">
          {[...Array(8)].map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
        <div className="hero-tag">🌍 Worldwide Community</div>
        <h1 
          className="hero-title" 
          id="hero-title"
          dangerouslySetInnerHTML={{ __html: content.title }}
        />
        <p className="hero-subtitle" id="hero-subtitle">
          {content.subtitle}
        </p>
        <div className="hero-actions">
          <Link href="/auth#signup" className="hero-btn primary">Sign Up</Link>
        </div>
      </div>
      <div className="hero-right editable-wrap">
        {!isPreview && (
          <div className="edit-overlay" onClick={onEditVideo}>
            <div className="edit-btn-inner">🎬 Change Video / Image</div>
          </div>
        )}
        <div className="hero-video-wrap">
          {content.mediaType === 'video' ? (
            <video
              className="hero-img"
              id="hero-img"
              src={content.mediaUrl}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              className="hero-img"
              id="hero-img"
              src={content.mediaUrl}
              alt="Pets"
            />
          )}
          <div className="video-overlay">
            <div className="play-btn">
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M2 2L20 13L2 24V2Z" fill="#3d3dea" stroke="#3d3dea" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

