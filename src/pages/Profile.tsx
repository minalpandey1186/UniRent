import React, { useState } from 'react';
import {
  User,
  MapPin,
  Mail,
  ShieldCheck,
  Star,
  Wallet,
  Clock,
  Edit2,
  Calendar,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { StudentProfile } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useToast } from '../components/common/ToastContext';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(StorageService.getCurrentUser());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { showToast } = useToast();

  // Edit form state
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [major, setMajor] = useState(profile.major);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = StorageService.updateCurrentUser({
      name,
      college,
      major,
      email,
      avatar,
    });
    setProfile(updated);
    setIsEditModalOpen(false);
    showToast('Student profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#202938]">Student Profile & Reputation</h1>
          <p className="text-xs text-[#687386] mt-0.5">
            Your university identity, peer trust score, and active rental history.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setName(profile.name);
            setCollege(profile.college);
            setMajor(profile.major);
            setEmail(profile.email);
            setAvatar(profile.avatar);
            setIsEditModalOpen(true);
          }}
          className="gap-1.5"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#3157C8]" />
          <span>Edit Profile</span>
        </Button>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-[#E5E8EF]">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#E5E8EF] shadow-xs"
          />

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-[#202938]">{profile.name}</h2>
              <Badge variant="success" size="sm" className="gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified .edu Student</span>
              </Badge>
            </div>

            <p className="text-xs text-[#687386] font-medium">{profile.major}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#687386] pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>{profile.college}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>{profile.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Member since {profile.joinedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Reputation & Activity Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 bg-slate-50 border border-[#E5E8EF] rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg mb-0.5">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{profile.rating}</span>
            </div>
            <span className="text-[11px] text-[#687386]">
              Peer Rating ({profile.reviewsCount} reviews)
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-[#E5E8EF] rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-[#3157C8] font-bold text-lg mb-0.5">
              <ShoppingBag className="w-4 h-4" />
              <span>{profile.itemsRentedCount}</span>
            </div>
            <span className="text-[11px] text-[#687386]">Items Rented</span>
          </div>

          <div className="p-4 bg-slate-50 border border-[#E5E8EF] rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-[#3157C8] font-bold text-lg mb-0.5">
              <Layers className="w-4 h-4" />
              <span>{profile.itemsListedCount}</span>
            </div>
            <span className="text-[11px] text-[#687386]">Items Listed</span>
          </div>

          <div className="p-4 bg-slate-50 border border-[#E5E8EF] rounded-xl text-center">
            <div className="flex items-center justify-center gap-1 text-[#16845B] font-bold text-lg mb-0.5">
              <Clock className="w-4 h-4" />
              <span>{profile.responseTime}</span>
            </div>
            <span className="text-[11px] text-[#687386]">Avg Response Time</span>
          </div>
        </div>
      </div>

      {/* Wallet & Campus Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-[#E5E8EF] rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938] flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-[#3157C8]" />
            <span>MST Blockchain Address (Testnet)</span>
          </h3>
          <p className="text-xs text-[#687386]">
            Smart contracts disburse security deposits directly to this testnet account upon return check-in.
          </p>
          <div className="p-3 bg-slate-50 border border-[#E5E8EF] rounded-lg font-mono text-xs text-[#202938] break-all">
            {profile.walletAddress}
          </div>
        </div>

        <div className="bg-white border border-[#E5E8EF] rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#202938] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16845B]" />
            <span>Campus Identity Status</span>
          </h3>
          <p className="text-xs text-[#687386]">
            Identity verified via official university domain SSO. Eligible for uncollateralized low-deposit campus tier.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-[#16845B]">
            <span className="w-2 h-2 rounded-full bg-[#16845B]"></span>
            <span>Student Good Standing Confirmed</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Information"
        maxWidth="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="University Campus & Hall"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />

          <Input
            label="Major & Class Year"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          />

          <Input
            label="Campus Email (.edu)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Avatar Image URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            helperText="Direct image URL for your profile photo"
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E5E8EF]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
