// src/lib/env-validation.ts

interface EnvConfig {
  NEXT_PUBLIC_PUSHER_APP_KEY?: string;
  NEXT_PUBLIC_PUSHER_APP_CLUSTER?: string;
  NEXT_PUBLIC_TAWK_TO_WIDGET_ID?: string;
}

export const validateEnvironment = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  const requiredEnvVars: (keyof EnvConfig)[] = [
    'NEXT_PUBLIC_PUSHER_APP_KEY',
    'NEXT_PUBLIC_PUSHER_APP_CLUSTER'
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getEnvConfig = (): EnvConfig => {
  return {
    NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    NEXT_PUBLIC_PUSHER_APP_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    NEXT_PUBLIC_TAWK_TO_WIDGET_ID: process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID,
  };
};

// Log environment validation on startup (only in development)
if (process.env.NODE_ENV === 'development') {
  const validation = validateEnvironment();
  if (!validation.isValid) {
    console.warn('Environment validation warnings:');
    validation.errors.forEach(error => console.warn(`- ${error}`));
    console.warn('Some features may not work correctly without proper environment configuration.');
  }
}