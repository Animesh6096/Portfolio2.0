import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0a0a1a] flex items-center justify-center z-50 animate-fade-in">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-l-4 border-purple-500 animate-spin filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-4 border-r-4 border-purple-300 animate-spin-reverse filter drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"></div>
        </div>
      </div>
    </div>
  );
}