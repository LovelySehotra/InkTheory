'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, Image as ImageIcon, CheckCircle, Upload, AlertCircle } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  artistId: z.string().min(1, 'Please select an artist preference'),
  description: z.string().min(10, 'Please describe your design idea (minimum 10 characters)'),
  placement: z.string().min(1, 'Please specify placement on body'),
  size: z.string().min(1, 'Please choose a general size'),
  preferredDate: z.string().min(1, 'Please pick a preferred date'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [referenceUrl, setReferenceUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      artistId: 'any',
      size: 'Medium',
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setReferenceUrl(res.data.url);
    } catch (err) {
      console.error('File upload failed, using random tattoo placeholder', err);
      // Fail-safe default placeholder image URL in case Cloudinary/fs falls back
      setReferenceUrl('https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        ...data,
        referenceImage: referenceUrl || undefined,
      };

      const res = await axios.post('http://localhost:5001/bookings', payload);
      setSuccessData(res.data);
    } catch (err: any) {
      console.error('Booking submission failed', err);
      setSubmitError(
        err.response?.data?.message || 'We could not submit your request. Please try again or message us on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4"
        >
          <CheckCircle className="w-10 h-10" />
        </motion.div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide">
          Consultation Requested!
        </h1>
        <p className="text-text-muted text-base max-w-lg leading-relaxed font-sans">
          Thank you, <span className="text-white font-semibold">{successData.name}</span>. Your tattoo consultation has been recorded. Our studio manager will review your design idea and match details with the artist. We will email/call you within 24 hours.
        </p>

        {/* Booking Summary Box */}
        <div className="glass p-6 rounded-2xl w-full border border-white/5 text-left flex flex-col gap-3 mt-6">
          <div className="text-xs uppercase tracking-widest text-accent font-bold border-b border-white/5 pb-2">
            Request Reference ID: #{successData.id?.slice(0, 8) || 'PENDING'}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm font-sans text-text-muted mt-2">
            <div>
              <span className="block text-[10px] uppercase text-white/40">Artist Option</span>
              <span className="text-white font-medium capitalize">{successData.artistId === 'any' ? 'First Available' : 'Preferred Artist'}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-white/40">Placement & Size</span>
              <span className="text-white font-medium">{successData.placement} ({successData.size})</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-white/40">Preferred Date</span>
              <span className="text-white font-medium">{new Date(successData.preferredDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-white/40">Contact Email</span>
              <span className="text-white font-medium">{successData.email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSuccessData(null)}
          className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase mt-8 transition-colors duration-300"
        >
          Request Another Consultation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="font-sans text-xs md:text-sm tracking-widest text-accent uppercase font-bold">
          Free Consultation
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-wide">
          Book Consultation
        </h1>
        <div className="w-24 h-1 bg-accent" />
        <p className="text-text-muted text-sm md:text-base max-w-xl">
          Describe your vision, upload references, and submit. We will match you with the artist and send scheduled sessions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 bg-card-bg/25 border border-white/5 p-8 rounded-3xl glass shadow-2xl">
        {submitError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Section 1: Artist and Details */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            <span>1. Design Concept</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Artist Preference
              </label>
              <select
                {...register('artistId')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50"
              >
                <option value="any" className="bg-background">First Available Artist</option>
                <option value="Marcus Thorne" className="bg-background">Marcus Thorne (Realism & Blackwork)</option>
                <option value="Elena Rostova" className="bg-background">Elena Rostova (Anime & Minimal)</option>
                <option value="Kai Tanaka" className="bg-background">Kai Tanaka (Traditional & Geometric)</option>
              </select>
              {errors.artistId && <span className="text-xs text-accent">{errors.artistId.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Tattoo Size
              </label>
              <select
                {...register('size')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50"
              >
                <option value="Small" className="bg-background">Small (Fine Line, Micro, &lt; 5cm)</option>
                <option value="Medium" className="bg-background">Medium (Hand, forearm, &lt; 15cm)</option>
                <option value="Large" className="bg-background">Large (Sleeve, Chest, Backpiece)</option>
              </select>
              {errors.size && <span className="text-xs text-accent">{errors.size.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Placement on Body
              </label>
              <input
                type="text"
                placeholder="e.g. Inner forearm, Shoulder, Ribs"
                {...register('placement')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50"
              />
              {errors.placement && <span className="text-xs text-accent">{errors.placement.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Preferred Consultation Date
              </label>
              <input
                type="date"
                {...register('preferredDate')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50"
              />
              {errors.preferredDate && <span className="text-xs text-accent">{errors.preferredDate.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
              Describe Your Vision
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about the subject, meaning, style preferences, and elements you want included..."
              {...register('description')}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50 resize-none"
            />
            {errors.description && <span className="text-xs text-accent">{errors.description.message}</span>}
          </div>
        </div>

        {/* Section 2: Reference File Uploader */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-accent" />
            <span>2. Reference Images (Optional)</span>
          </h3>

          <div className="flex items-center gap-6">
            <label className="flex flex-col items-center justify-center w-full md:w-1/2 aspect-video rounded-2xl border border-dashed border-white/15 hover:border-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <Upload className={`w-8 h-8 text-text-muted mb-2 ${isUploading ? 'animate-bounce text-accent' : ''}`} />
                <p className="text-xs text-foreground font-semibold uppercase tracking-wider">
                  {isUploading ? 'Uploading file...' : 'Choose reference file'}
                </p>
                <p className="text-[10px] text-text-muted mt-1 font-sans">
                  PNG, JPG or JPEG up to 10MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {referenceUrl && (
              <div className="w-1/2 hidden md:block aspect-video relative rounded-2xl overflow-hidden border border-white/10">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${referenceUrl}')` }}
                />
              </div>
            )}
          </div>
          {referenceUrl && (
            <div className="text-xs text-emerald-400 font-sans flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-4 h-4" />
              <span>Reference image uploaded successfully!</span>
            </div>
          )}
        </div>

        {/* Section 3: Contact Details */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            <span>3. Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. David Beckham"
                {...register('name')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50"
              />
              {errors.name && <span className="text-xs text-accent">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. david@example.com"
                {...register('email')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50"
              />
              {errors.email && <span className="text-xs text-accent">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. +1 (555) 019-2831"
                {...register('phone')}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50"
              />
              {errors.phone && <span className="text-xs text-accent">{errors.phone.message}</span>}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white text-center py-4 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase mt-4 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-accent/15"
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? 'Submitting Form...' : 'Submit Consultation Request'}
        </button>
      </form>
    </div>
  );
}
