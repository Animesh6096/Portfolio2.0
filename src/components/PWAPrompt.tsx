import { useEffect, useState } from 'react';

// Define a type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-400/20">
      <h3 className="text-lg font-semibold text-purple-300 mb-2">Install App</h3>
      <p className="text-gray-300 mb-4">Install this app on your device for quick access and better experience</p>
      <div className="flex gap-4">
        <button
          onClick={handleInstall}
          className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg text-white"
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-purple-300"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
