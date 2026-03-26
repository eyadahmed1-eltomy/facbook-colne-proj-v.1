import { groups } from '../data/mockData';

export default function Groups() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="page-header">
        <h1>👥 Groups</h1>
        <p>Discover and join communities that match your interests</p>
        <div className="page-header-actions">
          <button className="btn btn-primary">+ Create New Group</button>
          <button className="btn btn-secondary">🔍 Discover</button>
          <button className="btn btn-secondary">Your Groups</button>
        </div>
      </div>
      <div className="sidebar-section-title">Suggested for You</div>
      <div className="grid-cards">
        {groups.map((g) => (
          <div key={g.id} className="group-card glass-card">
            <div className="card-cover"><img src={g.cover} alt={g.name} /></div>
            <div className="card-body">
              <h3>{g.name}</h3>
              <p>{g.members} members · {g.category}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{g.desc}</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>Join Group</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
