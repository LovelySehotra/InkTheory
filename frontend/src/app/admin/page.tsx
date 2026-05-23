'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, Check, X, CheckSquare, Trash, Mail, Eye, Activity } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  artistId: string;
  description: string;
  placement: string;
  size: string;
  preferredDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  referenceImage?: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries'>('bookings');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const bookingsRes = await axios.get('http://localhost:5001/bookings');
      setBookings(bookingsRes.data);

      const inquiriesRes = await axios.get('http://localhost:5001/contact');
      setInquiries(inquiriesRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') => {
    try {
      await axios.patch(`http://localhost:5001/bookings/${id}/status`, { status });
      // Update local state
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert('Failed to update booking status');
    }
  };

  // Stats computation
  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;
  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const completedCount = bookings.filter((b) => b.status === 'COMPLETED').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
            Admin Dashboard
          </h1>
          <p className="text-text-muted text-sm font-sans mt-2">
            Monitor client consultations, confirm appointments, and read incoming studio inquiries.
          </p>
        </div>
        <button
          onClick={fetchAdminData}
          className="bg-white/5 hover:bg-white/10 text-foreground text-xs uppercase tracking-widest font-semibold border border-white/10 px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <Activity className="w-4 h-4 text-accent" />
          Refresh Feed
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
            Pending Reviews
          </span>
          <h3 className="font-serif text-3xl font-bold text-accent mt-2">{pendingCount}</h3>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
            Confirmed Sessions
          </span>
          <h3 className="font-serif text-3xl font-bold text-white mt-2">{confirmedCount}</h3>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
            Completed Works
          </span>
          <h3 className="font-serif text-3xl font-bold text-emerald-400 mt-2">{completedCount}</h3>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
            General Inquiries
          </span>
          <h3 className="font-serif text-3xl font-bold text-sky-400 mt-2">{inquiries.length}</h3>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/5 gap-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-4 text-sm font-serif tracking-widest uppercase relative font-bold cursor-pointer transition-colors duration-300 ${
            activeTab === 'bookings' ? 'text-white' : 'text-text-muted hover:text-white'
          }`}
        >
          Bookings ({bookings.length})
          {activeTab === 'bookings' && (
            <motion.span
              layoutId="adminActiveTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-4 text-sm font-serif tracking-widest uppercase relative font-bold cursor-pointer transition-colors duration-300 ${
            activeTab === 'inquiries' ? 'text-white' : 'text-text-muted hover:text-white'
          }`}
        >
          General Inquiries ({inquiries.length})
          {activeTab === 'inquiries' && (
            <motion.span
              layoutId="adminActiveTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
            />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {loading ? (
        <div className="text-center py-20 text-text-muted text-sm font-sans animate-pulse">
          Loading dashboard metrics...
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {activeTab === 'bookings' && (
            <div className="flex flex-col gap-6">
              {bookings.length === 0 ? (
                <div className="text-center py-20 glass rounded-3xl border border-white/5 text-text-muted text-sm font-sans">
                  No bookings received yet.
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="glass p-6 rounded-3xl border border-white/5 flex flex-col lg:flex-row justify-between gap-6 hover:border-white/10 transition-colors duration-300"
                  >
                    {/* Details Column */}
                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-serif text-lg font-bold text-white uppercase tracking-wide">
                          {booking.name}
                        </span>
                        <span
                          className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                            booking.status === 'PENDING'
                              ? 'bg-accent/10 border-accent/20 text-accent'
                              : booking.status === 'CONFIRMED'
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                              : booking.status === 'COMPLETED'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : 'bg-white/5 border-white/10 text-text-muted'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans text-text-muted">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>Pref. Date: {new Date(booking.preferredDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-accent" />
                          <span>Artist: {booking.artistId === 'any' ? 'First Available' : booking.artistId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-accent" />
                          <span>Size/Loc: {booking.placement} ({booking.size})</span>
                        </div>
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm text-foreground/90 font-sans leading-relaxed">
                        <strong className="block text-[10px] uppercase text-text-muted tracking-wider mb-1">
                          Concept Idea:
                        </strong>
                        {booking.description}
                      </div>

                      {/* References display */}
                      {booking.referenceImage && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase text-text-muted tracking-wider font-semibold">
                            Uploaded reference image:
                          </span>
                          <a
                            href={booking.referenceImage}
                            target="_blank"
                            rel="noreferrer"
                            className="w-32 h-20 relative rounded-xl overflow-hidden border border-white/10 hover:border-accent transition-all duration-300 block"
                          >
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url('${booking.referenceImage}')` }}
                            />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Actions Column */}
                    <div className="flex flex-row lg:flex-col justify-end lg:justify-center items-center gap-3 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6 flex-shrink-0">
                      {booking.status === 'PENDING' && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                          className="bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold tracking-widest uppercase px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          Confirm
                        </button>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                          className="bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold tracking-widest uppercase px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                          <CheckSquare className="w-4 h-4" />
                          Complete
                        </button>
                      )}
                      {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-foreground text-xs font-bold tracking-widest uppercase px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer hover:border-accent hover:text-accent"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="flex flex-col gap-6">
              {inquiries.length === 0 ? (
                <div className="text-center py-20 glass rounded-3xl border border-white/5 text-text-muted text-sm font-sans">
                  No inquiries received yet.
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-4 hover:border-white/10 transition-colors duration-300"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        <span className="font-serif text-sm font-bold uppercase text-white tracking-wider">
                          {inquiry.name} ({inquiry.email})
                        </span>
                      </div>
                      <span className="text-[10px] font-sans text-text-muted">
                        Received: {new Date(inquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 font-sans leading-relaxed whitespace-pre-line">
                      {inquiry.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
