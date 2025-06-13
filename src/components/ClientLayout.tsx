'use client';

import { usePathname } from 'next/navigation';
import Header from './Header/Header';
import ScrollEffect from './ScrollEffect';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // rutas donde no se debe mostrar el header
  const hideHeaderRoutes = ['/crear-cuenta'];

  const showHeader = !hideHeaderRoutes.includes(pathname);

  return (
    <>
      <ScrollEffect />
      {showHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
