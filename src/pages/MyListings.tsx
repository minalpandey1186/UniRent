import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Edit2,
  Trash2,
  MapPin,
  CheckCircle2,
  XCircle,
  Eye,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { RentalItem } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/common/ToastContext';
import { formatINR, FALLBACK_IMAGE } from '../utils/format';

export const MyListings: React.FC = () => {
  const currentUser = StorageService.getCurrentUser();
  const { showToast } = useToast();

  const [items, setItems] = useState<RentalItem[]>(() => {
    const all = StorageService.getItems();
    // Return items owned by current user (or fallback to student-1 items)
    return all.filter((i) => i.ownerId === currentUser.id || i.ownerId === 'student-1');
  });

  const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RentalItem | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDeposit, setEditDeposit] = useState<number>(0);
  const [editAvailable, setEditAvailable] = useState<boolean>(true);

  const openEditModal = (item: RentalItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditPrice(item.dailyPrice);
    setEditDeposit(item.securityDeposit);
    setEditAvailable(item.isAvailable);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    StorageService.updateItem(editingItem.id, {
      title: editTitle,
      dailyPrice: Number(editPrice),
      securityDeposit: Number(editDeposit),
      isAvailable: editAvailable,
    });

    const all = StorageService.getItems();
    setItems(all.filter((i) => i.ownerId === currentUser.id || i.ownerId === 'student-1'));
    setEditingItem(null);
    showToast('Listing updated successfully!', 'success');
  };

  const handleDeleteListing = () => {
    if (!deleteTarget) return;

    StorageService.removeItem(deleteTarget.id);
    const all = StorageService.getItems();
    setItems(all.filter((i) => i.ownerId === currentUser.id || i.ownerId === 'student-1'));
    setDeleteTarget(null);
    showToast('Listing removed from marketplace.', 'info');
  };

  const handleToggleAvailability = (item: RentalItem) => {
    const updated = !item.isAvailable;
    StorageService.updateItem(item.id, { isAvailable: updated });
    const all = StorageService.getItems();
    setItems(all.filter((i) => i.ownerId === currentUser.id || i.ownerId === 'student-1'));
    showToast(
      updated ? 'Item marked as available for rent.' : 'Item paused from new bookings.',
      'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#202938]">My Listed Items</h1>
          <p className="text-xs text-[#687386] mt-0.5">
            Manage peer rental pricing, active availability, and listing status for your items.
          </p>
        </div>
        <Link to="/create-listing">
          <Button variant="primary" size="sm" className="gap-1.5">
            <PlusCircle className="w-4 h-4" />
            <span>List New Item</span>
          </Button>
        </Link>
      </div>

      {/* Listings List */}
      {items.length === 0 ? (
        <EmptyState
          title="You haven't listed any items yet"
          description="Have calculators, monitors, camera gear, or textbooks sitting around? List them to earn money from fellow students."
          action={
            <Link to="/create-listing">
              <Button variant="primary" size="sm">
                Create First Listing
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E8EF] hover:border-[#3157C8]/40 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                    <Badge variant="neutral" size="sm" className="bg-white/95 font-semibold">
                      {item.category}
                    </Badge>
                    <Badge
                      variant={item.isAvailable ? 'success' : 'danger'}
                      size="sm"
                      className="bg-white/95"
                    >
                      {item.isAvailable ? 'Active & Available' : 'Paused / Rented'}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm text-[#202938] line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[#687386]">
                    <span>
                      Daily: <strong className="text-[#202938]">{formatINR(item.dailyPrice)}</strong>
                    </span>
                    <span>
                      Deposit: <strong className="text-[#202938]">{formatINR(item.securityDeposit)}</strong>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#687386] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#94A3B8]" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-slate-50/60 border-t border-[#E5E8EF] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToggleAvailability(item)}
                  className="text-xs text-[#687386] hover:text-[#202938] font-medium"
                >
                  {item.isAvailable ? 'Pause Listing' : 'Activate'}
                </button>

                <div className="flex items-center gap-1.5">
                  <Link to={`/item/${item.id}`} title="View Public Page">
                    <Button variant="ghost" size="sm" className="p-1.5">
                      <Eye className="w-4 h-4 text-[#687386]" />
                    </Button>
                  </Link>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="p-1.5"
                    onClick={() => openEditModal(item)}
                    title="Edit Listing"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#3157C8]" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 text-[#C94C4C] hover:bg-rose-50"
                    onClick={() => setDeleteTarget(item)}
                    title="Remove Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Listing Details"
        maxWidth="md"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <Input
            label="Item Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Daily Rate (₹)"
              type="number"
              min={1}
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              required
            />
            <Input
              label="Security Deposit (₹)"
              type="number"
              min={0}
              value={editDeposit}
              onChange={(e) => setEditDeposit(Number(e.target.value))}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-[#202938] cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={editAvailable}
              onChange={(e) => setEditAvailable(e.target.checked)}
              className="text-[#3157C8] rounded focus:ring-[#3157C8]"
            />
            <span className="font-medium">Item is currently available for new student bookings</span>
          </label>

          <div className="pt-4 border-t border-[#E5E8EF] flex justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteListing}
        title="Remove Listing"
        message={`Are you sure you want to remove "${deleteTarget?.title}" from UniRent? This action cannot be undone.`}
        confirmText="Remove Listing"
        variant="danger"
      />
    </div>
  );
};
