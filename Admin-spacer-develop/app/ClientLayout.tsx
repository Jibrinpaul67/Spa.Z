// ClientLayout.tsx (Client-side)
"use client"; // Mark this as a client-side component

import SidebarContainer from './main-components/sidebarcontainer';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMainPage = pathname.startsWith('/main'); // Check if the route is inside the "main" folder

  return (
    <div className="flex">
      {/* Conditionally render Sidebar only for 'main' folder pages */}
      {isMainPage && <SidebarContainer />}
      <main className={`flex-grow ${isMainPage ? '' : ''}`}>
        {children}
      </main>
    </div>
  );
}
