import React from 'react';
import { PackageOpen } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#E5E8EF] rounded-xl my-4">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#687386] mb-3">
        {icon || <PackageOpen className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-semibold text-[#202938] mb-1">{title}</h3>
      <p className="text-sm text-[#687386] max-w-sm mb-5 leading-normal">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
