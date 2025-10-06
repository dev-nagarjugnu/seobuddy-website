// src/lib/settings.ts

export interface SettingsData {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    compactMode: boolean;
    animations: boolean;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
    autoBackup: boolean;
  };
}

export const defaultSettings: SettingsData = {
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30
  },
  appearance: {
    theme: 'dark',
    compactMode: false,
    animations: true
  },
  system: {
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true
  }
};

// Apply theme to document
export function applyTheme(theme: 'light' | 'dark' | 'auto') {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const body = document.body;
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  body.classList.remove('light', 'dark');
  
  if (theme === 'auto') {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const finalTheme = prefersDark ? 'dark' : 'light';
    root.classList.add(finalTheme);
    body.classList.add(finalTheme);
  } else {
    root.classList.add(theme);
    body.classList.add(theme);
  }
  
  // Also set data attribute for CSS targeting
  root.setAttribute('data-theme', theme);
  
  console.log(`Theme applied: ${theme}`);
}

// Apply compact mode
export function applyCompactMode(compact: boolean) {
  if (typeof window === 'undefined') return;
  
  const body = document.body;
  
  if (compact) {
    body.classList.add('compact-mode');
  } else {
    body.classList.remove('compact-mode');
  }
}

// Apply animations
export function applyAnimations(enabled: boolean) {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  if (enabled) {
    root.classList.remove('no-animations');
  } else {
    root.classList.add('no-animations');
  }
}

// Apply all appearance settings
export function applyAppearanceSettings(settings: SettingsData['appearance']) {
  applyTheme(settings.theme);
  applyCompactMode(settings.compactMode);
  applyAnimations(settings.animations);
}

// Get system theme preference
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Listen for system theme changes
export function listenForSystemThemeChange(callback: (theme: 'light' | 'dark') => void) {
  if (typeof window === 'undefined') return;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handleChange);
}

// Validate settings
export function validateSettings(settings: any): settings is SettingsData {
  if (!settings || typeof settings !== 'object') return false;
  
  const required = ['notifications', 'security', 'appearance', 'system'];
  for (const key of required) {
    if (!(key in settings)) return false;
  }
  
  return true;
}

// Merge settings with defaults
export function mergeWithDefaults(settings: Partial<SettingsData>): SettingsData {
  return {
    notifications: { ...defaultSettings.notifications, ...settings.notifications },
    security: { ...defaultSettings.security, ...settings.security },
    appearance: { ...defaultSettings.appearance, ...settings.appearance },
    system: { ...defaultSettings.system, ...settings.system }
  };
}
