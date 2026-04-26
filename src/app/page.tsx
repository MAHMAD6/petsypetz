'use client';

import { useState, useEffect } from 'react';
import AdminBar from '@/components/AdminBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import Features from '@/components/Features';
import Contest from '@/components/Contest';
import Marketplace from '@/components/Marketplace';
import Footer from '@/components/Footer';
import AdminModal, { ModalConfig } from '@/components/AdminModal';
import { useStore } from '@/store/useStore';
import { uploadMedia } from '@/app/actions/media';

const modalConfigs: Record<string, ModalConfig> = {
  hero: {
    title: '✏️ Edit Hero Section',
    fields: [
      { label: 'Headline', id: 'hero-title-val', type: 'text', target: 'hero-title' },
      { label: 'Subtitle', id: 'hero-sub-val', type: 'textarea', target: 'hero-subtitle' },
    ]
  },
  video: {
    title: '🎬 Hero Video / Image',
    upload: true,
    uploadLabel: 'Hero background (image or video)',
    uploadTarget: 'hero-img',
    uploadType: 'image/*,video/*'
  },
  features: {
    title: '✏️ Edit Feature Cards',
    fields: [
      { label: 'Card 1 Title', id: 'ft1', type: 'text', target: 'feat-title-1' },
      { label: 'Card 1 Description', id: 'ft1d', type: 'textarea', target: 'feat-desc-1' },
      { label: 'Card 2 Title', id: 'ft2', type: 'text', target: 'feat-title-2' },
      { label: 'Card 2 Description', id: 'ft2d', type: 'textarea', target: 'feat-desc-2' },
      { label: 'Card 3 Title', id: 'ft3', type: 'text', target: 'feat-title-3' },
      { label: 'Card 3 Description', id: 'ft3d', type: 'textarea', target: 'feat-desc-3' },
      { label: 'Card 4 Title', id: 'ft4', type: 'text', target: 'feat-title-4' },
      { label: 'Card 4 Description', id: 'ft4d', type: 'textarea', target: 'feat-desc-4' },
    ]
  },
  'contest-img': {
    title: '🖼 Change Contest Image',
    upload: true,
    uploadLabel: 'Contest section image',
    uploadTarget: 'contest-img',
    uploadType: 'image/*'
  },
  'contest-text': {
    title: '✏️ Edit Contest Section',
    fields: [
      { label: 'Title', id: 'ct', type: 'text', target: 'contest-title' },
      { label: 'Description', id: 'cd', type: 'textarea', target: 'contest-desc' },
    ]
  },
  'market-text': {
    title: '✏️ Edit Marketplace Section',
    fields: [
      { label: 'Title', id: 'mt', type: 'text', target: 'market-title' },
      { label: 'Description', id: 'md', type: 'textarea', target: 'market-desc' },
    ]
  },
  'market-img': {
    title: '🖼 Change Marketplace Image',
    upload: true,
    uploadLabel: 'Marketplace section image',
    uploadTarget: 'market-img',
    uploadType: 'image/*'
  },
  main: {
    title: '✏️ Edit All Content',
    multi: true
  },
};

