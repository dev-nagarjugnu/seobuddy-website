// src/hooks/useSettings.ts
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { SettingsData, defaultSettings, applyAppearanceSettings, validateSettings } from '@/lib/settings';

export function useSettings() {
  const { data: session, status } = useSession();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings from API
  const loadSettings = useCallback(async () => {
    if (status !== 'authenticated' || session?.user?.role !== 'ADMIN') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/settings', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && validateSettings(data.settings)) {
          setSettings(data.settings);
          // Apply appearance settings immediately
          applyAppearanceSettings(data.settings.appearance);
        }
      } else {
        console.warn('Failed to load settings, using defaults');
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  // Save settings to API
  const saveSettings = useCallback(async (newSettings: SettingsData) => {
    if (status !== 'authenticated' || session?.user?.role !== 'ADMIN') {
      return false;
    }

    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: newSettings })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSettings(newSettings);
          // Apply appearance settings immediately
          applyAppearanceSettings(newSettings.appearance);
          return true;
        } else {
          setError(data.message || 'Failed to save settings');
          return false;
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save settings');
        return false;
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Network error while saving settings');
      return false;
    } finally {
      setSaving(false);
    }
  }, [session, status]);

  // Update a specific setting
  const updateSetting = useCallback((
    category: keyof SettingsData,
    key: string,
    value: any
  ) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      };
      
      // Apply appearance changes immediately
      if (category === 'appearance') {
        applyAppearanceSettings(newSettings.appearance);
      }
      
      return newSettings;
    });
  }, []);

  // Update multiple settings at once
  const updateSettings = useCallback((updates: Partial<SettingsData>) => {
    setSettings(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Load settings on mount and when session changes
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    saving,
    error,
    loadSettings,
    saveSettings,
    updateSetting,
    updateSettings,
    clearError: () => setError(null)
  };
}
