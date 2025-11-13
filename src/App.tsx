import React, { useState, useEffect } from 'react';
import Login from './components/Login.tsx';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import Appointments from './components/Appointments.tsx';
import Workers from './components/Workers.tsx';
import Services from './components/Services.tsx';
import Notifications from './components/Notifications.tsx';
import Settings from './components/Settings.tsx';
import Products from './components/Products.tsx';
import Categories from './components/Categories.tsx';

export type ViewType = 'dashboard' | 'appointments' | 'workers' | 'services' | 'products' | 'categories' | 'notifications' | 'settings';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Reset to default view after logout
    setActiveView('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'workers':
        return <Workers />;
      case 'services':
        return <Services />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings onLogout={handleLogout} theme={theme} setTheme={setTheme} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen font-sans">
       <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-surface rounded-md text-gray-800 dark:text-on-surface shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;