import React from 'react';
import { Truck } from 'lucide-react';
import { Navigation } from '../Navigation/Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: 'list' | 'form' | 'detail';
  onNavigate: (view: 'list' | 'form') => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <Truck className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Driver Delay Logger</h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <Navigation currentView={currentView} onNavigate={onNavigate} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};