import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Category, RentalItem } from '../types';
import { ItemCard } from '../components/marketplace/ItemCard';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Electronics',
  'Books',
  'Academic',
  'Photography',
  'Sports',
  'Other',
];

export const Marketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>(
    initialCategory || 'All'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [availabilityOnly, setAvailabilityOnly] = useState(false);

  const items = StorageService.getItems();

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAvailability = availabilityOnly ? item.isAvailable : true;
        return matchesCategory && matchesSearch && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.dailyPrice - b.dailyPrice;
        if (sortBy === 'price-desc') return b.dailyPrice - a.dailyPrice;
        if (sortBy === 'rating') return b.ownerRating - a.ownerRating;
        // featured default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [items, selectedCategory, searchQuery, sortBy, availabilityOnly]);

  const handleCategoryChange = (cat: 'All' | Category) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setAvailabilityOnly(false);
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#202938]">Campus Rental Marketplace</h1>
        <p className="text-xs text-[#687386] mt-0.5">
          Browse and reserve verified peer items available across university halls and academic quads.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search input */}
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by title, specs, or location (e.g., calculator, Sony, library)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          {/* Sort & Availability Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-[#687386] bg-slate-50 border border-[#E5E8EF] rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#687386]" />
              <label htmlFor="sort-select" className="font-medium text-[#202938]">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#202938] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated Owner</option>
              </select>
            </div>

            <button
              onClick={() => setAvailabilityOnly(!availabilityOnly)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                availabilityOnly
                  ? 'bg-blue-50 border-[#3157C8] text-[#3157C8]'
                  : 'bg-white border-[#E5E8EF] text-[#687386] hover:bg-slate-50'
              }`}
            >
              Available Now Only
            </button>

            {(searchQuery || selectedCategory !== 'All' || availabilityOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-[#C94C4C] hover:bg-rose-50"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? items.length
                : items.filter((i) => i.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#3157C8] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-[#687386]'
                }`}
              >
                {cat} <span className="opacity-75 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#687386]">
        <span>
          Showing <strong>{filteredItems.length}</strong> items in{' '}
          <strong>{selectedCategory}</strong>
        </span>
      </div>

      {/* Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No rental items match your criteria"
          description="Try broadening your search keywords, switching categories, or clearing active filters."
          action={
            <Button variant="secondary" size="sm" onClick={handleResetFilters}>
              Clear All Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