export default function Home() {
  const [isPreview, setIsPreview] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const { content, updateSection, updateContent } = useStore();

  // Toggle view-mode class on body
  useEffect(() => {
    if (isPreview) {
      document.body.classList.add('view-mode');
    } else {
      document.body.classList.remove('view-mode');
    }
  }, [isPreview]);

  // Scroll Reveal Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openModal = (key: string) => {
    setActiveModal(key);
  };

  const handleToggleStats = () => {
    const newShowStats = !showStats;
    setShowStats(newShowStats);
    showToast(newShowStats ? 'Stats are now visible ✅' : 'Stats hidden from visitors');
  };

  const handleSave = (data: Record<string, string>) => {
    const config = modalConfigs[activeModal!];
    if (!config) return;

    if (config.isAuth) {
      const name = data['signup-name'] || 'User';
      showToast(activeModal === 'signup' ? `Welcome to the community, ${name}! 🐾` : `Welcome back! 👋`);
      setActiveModal(null);
      return;
    }

    // Professional state mapping
    switch (activeModal) {
      case 'hero':
        updateSection('hero', {
          title: data['hero-title-val'],
          subtitle: data['hero-sub-val']
        });
        break;
      case 'features':
        updateSection('features', {
          title1: data['ft1'], desc1: data['ft1d'],
          title2: data['ft2'], desc2: data['ft2d'],
          title3: data['ft3'], desc3: data['ft3d'],
          title4: data['ft4'], desc4: data['ft4d'],
        });
        break;
      case 'contest-text':
        updateSection('contest', {
          title: data['ct'],
          desc: data['cd']
        });
        break;
      case 'market-text':
        updateSection('marketplace', {
          title: data['mt'],
          desc: data['md']
        });
        break;
      case 'main':
        updateContent({
          hero: { ...content.hero, title: data['hero-all'], subtitle: data['sub-all'] },
          contest: { ...content.contest, title: data['ct-all'] },
          marketplace: { ...content.marketplace, title: data['mt-all'] }
        });
        break;
    }

    setActiveModal(null);
    showToast('Changes saved! 🎉');
  };

  const handleUpload = async (targetId: string, file: File) => {
    // 1. Instant local preview — update store immediately with a blob URL
    //    so the hero image changes the moment the user picks a file.
    const blobUrl = URL.createObjectURL(file);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    switch (targetId) {
      case 'hero-img':
        updateSection('hero', { mediaUrl: blobUrl, mediaType: mediaType as 'image' | 'video' });
        break;
      case 'contest-img':
        updateSection('contest', { mediaUrl: blobUrl });
        break;
      case 'market-img':
        updateSection('marketplace', { mediaUrl: blobUrl });
        break;
    }

    showToast('Uploading...');

    // 2. Upload to server in background, then replace blob URL with real persisted URL
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetId', targetId);
    formData.append('type', file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE');

    const result = await uploadMedia(formData);

    if (result.success && result.url) {
      const persistedUrl = result.url;
      // Replace blob URL with the real server URL
      switch (targetId) {
        case 'hero-img':
          updateSection('hero', { mediaUrl: persistedUrl, mediaType: mediaType as 'image' | 'video' });
          break;
        case 'contest-img':
          updateSection('contest', { mediaUrl: persistedUrl });
          break;
        case 'market-img':
          updateSection('marketplace', { mediaUrl: persistedUrl });
          break;
      }
      URL.revokeObjectURL(blobUrl); // free memory
      setActiveModal(null); // auto-close modal on success
      showToast('Media saved! ✅');
    } else {
      showToast(`Upload failed: ${result.error} ❌`);
    }
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  return (
    <main>
      <AdminBar
        isPreview={isPreview}
        onPreview={() => setIsPreview(!isPreview)}
        showStats={showStats}
        onToggleStats={handleToggleStats}
        onEdit={() => openModal('main')}
      />
      <Navbar />
      <Hero
        isPreview={isPreview}
        onEditHero={() => openModal('hero')}
        onEditVideo={() => openModal('video')}
      />
      <StatsStrip visible={showStats} />
      <Features isPreview={isPreview} onEdit={() => openModal('features')} />
      <Contest
        isPreview={isPreview}
        onEditImg={() => openModal('contest-img')}
        onEditText={() => openModal('contest-text')}
      />
      <Marketplace
        isPreview={isPreview}
        onEditText={() => openModal('market-text')}
        onEditImg={() => openModal('market-img')}
      />
      <Footer />

      <AdminModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        config={activeModal ? modalConfigs[activeModal] : null}
        onSave={handleSave}
        onUpload={handleUpload}
      />

      <div className={`toast success ${toast.visible ? 'show' : ''}`}>
        {toast.message}
      </div>
    </main>
  );
}

