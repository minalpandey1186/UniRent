export const formatINR = (amount: number): string => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80';
