import React, { useState, useEffect } from 'react';
import { reviews } from '../lib/data';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            <StatItem number="10M+" label="Global Members" />
            <StatItem number="50K+" label="Premium Titles" />
            <StatItem number="4K" label="Ultra HD HDR" />
            <StatItem number="99.9%" label="Uptime Guarantee" />
          </div>

          {/* Testimonials */}
          <div className="relative">
             <div className="absolute -top-12 -left-12 text-[12rem] font-display text-white/5 leading-none pointer-events-none">"</div>
            
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.5 }}
                 className="space-y-8 relative z-10"
               >
                 <div className="flex gap-1 text-gold">
                   {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                     <Star key={i} size={20} fill="currentColor" />
                   ))}
                 </div>
                 <p className="text-3xl font-light italic leading-relaxed text-zinc-200">
                   "{reviews[activeIndex].quote}"
                 </p>
                 <div className="flex items-center gap-4">
                   <img src={reviews[activeIndex].avatar} alt="" className="w-14 h-14 rounded-full border-2 border-netflix-red" />
                   <div>
                     <h4 className="font-bold text-white">{reviews[activeIndex].name}</h4>
                     <p className="text-zinc-500 text-sm">Verified Member</p>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
             
             <div className="flex gap-2 mt-12">
               {reviews.map((_, i) => (
                 <button 
                   key={i}
                   onClick={() => setActiveIndex(i)}
                   className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-10 bg-netflix-red' : 'w-4 bg-zinc-800'}`}
                 />
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="space-y-2 p-8 border border-white/5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
    >
      <h3 className="text-4xl md:text-5xl font-display italic text-gold tracking-tighter uppercase">{number}</h3>
      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}
