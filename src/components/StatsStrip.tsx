'use client';

interface StatsStripProps {
  visible: boolean;
}

export default function StatsStrip({ visible }: StatsStripProps) {
  return (
    <div className="stats-strip" id="stats-strip" style={{ display: visible ? 'flex' : 'none' }}>
      <div className="stat-item"><span className="stat-num">120K+</span><span className="stat-label">Pet Owners</span></div>
      <div className="stat-item"><span className="stat-num">45K+</span><span className="stat-label">Pets Listed</span></div>
      <div className="stat-item"><span className="stat-num">800+</span><span className="stat-label">Pet Professionals</span></div>
      <div className="stat-item"><span className="stat-num">200+</span><span className="stat-label">Active Contests</span></div>
      <div className="stat-item"><span className="stat-num">60+</span><span className="stat-label">Countries</span></div>
    </div>
  );
}
