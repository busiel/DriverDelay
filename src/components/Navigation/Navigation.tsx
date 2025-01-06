import React from 'react';
import { List, PlusCircle } from 'lucide-react';
import { NavLink } from './NavLink';
import { NewsletterCTA } from '../Newsletter/NewsletterCTA';
import { SatisfactionStats } from './SatisfactionStats';

interface NavigationProps {
  currentView: 'list' | 'form' | 'detail';
  onNavigate: (view: 'list' | 'form') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="bg-white shadow-md p-4 rounded-lg">
      <div className="space-y-2">
        <NavLink
          icon={List}
          label="Recent Delays"
          isActive={currentView === 'list'}
          onClick={() => onNavigate('list')}
        />
        <NavLink
          icon={PlusCircle}
          label="New Delay"
          isActive={currentView === 'form'}
          onClick={() => onNavigate('form')}
        />
      </div>
      
      <SatisfactionStats />
      <NewsletterCTA />
    </nav>
  );
};