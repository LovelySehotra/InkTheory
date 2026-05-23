import Link from 'next/link';
import { Flame, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-accent" />
            <span className="font-serif text-xl font-bold tracking-widest text-foreground uppercase">
              Ink <span className="text-accent">Theory</span>
            </span>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed">
            Crafting premium custom tattoos that embody your personal story. Luxury atmosphere, exceptional artists, and absolute precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-foreground font-semibold tracking-wider uppercase mb-4 text-sm">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link>
            <Link href="/artists" className="hover:text-accent transition-colors duration-300">Artists</Link>
            <Link href="/gallery" className="hover:text-accent transition-colors duration-300">Gallery</Link>
            <Link href="/booking" className="hover:text-accent transition-colors duration-300">Book Consultation</Link>
            <Link href="/contact" className="hover:text-accent transition-colors duration-300">Contact</Link>
          </div>
        </div>

        {/* Studio Info */}
        <div>
          <h4 className="font-serif text-foreground font-semibold tracking-wider uppercase mb-4 text-sm">
            Studio Details
          </h4>
          <div className="flex flex-col gap-3 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <span>101 Luxury Row, Design District, LA</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              <span>+1 (555) 019-2831</span>
            </div>
          </div>
        </div>

        {/* Hours & Socials */}
        <div>
          <h4 className="font-serif text-foreground font-semibold tracking-wider uppercase mb-4 text-sm">
            Hours & Socials
          </h4>
          <div className="flex flex-col gap-3 text-sm text-text-muted mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>Mon - Sat: 12 PM - 8 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-transparent" />
              <span>Sunday: By Appointment Only</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent text-foreground transition-all duration-300"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://wa.me/15550192831"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent text-foreground transition-all duration-300"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted gap-4">
        <span>© {new Date().getFullYear()} Ink Theory Tattoo Studio. All Rights Reserved.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
