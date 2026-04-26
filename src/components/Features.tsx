'use client';

import { useStore } from '@/store/useStore';

interface FeaturesProps {
  isPreview: boolean;
  onEdit: () => void;
}

export default function Features({ isPreview, onEdit }: FeaturesProps) {
  const content = useStore((state) => state.content.features);

  return (
    <section className="section" style={{ background: 'var(--warm-white)' }}>
      <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="section-tag">Explore Features</div>
        <h2 className="section-title">Everything Your Pet Needs</h2>
        <p className="section-sub">
          The unique all-in-one pet community where you share, compete, shop, book services &amp; contests.
        </p>
      </div>
      <div className="features-grid editable-wrap">
          <div className="edit-overlay" onClick={onEdit}>
            <div className="edit-btn-inner">✏️ Edit Features</div>
          </div>

        <div className="feature-card reveal">
          <div className="card-img-wrap">
            <img src={content.img1} alt="Pet Adoption" />
          </div>
          <div className="feature-card-body">
            <div className="feature-icon">🏠</div>
            <div className="feature-title" id="feat-title-1">{content.title1}</div>
            <p className="feature-desc" id="feat-desc-1">{content.desc1}</p>
          </div>
        </div>

        <div className="feature-card reveal">
          <div className="card-img-wrap">
            <img src={content.img2} alt="Pet Pros" />
          </div>
          <div className="feature-card-body">
            <div className="feature-icon">👨‍⚕️</div>
            <div className="feature-title" id="feat-title-2">{content.title2}</div>
            <p className="feature-desc" id="feat-desc-2">{content.desc2}</p>
          </div>
        </div>

        <div className="feature-card reveal">
          <div className="card-img-wrap">
            <img src={content.img3} alt="Pet Contests" />
          </div>
          <div className="feature-card-body">
            <div className="feature-icon">🏆</div>
            <div className="feature-title" id="feat-title-3">{content.title3}</div>
            <p className="feature-desc" id="feat-desc-3">{content.desc3}</p>
          </div>
        </div>

        <div className="feature-card reveal">
          <div className="card-img-wrap">
            <img src={content.img4} alt="Marketplace" />
          </div>
          <div className="feature-card-body">
            <div className="feature-icon">🛒</div>
            <div className="feature-title" id="feat-title-4">{content.title4}</div>
            <p className="feature-desc" id="feat-desc-4">{content.desc4}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
