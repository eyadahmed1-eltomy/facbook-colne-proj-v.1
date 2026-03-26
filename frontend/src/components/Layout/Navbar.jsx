import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navTabs = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/groups', icon: '👥', label: 'Groups' },
    { path: '/marketplace', icon: '🏪', label: 'Marketplace' },
    { path: '/pages', icon: '📄', label: 'Pages' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Velora</Link>

      <div className="navbar-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          placeholder="Search Velora..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="global-search"
        />
      </div>

      <div className="navbar-center">
        {navTabs.map((tab) => (
          <button
            key={tab.path}
            className={`nav-tab ${isActive(tab.path) ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
            title={tab.label}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      <div className="navbar-right">
        <button className="btn-icon" onClick={() => navigate('/messages')} title="Messenger">
          💬
        </button>
        <button className="btn-icon" onClick={() => navigate('/notifications')} title="Notifications" style={{ position: 'relative' }}>
          🔔
          <span style={{
            position: 'absolute', top: '2px', right: '2px',
            width: '10px', height: '10px', background: '#ef4444',
            borderRadius: '50%', border: '2px solid var(--bg-primary)'
          }} />
        </button>

        <div className="dropdown">
          <button
            className="btn-icon"
            onClick={() => setShowMenu(!showMenu)}
            style={{ overflow: 'hidden', padding: 0 }}
          >
            <img src={user?.avatar} alt="" className="avatar avatar-md" style={{ border: 'none' }} />
          </button>

          {showMenu && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setShowMenu(false)} />
              <div className="dropdown-menu glass-card">
                <button className="dropdown-item" onClick={() => { navigate('/profile'); setShowMenu(false); }}>
                  <img src={user?.avatar} alt="" className="avatar avatar-sm" />
                  <div>
                    <div style={{ fontWeight: 700 }}>{user?.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>See your profile</div>
                  </div>
                </button>
                <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />
                <button className="dropdown-item" onClick={() => { navigate('/settings'); setShowMenu(false); }}>
                  ⚙️ <span>Settings & Privacy</span>
                </button>
                <button className="dropdown-item" onClick={() => { navigate('/privacy'); setShowMenu(false); }}>
                  🛡️ <span>Privacy Center</span>
                </button>
                <button className="dropdown-item" onClick={() => { navigate('/settings'); setShowMenu(false); }}>
                  ❓ <span>Help & Support</span>
                </button>
                <button className="dropdown-item" onClick={() => { navigate('/settings'); setShowMenu(false); }}>
                  🌙 <span>Display & Accessibility</span>
                </button>
                <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />
                <button className="dropdown-item" onClick={() => { logout(); navigate('/login'); setShowMenu(false); }}>
                  🚪 <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
