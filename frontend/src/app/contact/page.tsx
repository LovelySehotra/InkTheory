'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await axios.post('http://localhost:5001/contact', data);
      setSuccess(true);
      reset();
    } catch (err: any) {
      console.error('Contact form submission failed', err);
      setSubmitError(
        err.response?.data?.message || 'We could not submit your inquiry. Please try again or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const details = [
    {
      icon: <MapPin className="w-5 h-5 text-accent" />,
      title: 'Our Location',
      info: '101 Luxury Row, Design District, Los Angeles, CA 90021',
    },
    {
      icon: <Phone className="w-5 h-5 text-accent" />,
      title: 'Phone Number',
      info: '+1 (555) 019-2831',
    },
    {
      icon: <Mail className="w-5 h-5 text-accent" />,
      title: 'Email Address',
      info: 'studio@inktheory.com',
    },
    {
      icon: <Clock className="w-5 h-5 text-accent" />,
      title: 'Opening Hours',
      info: 'Mon - Sat: 12 PM - 8 PM (Sunday: By Appointment)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <span className="font-sans text-xs md:text-sm tracking-widest text-accent uppercase font-bold">
          Get In Touch
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-wide">
          Contact The Studio
        </h1>
        <div className="w-24 h-1 bg-accent" />
        <p className="text-text-muted text-sm md:text-base max-w-xl">
          Have general questions about procedures, scheduling or artist availability? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Contact Info & Map */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {details.map((det, index) => (
              <div
                key={index}
                className="glass p-6 rounded-2xl border border-white/5 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  {det.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-serif text-xs font-bold tracking-wider uppercase text-white">
                    {det.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">{det.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Frame Mock */}
          <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/5 shadow-2xl glass">
            <div
              className="absolute inset-0 bg-cover bg-center filter grayscale opacity-80"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')`,
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent animate-bounce" />
                <span className="font-serif text-xs font-bold tracking-wider uppercase text-white">
                  Ink Theory Studio
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="glass p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col gap-6">
          <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-white">
            Send General Inquiry
          </h3>
          <div className="h-[1px] bg-white/5 w-full" />

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl flex flex-col items-center text-center gap-3"
            >
              <CheckCircle className="w-10 h-10" />
              <h4 className="font-serif font-bold uppercase tracking-wider text-white text-sm">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-text-muted leading-relaxed max-w-xs font-sans">
                Thank you for contacting us. One of our managers will email you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-xs font-bold tracking-widest uppercase text-accent hover:underline cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kate Moss"
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
                  placeholder="e.g. kate@example.com"
                  {...register('email')}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50"
                />
                {errors.email && <span className="text-xs text-accent">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Ask about details, session durations, aftercare policies..."
                  {...register('message')}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50 resize-none font-sans"
                />
                {errors.message && <span className="text-xs text-accent">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent-hover text-white text-center py-4 rounded-xl font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/15"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
