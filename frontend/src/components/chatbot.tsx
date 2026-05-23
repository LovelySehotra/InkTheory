'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! Welcome to Ink Theory Tattoo Studio. I'm your AI tattoo assistant. I can answer questions about pricing, pain levels, healing times, aftercare, or help you start a booking consultation. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // API call to our backend ChatbotController
      const response = await axios.post('http://localhost:5001/chatbot/message', {
        message: userMsg,
        history: messages,
      });

      const reply = response.data.response;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chatbot API error:', err);
      // Fallback message in case backend is offline
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having a connection issue, but here is a quick answer: For pricing, aftercare, or scheduling, please click the 'Book Consultation' page to fill out our questionnaire, or send us a WhatsApp message directly! We would love to chat.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-foreground flex items-center justify-center shadow-2xl cursor-pointer focus:outline-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="absolute bottom-16 right-0 w-[350px] md:w-[400px] h-[500px] rounded-2xl glass border border-white/10 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-card-bg/80 border-b border-white/5 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-wider text-foreground">INK THEORY ASSISTANT</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-accent/10 text-accent' : 'bg-white/5 text-foreground/80'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-tr-none'
                        : 'bg-white/5 text-foreground/90 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-white/5 text-foreground/80 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 text-foreground/90 border border-white/5 rounded-2xl rounded-tl-none p-3 flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-card-bg/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about care, pricing, pain..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-accent/50"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-accent hover:bg-accent-hover text-white flex items-center justify-center flex-shrink-0 transition-colors duration-300 cursor-pointer"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
