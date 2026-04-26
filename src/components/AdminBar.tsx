'use client';

interface AdminBarProps {
  onPreview: () => void;
  onToggleStats: () => void;
  onEdit: () => void;
  showStats: boolean;
  isPreview: boolean;
}

export default function AdminBar({ onPreview, onToggleStats, onEdit, showStats, isPreview }: AdminBarProps) {
  if (isPreview) {
    return (
      <div id="admin-bar" className="preview-mode-bar">
        <span>👁 Preview Mode</span>
        <div className="bar-actions">
          <button className="primary" onClick={onPreview}>✏️ Back to Edit</button>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-bar">
      <span>🛠 Admin Mode — Hover over any section to edit</span>
      <div className="bar-actions">
        <button className="secondary" onClick={onPreview}>👁 Preview</button>
        <button id="stats-toggle-btn" onClick={onToggleStats}>
          {showStats ? '📊 Hide Stats' : '📊 Show Stats'}
        </button>
        <button onClick={onEdit}>✏️ Edit Content</button>
      </div>
    </div>
  );
}
