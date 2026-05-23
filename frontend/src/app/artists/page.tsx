'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/config';
import Link from 'next/link';

interface Artist {
  id: string;
  name: string;
  bio: string;
  specialty: string[];
  instagram?: string;
  experience: string;
  image: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const fallbackArtists = [
    {
      id: '1',
      name: 'Marcus Thorne',
      bio: 'Marcus Thorne is a master of contrast and anatomical accuracy, bringing over 12 years of professional experience to Ink Theory. Specializing in hyper-realistic portraits and complex dark sleeves, Marcus works closely with clients to capture deep emotions and memories onto their skin with photographic precision.',
      specialty: ['Realism', 'Blackwork'],
      instagram: 'marcusthorne_ink',
      experience: '12 Years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      name: 'Elena Rostova',
      bio: 'Elena began her artistic career in illustrative design and painting before transitioning to tattooing 6 years ago. Known for her flawless fine lines, whimsical pop-culture, and pastel colored anime scenes, she can turn any illustration or anime character into a permanent, vibrant piece of high-end art.',
      specialty: ['Anime', 'Minimal'],
      instagram: 'elena_ink_art',
      experience: '6 Years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      name: 'Kai Tanaka',
      bio: 'Kai combines mathematical precision with ancient traditional motifs. With 9 years of experience traversing tattooing styles in Tokyo and Berlin, Kai specializes in sacred geometry, heavy solid black inkpacking, and traditional American and Japanese blockwork that flows gracefully along the body\'s natural lines.',
      specialty: ['Traditional', 'Geometric', 'Blackwork'],
      instagram: 'kai_tanaka_tattoo',
      experience: '9 Years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    },
  ];

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.artists);
        setArtists(res.data.length > 0 ? res.data : fallbackArtists);
      } catch (err) {
        console.warn('Backend offline, using fallback artists data.');
        setArtists(fallbackArtists);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="font-sans text-xs md:text-sm tracking-widest text-accent uppercase font-bold">
          Resident Master Artisans
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-wide">
          Meet Our Artists
        </h1>
        <div className="w-24 h-1 bg-accent" />
        <p className="text-text-muted text-sm md:text-base max-w-2xl leading-relaxed">
          At Ink Theory, we host world-class creators specializing in distinct tattoo practices. Browse their profiles, specialties, and connect to select your artist.
        </p>
      </div>

      {/* Artists Listing */}
      <div className="flex flex-col gap-20">
        {artists.map((artist, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Photo Frame */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-750 group-hover:scale-105"
                    style={{ backgroundImage: `url('${artist.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 z-10 glass border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent fill-accent animate-pulse" />
                    <span className="text-xs uppercase tracking-widest font-semibold text-white">
                      {artist.experience} Exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Details */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-wider text-foreground">
                    {artist.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {artist.specialty.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs font-semibold tracking-wider uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-text-muted text-base leading-relaxed font-sans">
                  {artist.bio}
                </p>

                {/* Socials / Action */}
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
                  {artist.instagram && (
                    <a
                      href={`https://instagram.com/${artist.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-300 font-sans text-sm tracking-wider uppercase font-semibold"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      @{artist.instagram}
                    </a>
                  )}

                  <Link
                    href={`/booking?artist=${encodeURIComponent(artist.name)}`}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-sans text-xs font-bold tracking-widest uppercase shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Request Booking
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
