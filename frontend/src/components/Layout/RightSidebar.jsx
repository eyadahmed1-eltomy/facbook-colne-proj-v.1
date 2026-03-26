import { users } from '../../data/mockData';

export default function RightSidebar() {
  const onlineUsers = users.filter((u) => u.online);
  const offlineUsers = users.filter((u) => !u.online);

  return (
    <aside className="sidebar-right">
      <div style={{ padding: '8px 14px', marginBottom: '8px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(168,85,247,0.1))',
          borderRadius: 'var(--radius-sm)',
          padding: '14px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>🎂 Birthdays</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <strong>Sophia Laurent</strong> and <strong>2 others</strong> have birthdays today.
          </div>
        </div>
      </div>

      <div className="sidebar-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Contacts</span>
        <span style={{ fontSize: '1rem', cursor: 'pointer' }}>⋯</span>
      </div>

      <div>
        {onlineUsers.map((u) => (
          <div key={u.id} className="contact-item">
            <div style={{ position: 'relative' }}>
              <img src={u.avatar} alt={u.name} className="avatar avatar-sm" />
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 10, height: 10, background: '#00d26a',
                borderRadius: '50%', border: '2px solid var(--bg-primary)'
              }} />
            </div>
            <span>{u.name}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section-title" style={{ marginTop: '8px' }}>
        More Contacts
      </div>

      <div>
        {offlineUsers.map((u) => (
          <div key={u.id} className="contact-item">
            <img src={u.avatar} alt={u.name} className="avatar avatar-sm" style={{ opacity: 0.6 }} />
            <span style={{ opacity: 0.6 }}>{u.name}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section-title" style={{ marginTop: '16px' }}>
        Group Conversations
      </div>
      <div className="contact-item">
        <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>🎨</span>
        <span>Design Team</span>
      </div>
      <div className="contact-item">
        <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>🚀</span>
        <span>Project Alpha</span>
      </div>
      <div className="contact-item">
        <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>🎮</span>
        <span>Gaming Squad</span>
      </div>
    </aside>
  );
}
