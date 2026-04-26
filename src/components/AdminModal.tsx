'use client';

import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export interface ModalField {
  label: string;
  id: string;
  type: 'text' | 'textarea' | 'password' | 'email';
  target?: string;
  placeholder?: string;
}

export interface ModalConfig {
  title: string;
  fields?: ModalField[];
  upload?: boolean;
  uploadLabel?: string;
  uploadTarget?: string;
  uploadType?: string;
  multi?: boolean;
  submitLabel?: string;
  isAuth?: boolean;
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ModalConfig | null;
  onSave: (data: Record<string, string>) => void;
  onUpload: (targetId: string, file: File) => Promise<void>;
}

export default function AdminModal({ isOpen, onClose, config, onSave, onUpload }: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [localConfig, setLocalConfig] = useState<ModalConfig | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done'>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const content = useStore((state) => state.content);

  useEffect(() => {
    if (config) {
      setLocalConfig(config);
      setUploadStatus('idle');
      setPreviewUrl(null);
      const initialData: Record<string, string> = {};

      // Professional initial data mapping from store
      if (config.fields) {
        config.fields.forEach(f => {
          if (f.id === 'hero-title-val') initialData[f.id] = content.hero.title;
          else if (f.id === 'hero-sub-val') initialData[f.id] = content.hero.subtitle;
          else if (f.id === 'ft1') initialData[f.id] = content.features.title1;
          else if (f.id === 'ft1d') initialData[f.id] = content.features.desc1;
          else if (f.id === 'ft2') initialData[f.id] = content.features.title2;
          else if (f.id === 'ft2d') initialData[f.id] = content.features.desc2;
          else if (f.id === 'ft3') initialData[f.id] = content.features.title3;
          else if (f.id === 'ft3d') initialData[f.id] = content.features.desc3;
          else if (f.id === 'ft4') initialData[f.id] = content.features.title4;
          else if (f.id === 'ft4d') initialData[f.id] = content.features.desc4;
          else if (f.id === 'ct') initialData[f.id] = content.contest.title;
          else if (f.id === 'cd') initialData[f.id] = content.contest.desc;
          else if (f.id === 'mt') initialData[f.id] = content.marketplace.title;
          else if (f.id === 'md') initialData[f.id] = content.marketplace.desc;
          else initialData[f.id] = '';
        });
      }

      if (config.multi) {
        initialData['hero-all'] = content.hero.title;
        initialData['sub-all'] = content.hero.subtitle;
        initialData['ct-all'] = content.contest.title;
        initialData['mt-all'] = content.marketplace.title;
      }

      setFormData(initialData);
    }
  }, [config, isOpen, content]);

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && localConfig?.uploadTarget) {
      // Show instant local preview
      const blob = URL.createObjectURL(file);
      setPreviewUrl(blob);
      setUploadStatus('uploading');
      await onUpload(localConfig.uploadTarget, file);
      // onUpload auto-closes modal on success; if we're still here it failed
      setUploadStatus('idle');
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      {localConfig && (
        <div className="modal">
          <div className="modal-header">
            <div className="modal-title">{localConfig.title}</div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
            {localConfig.fields && (
              <div className="modal-section">
                {!localConfig.isAuth && <h3>Text Content</h3>}
                {localConfig.fields.map(f => (
                  <div key={f.id} className="modal-field">
                    <label>{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={formData[f.id] || ''}
                        onChange={(e) => handleInputChange(f.id, e.target.value)}
                        placeholder={f.placeholder}
                        rows={3}
                      />
                    ) : (
                      <input
                        type={f.type}
                        value={formData[f.id] || ''}
                        onChange={(e) => handleInputChange(f.id, e.target.value)}
                        placeholder={f.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {localConfig.upload && (
              <div className="modal-section">
                <h3>Upload Media</h3>
                <div
                  className={`upload-zone ${uploadStatus === 'uploading' ? 'uploading' : ''}`}
                  onClick={() => uploadStatus !== 'uploading' && fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept={localConfig.uploadType}
                    onChange={handleFileChange}
                  />
                  {uploadStatus === 'uploading' ? (
                    <>
                      <div className="upload-spinner">⏳</div>
                      <p style={{ fontWeight: 600, color: 'var(--amber)' }}>Uploading...</p>
                    </>
                  ) : previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="upload-preview" />
                      <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 8 }}>Click to change</p>
                    </>
                  ) : (
                    <>
                      <div className="icon">📁</div>
                      <p>{localConfig.uploadLabel || 'Drag & drop or click to browse'}</p>
                      <p>Supports JPG, PNG, GIF, MP4, MOV</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {localConfig.multi && (
              <div className="modal-section">
                <h3>Quick Edit — All Sections</h3>
                <div className="modal-field">
                  <label>Hero Headline</label>
                  <input
                    type="text"
                    value={formData['hero-all'] || ''}
                    onChange={(e) => handleInputChange('hero-all', e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>Hero Subtitle</label>
                  <textarea
                    value={formData['sub-all'] || ''}
                    onChange={(e) => handleInputChange('sub-all', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="modal-field">
                  <label>Contest Title</label>
                  <input
                    type="text"
                    value={formData['ct-all'] || ''}
                    onChange={(e) => handleInputChange('ct-all', e.target.value)}
                  />
                </div>
                <div className="modal-field">
                  <label>Market Title</label>
                  <input
                    type="text"
                    value={formData['mt-all'] || ''}
                    onChange={(e) => handleInputChange('mt-all', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-btn-save" onClick={() => onSave(formData)}>
              {localConfig.submitLabel || (localConfig.isAuth ? 'Submit' : 'Save Changes ✓')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
