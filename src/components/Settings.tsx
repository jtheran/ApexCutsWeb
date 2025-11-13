import React from 'react';
import type { Theme } from '../../App.tsx';

interface SettingsProps {
  onLogout: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout, theme, setTheme }) => {
  
  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Settings</h1>

      {/* Business Information Card */}
      <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Business Information</h2>
        <p className="text-sm text-gray-500 dark:text-on-surface-variant mb-6">Update your business's public details.</p>
        <form className="space-y-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-600 dark:text-on-surface-variant mb-2">Business Name</label>
            <input type="text" id="businessName" defaultValue="Apex Cuts Barbershop" className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-600 dark:text-on-surface-variant mb-2">Address</label>
            <input type="text" id="address" defaultValue="123 Main Street, Anytown, USA" className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-on-surface-variant mb-2">Phone Number</label>
            <input type="tel" id="phone" defaultValue="(555) 123-4567" className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition" />
          </div>
          <div className="pt-2 text-right">
            <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-amber-600 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Appearance Card */}
      <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Appearance</h2>
        <p className="text-sm text-gray-500 dark:text-on-surface-variant mb-6">Customize the look and feel of your dashboard.</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-800 dark:text-on-surface font-medium">Theme</span>
          <div className="bg-gray-100 dark:bg-background p-1 rounded-lg flex space-x-1 border border-gray-200 dark:border-gray-600">
            <button onClick={() => handleThemeChange('dark')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${theme === 'dark' ? 'bg-primary text-white' : 'text-gray-600 dark:text-on-surface-variant hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              Dark
            </button>
            <button onClick={() => handleThemeChange('light')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${theme === 'light' ? 'bg-primary text-white' : 'text-gray-600 dark:text-on-surface-variant hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              Light
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Management Card */}
      <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Subscription</h2>
        <p className="text-sm text-gray-500 dark:text-on-surface-variant mb-6">Manage your subscription plan to control your business's visibility on the mobile app.</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-background p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-gray-900 dark:text-on-surface font-semibold">Current Plan: <span className="text-primary">Pro</span></p>
            <p className="text-xs text-gray-500 dark:text-on-surface-variant mt-1">Renews on: December 31, 2024</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
             <button className="text-sm text-blue-500 dark:text-blue-400 hover:underline">Update Subscription</button>
             <button className="text-sm text-gray-500 dark:text-on-surface-variant hover:underline">Cancel Subscription</button>
          </div>
        </div>
      </div>
      
      {/* Account Management Card */}
      <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Account</h2>
        <div className="space-y-4">
            <button onClick={onLogout} className="w-full text-left py-3 px-4 bg-gray-100 dark:bg-secondary/30 hover:bg-gray-200 dark:hover:bg-secondary/50 text-gray-800 dark:text-on-surface font-medium rounded-lg transition-colors">
                Log Out
            </button>
            <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                <h3 className="font-semibold text-red-500 dark:text-red-400">Delete Account</h3>
                <p className="text-sm text-red-700/80 dark:text-on-surface-variant mt-1 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <button className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors">
                    Delete My Account
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;