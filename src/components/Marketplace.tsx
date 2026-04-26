'use client';

import { useStore } from '@/store/useStore';

interface MarketplaceProps {
  isPreview: boolean;
  onEditText: () => void;
  onEditImg: () => void;
}

export default function Marketplace({ isPreview, onEditText, onEditImg }: MarketplaceProps) {
  const content = useStore((state) => state.content.marketplace);

  return (
    <section className="marketplace-section">
      <div className="marketplace-content editable-wrap reveal">
        <div className="edit-overlay" onClick={onEditText}>
          <div className="edit-btn-inner">✏️ Edit</div>
        </div>
        <div className="section-tag">Marketplace</div>
        <h2 
          className="section-title" 
          id="market-title"
          dangerouslySetInnerHTML={{ __html: content.title }}
        />
        <p className="section-sub" id="market-desc">{content.desc}</p>
        <button className="marketplace-btn">Browse Marketplace →</button>
      </div>
      <div className="marketplace-img editable-wrap reveal">
        <div className="edit-overlay" onClick={onEditImg}>
          <div className="edit-btn-inner">🖼 Change Image</div>
        </div>
        <img src={content.mediaUrl} alt="Marketplace" id="market-img" />
      </div>
    </section>
  );
}
