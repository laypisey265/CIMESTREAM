import React, { useState } from 'react';
import { Check, X, Calendar, Clock, Play } from 'lucide-react';
import { pricingTiers } from '../lib/data';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { PricingTier } from '../lib/types';

interface PricingProps {
  onPlanSelect: (tier: PricingTier, isYearly: boolean) => void;
  onAuthNeeded: () => void;
}

export default function Pricing({ onPlanSelect, onAuthNeeded }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();

  const handleAction = (tier: PricingTier) => {
    if (!user) {
      onAuthNeeded();
      return;
    }
    onPlanSelect(tier, isYearly);
  };

  return (
    <section className="py-24 px-10 relative overflow-hidden" id="pricing">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-netflix-red/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto text-center space-y-6 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-display uppercase italic tracking-tighter"
        >
          Choose Your <span className="text-netflix-red">Experience</span>
        </motion.h2>
        
        <div className="flex items-center justify-center gap-4">
          <span className={cn("text-sm transition-colors", !isYearly ? "text-white" : "text-zinc-500")}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-7 bg-zinc-800 rounded-full relative p-1 transition-all"
          >
            <motion.div 
              animate={{ x: isYearly ? 28 : 0 }}
              className="w-5 h-5 bg-netflix-red rounded-full shadow-lg"
            />
          </button>
          <span className={cn("text-sm transition-colors", isYearly ? "text-white" : "text-zinc-500")}>Yearly</span>
          <span className="px-2 py-0.5 bg-gold text-black text-[10px] font-black rounded-full">Save 20%</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative p-10 rounded-2xl border transition-all duration-500 overflow-hidden",
              tier.isPopular ? "bg-zinc-900 border-netflix-red shadow-2xl scale-105 z-10" : "bg-card-bg border-white/5"
            )}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0 py-1.5 px-6 bg-netflix-red text-white text-[10px] font-black uppercase tracking-widest -rotate-0 rounded-bl-xl shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display">${isYearly ? (tier.price * 10).toFixed(2) : tier.price}</span>
                  <span className="text-zinc-500 text-sm">{isYearly ? '/year' : '/month'}</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check size={16} className="text-netflix-red" /> {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleAction(tier)}
                className={cn(
                  "w-full py-4 rounded-sm font-bold transition-all uppercase tracking-widest text-xs",
                  tier.isPopular ? "bg-netflix-red hover:bg-red-700 text-white" : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                )}
              >
                {user?.isPremium && tier.id !== 'basic' ? 'Manage Plan' : 'Start Free Trial'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto px-6">
        <TrustItem icon={<Calendar size={24} />} title="Cancel anytime" desc="No long-term contracts, just great movies." />
        <TrustItem icon={<Clock size={24} />} title="HD & 4K" desc="Breathtaking quality on all common devices." />
        <TrustItem icon={<Play size={24} />} title="Watch Everywhere" desc="TV, phone, tablet, or laptop - you name it." />
      </div>
    </section>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 group">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
