import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mainItems = [
    { icon: '👤', label: user?.name, path: '/profile', avatar: user?.avatar },
    { icon: '📰', label: 'News Feed', path: '/' },
    { icon: '💬', label: 'Messenger', path: '/messages' },
    { icon: '👥', label: 'Groups', path: '/groups' },
    { icon: '🏪', label: 'Marketplace', path: '/marketplace' },
    { icon: '📄', label: 'Pages', path: '/pages' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
  ];

  const shortcuts = [
    { icon: '📸', label: 'Photography Club' },
    { icon: '💻', label: 'Tech Innovators' },
    { icon: '🎮', label: 'Gaming Community' },
  ];

  const exploreItems = [
    { icon: '🎬', label: 'Watch' },
    { icon: '📅', label: 'Events' },
    { icon: '🌟', label: 'Memories' },
    { icon: '💾', label: 'Saved' },
    { icon: '🏷️', label: 'Favorites' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar-left">
      <div className="sidebar-nav">
        {mainItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.avatar ? (
              <img src={item.avatar} alt="" className="avatar avatar-sm" />
            ) : (
              <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>{item.icon}</span>
            )}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-section-title">Your Shortcuts</div>
      <div className="sidebar-nav">
        {shortcuts.map((item) => (
          <button key={item.label} className="sidebar-item">
            <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-section-title">Explore</div>
      <div className="sidebar-nav">
        {exploreItems.map((item) => (
          <button key={item.label} className="sidebar-item">
            <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 14px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        Privacy · Terms · Advertising · Cookies · © 2026 Velora
      </div>
    </aside>
  );
}
