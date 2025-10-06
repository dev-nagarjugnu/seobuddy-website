"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface TawkToWidgetProps {
  widgetId: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnPages?: string[];
  hideOnPages?: string[];
}

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function TawkToWidget({ 
  widgetId, 
  position = 'bottom-right',
  showOnPages = [],
  hideOnPages = []
}: TawkToWidgetProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('TawkToWidget: Component mounted');
    console.log('TawkToWidget: Widget ID:', widgetId);
    
    // Check if we should show the widget on current page
    const currentPath = window.location.pathname;
    console.log('TawkToWidget: Current path:', currentPath);
    
    // Hide on specific pages
    if (hideOnPages.some(page => currentPath.startsWith(page))) {
      console.log('TawkToWidget: Hiding widget on dashboard page');
      return;
    }
    
    // Show only on specific pages (if specified)
    if (showOnPages.length > 0 && !showOnPages.some(page => currentPath.startsWith(page))) {
      console.log('TawkToWidget: Widget not allowed on this page');
      return;
    }

    console.log('TawkToWidget: Initializing widget...');

    // Initialize Tawk.to using the exact same approach as your script
    const initTawkTo = () => {
      if (typeof window !== 'undefined') {
        console.log('TawkToWidget: Setting up Tawk.to');
        
        // Initialize exactly like your script
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/${widgetId}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode?.insertBefore(s1, s0);

        // Set up callbacks after script loads
        window.Tawk_API.onLoad = function() {
          console.log('TawkToWidget: Widget loaded successfully');
          
          // Set visitor information if user is authenticated
          if (status === 'authenticated' && session?.user) {
            console.log('TawkToWidget: Setting visitor info for authenticated user');
            window.Tawk_API.visitor = {
              name: session.user.name || 'Guest',
              email: session.user.email || '',
              hash: session.user.id || ''
            };
          }
        };

        window.Tawk_API.onStatusChange = function(status: string) {
          console.log('TawkToWidget: Status changed:', status);
        };

        window.Tawk_API.onBeforeLoad = function() {
          console.log('TawkToWidget: Widget loading...');
        };
      }
    };

    // Initialize immediately
    initTawkTo();

    return () => {
      console.log('TawkToWidget: Component unmounting');
      // Clean up if needed
      if (typeof window !== 'undefined' && window.Tawk_API) {
        try {
          window.Tawk_API.endChat();
        } catch (error) {
          console.log('TawkToWidget: Cleanup error:', error);
        }
      }
    };
  }, [widgetId, status, session, showOnPages, hideOnPages]);

  // Don't render anything - Tawk.to creates its own widget
  return null;
} 