import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { formatINR } from '../../utils/format';

export interface PriceSummaryBoxProps {
  dailyPrice: number;
  securityDeposit: number;
  days: number;
}

export const PriceSummaryBox: React.FC<PriceSummaryBoxProps> = ({
  dailyPrice,
  securityDeposit,
  days,
}) => {
  const rentalFee = dailyPrice * Math.max(1, days);
  const total = rentalFee + securityDeposit;

  return (
    <div className="bg-slate-50 border border-[#E5E8EF] rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5E8EF]">
        <span className="font-semibold text-[#202938]">Price Calculation</span>
        <span className="text-[#687386]">{days} {days === 1 ? 'day' : 'days'} duration</span>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[#687386]">
          <span>
            Daily Rent ({formatINR(dailyPrice)} × {days} {days === 1 ? 'day' : 'days'})
          </span>
          <span className="font-medium text-[#202938]">{formatINR(rentalFee)}</span>
        </div>

        <div className="flex justify-between text-[#687386]">
          <span className="flex items-center gap-1">
            <span>Refundable Security Deposit</span>
            <span title="Returned immediately upon item check-in" className="cursor-help">
              <Info className="w-3 h-3 text-[#94A3B8]" />
            </span>
          </span>
          <span className="font-medium text-[#202938]">{formatINR(securityDeposit)}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E5E8EF] flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#202938]">Estimated Total</span>
          <p className="text-[10px] text-[#687386]">Rent + Security Deposit</p>
        </div>
        <span className="text-lg font-bold text-[#3157C8]">{formatINR(total)}</span>
      </div>

      <div className="flex items-start gap-1.5 p-2 bg-emerald-50/70 border border-emerald-200/50 rounded-lg text-[11px] text-[#16845B]">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          Security deposit is held in simulated escrow and released back to your account upon safe return.
        </span>
      </div>
    </div>
  );
};
