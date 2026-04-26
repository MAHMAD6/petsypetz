'use client';

import { useStore } from '@/store/useStore';

import Link from 'next/link';

interface ContestProps {
  isPreview: boolean;
  onEditImg: () => void;
  onEditText: () => void;
}

export default function Contest({ isPreview, onEditImg, onEditText }: ContestProps) {
  const content = useStore((state) => state.content.contest);

  return (
    <section className="contest-section">
      <div className="contest-img-wrap editable-wrap reveal">
        <div className="edit-overlay" onClick={onEditImg}>
          <div className="edit-btn-inner">🖼 Change Image</div>
        </div>
        <img src={content.mediaUrl} alt="Contests" id="contest-img" />
        <div className="contest-badge">🏆 Periodic Prizes</div>
      </div>
      <div className="contest-content editable-wrap reveal">
        <div className="edit-overlay" onClick={onEditText}>
          <div className="edit-btn-inner">✏️ Edit</div>
        </div>
        <h2 
          className="section-title" 
          id="contest-title"
          dangerouslySetInnerHTML={{ __html: content.title }}
        />
        <p className="section-sub" id="contest-desc">{content.desc}</p>
        <div className="prize-list">
          <div className="prize-item"><div className="prize-emoji">💰</div><div className="prize-text"><strong>Leaderboard with Cash Items</strong></div></div>
          <div className="prize-item"><div className="prize-emoji">🎁</div><div className="prize-text"><strong>Tens of Prizes</strong></div></div>
          <div className="prize-item"><div className="prize-emoji">📣</div><div className="prize-text"><strong>Sponsor Contest, Get Hundreds of Entrants</strong></div></div>
        </div>
        <Link href="/auth#signup" className="btn-primary" style={{ fontSize: '15px', padding: '13px 28px', textDecoration: 'none', display: 'inline-block' }}>Join Contest →</Link>
      </div>
    </section>
  );
}
