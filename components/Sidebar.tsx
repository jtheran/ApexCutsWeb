import React from 'react';
import type { ViewType } from '../App';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  viewName: ViewType;
  label: string;
  icon: React.ReactElement;
  activeView: ViewType;
  onClick: (view: ViewType) => void;
}> = ({ viewName, label, icon, activeView, onClick }) => {
  const isActive = activeView === viewName;
  return (
    <button
      onClick={() => onClick(viewName)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-white'
          : 'text-on-surface-variant hover:bg-surface hover:text-on-surface'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-6 h-6 mr-3' })}
      <span>{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
    
  const icons = {
    dashboard: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10v11h6V11H3zM15 4v17h6V4h-6zM9 15v6h6v-6H9z" /></svg>,
    appointments: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    workers: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    services: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    notifications: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    settings: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  };

  const handleNavigation = (view: ViewType) => {
    setActiveView(view);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
        ></div>
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface p-4 flex flex-col justify-between border-r border-gray-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div>
          <div className="flex items-center mb-8 px-2">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-xl font-bold ml-2 text-on-surface">Apex Cuts</h1>
          </div>
          <nav className="space-y-2">
            <NavItem viewName="dashboard" label="Dashboard" icon={icons.dashboard} activeView={activeView} onClick={handleNavigation} />
            <NavItem viewName="appointments" label="Appointments" icon={icons.appointments} activeView={activeView} onClick={handleNavigation} />
            <NavItem viewName="workers" label="Staff" icon={icons.workers} activeView={activeView} onClick={handleNavigation} />
            <NavItem viewName="services" label="Services" icon={icons.services} activeView={activeView} onClick={handleNavigation} />
            <NavItem viewName="notifications" label="Notifications" icon={icons.notifications} activeView={activeView} onClick={handleNavigation} />
          </nav>
        </div>
        <div>
           <NavItem viewName="settings" label="Settings" icon={icons.settings} activeView={activeView} onClick={handleNavigation} />
           <div className="mt-4 border-t border-gray-700 pt-4 flex items-center px-2">
              <img className="h-10 w-10 rounded-full" src="https://picsum.photos/100" alt="Admin"/>
              <div className="ml-3">
                  <p className="text-sm font-medium text-on-surface">Admin</p>
                  <p className="text-xs text-on-surface-variant">admin@apexcuts.com</p>
              </div>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;