import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppContent {
  hero: {
    title: string;
    subtitle: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
  };
  features: {
    title1: string;
    desc1: string;
    img1: string;
    title2: string;
    desc2: string;
    img2: string;
    title3: string;
    desc3: string;
    img3: string;
    title4: string;
    desc4: string;
    img4: string;
  };
  contest: {
    title: string;
    desc: string;
    mediaUrl: string;
  };
  marketplace: {
    title: string;
    desc: string;
    mediaUrl: string;
  };
}

interface AppState {
  content: AppContent;
  updateContent: (updates: Partial<AppContent>) => void;
  updateSection: <T extends keyof AppContent>(section: T, updates: Partial<AppContent[T]>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      content: {
        hero: {
          title: 'Share, Participate in<br>Pet Contest and<br><em>Meet Pet</em>Professionals',
          subtitle: 'The unique all-in-one pet community where you share, compete, shop, book services & contests.',
          mediaUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80',
          mediaType: 'image',
        },
        features: {
          title1: 'Free Pet Adoption Listings',
          desc1: 'List your pets for adoption at zero cost. Connect with loving families ready to give them a forever home.',
          img1: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
          title2: 'Meet Pet Professionals',
          desc2: 'Vets, groomers, trainers, and nutritionists. Access their ocean of experience when you need it most.',
          img2: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=600&q=80',
          title3: 'Join & Win Pet Contests',
          desc3: 'Enter your pet in weekly photo and video contests. Win amazing prizes and community recognition.',
          img3: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80',
          title4: 'Pet Product Marketplace',
          desc4: 'Buy and sell pet food, toys, accessories, and more — all vetted for quality and pet safety.',
          img4: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=600&q=80',
        },
        contest: {
          title: 'Your Pet Could Be<br>Our Next Champion',
          desc: 'Every week we run fun, themed contests for dogs, cats, birds, reptiles and more. Enter with a photo or video and let the community vote!',
          mediaUrl: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=900&q=80',
        },
        marketplace: {
          title: 'Buy & Sell Pet<br>Related Products',
          desc: "A curated marketplace where pet lovers buy and sell pet's needs trusted by all users.",
          mediaUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80',
        },
      },
      updateContent: (updates) =>
        set((state) => ({
          content: { ...state.content, ...updates },
        })),
      updateSection: (section, updates) =>
        set((state) => ({
          content: {
            ...state.content,
            [section]: { ...state.content[section], ...updates } as any,
          },
        })),
    }),
    {
      name: 'petsypetz-storage-revert-v1',
    }
  )
);
