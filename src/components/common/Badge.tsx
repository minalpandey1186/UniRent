import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantClasses = {
    primary: 'bg-blue-50 text-[#3157C8] border border-blue-200/60',
    success: 'bg-emerald-50 text-[#16845B] border border-emerald-200/60',
    warning: 'bg-amber-50 text-[#C58A24] border border-amber-200/60',
    danger: 'bg-rose-50 text-[#C94C4C] border border-rose-200/60',
    neutral: 'bg-slate-100 text-[#687386] border border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
