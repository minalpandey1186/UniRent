import React, { useState } from 'react';
import {
  Bell,
  Wallet,
  Lock,
  LogOut,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { useToast } from '../components/common/ToastContext';

export const Settings: React.FC = () => {
  const currentUser = StorageService.getCurrentUser();
  const [walletBalance, setWalletBalance] = useState(StorageService.getWalletBalance());
  const { showToast } = useToast();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Notification toggles
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyHandover, setNotifyHandover] = useState(true);

  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Wallet
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isRequestingFaucet, setIsRequestingFaucet] = useState(false);

  const handleFaucetRequest = () => {
    setIsRequestingFaucet(true);
    setTimeout(() => {
      const newBal = walletBalance + 50;
      StorageService.setWalletBalance(newBal);
      setWalletBalance(newBal);
      setIsRequestingFaucet(false);
      showToast('50 Testnet MST tokens minted to your demo wallet!', 'success');
    }, 500);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please enter both current and new passwords.', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    showToast('Account security password updated.', 'success');
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    showToast('Logged out of demo session.', 'info');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#202938]">Platform & Account Settings</h1>
        <p className="text-xs text-[#687386] mt-0.5">
          Configure notification preferences, testnet wallet connections, and security credentials.
        </p>
      </div>

      {/* Simulated Wallet Integration Section */}
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#3157C8] rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#202938]">
                MST Blockchain Wallet (Testnet)
              </h3>
              <p className="text-xs text-[#687386]">
                Simulated Web3 wallet for rental deposits, smart contracts, and escrow.
              </p>
            </div>
          </div>
          <Badge variant={isWalletConnected ? 'success' : 'neutral'}>
            {isWalletConnected ? 'Connected (Simulated)' : 'Disconnected'}
          </Badge>
        </div>

        {isWalletConnected ? (
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-slate-50 border border-[#E5E8EF] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-[#687386] block text-[11px]">Wallet Address</span>
                <span className="font-mono text-[#202938] font-medium">{currentUser.walletAddress}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-[#687386] block text-[11px]">Testnet MST Balance</span>
                <span className="font-bold text-[#3157C8] text-sm">{walletBalance} MST</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleFaucetRequest}
                isLoading={isRequestingFaucet}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#3157C8]" />
                <span>Request +50 MST Testnet Tokens</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsWalletConnected(false);
                  showToast('Wallet disconnected from session.', 'info');
                }}
                className="text-xs text-[#C94C4C] hover:bg-rose-50"
              >
                Disconnect Wallet
              </Button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsWalletConnected(true);
                showToast('Connected to simulated testnet wallet.', 'success');
              }}
            >
              Connect Testnet Wallet
            </Button>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-[#3157C8] rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#202938]">Notification Channels</h3>
            <p className="text-xs text-[#687386]">
              Choose how you want to be notified about item booking requests and returns.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg border border-[#E5E8EF] hover:bg-slate-50 cursor-pointer">
            <div>
              <p className="font-semibold text-[#202938]">Email Notifications</p>
              <p className="text-[#687386] text-[11px]">
                Receive instant emails for booking requests, returns, and escrow releases.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => {
                setNotifyEmail(e.target.checked);
                showToast('Email notification preference saved.', 'info');
              }}
              className="text-[#3157C8] rounded focus:ring-[#3157C8]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-[#E5E8EF] hover:bg-slate-50 cursor-pointer">
            <div>
              <p className="font-semibold text-[#202938]">SMS Handover Reminders</p>
              <p className="text-[#687386] text-[11px]">
                Receive text reminders 2 hours before scheduled on-campus return meetings.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifySms}
              onChange={(e) => {
                setNotifySms(e.target.checked);
                showToast('SMS reminder preference saved.', 'info');
              }}
              className="text-[#3157C8] rounded focus:ring-[#3157C8]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-[#E5E8EF] hover:bg-slate-50 cursor-pointer">
            <div>
              <p className="font-semibold text-[#202938]">In-App Escrow Activity</p>
              <p className="text-[#687386] text-[11px]">
                Notify when peer checks in an item or dispute mediation has updates.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyHandover}
              onChange={(e) => {
                setNotifyHandover(e.target.checked);
                showToast('Escrow notification preference saved.', 'info');
              }}
              className="text-[#3157C8] rounded focus:ring-[#3157C8]"
            />
          </label>
        </div>
      </div>

      {/* Security Credentials */}
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-[#3157C8] rounded-lg">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#202938]">Account Security</h3>
            <p className="text-xs text-[#687386]">
              Keep your student credential account safe and protected.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-[#202938] cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => {
                  setTwoFactorEnabled(e.target.checked);
                  showToast(
                    e.target.checked ? '2FA enabled on your student account.' : '2FA disabled.',
                    'info'
                  );
                }}
                className="text-[#3157C8] rounded focus:ring-[#3157C8]"
              />
              <span>Enable Two-Factor Authentication (2FA)</span>
            </label>

            <Button type="submit" variant="secondary" size="sm">
              Update Password
            </Button>
          </div>
        </form>
      </div>

      {/* Logout Section */}
      <div className="bg-white border border-[#E5E8EF] rounded-xl p-6 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#202938]">Session Management</h3>
          <p className="text-xs text-[#687386]">
            Sign out of your active browser session on this device.
          </p>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setIsLogoutDialogOpen(true)}
          className="gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Button>
      </div>

      {/* Logout Confirmation */}
      <ConfirmationDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out of UniRent"
        message="Are you sure you want to log out of your current session? You can sign right back in anytime using your .edu address."
        confirmText="Log Out"
        variant="danger"
      />
    </div>
  );
};
