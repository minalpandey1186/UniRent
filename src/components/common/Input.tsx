import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-[#202938]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-[#687386] pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full text-sm bg-white text-[#202938] border rounded-lg px-3.5 py-2 transition-colors placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3157C8] focus:border-transparent ${
            leftIcon ? 'pl-9' : ''
          } ${error ? 'border-[#C94C4C] focus:ring-[#C94C4C]' : 'border-[#E5E8EF]'} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-[#C94C4C]">{error}</span>}
      {!error && helperText && <span className="text-xs text-[#687386]">{helperText}</span>}
    </div>
  );
};
