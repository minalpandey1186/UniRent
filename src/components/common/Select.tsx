import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string | number }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-[#202938]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full text-sm bg-white text-[#202938] border rounded-lg px-3.5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3157C8] focus:border-transparent cursor-pointer ${
          error ? 'border-[#C94C4C] focus:ring-[#C94C4C]' : 'border-[#E5E8EF]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-[#C94C4C]">{error}</span>}
      {!error && helperText && <span className="text-xs text-[#687386]">{helperText}</span>}
    </div>
  );
};
