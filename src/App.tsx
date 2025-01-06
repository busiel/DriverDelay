import React, { useState } from 'react';
import { AuthForm } from './components/Auth/AuthForm';
import DelayDetail from './components/DelayDetail';
import DelayForm from './components/DelayForm';
import { DelayList } from './components/DelayList/DelayList';
import { MainLayout } from './components/Layout/MainLayout';
import { useAuth } from './hooks/useAuth';
import { useDelays } from './hooks/useDelays';
import type { DelayFormData } from './types/delay';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'detail'>('list');
  const [selectedDelay, setSelectedDelay] = useState<DelayFormData | null>(null);
  const { delays, loading, error, refetch } = useDelays();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AuthForm />;
  }

  const handleNavigate = (view: 'list' | 'form') => {
    setCurrentView(view);
    if (view === 'list') {
      setSelectedDelay(null);
      refetch();
    }
  };

  const handleSelectDelay = (delay: DelayFormData) => {
    setSelectedDelay(delay);
    setCurrentView('detail');
  };

  return (
    <MainLayout currentView={currentView} onNavigate={handleNavigate}>
      {currentView === 'form' ? (
        <DelayForm 
          key={selectedDelay ? 'edit' : 'new'}
          initialData={selectedDelay || undefined} 
          onSave={() => {
            setCurrentView('list');
            refetch();
          }} 
        />
      ) : currentView === 'detail' && selectedDelay ? (
        <DelayDetail 
          delay={selectedDelay} 
          onEdit={() => setCurrentView('form')} 
        />
      ) : (
        <DelayList 
          delays={delays}
          loading={loading}
          error={error}
          onSelectDelay={handleSelectDelay}
        />
      )}
    </MainLayout>
  );
}