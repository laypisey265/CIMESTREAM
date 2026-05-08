import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-white/5 py-16 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-netflix-red font-display text-3xl">CINESTREAM</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The world's premium destination for cinematic storytelling. Experience movies as they were meant to be seen.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Youtube size={18} />} />
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Explore</h3>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><FooterLink label="Most Popular" /></li>
            <li><FooterLink label="New Releases" /></li>
            <li><FooterLink label="Award Winners" /></li>
            <li><FooterLink label="Original Series" /></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><FooterLink label="Help Center" /></li>
            <li><FooterLink label="Terms of Use" /></li>
            <li><FooterLink label="Privacy Policy" /></li>
            <li><FooterLink label="Cookie Preferences" /></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-white font-bold">Newsletter</h3>
          <p className="text-zinc-400 text-sm">Get the weekly scoop on new arrivals and trailers.</p>
          <div className="flex overflow-hidden rounded-sm ring-1 ring-white/10 focus-within:ring-netflix-red transition-all">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white/5 border-none px-4 py-2 text-sm flex-1 focus:outline-none"
            />
            <button className="bg-netflix-red px-4 hover:bg-red-700 transition-colors">
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs">
        <p>© 2024 CineStream Premium. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Audio Description</a>
          <a href="#" className="hover:text-white transition-colors">Investor Relations</a>
          <a href="#" className="hover:text-white transition-colors">Legal Notices</a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-netflix-red hover:text-white transition-all text-zinc-400">
      {icon}
    </a>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a href="#" className="hover:text-netflix-red hover:translate-x-1 transition-all inline-block">
      {label}
    </a>
  );
}
