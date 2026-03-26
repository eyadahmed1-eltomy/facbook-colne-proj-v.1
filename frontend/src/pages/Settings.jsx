import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const settingSections = [
  { id: 'general', icon: '⚙️', label: 'General', items: [
    { label: 'Name', desc: 'Change your display name', value: 'Alex Velorum' },
    { label: 'Username', desc: 'Your unique Velora handle', value: '@alexvelorum' },
    { label: 'Email', desc: 'Manage your email address', value: 'alex@velora.com' },
    { label: 'Phone', desc: 'Add or change phone number', value: '+1 (555) 123-4567' },
    { label: 'Language', desc: 'Choose your preferred language', value: 'English (US)' },
  ]},
  { id: 'privacy', icon: '🔒', label: 'Privacy', items: [
    { label: 'Who can see your posts', toggle: true, value: 'Friends' },
    { label: 'Who can send you friend requests', toggle: true, value: 'Everyone' },
    { label: 'Who can look you up by email', toggle: true, value: 'Friends of friends' },
    { label: 'Who can look you up by phone', toggle: true, value: 'Friends' },
    { label: 'Search engine indexing', desc: 'Allow search engines to link to your profile', isToggle: true, on: false },
  ]},
  { id: 'security', icon: '🛡️', label: 'Security & Login', items: [
    { label: 'Change Password', desc: 'Update your password regularly', action: true },
    { label: 'Two-Factor Authentication', desc: 'Add extra security to your account', isToggle: true, on: true },
    { label: 'Login Alerts', desc: 'Get notified about unrecognized logins', isToggle: true, on: true },
    { label: 'Authorized Logins', desc: 'Review devices where you\'re logged in', action: true },
    { label: 'App Passwords', desc: 'Manage passwords for third-party apps', action: true },
  ]},
  { id: 'notifications', icon: '🔔', label: 'Notifications', items: [
    { label: 'Push Notifications', desc: 'Receive notifications on your device', isToggle: true, on: true },
    { label: 'Email Notifications', desc: 'Receive updates via email', isToggle: true, on: false },
    { label: 'SMS Notifications', desc: 'Receive updates via text message', isToggle: true, on: false },
    { label: 'Friend Requests', desc: 'Notify when someone sends a request', isToggle: true, on: true },
    { label: 'Tags', desc: 'Notify when someone tags you', isToggle: true, on: true },
  ]},
  { id: 'blocking', icon: '🚫', label: 'Blocking', items: [
    { label: 'Blocked Users', desc: 'Manage your blocked users list', action: true },
    { label: 'Block Messages', desc: 'Block messages from non-friends', isToggle: true, on: false },
    { label: 'Block App Invites', desc: 'Block app invitations', action: true },
    { label: 'Block Page Invites', desc: 'Block page invitations', action: true },
  ]},
  { id: 'account', icon: '👤', label: 'Account Management', items: [
    { label: 'Download Your Data', desc: 'Get a copy of your Velora data', action: true },
    { label: 'Deactivate Account', desc: 'Temporarily disable your account', action: true, danger: true },
    { label: 'Delete Account', desc: 'Permanently delete your account and data', action: true, danger: true },
  ]},
];

export default function Settings() {
  const [active, setActive] = useState('general');
  const [toggles, setToggles] = useState({});
  const { user } = useAuth();

  const section = settingSections.find(s => s.id === active);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, padding: '8px 14px', marginBottom: '8px' }}>Settings</h2>
        <div className="sidebar-nav">
          {settingSections.map(s => (
            <button key={s.id} className={`sidebar-item ${active === s.id ? 'active' : ''}`} onClick={() => setActive(s.id)}>
              <span style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-card glass-card">
          <h3>{section.icon} {section.label}</h3>
          {section.items.map((item, i) => {
            const toggleKey = `${active}-${i}`;
            const isOn = toggles[toggleKey] !== undefined ? toggles[toggleKey] : item.on;
            return (
              <div key={i} className="setting-row">
                <div>
                  <div className="setting-label">{item.label}</div>
                  {item.desc && <div className="setting-desc">{item.desc}</div>}
                  {item.value && <div style={{ fontSize: '0.82rem', color: 'var(--accent-light)', marginTop: '2px' }}>{item.value}</div>}
                </div>
                {item.isToggle && (
                  <div className={`toggle ${isOn ? 'active' : ''}`} onClick={() => handleToggle(toggleKey)} />
                )}
                {item.action && (
                  <button className={`btn ${item.danger ? 'btn-ghost' : 'btn-secondary'}`}
                    style={item.danger ? { color: '#ef4444' } : { padding: '6px 16px', fontSize: '0.82rem' }}>
                    {item.danger ? 'Manage' : 'Edit'}
                  </button>
                )}
                {item.toggle && (
                  <button className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.82rem' }}>{item.value}</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
