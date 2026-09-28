import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Calendar,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { PriceSummaryBox } from '../components/marketplace/PriceSummaryBox';
import { PaymentMethods, PaymentMethodType } from '../components/marketplace/PaymentMethods';
import { useToast } from '../components/common/ToastContext';
import { formatINR, FALLBACK_IMAGE } from '../utils/format';

export const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const item = StorageService.getItemById(id || '');
  const currentUser = StorageService.getCurrentUser();
  const walletBalance = StorageService.getWalletBalance();

  const startDate = searchParams.get('start') || new Date().toISOString().split('T')[0];
  const endDate =
    searchParams.get('end') ||
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];
  const days = Number(searchParams.get('days') || '3');

  const [paymentOption, setPaymentOption] = useState<PaymentMethodType>('upi');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!item) {
    return (
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-10 text-center max-w-md mx-auto my-8">
        <h2 className="text-lg font-bold text-[#202938]">Item not found</h2>
        <Link to="/marketplace">
          <Button variant="secondary" size="sm" className="mt-4">
            Return to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const rentalFee = item.dailyPrice * Math.max(1, days);
  const totalAmount = rentalFee + item.securityDeposit;

  const handleConfirmBooking = () => {
    if (!agreedToTerms) {
      showToast('Please agree to the peer rental and return terms to proceed.', 'error');
      return;
    }

    if (paymentOption === 'wallet' && walletBalance < totalAmount) {
      showToast('Insufficient MST coins in your testnet wallet balance.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const booking = StorageService.createBooking({
        item,
        startDate,
        endDate,
        days,
        rentalFee,
        securityDeposit: item.securityDeposit,
        totalAmount,
      });

      if (paymentOption === 'wallet') {
        StorageService.setWalletBalance(Math.max(0, walletBalance - totalAmount));
      }

      setIsProcessing(false);
      showToast(
        paymentOption === 'upi'
          ? 'Simulated UPI payment authorized! Booking confirmed.'
          : 'Simulated MST escrow locked! Booking confirmed.',
        'success'
      );
      navigate(`/booking-confirmation/${booking.bookingRef}?method=${paymentOption}`);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to={`/item/${item.id}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#687386] hover:text-[#202938]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Item Details</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-[#202938]">Rental Checkout & Escrow</h1>
        <p className="text-xs text-[#687386] mt-0.5">
          Review your reservation dates, escrow breakdown, and simulated student payment.
        </p>
      </div>

      {/* Notice Banner */}
      <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#3157C8] shrink-0 mt-0.5" />
        <div className="text-xs text-[#202938] leading-relaxed">
          <strong>Frontend Prototype Notice:</strong> Real UPI payment gateway settlement and smart contract escrow on the MST Blockchain will be connected in subsequent phases. No real money or tokens are debited during this demonstration.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Booking Summary & Payment Methods (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          {/* Item Mini Card */}
          <div className="bg-white border border-[#E5E8EF] rounded-xl p-4 flex gap-4 items-center shadow-xs">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-20 h-20 rounded-lg object-cover border border-[#E5E8EF]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            <div className="flex-1">
              <Badge variant="neutral" size="sm" className="mb-1">
                {item.category}
              </Badge>
              <h3 className="font-semibold text-sm text-[#202938]">{item.title}</h3>
              <p className="text-xs text-[#687386] mt-0.5">Owner: {item.ownerName} ({item.ownerCollege})</p>
              <p className="text-xs text-[#687386]">Handover: {item.location}</p>
            </div>
          </div>

          {/* Rental Dates Summary */}
          <div className="bg-white border border-[#E5E8EF] rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
              Rental Schedule
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-[#E5E8EF] rounded-lg">
                <span className="text-[#687386] block text-[11px]">Start Date (Pickup)</span>
                <span className="font-semibold text-[#202938] text-sm">{startDate}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-[#E5E8EF] rounded-lg">
                <span className="text-[#687386] block text-[11px]">End Date (Return)</span>
                <span className="font-semibold text-[#202938] text-sm">{endDate}</span>
              </div>
            </div>
            <p className="text-xs text-[#687386]">
              Total Reservation: <strong className="text-[#202938]">{days} days</strong>
            </p>
          </div>

          {/* Two Selectable Payment Methods */}
          <PaymentMethods
            selectedMethod={paymentOption}
            onSelectMethod={setPaymentOption}
            walletBalance={walletBalance}
            walletAddress={currentUser.walletAddress}
            totalAmount={totalAmount}
          />
        </div>

        {/* Right Column: Cost Breakdown & Confirmation (5 cols) */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-white border border-[#E5E8EF] rounded-xl p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
              Cost Breakdown
            </h3>

            <PriceSummaryBox
              dailyPrice={item.dailyPrice}
              securityDeposit={item.securityDeposit}
              days={days}
            />

            <div className="p-3 bg-slate-50 border border-[#E5E8EF] rounded-lg text-xs space-y-1">
              <span className="text-[#687386] block text-[11px]">Payment Mode</span>
              <p className="font-semibold text-[#202938]">
                {paymentOption === 'upi' ? 'UPI Instant Payment' : 'UniRent Wallet (MST Coins)'}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#E5E8EF]">
              <label className="flex items-start gap-2 text-xs text-[#687386] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 text-[#3157C8] rounded focus:ring-[#3157C8]"
                />
                <span>
                  I understand the security deposit will be temporarily locked in escrow and I agree to return the item on {endDate} in its verified condition.
                </span>
              </label>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleConfirmBooking}
                isLoading={isProcessing}
              >
                {paymentOption === 'upi'
                  ? `Confirm Booking via UPI (${formatINR(totalAmount)})`
                  : `Confirm Booking via Wallet (${totalAmount.toLocaleString('en-IN')} MST)`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
