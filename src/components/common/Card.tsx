import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white border border-[#E5E8EF] rounded-xl p-5 shadow-xs ${
        hover ? 'hover:border-[#3157C8]/40 hover:shadow-sm transition-all duration-150' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
