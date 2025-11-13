import { Slot, usePathname, useRouter } from 'expo-router';
import SettingsNavBar from '../../components/SettingsNavBar';

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  // currentPage из пути: /settings/<type>
  const parts = pathname?.split('/') || [];
  const currentPage = parts[2] || 'main';

  const handleNavigate = (pageId) => {
    if (pageId === 'main') {
      router.push('/settings');
    } else {
      router.push(`/settings/${pageId}`);
    }
  }

  return (
    <>
      {/* Навбар сверху — он получает актуальный currentPage из пути */}
      <SettingsNavBar currentPage={currentPage} onNavigate={handleNavigate} />
      <Slot />
    </>
  )
}
