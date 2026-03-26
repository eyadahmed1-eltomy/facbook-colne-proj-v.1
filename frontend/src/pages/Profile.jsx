import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { posts, users } from '../data/mockData';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Posts');
  const tabs = ['Posts', 'About', 'Friends', 'Photos', 'Videos', 'Check-ins'];

  const userPosts = posts.slice(0, 3);

  return (
    <div className="profile-page">
      <div className="profile-cover glass-card" style={{ borderRadius: '0 0 var(--radius) var(--radius)' }}>
        <img src={user?.cover} alt="" />
        <button className="btn btn-secondary" style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
          📷 Edit Cover Photo
        </button>
      </div>

      <div className="profile-info">
        <div className="profile-avatar-wrapper">
          <img src={user?.avatar} alt="" className="avatar avatar-xl" />
        </div>
        <div className="profile-details">
          <h1 className="profile-name">{user?.name}</h1>
          <p className="profile-bio">{user?.bio}</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {user?.friends?.toLocaleString()} friends · {user?.followers?.toLocaleString()} followers
          </p>
          <div className="profile-friends-preview">
            {users.slice(0, 8).map((u) => (
              <img key={u.id} src={u.avatar} alt={u.name} title={u.name} />
            ))}
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn btn-primary">✏️ Edit Profile</button>
          <button className="btn btn-secondary">👁️ View As</button>
          <button className="btn-icon">⋯</button>
        </div>
      </div>

      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={`profile-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '16px' }}>
        {/* Left Column - About */}
        <div>
          <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '16px' }}>Intro</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '16px' }}>{user?.bio}</p>
            <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>Edit Bio</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                💼 <span>{user?.work}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                🎓 <span>{user?.education}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                📍 <span>Lives in {user?.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                ⏰ <span>Joined {user?.joined}</span>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '12px' }}>Edit Details</button>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Photos</h3>
              <a href="#" style={{ fontSize: '0.88rem' }}>See all photos</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              {posts.filter(p => p.image).map((p) => (
                <img key={p.id} src={p.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Posts */}
        <div>
          <div className="create-post glass-card" style={{ marginBottom: '16px', padding: '16px' }}>
            <div className="create-post-top">
              <img src={user?.avatar} alt="" className="avatar avatar-md" />
              <button className="create-post-input">What's on your mind?</button>
            </div>
            <div className="create-post-actions">
              <button className="create-post-action">🎥 Live</button>
              <button className="create-post-action">🖼️ Photo</button>
              <button className="create-post-action">😊 Feeling</button>
            </div>
          </div>
          {userPosts.map((post) => (
            <div key={post.id} className="post glass-card">
              <div className="post-header">
                <img src={user?.avatar} alt="" className="avatar avatar-md" />
                <div className="post-user-info">
                  <div className="post-username">{user?.name}</div>
                  <div className="post-meta"><span>{post.time}</span> · 🌐</div>
                </div>
                <button className="btn-icon" style={{ width: 32, height: 32 }}>⋯</button>
              </div>
              <div className="post-content">{post.content}</div>
              {post.image && <img src={post.image} alt="" className="post-image" />}
              <div className="post-stats">
                <span>💜 {post.likes}</span>
                <span>{post.comments} comments</span>
              </div>
              <div className="post-actions">
                <button className="post-action-btn">🤍 Like</button>
                <button className="post-action-btn">💬 Comment</button>
                <button className="post-action-btn">↗️ Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
