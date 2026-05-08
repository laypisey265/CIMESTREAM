import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, QrCode, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { PricingTier } from '../lib/types';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: PricingTier | null;
  isYearly: boolean;
}

export default function PaymentModal({ isOpen, onClose, tier, isYearly }: PaymentModalProps) {
  const [method, setMethod] = useState<'visa' | 'khqr'>('visa');
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const { upgradeToPremium } = useAuth();

  if (!tier) return null;

  const price = isYearly ? (tier.price * 10).toFixed(2) : tier.price;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      upgradeToPremium();
      setStep('success');
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={step !== 'processing' ? onClose : undefined}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-card-bg rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(229,9,20,0.1)] border border-white/5"
          >
            {step !== 'processing' && (
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr]">
              {/* Order Summary Sidebar */}
              <div className="bg-white/5 p-8 space-y-8 border-r border-white/5">
                <div>
                  <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-4">Summary</h3>
                  <p className="text-2xl font-display italic tracking-tighter uppercase">{tier.name} Plan</p>
                  <p className="text-zinc-400 text-xs">Access to {tier.features[0]}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Price</span>
                    <span className="font-bold">${price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Tax</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-2xl font-display text-netflix-red">${price}</span>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                   <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-green-500" /> Secure SSL Connection
                   </div>
                </div>
              </div>

              {/* Payment Content */}
              <div className="p-8 md:p-12">
                {step === 'checkout' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-display uppercase italic tracking-tighter">Checkout</h2>
                      <p className="text-zinc-500 text-sm">Select your preferred payment method</p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setMethod('visa')}
                        className={cn(
                          "flex-1 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 group",
                          method === 'visa' ? "border-netflix-red bg-netflix-red/10" : "border-white/5 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <CreditCard className={cn(method === 'visa' ? "text-netflix-red" : "text-zinc-500 group-hover:text-white")} />
                        <span className="text-xs font-bold uppercase tracking-widest">Visa Card</span>
                      </button>
                      <button 
                        onClick={() => setMethod('khqr')}
                        className={cn(
                          "flex-1 p-4 rounded-xl border transition-all flex flex-col items-center gap-2 group",
                          method === 'khqr' ? "border-[#F5C518] bg-[#F5C518]/10" : "border-white/5 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <QrCode className={cn(method === 'khqr' ? "text-[#F5C518]" : "text-zinc-500 group-hover:text-white")} />
                        <span className="text-xs font-bold uppercase tracking-widest">KHQR Pay</span>
                      </button>
                    </div>

                    {method === 'visa' ? (
                      <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Card Number</label>
                           <input type="text" placeholder="**** **** **** ****" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 ring-netflix-red outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Expiry</label>
                             <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 ring-netflix-red outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">CVV</label>
                             <input type="password" placeholder="***" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 ring-netflix-red outline-none" />
                          </div>
                        </div>
                        <button 
                          onClick={handlePayment}
                          className="w-full bg-netflix-red py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-2"
                        >
                          Confirm & Pay ${price} <ArrowRight size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6 flex flex-col items-center py-4 animate-in slide-in-from-bottom-2 duration-300">
                         <div className="p-4 bg-white rounded-2xl shadow-2xl">
                            <div className="w-56 h-56 bg-zinc-100 flex items-center justify-center relative overflow-hidden rounded-xl">
                               <img 
                                 src="/src/assets/images/regenerated_image_1778220976944.jpg" 
                                 alt="KHQR Code" 
                                 className="w-full h-full object-cover"
                                 referrerPolicy="no-referrer"
                               />
                               {/* Mock scan line animation */}
                               <motion.div 
                                 animate={{ top: ['0%', '100%'] }}
                                 transition={{ duration: 2, repeat: Infinity }}
                                 className="absolute left-0 w-full h-0.5 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] blur-sm"
                               />
                            </div>
                         </div>
                         <div className="text-center space-y-2">
                           <p className="font-bold text-white flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Waiting for scan
                           </p>
                           <p className="text-xs text-zinc-500 max-w-[200px]">Scan this KHQR with your banking app to complete payment instantly.</p>
                         </div>
                         <button 
                          onClick={handlePayment}
                          className="w-full bg-[#F5C518] text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          Simulate QR Scan
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {step === 'processing' && (
                  <div className="h-full flex flex-col items-center justify-center space-y-6 py-20 text-center animate-in fade-in duration-500">
                    <div className="relative">
                       <Loader2 size={80} className="text-netflix-red animate-spin" />
                       <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-10 h-10 bg-netflix-red/20 rounded-full animate-ping"></div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-2xl font-display uppercase italic tracking-tighter">Processing Payment</h3>
                       <p className="text-zinc-500 text-sm max-w-xs">Connecting to secure gateway. Please do not refresh the page.</p>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="h-full flex flex-col items-center justify-center space-y-8 py-20 text-center animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-bounce">
                       <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-4xl font-display uppercase italic tracking-tighter">Payment Success!</h3>
                       <p className="text-zinc-300 max-w-xs mx-auto">Welcome to CineStream Premium. Your account has been upgraded and is ready for 4K streaming.</p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="bg-white text-black px-12 py-4 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all"
                    >
                      Start Watching Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
