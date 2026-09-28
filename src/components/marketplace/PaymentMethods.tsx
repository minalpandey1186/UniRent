import React from 'react';
import { Wallet, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/format';

export type PaymentMethodType = 'upi' | 'wallet';

export interface PaymentMethodsProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  walletBalance: number;
  walletAddress: string;
  totalAmount: number;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod,
  onSelectMethod,
  walletBalance,
  walletAddress,
  totalAmount,
}) => {
  return (
    <div className="bg-white border border-[#E5E8EF] rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-[#E5E8EF]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
          Select Payment Method
        </h3>
        <span className="text-[11px] text-[#687386]">Choose 1 of 2 options</span>
      </div>

      {/* Option A: UPI Payment */}
      <label
        onClick={() => onSelectMethod('upi')}
        className={`flex items-start gap-3.5 p-4 border rounded-xl cursor-pointer transition-all ${
          selectedMethod === 'upi'
            ? 'border-[#3157C8] bg-blue-50/40 ring-2 ring-[#3157C8]/20 shadow-xs'
            : 'border-[#E5E8EF] hover:bg-slate-50/70'
        }`}
      >
        <div className="pt-0.5">
          <input
            type="radio"
            name="paymentOption"
            value="upi"
            checked={selectedMethod === 'upi'}
            onChange={() => onSelectMethod('upi')}
            className="w-4 h-4 text-[#3157C8] focus:ring-[#3157C8] cursor-pointer"
          />
        </div>

        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {/* Recognizable UPI badge styling */}
              <div className="px-2 py-0.5 bg-[#097939] text-white font-black text-[11px] rounded tracking-wider flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-white" />
                <span>UPI</span>
              </div>
              <span className="font-semibold text-sm text-[#202938]">
                UPI Instant Payment
              </span>
            </div>
            <Badge variant="success" size="sm">
              Instant Refund Support
            </Badge>
          </div>

          <p className="text-[#687386] text-xs">
            Pay using your preferred UPI app.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-[#687386]">Supported Apps:</span>
            <div className="flex gap-1.5 flex-wrap text-[11px] font-medium text-[#202938]">
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Google Pay</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">PhonePe</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Paytm</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">BHIM</span>
            </div>
          </div>

          {selectedMethod === 'upi' && (
            <div className="mt-3 p-3 bg-white border border-[#E5E8EF] rounded-lg space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#687386]">Simulated UPI Flow:</span>
                <span className="font-semibold text-[#16845B] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready to authorize
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="student.a@okaxis"
                  className="w-full text-xs bg-slate-50 border border-[#E5E8EF] rounded px-2.5 py-1.5 font-mono text-[#202938]"
                />
                <button
                  type="button"
                  className="text-[11px] font-medium px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 text-[#202938]"
                >
                  Verified
                </button>
              </div>
            </div>
          )}
        </div>
      </label>

      {/* Option B: UniRent Wallet (MST Coins) */}
      <label
        onClick={() => onSelectMethod('wallet')}
        className={`flex items-start gap-3.5 p-4 border rounded-xl cursor-pointer transition-all ${
          selectedMethod === 'wallet'
            ? 'border-[#3157C8] bg-blue-50/40 ring-2 ring-[#3157C8]/20 shadow-xs'
            : 'border-[#E5E8EF] hover:bg-slate-50/70'
        }`}
      >
        <div className="pt-0.5">
          <input
            type="radio"
            name="paymentOption"
            value="wallet"
            checked={selectedMethod === 'wallet'}
            onChange={() => onSelectMethod('wallet')}
            className="w-4 h-4 text-[#3157C8] focus:ring-[#3157C8] cursor-pointer"
          />
        </div>

        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-100 text-[#3157C8] rounded">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-sm text-[#202938]">
                UniRent Wallet (MST Coins)
              </span>
            </div>
            <Badge variant="primary" size="sm">
              Available: {walletBalance.toLocaleString('en-IN')} MST
            </Badge>
          </div>

          <p className="text-[#687386] text-xs">
            Rental payment and security deposit will be locked in smart-contract escrow once blockchain integration is implemented.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="p-2 bg-white border border-[#E5E8EF] rounded">
              <span className="text-[#687386] block">Required for Booking</span>
              <span className="font-bold text-[#3157C8] text-xs">
                {totalAmount.toLocaleString('en-IN')} MST ({formatINR(totalAmount)})
              </span>
            </div>
            <div className="p-2 bg-white border border-[#E5E8EF] rounded">
              <span className="text-[#687386] block">Connected Address</span>
              <span className="font-mono text-[#202938] text-xs truncate block">
                {walletAddress}
              </span>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};
