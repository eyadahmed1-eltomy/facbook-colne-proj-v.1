import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

export default function Layout() {
  const location = useLocation();
  const isMessagesPage = location.pathname === '/messages';
  const isSettingsPage = location.pathname.startsWith('/settings');

  return (
    <>
      <Navbar />
      <div className="app-layout">
        {!isMessagesPage && !isSettingsPage && <Sidebar />}
        <main className="main-feed" style={
          isMessagesPage ? { marginLeft: 0, marginRight: 0, maxWidth: '100%', padding: 0 } :
          isSettingsPage ? { marginLeft: 0, marginRight: 0, maxWidth: '100%', padding: 0 } : {}
        }>
          <Outlet />
        </main>
        {!isMessagesPage && !isSettingsPage && <RightSidebar />}
      </div>
    </>
  );
}
