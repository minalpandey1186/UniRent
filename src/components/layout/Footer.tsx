import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E5E8EF] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#3157C8] flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <span className="font-bold text-base text-[#202938]">UniRent</span>
            </div>
            <p className="text-xs text-[#687386] leading-relaxed">
              Peer-to-peer campus rental marketplace. Rent what you need, share what you own, save money, and build sustainable campus communities.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#16845B]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Student Community</span>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#202938] uppercase tracking-wider mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-[#687386]">
              <li>
                <Link to="/marketplace?category=Electronics" className="hover:text-[#3157C8] transition-colors">
                  Electronics & Displays
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Academic" className="hover:text-[#3157C8] transition-colors">
                  Calculators & Lab Gear
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Photography" className="hover:text-[#3157C8] transition-colors">
                  Cameras & Production
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Books" className="hover:text-[#3157C8] transition-colors">
                  Textbooks & Course Materials
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Sports" className="hover:text-[#3157C8] transition-colors">
                  Sports & Outdoor Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Hub */}
          <div>
            <h4 className="text-xs font-semibold text-[#202938] uppercase tracking-wider mb-3">
              Student Hub
            </h4>
            <ul className="space-y-2 text-xs text-[#687386]">
              <li>
                <Link to="/create-listing" className="hover:text-[#3157C8] transition-colors">
                  List Your Items
                </Link>
              </li>
              <li>
                <Link to="/my-rentals" className="hover:text-[#3157C8] transition-colors">
                  Active Rentals & Bookings
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="hover:text-[#3157C8] transition-colors">
                  Transaction & Escrow Logs
                </Link>
              </li>
              <li>
                <Link to="/disputes" className="hover:text-[#3157C8] transition-colors">
                  Dispute Resolution Center
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-[#3157C8] transition-colors">
                  Account & Testnet Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Security Notice */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-[#202938] uppercase tracking-wider">
              Technical Notice
            </h4>
            <div className="p-3 bg-slate-50 border border-[#E5E8EF] rounded-lg text-[11px] text-[#687386] leading-relaxed">
              <p className="font-medium text-[#202938] mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#3157C8]" />
                Prototype Frontend
              </p>
              Smart contract escrow, MST Blockchain payments, and real-time backend synchronization will be integrated in subsequent milestones.
            </div>
            <p className="text-[11px] text-[#687386]">
              Security deposits are simulated via frontend escrow states.
            </p>
          </div>
        </div>

        <div className="border-t border-[#E5E8EF] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#687386]">
          <p>© {new Date().getFullYear()} UniRent Platform. Designed for college students.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-[#202938] cursor-pointer">Campus Terms</span>
            <span className="hover:text-[#202938] cursor-pointer">Rental Policy</span>
            <span className="hover:text-[#202938] cursor-pointer">Deposit Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
