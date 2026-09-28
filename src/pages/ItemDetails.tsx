import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { PriceSummaryBox } from '../components/marketplace/PriceSummaryBox';
import { useToast } from '../components/common/ToastContext';
import { formatINR, FALLBACK_IMAGE } from '../utils/format';

export const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const item = StorageService.getItemById(id || '');

  // Calculate default dates: tomorrow to 3 days after tomorrow
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const defaultEnd = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  }, []);

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(defaultEnd);

  // Compute number of rental days
  const days = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  if (!item) {
    return (
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-12 text-center max-w-md mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-[#C94C4C] mx-auto mb-3" />
        <h2 className="text-lg font-bold text-[#202938]">Item Not Found</h2>
        <p className="text-xs text-[#687386] mt-1 mb-5">
          The requested rental item might have been unlisted or removed.
        </p>
        <Link to="/marketplace">
          <Button variant="secondary" size="sm">
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const handleProceedToBooking = () => {
    if (!item.isAvailable) {
      showToast('This item is currently rented out.', 'error');
      return;
    }
    navigate(`/checkout/${item.id}?start=${startDate}&end=${endDate}&days=${days}`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Item link copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Back button & Category Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#687386] hover:text-[#202938]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-[#687386] hover:text-[#202938] px-2.5 py-1 rounded-md border border-[#E5E8EF] bg-white hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Item</span>
        </button>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Image + Description + Terms (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Item Image */}
          <div className="bg-white border border-[#E5E8EF] rounded-2xl overflow-hidden shadow-xs">
            <div className="relative aspect-16/10 bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="neutral" className="bg-white/95 font-semibold">
                  {item.category}
                </Badge>
                <Badge variant="primary" className="bg-blue-50/95 font-semibold">
                  Condition: {item.condition}
                </Badge>
              </div>
            </div>
          </div>

          {/* Item Details Card */}
          <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h1 className="text-2xl font-bold text-[#202938]">{item.title}</h1>
                {item.isAvailable ? (
                  <Badge variant="success">Available</Badge>
                ) : (
                  <Badge variant="danger">Rented Out</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#687386]">
                <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Pickup Location: {item.location}</span>
              </div>
            </div>

            <div className="border-t border-[#E5E8EF] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938] mb-2">
                Description & Specifications
              </h3>
              <p className="text-sm text-[#687386] leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Rental terms */}
            {item.rentalTerms && item.rentalTerms.length > 0 && (
              <div className="border-t border-[#E5E8EF] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938] mb-2.5">
                  Item Rental Terms & Care Rules
                </h3>
                <ul className="space-y-1.5 text-xs text-[#687386]">
                  {item.rentalTerms.map((term, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16845B] shrink-0 mt-0.5" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Owner info card */}
          <div className="bg-white border border-[#E5E8EF] rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={item.ownerAvatar}
                alt={item.ownerName}
                className="w-12 h-12 rounded-full object-cover border border-[#E5E8EF]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-[#202938]">{item.ownerName}</h4>
                  <Badge variant="success" size="sm">
                    Verified Student
                  </Badge>
                </div>
                <p className="text-xs text-[#687386]">{item.ownerCollege}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-[#687386]">
                  <span className="flex items-center gap-1 font-medium text-[#202938]">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                    <span>{item.ownerRating} rating</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#94A3B8]" />
                    <span>Avg response: 15 mins</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Sticky Duration Selector & Price Box (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-[#E5E8EF] rounded-2xl p-6 shadow-xs space-y-6 sticky top-20">
            <div className="flex items-baseline justify-between pb-4 border-b border-[#E5E8EF]">
              <div>
                <span className="text-2xl font-bold text-[#202938]">{formatINR(item.dailyPrice)}</span>
                <span className="text-xs text-[#687386]"> / day</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#687386]">Deposit:</span>{' '}
                <span className="text-sm font-semibold text-[#202938]">{formatINR(item.securityDeposit)}</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-[#202938] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#3157C8]" />
                <span>Select Rental Window</span>
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="start-date-input" className="block text-[11px] font-medium text-[#687386] mb-1">
                    Start Date
                  </label>
                  <input
                    id="start-date-input"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-[#E5E8EF] rounded-lg px-2.5 py-2 text-[#202938] focus:outline-none focus:ring-1 focus:ring-[#3157C8]"
                  />
                </div>

                <div>
                  <label htmlFor="end-date-input" className="block text-[11px] font-medium text-[#687386] mb-1">
                    End Date
                  </label>
                  <input
                    id="end-date-input"
                    type="date"
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-[#E5E8EF] rounded-lg px-2.5 py-2 text-[#202938] focus:outline-none focus:ring-1 focus:ring-[#3157C8]"
                  />
                </div>
              </div>
            </div>

            {/* Price Summary Calculation Box */}
            <PriceSummaryBox
              dailyPrice={item.dailyPrice}
              securityDeposit={item.securityDeposit}
              days={days}
            />

            {/* Action Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!item.isAvailable}
              onClick={handleProceedToBooking}
            >
              {item.isAvailable ? 'Book This Item Now' : 'Currently Unavailable'}
            </Button>

            <p className="text-[11px] text-center text-[#687386] leading-tight">
              You will inspect the item in person during campus handover before escrow locking takes final effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
