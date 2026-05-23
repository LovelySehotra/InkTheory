'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Star, ChevronDown, Award, HelpCircle, PhoneCall } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/config';

interface Artist {
  id: string;
  name: string;
  specialty: string[];
  image: string;
  experience: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Fallback Mock data in case backend is offline
  const fallbackArtists = [
    {
      id: '1',
      name: 'Marcus Thorne',
      specialty: ['Realism', 'Blackwork'],
      experience: '12 Years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      name: 'Elena Rostova',
      specialty: ['Anime', 'Minimal'],
      experience: '6 Years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      name: 'Kai Tanaka',
      specialty: ['Traditional', 'Geometric'],
      experience: '9 Years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const fallbackGallery = [
    {
      id: '1',
      title: 'Hyperrealistic Lion Portrait',
      category: 'Realism',
      image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      title: 'Neon Cyberpunk Samurai',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      title: 'Constellation & Lunar Cycles',
      category: 'Minimal',
      image: 'https://images.unsplash.com/photo-1590246814883-57c511e76533?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '4',
      title: 'Ornamental Dark Mandala Sleeve',
      category: 'Blackwork',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsRes = await axios.get(API_ENDPOINTS.artists);
        setArtists(artistsRes.data.length > 0 ? artistsRes.data : fallbackArtists);
      } catch (err) {
        console.warn('Backend offline, using fallback artists.');
        setArtists(fallbackArtists);
      }

      try {
        const galleryRes = await axios.get(API_ENDPOINTS.gallery);
        setGallery(galleryRes.data.length > 0 ? galleryRes.data.slice(0, 4) : fallbackGallery);
      } catch (err) {
        console.warn('Backend offline, using fallback gallery.');
        setGallery(fallbackGallery);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: 'Award-Winning Resident Artists',
      description: 'Our resident artists are recognized worldwide for their precision and distinct tattooing styles.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: 'Bespoke Luxury Experience',
      description: 'Enjoy private rooms, premium snacks, movie streaming, and a high-end, comfortable studio atmosphere.',
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: 'Medical-Grade Sterilization',
      description: 'We follow hospital-grade sterilization protocols. Your safety and health are our absolute priority.',
    },
  ];

  const testimonials = [
    {
      name: 'Alexander V.',
      role: 'Sleeve Collector',
      text: 'Marcus took my messy story and turned it into a breathtaking realism backpiece. The private room and premium hospitality made a 6-hour session feel like a spa visit.',
      rating: 5,
    },
    {
      name: 'Serena M.',
      role: 'Fine Line Collector',
      text: 'Elena has the gentlest touch. The studio rules are strictly followed, the place is cleaner than a clinic, and my minimalist wildflower tattoo healed perfectly in just 10 days.',
      rating: 5,
    },
    {
      name: 'Dr. Johnathan K.',
      role: 'Geometric Client',
      text: 'The geometric sleeves by Kai are mathematical perfection. Ink Theory is a luxury brand in every sense—from initial consultation to final wash.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'How do I estimate the price of my tattoo?',
      answer: 'Our studio minimum is $100. The final price depends on size, placement, design complexity, and the hourly rate of the artist. The best way to get an estimate is by booking a free consultation through our booking form.',
    },
    {
      question: 'Does getting a tattoo hurt?',
      answer: 'Pain levels vary depending on the location. Placements over bone (ribs, spine, ankles) are more sensitive than muscle-heavy areas (arms, thighs). Our artists work at your pace, and we offer high-end numbing options upon request.',
    },
    {
      question: 'What is the booking and reservation process?',
      answer: 'Once you fill out our online consultation form, our manager will review your idea, estimate the hours needed, match you with the best-fit artist, and email you dates to reserve. A refundable deposit is required to lock in the date.',
    },
    {
      question: 'What are your sterilization and safety protocols?',
      answer: 'We utilize 100% single-use needles, disposable tubes, and medical-grade barriers. All stations are disinfected with hospital-grade virucides before and after every client. We are fully licensed and certified.',
    },
  ];

  return (
    <div className="flex flex-col gap-24">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-12">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 12, 0.4), rgba(11, 11, 12, 0.95)), url('https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=1920')`,
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <span className="font-sans text-xs md:text-sm tracking-widest text-accent uppercase font-bold">
              EST. 2020 • THE ART OF PERMANENCE
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-foreground uppercase">
              Your Story.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent">
                Inked Forever.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed font-sans"
          >
            Experience the pinnacle of custom tattooing in a state-of-the-art, luxury studio environment. Master craftsmanship meets private, high-end hospitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6"
          >
            <Link
              href="/booking"
              className="bg-accent hover:bg-accent-hover text-white font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-accent/20 cursor-pointer"
            >
              Book Consultation
            </Link>
            <a
              href="https://wa.me/15550192831"
              target="_blank"
              rel="noreferrer"
              className="glass hover:bg-white/10 text-foreground font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-accent" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-text-muted flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest">Explore Studio</span>
            <ChevronDown className="w-4 h-4 text-accent" />
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">
            Redefining Tattoo Luxury
          </h2>
          <div className="w-20 h-1 bg-accent" />
          <p className="text-text-muted text-sm md:text-base max-w-xl">
            We provide a sterile, comfortable, and personalized canvas. We don't just tattoo; we design custom legacies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass p-8 rounded-2xl flex flex-col gap-4 border border-white/5 hover:border-accent/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                {feat.icon}
              </div>
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-foreground">
                {feat.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed font-sans">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED ARTISTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">
              The Master Artists
            </h2>
            <div className="w-20 h-1 bg-accent" />
          </div>
          <Link
            href="/artists"
            className="text-accent hover:text-accent-hover text-sm tracking-wider uppercase font-semibold flex items-center gap-1 transition-colors duration-300"
          >
            Meet All Artists →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${artist.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8" />
              
              <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-accent uppercase bg-accent/10 w-fit px-3 py-1 rounded-full border border-accent/20">
                  {artist.experience} Experience
                </span>
                <h3 className="font-serif text-2xl font-bold uppercase text-white tracking-wider">
                  {artist.name}
                </h3>
                <p className="text-sm text-foreground/80 font-sans">
                  {artist.specialty.join(' • ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">
              Selected Works
            </h2>
            <div className="w-20 h-1 bg-accent" />
          </div>
          <Link
            href="/gallery"
            className="text-accent hover:text-accent-hover text-sm tracking-wider uppercase font-semibold flex items-center gap-1 transition-colors duration-300"
          >
            View Gallery Grid →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[300px] rounded-xl overflow-hidden border border-white/5 shadow-xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex flex-col gap-1 z-10">
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold uppercase text-white tracking-wider">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">
            Client Testimonials
          </h2>
          <div className="w-20 h-1 bg-accent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl border border-white/5 flex flex-col gap-4 relative justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 text-sm leading-relaxed italic font-sans">
                  "{test.text}"
                </p>
              </div>
              <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-4">
                <span className="font-serif text-sm font-bold tracking-wider text-foreground">
                  {test.name}
                </span>
                <span className="text-xs text-text-muted">{test.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 w-full">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-accent" />
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl border border-white/5 overflow-hidden"
            >
              <details className="group">
                <summary className="flex items-center justify-between p-6 text-base font-bold uppercase tracking-wider text-foreground cursor-pointer list-none select-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-accent" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-text-muted group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-sm text-text-muted leading-relaxed font-sans border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 w-full mb-12">
        <div
          className="relative rounded-3xl overflow-hidden py-16 px-8 md:px-16 text-center flex flex-col items-center gap-6 border border-white/5 shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-wide">
            Ready to Begin Your Story?
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-xl leading-relaxed font-sans">
            Consultations are free, and there is no obligation. Describe your idea and let us map it out.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
            <Link
              href="/booking"
              className="bg-accent hover:bg-accent-hover text-white font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book Now
            </Link>
            <a
              href="https://wa.me/15550192831"
              target="_blank"
              rel="noreferrer"
              className="glass hover:bg-white/10 text-foreground font-sans text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-xl shadow-xl transition-all duration-300 cursor-pointer"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
