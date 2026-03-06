import React, { useState } from 'react';

import { Dashboard } from './Dashboard';
import { Docs } from './docs';

export const DataHub = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'docs'>('dashboard');

  return (
    <div className="min-h-screen bg-white dark:bg-black">
    
      <main className="px-4 py-8">
        {activeView === 'dashboard' ? (
          <Dashboard />
        ) : (
          <Docs onBack={() => setActiveView('dashboard')} />
        )}
      </main>
    </div>
  );
};