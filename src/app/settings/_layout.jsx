import { router, Slot } from 'expo-router';
import SettingsNavBar from '../../components/SettingsNavBar';
import { useState } from 'react';

export default function Layout() {
  const [currentPage, setCurrentPage] = useState('main');

  const handleNavigate = (pageId) => {
    // Navigate to the selected settings page
    if (pageId === 'main') {
      router.push('/settings');
    } else{
      router.push(`/settings/${pageId}`);
    }
    setCurrentPage(pageId);
  }

  return (
    <>
      <Slot />
      <SettingsNavBar currentPage={currentPage} onNavigate={handleNavigate} />
    </>
  )
}
