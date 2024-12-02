import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const handler = (e: Event) => {
      console.log('beforeinstallprompt triggered');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show prompt for iOS devices after a delay
    if (isIOSDevice && !localStorage.getItem('installPromptDismissed')) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Just close the prompt for iOS users after showing instructions
      setShowPrompt(false);
      localStorage.setItem('installPromptDismissed', 'true');
      return;
    }

    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      return;
    }

    try {
      console.log('Triggering prompt');
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User ${outcome} the installation`);
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIOS) {
      localStorage.setItem('installPromptDismissed', 'true');
    }
  };

  if (!showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 bg-white px-4 py-3 rounded-lg shadow-lg z-50"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex-1">
          <p className="text-purple-600 font-medium">
            {isIOS ? 'Install Easy Todo on your iPhone/iPad!' : 'Install Easy Todo for easier access! 📱'}
          </p>
          <p className="text-sm text-gray-500">
            {isIOS 
              ? 'Tap the share button and select "Add to Home Screen"'
              : 'Add to your home screen for quick access'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600 transition-colors whitespace-nowrap"
          >
            {isIOS ? 'Show Me How' : 'Install'}
          </button>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap"
          >
            Later
          </button>
        </div>
      </div>
    </motion.div>
  );
} 