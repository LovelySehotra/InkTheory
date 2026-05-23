'use client';

import { useEffect, useState } from 'react';
import { motion as motionModule, AnimatePresence as AnimatePresenceModule } from 'framer-motion';
import { X, ZoomIn, Info } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/config';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  image: string;
  category: string;
  title: string;
  artistId?: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Realism', 'Anime', 'Minimal', 'Traditional', 'Blackwork', 'Geometric'];

  const fallbackGallery = [
    {
      id: '1',
      title: 'Hyperrealistic Lion Portrait',
      category: 'Realism',
      image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      title: 'Tiger Realism Shadow sleeve',
      category: 'Realism',
      image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      title: 'Neon Cyberpunk Samurai',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '4',
      title: 'Spirited Away Haku Dragon',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '5',
      title: 'Constellation & Lunar Cycles',
      category: 'Minimal',
      image: 'https://images.unsplash.com/photo-1590246814883-57c511e76533?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '6',
      title: 'Single Line Wildflower Bouquet',
      category: 'Minimal',
      image: 'https://images.unsplash.com/photo-1562967914-4c40bdd3c834?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '7',
      title: 'Classic American Dagger & Rose',
      category: 'Traditional',
      image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '8',
      title: 'Traditional Roaring Panther',
      category: 'Traditional',
      image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '9',
      title: 'Ornamental Dark Mandala Sleeve',
      category: 'Blackwork',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '10',
      title: 'Nordic Runes & Raven Blackwork',
      category: 'Blackwork',
      image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '11',
      title: 'Sacred Geometry Metatron Cube',
      category: 'Geometric',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '12',
      title: 'Abstract 3D Illusion Dotwork',
      category: 'Geometric',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
    },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const queryParams = selectedCategory !== 'All' ? `?category=${selectedCategory}` : '';
        const res = await axios.get(`${API_ENDPOINTS.gallery}${queryParams}`);
        setItems(res.data.length > 0 ? res.data : fallbackGallery.filter(item => selectedCategory === 'All' || item.category === selectedCategory));
      } catch (err) {
        console.warn('Backend offline, using local fallback gallery data.');
        setItems(fallbackGallery.filter(item => selectedCategory === 'All' || item.category === selectedCategory));
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="font-sans text-xs md:text-sm tracking-widest text-accent uppercase font-bold">
          STUDIO PORTFOLIO
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-wide">
          Tattoo Gallery
        </h1>
        <div className="w-24 h-1 bg-accent" />
        <p className="text-text-muted text-sm md:text-base max-w-xl">
          A showcase of our master craftsmanship, intricate lines, and bold concepts categorized by style.
        </p>
      </div>

      {/* Categories chips filter */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
              selectedCategory === category
                ? 'bg-accent border-accent text-white shadow-lg shadow-accent/25'
                : 'bg-white/5 border-white/5 text-text-muted hover:border-white/10 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <motionModule.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresenceModule mode="popLayout">
          {items.map((item) => (
            <motionModule.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 cursor-pointer shadow-xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform duration-300" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 px-2 py-0.5 rounded-full w-fit border border-accent/20">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold uppercase text-white tracking-wider">
                  {item.title}
                </h3>
              </div>
            </motionModule.div>
          ))}
        </AnimatePresenceModule>
      </motionModule.div>

      {/* Lightbox Modal */}
      <AnimatePresenceModule>
        {selectedItem && (
          <motionModule.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            {/* Modal Box */}
            <motionModule.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-card-bg/60 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl glass"
            >
              {/* Image Frame */}
              <div className="w-full md:w-3/5 aspect-square md:aspect-auto md:h-[550px] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedItem.image}')` }}
                />
              </div>

              {/* Info sidebar */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between gap-8 bg-card-bg/30">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 text-foreground/75 hover:text-accent transition-colors duration-300 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col gap-4 mt-4">
                  <span className="text-xs font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full w-fit">
                    {selectedItem.category}
                  </span>
                  <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-white">
                    {selectedItem.title}
                  </h2>
                  <div className="h-[1px] bg-white/5 w-full my-2" />
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Info className="w-4 h-4 text-accent" />
                    <span>Fine art tattoo crafted in Ink Theory studio by a certified master artist.</span>
                  </div>
                </div>

                <Link
                  href={`/booking?reference=${encodeURIComponent(selectedItem.image)}`}
                  className="bg-accent hover:bg-accent-hover text-white text-center py-4 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Book with this style
                </Link>
              </div>
            </motionModule.div>
          </motionModule.div>
        )}
      </AnimatePresenceModule>
    </div>
  );
}
