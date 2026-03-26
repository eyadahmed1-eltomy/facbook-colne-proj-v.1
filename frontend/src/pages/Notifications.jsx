import { notifications } from '../data/mockData';

export default function Notifications() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>Notifications</h1>
        <button className="btn-icon">⋯</button>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>All</button>
        <button className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>Unread</button>
      </div>
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', fontWeight: 700, fontSize: '0.92rem' }}>Earlier</div>
        {notifications.map((n) => (
          <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
            <img src={n.user.avatar} alt="" className="avatar avatar-lg" />
            <div className="notification-text">
              <strong>{n.user.name}</strong> {n.text}
              <div className="notification-time">{n.time}</div>
            </div>
            {n.unread && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
