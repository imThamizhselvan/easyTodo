import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion } from 'framer-motion';

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered');
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-lg"
    >
      <div className="flex-1">
        {offlineReady ? (
          <span className="text-purple-600">
            App ready to work offline ✨
          </span>
        ) : (
          <span className="text-purple-600">
            New version available 🎉
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {needRefresh && (
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-600 transition-colors"
            onClick={() => updateServiceWorker(true)}
          >
            Update
          </button>
        )}
        <button
          className="text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => close()}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
} 