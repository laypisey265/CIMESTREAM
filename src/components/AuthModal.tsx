import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, name || 'Member');
    } else {
      register(email, name);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-card-bg rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-10 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-display uppercase italic tracking-tighter">
                  {isLogin ? 'Welcome Back' : 'Join the Elite'}
                </h2>
                <p className="text-zinc-500 text-sm">
                  {isLogin ? 'Continue your cinematic journey' : 'Start your 7-day free trial today'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-netflix-red transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 ring-netflix-red transition-all"
                    />
                  </div>
                )}
                
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-netflix-red transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 ring-netflix-red transition-all"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-netflix-red transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="Password"
                    required
                    className="w-full bg-white/5 border border-white/10 px-12 py-4 rounded-xl focus:outline-none focus:ring-2 ring-netflix-red transition-all"
                  />
                </div>

                <button className="w-full bg-netflix-red py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-900/20">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest">
                  <span className="bg-card-bg px-4 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                  <Chrome size={18} /> <span className="text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                  <Github size={18} /> <span className="text-sm font-medium">GitHub</span>
                </button>
              </div>

              <p className="text-center text-sm text-zinc-500">
                {isLogin ? "Don't have an account?" : "Already a member?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-white font-bold hover:text-netflix-red transition-colors"
                >
                  {isLogin ? 'Register now' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
