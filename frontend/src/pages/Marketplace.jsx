import { marketplace } from '../data/mockData';

export default function Marketplace() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="page-header">
        <h1>🏪 Marketplace</h1>
        <p>Buy and sell items in your community</p>
        <div className="page-header-actions">
          <button className="btn btn-primary">+ Create New Listing</button>
          <button className="btn btn-secondary">🔍 Browse All</button>
          <button className="btn btn-secondary">Your Listings</button>
          <button className="btn btn-secondary">Saved</button>
        </div>
      </div>
      <div className="sidebar-section-title">Featured Listings</div>
      <div className="grid-cards">
        {marketplace.map((item) => (
          <div key={item.id} className="marketplace-card glass-card">
            <div className="card-cover"><img src={item.image} alt={item.title} /></div>
            <div className="card-body">
              <div className="marketplace-price">{item.price}</div>
              <h3 style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
              <p>📍 {item.location} · {item.condition}</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>Message Seller</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
