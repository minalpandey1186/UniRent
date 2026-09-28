import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import type { RentalItem } from '../../types';
import { Badge } from '../common/Badge';
import { formatINR, FALLBACK_IMAGE } from '../../utils/format';

export interface ItemCardProps {
  item: RentalItem;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="group bg-white border border-[#E5E8EF] hover:border-[#3157C8]/40 rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-150 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <Badge variant="neutral" size="sm" className="bg-white/95 backdrop-blur-xs font-semibold">
            {item.category}
          </Badge>
          {item.isAvailable ? (
            <Badge variant="success" size="sm" className="bg-emerald-50/95 backdrop-blur-xs">
              Available
            </Badge>
          ) : (
            <Badge variant="danger" size="sm" className="bg-rose-50/95 backdrop-blur-xs">
              Rented Out
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-sm text-[#202938] line-clamp-1 group-hover:text-[#3157C8] transition-colors">
              {item.title}
            </h3>
          </div>

          <p className="text-xs text-[#687386] line-clamp-2 mb-3">
            {item.description}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-[#E5E8EF]">
          <div className="flex items-center justify-between text-xs text-[#687386]">
            <span className="flex items-center gap-1 truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="truncate">{item.location}</span>
            </span>
            <span className="flex items-center gap-1 font-medium text-[#202938] shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{item.ownerRating}</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-lg font-bold text-[#202938]">{formatINR(item.dailyPrice)}</span>
              <span className="text-xs text-[#687386]"> / day</span>
              <div className="text-[11px] text-[#687386]">
                Deposit: <span className="font-medium text-[#202938]">{formatINR(item.securityDeposit)}</span>
              </div>
            </div>

            <Link
              to={`/item/${item.id}`}
              className="inline-flex items-center text-xs font-semibold text-[#3157C8] bg-blue-50/70 hover:bg-[#3157C8] hover:text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
