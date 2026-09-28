import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UploadCloud,
  Check,
  ArrowLeft,
  Image as ImageIcon,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Category, ItemCondition } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { useToast } from '../components/common/ToastContext';
import { FALLBACK_IMAGE } from '../utils/format';

const PRESET_IMAGES = [
  { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camera / Gear', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
  { label: 'Projector', url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Textbook / Notes', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Drawing Tablet', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Monitor / Display', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80' },
];

export const CreateListing: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = StorageService.getCurrentUser();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Electronics');
  const [condition, setCondition] = useState<ItemCondition>('Excellent');
  const [description, setDescription] = useState('');
  const [dailyPrice, setDailyPrice] = useState<number | ''>(250);
  const [securityDeposit, setSecurityDeposit] = useState<number | ''>(1500);
  const [location, setLocation] = useState('North Quad / Campus Library');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Item title is required';
    if (!description.trim() || description.length < 15) {
      errs.description = 'Please provide at least 15 characters describing item state & inclusions';
    }
    if (dailyPrice === '' || dailyPrice <= 0) {
      errs.dailyPrice = 'Daily rent must be greater than ₹0';
    }
    if (securityDeposit === '' || securityDeposit < 0) {
      errs.securityDeposit = 'Security deposit must be ₹0 or greater';
    }
    if (!location.trim()) {
      errs.location = 'Handover location is required (e.g. library, dorm lobby)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (publish: boolean) => {
    if (!validate()) {
      showToast('Please correct the validation errors in the listing form.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      StorageService.addItem({
        title,
        category,
        description,
        dailyPrice: Number(dailyPrice),
        securityDeposit: Number(securityDeposit),
        condition,
        location,
        isAvailable: publish,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        ownerCollege: currentUser.college,
        ownerAvatar: currentUser.avatar,
        ownerRating: currentUser.rating,
        imageUrl,
        rentalTerms: ['Handle with care', 'Return clean and charged', 'No water damage'],
      });

      setIsSubmitting(false);
      showToast(
        publish
          ? 'Listing published successfully! It is now live in the marketplace.'
          : 'Listing saved as draft.',
        'success'
      );
      navigate('/my-listings');
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#687386] hover:text-[#202938] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel and Return</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#202938]">List an Item for Rent</h1>
          <p className="text-xs text-[#687386] mt-0.5">
            Share equipment you aren't currently using and earn money while helping other students.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Item Photos & Image Selector */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-[#202938]">Item Photo Preview</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Main Preview Box */}
            <div className="aspect-4/3 rounded-lg overflow-hidden border border-[#E5E8EF] bg-slate-50 relative group">
              <img
                src={imageUrl}
                alt="Item preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                Current Preview
              </div>
            </div>

            {/* Upload or Preset chooser */}
            <div className="sm:col-span-2 space-y-3">
              <label className="border-2 border-dashed border-[#E5E8EF] hover:border-[#3157C8] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50">
                <UploadCloud className="w-6 h-6 text-[#687386] mb-1" />
                <span className="text-xs font-semibold text-[#3157C8]">
                  Click to upload a custom image
                </span>
                <span className="text-[11px] text-[#687386] mt-0.5">
                  PNG, JPG, or WEBP up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>

              <div>
                <p className="text-[11px] font-medium text-[#687386] mb-1.5">
                  Or pick a realistic demo preset:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
                        imageUrl === preset.url
                          ? 'bg-[#3157C8] text-white border-[#3157C8]'
                          : 'bg-white text-[#687386] border-[#E5E8EF] hover:bg-slate-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="space-y-4 pt-4 border-t border-[#E5E8EF]">
          <Input
            label="Item Title"
            placeholder="e.g. TI-84 Plus CE Graphing Calculator or Canon Rebel T7"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              options={[
                { label: 'Electronics', value: 'Electronics' },
                { label: 'Books & Textbooks', value: 'Books' },
                { label: 'Academic & Lab Supplies', value: 'Academic' },
                { label: 'Photography & Video', value: 'Photography' },
                { label: 'Sports & Recreation', value: 'Sports' },
                { label: 'Other Essentials', value: 'Other' },
              ]}
            />

            <Select
              label="Item Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value as ItemCondition)}
              options={[
                { label: 'Like New (Flawless)', value: 'Like New' },
                { label: 'Excellent (Minor signs of use)', value: 'Excellent' },
                { label: 'Good (Fully functional)', value: 'Good' },
                { label: 'Fair (Noticeable cosmetic wear)', value: 'Fair' },
              ]}
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="description-textarea" className="text-xs font-semibold text-[#202938]">
              Description & What's Included
            </label>
            <textarea
              id="description-textarea"
              rows={4}
              placeholder="Describe condition, specifications, included accessories (chargers, cases, cables), and any specific return conditions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full text-sm bg-white text-[#202938] border rounded-lg px-3.5 py-2 transition-colors placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3157C8] ${
                errors.description ? 'border-[#C94C4C]' : 'border-[#E5E8EF]'
              }`}
            />
            {errors.description && (
              <span className="text-xs text-[#C94C4C]">{errors.description}</span>
            )}
          </div>
        </div>

        {/* Pricing and Security Deposit */}
        <div className="space-y-4 pt-4 border-t border-[#E5E8EF]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938]">
            Pricing & Security Escrow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Daily Rental Rate (₹ INR)"
              type="number"
              min={1}
              value={dailyPrice}
              onChange={(e) => setDailyPrice(e.target.value === '' ? '' : Number(e.target.value))}
              helperText="Fair student price per 24 hours"
              error={errors.dailyPrice}
            />

            <Input
              label="Refundable Security Deposit (₹ INR)"
              type="number"
              min={0}
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value === '' ? '' : Number(e.target.value))}
              helperText="Locked into escrow during the rental period"
              error={errors.securityDeposit}
            />
          </div>

          <Input
            label="Handover Location on Campus"
            placeholder="e.g. Science Library, North Quad, Engineering Hall Lobby"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            helperText="Where you prefer meeting renters in daylight hours"
            error={errors.location}
          />
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-[#E5E8EF] flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={() => handleSubmit(true)}
            isLoading={isSubmitting}
          >
            Publish Listing
          </Button>
        </div>
      </div>
    </div>
  );
};
