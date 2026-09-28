import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  PlusCircle,
  Search,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { ItemCard } from '../components/marketplace/ItemCard';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
  const items = StorageService.getItems();
  const featuredItems = items.filter((item) => item.featured).slice(0, 4);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="bg-white border border-[#E5E8EF] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#3157C8] border border-blue-200/50 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Campus Student Marketplace</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202938] leading-tight mb-4">
          Rent what you need. <br className="hidden sm:inline" />
          <span className="text-[#3157C8]">Share what you own.</span>
        </h1>

        <p className="text-base text-[#687386] max-w-2xl mx-auto leading-relaxed mb-8">
          UniRent connects college students directly with peers on campus. Rent calculators, lab equipment, camera gear, and textbooks for exams, projects, or weekend trips without paying retail prices.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/marketplace" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2">
              <Search className="w-4 h-4" />
              <span>Browse Items</span>
            </Button>
          </Link>
          <Link to="/create-listing" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
              <PlusCircle className="w-4 h-4 text-[#3157C8]" />
              <span>List an Item</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[#E5E8EF] text-left">
          <div className="p-3 bg-slate-50/70 rounded-lg">
            <p className="text-xs text-[#687386]">Target Audience</p>
            <p className="text-sm font-semibold text-[#202938]">Enrolled Students</p>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-lg">
            <p className="text-xs text-[#687386]">Deposit Protection</p>
            <p className="text-sm font-semibold text-[#202938]">Escrow Secured</p>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-lg">
            <p className="text-xs text-[#687386]">Pickup Method</p>
            <p className="text-sm font-semibold text-[#202938]">On-Campus Handover</p>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-lg">
            <p className="text-xs text-[#687386]">Payment Future</p>
            <p className="text-sm font-semibold text-[#202938]">MST Blockchain</p>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#202938]">Featured Campus Rentals</h2>
            <p className="text-xs text-[#687386] mt-0.5">
              Popular gear currently available for immediate handover on campus.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-semibold text-[#3157C8] hover:text-[#2446A8] inline-flex items-center gap-1"
          >
            <span>View All ({items.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Simple 3-step "How It Works" Section */}
      <section className="bg-white border border-[#E5E8EF] rounded-xl p-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-[#202938]">How UniRent Works</h2>
          <p className="text-xs text-[#687386] mt-1">
            A practical peer-to-peer system designed around academic schedules and campus safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-[#E5E8EF] bg-slate-50/50 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100/80 text-[#3157C8] flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-semibold text-sm text-[#202938]">Find and Reserve</h3>
            <p className="text-xs text-[#687386] leading-relaxed">
              Search by category or keyword. Select required rental dates and review the daily rate plus refundable security deposit.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#E5E8EF] bg-slate-50/50 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100/80 text-[#3157C8] flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-semibold text-sm text-[#202938]">Meet on Campus</h3>
            <p className="text-xs text-[#687386] leading-relaxed">
              Coordinate safe handover at university landmarks like student libraries, union lounges, or designated dorm study lobbies.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#E5E8EF] bg-slate-50/50 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100/80 text-[#3157C8] flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-semibold text-sm text-[#202938]">Return & Release Escrow</h3>
            <p className="text-xs text-[#687386] leading-relaxed">
              Return the item in its original condition. Once confirmed by the owner, your security deposit is instantly released from escrow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
