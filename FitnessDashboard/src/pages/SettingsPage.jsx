import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const SettingSection = ({ title, children, isDarkMode }) => {
  return (
    <div className={`mb-8 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} rounded-xl p-6 shadow-sm backdrop-blur-sm`}>
      <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-4`}>{title}</h2>
      {children}
    </div>
  );
};

const ToggleSwitch = ({ label, isEnabled, onChange, isDarkMode }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
      <button 
        onClick={onChange}
        className={`w-12 h-6 rounded-full flex items-center px-0.5 ${
          isEnabled 
            ? (isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]') 
            : (isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-gray-300')
        } transition-colors`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
          isEnabled ? 'translate-x-6' : 'translate-x-0'
        }`}></div>
      </button>
    </div>
  );
};

const RadioOption = ({ label, checked, onChange, isDarkMode }) => {
  return (
    <label className="flex items-center py-2 cursor-pointer">
      <div className={`w-5 h-5 rounded-full ${checked 
        ? (isDarkMode ? 'border-2 border-[#FF6500] bg-[#FF6500]/20' : 'border-2 border-[#261FB3] bg-[#261FB3]/10') 
        : (isDarkMode ? 'border border-gray-500' : 'border border-gray-400')
      } flex items-center justify-center transition-colors`}>
        {checked && (
          <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]'}`}></div>
        )}
      </div>
      <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
    </label>
  );
};

const SettingsPage = () => {
  const { userData, isDarkMode, toggleDarkMode, setGlassEffect, glassEffect } = useDashboard();
  
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    sound: true,
    goalReminders: true,
    autoSync: true,
    shareProgress: false,
    measurementUnit: 'imperial',
    dataRetention: '1year'
  });
  
  const [profile, setProfile] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    height: '5\'10"',
    weight: '165',
    birthdate: '1990-01-01',
    gender: 'Male'
  });
  
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-8`}>
        Settings
      </h1>
      
      {/* Profile Section */}
      <SettingSection title="Profile Information" isDarkMode={isDarkMode}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-[#1E3E62]/30 border border-[#1E3E62] text-white focus:border-[#FF6500]' 
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-[#261FB3]'
              } focus:outline-none focus:ring-1 ${
                isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-[#1E3E62]/30 border border-[#1E3E62] text-white focus:border-[#FF6500]' 
                  : 'bg-gray-100 border border-gray-300 text-gray-900 focus:border-[#261FB3]'
              } focus:outline-none focus:ring-1 ${
                isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Height
            </label>
            <input
              type="text"
              name="height"
              value={profile.height}
              onChange={handleProfileChange}
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-[#1E3E62]/30 border border-[#1E3E62] text-white focus:border-[#FF6500]' 
                  : 'bg-gray-100 border border-gray-300 text-gray-900 focus:border-[#261FB3]'
              } focus:outline-none focus:ring-1 ${
                isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'
              }`}
            />
          </div>
          
          <div>
            <label className={`block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={profile.weight}
              onChange={handleProfileChange}
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-[#1E3E62]/30 border border-[#1E3E62] text-white focus:border-[#FF6500]' 
                  : 'bg-gray-100 border border-gray-300 text-gray-900 focus:border-[#261FB3]'
              } focus:outline-none focus:ring-1 ${
                isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'
              }`}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className={`px-4 py-2 rounded-lg text-white ${
            isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'
          } transition-colors`}>
            Save Profile
          </button>
        </div>
      </SettingSection>
      
      {/* Notifications Section */}
      <SettingSection title="Notifications" isDarkMode={isDarkMode}>
        <div className="space-y-1">
          <ToggleSwitch 
            label="Push Notifications" 
            isEnabled={settings.notifications} 
            onChange={() => handleToggle('notifications')} 
            isDarkMode={isDarkMode}
          />
          <ToggleSwitch 
            label="Email Updates" 
            isEnabled={settings.emailUpdates} 
            onChange={() => handleToggle('emailUpdates')} 
            isDarkMode={isDarkMode}
          />
          <ToggleSwitch 
            label="Sound Effects" 
            isEnabled={settings.sound} 
            onChange={() => handleToggle('sound')} 
            isDarkMode={isDarkMode}
          />
          <ToggleSwitch 
            label="Goal Reminders" 
            isEnabled={settings.goalReminders} 
            onChange={() => handleToggle('goalReminders')} 
            isDarkMode={isDarkMode}
          />
        </div>
      </SettingSection>
      
      {/* Appearance */}
      <SettingSection title="Appearance & Display" isDarkMode={isDarkMode}>
        <div className="space-y-3">
          <ToggleSwitch 
            label="Dark Mode" 
            isEnabled={isDarkMode} 
            onChange={toggleDarkMode} 
            isDarkMode={isDarkMode}
          />
          <ToggleSwitch 
            label="Glass Effect" 
            isEnabled={glassEffect} 
            onChange={() => setGlassEffect(!glassEffect)} 
            isDarkMode={isDarkMode}
          />
        </div>
        
        <div className="mt-6">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Measurement Units</h3>
          <div className="space-y-1">
            <RadioOption 
              label="Imperial (lb, ft, in)" 
              checked={settings.measurementUnit === 'imperial'} 
              onChange={() => setSettings({...settings, measurementUnit: 'imperial'})}
              isDarkMode={isDarkMode}
            />
            <RadioOption 
              label="Metric (kg, cm)" 
              checked={settings.measurementUnit === 'metric'} 
              onChange={() => setSettings({...settings, measurementUnit: 'metric'})}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </SettingSection>
      
      {/* Privacy and Data */}
      <SettingSection title="Privacy & Data" isDarkMode={isDarkMode}>
        <div className="space-y-3">
          <ToggleSwitch 
            label="Auto-sync with Health Apps" 
            isEnabled={settings.autoSync} 
            onChange={() => handleToggle('autoSync')} 
            isDarkMode={isDarkMode}
          />
          <ToggleSwitch 
            label="Share Progress on Social Media" 
            isEnabled={settings.shareProgress} 
            onChange={() => handleToggle('shareProgress')} 
            isDarkMode={isDarkMode}
          />
        </div>
        
        <div className="mt-6">
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Data Retention</h3>
          <div className="space-y-1">
            <RadioOption 
              label="Keep data for 6 months" 
              checked={settings.dataRetention === '6months'} 
              onChange={() => setSettings({...settings, dataRetention: '6months'})}
              isDarkMode={isDarkMode}
            />
            <RadioOption 
              label="Keep data for 1 year" 
              checked={settings.dataRetention === '1year'} 
              onChange={() => setSettings({...settings, dataRetention: '1year'})}
              isDarkMode={isDarkMode}
            />
            <RadioOption 
              label="Keep data indefinitely" 
              checked={settings.dataRetention === 'forever'} 
              onChange={() => setSettings({...settings, dataRetention: 'forever'})}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className={`px-4 py-2 rounded-lg border text-sm ${
            isDarkMode 
              ? 'border-red-500 text-red-500 hover:bg-red-500/10' 
              : 'border-red-600 text-red-600 hover:bg-red-50'
          } transition-colors`}>
            Delete Account Data
          </button>
        </div>
      </SettingSection>
    </div>
  );
};

export default SettingsPage;
