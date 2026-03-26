export default function PrivacyCenter() {
  const cards = [
    { icon: '🔒', title: 'Privacy Checkup', desc: 'Review your privacy settings and make sure they work the way you want.' },
    { icon: '👤', title: 'Who Can See What You Share', desc: 'Control who sees your posts, profile information, and activity.' },
    { icon: '📱', title: 'Your Data Settings', desc: 'Manage the data Velora collects and how it\'s used.' },
    { icon: '🔐', title: 'Account Security', desc: 'Protect your account with strong passwords and two-factor authentication.' },
    { icon: '📊', title: 'Ad Preferences', desc: 'Control how your data is used for ad targeting and personalization.' },
    { icon: '🌐', title: 'Search & Discovery', desc: 'Manage how people find and connect with you on Velora.' },
    { icon: '📋', title: 'Your Activity Log', desc: 'Review and manage your activity history across Velora.' },
    { icon: '🤝', title: 'Apps & Websites', desc: 'Manage third-party apps connected to your Velora account.' },
    { icon: '📥', title: 'Download Your Information', desc: 'Get a copy of your data including posts, photos, and messages.' },
    { icon: '👁️', title: 'Face Recognition', desc: 'Control whether Velora can recognize you in photos and videos.' },
    { icon: '📍', title: 'Location Services', desc: 'Manage how your location data is collected and used.' },
    { icon: '🗑️', title: 'Deactivation & Deletion', desc: 'Options for deactivating or permanently deleting your account.' },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div className="privacy-hero glass-card">
        <h1>🛡️ Privacy Center</h1>
        <p>Learn how Velora collects, uses, and shares your data. Take control of your privacy with tools you can use anytime.</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }}>Start Privacy Checkup</button>
      </div>

      <div className="sidebar-section-title">Privacy Tools & Settings</div>
      <div className="privacy-grid">
        {cards.map((card, i) => (
          <div key={i} className="privacy-card glass-card">
            <div className="privacy-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <a href="#" style={{ fontSize: '0.85rem', marginTop: '12px', display: 'inline-block' }}>Manage →</a>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '32px', marginTop: '24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '12px' }}>Data Policy</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
          At Velora, your privacy matters. We are committed to transparency about how we collect, use, and protect your personal information. Review our comprehensive privacy policy to understand your rights.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-secondary">Read Full Policy</button>
          <button className="btn btn-secondary">Cookie Policy</button>
          <button className="btn btn-secondary">Terms of Service</button>
        </div>
      </div>
    </div>
  );
}
