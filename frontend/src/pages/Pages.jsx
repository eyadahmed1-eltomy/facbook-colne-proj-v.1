import { pages } from '../data/mockData';

export default function Pages() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="page-header">
        <h1>📄 Pages</h1>
        <p>Discover pages and connect with businesses and creators</p>
        <div className="page-header-actions">
          <button className="btn btn-primary">+ Create New Page</button>
          <button className="btn btn-secondary">Liked Pages</button>
          <button className="btn btn-secondary">Invites</button>
        </div>
      </div>
      <div className="sidebar-section-title">Discover Pages</div>
      <div className="grid-cards">
        {pages.map((p) => (
          <div key={p.id} className="page-card glass-card">
            <div className="card-cover"><img src={p.cover} alt={p.name} /></div>
            <div className="card-body">
              <h3>{p.name} {p.verified && <span title="Verified" style={{ color: 'var(--accent-light)' }}>✓</span>}</h3>
              <p>{p.followers} followers · {p.category}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>👍 Like</button>
                <button className="btn btn-secondary" style={{ flex: 1 }}>Follow</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
