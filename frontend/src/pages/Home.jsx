import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { stories, posts as initialPosts } from '../data/mockData';

function Stories() {
  return (
    <div className="stories-container glass-card" style={{ padding: '12px' }}>
      <div className="story-card create-story">
        <div className="create-story-icon">+</div>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Create Story</span>
      </div>
      {stories.map((story) => (
        <div key={story.id} className="story-card">
          <img src={story.image} alt="" />
          <img src={story.user.avatar} alt="" className="story-avatar" />
          <div className="story-overlay">
            <span className="story-name">{story.user.name.split(' ')[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatePost() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState('');

  return (
    <>
      <div className="create-post glass-card">
        <div className="create-post-top">
          <img src={user?.avatar} alt="" className="avatar avatar-md" />
          <button className="create-post-input" onClick={() => setShowModal(true)}>
            What's on your mind, {user?.name?.split(' ')[0]}?
          </button>
        </div>
        <div className="create-post-actions">
          <button className="create-post-action">🎥 Live Video</button>
          <button className="create-post-action">🖼️ Photo/Video</button>
          <button className="create-post-action">😊 Feeling/Activity</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Post</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src={user?.avatar} alt="" className="avatar avatar-md" />
              <div>
                <div style={{ fontWeight: 700 }}>{user?.name}</div>
                <button className="btn btn-ghost" style={{ padding: '2px 10px', fontSize: '0.75rem', borderRadius: '6px', background: 'var(--bg-tertiary)' }}>
                  🌐 Public ▾
                </button>
              </div>
            </div>
            <textarea
              placeholder={`What's on your mind, ${user?.name?.split(' ')[0]}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              style={{ width: '100%', minHeight: '150px', resize: 'none', background: 'transparent', border: 'none', fontSize: '1.1rem', color: 'var(--text-primary)' }}
              autoFocus
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Add to your post</span>
              <div style={{ display: 'flex', gap: '12px', fontSize: '1.3rem' }}>
                <span style={{ cursor: 'pointer' }} title="Photo/Video">🖼️</span>
                <span style={{ cursor: 'pointer' }} title="Tag People">👤</span>
                <span style={{ cursor: 'pointer' }} title="Feeling">😊</span>
                <span style={{ cursor: 'pointer' }} title="Check in">📍</span>
                <span style={{ cursor: 'pointer' }} title="GIF">🎞️</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowModal(false)}>Post</button>
          </div>
        </div>
      )}
    </>
  );
}

function Post({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="post glass-card">
      <div className="post-header">
        <img src={post.user.avatar} alt="" className="avatar avatar-md" />
        <div className="post-user-info">
          <div className="post-username">{post.user.name}</div>
          <div className="post-meta">
            <span>{post.time}</span> · <span>🌐</span>
          </div>
        </div>
        <button className="btn-icon" style={{ width: 32, height: 32 }}>⋯</button>
      </div>

      <div className="post-content">{post.content}</div>

      {post.image && <img src={post.image} alt="" className="post-image" />}

      <div className="post-stats">
        <span>💜 {likes.toLocaleString()}</span>
        <span>
          {post.comments} comments · {post.shares} shares
        </span>
      </div>

      <div className="post-actions">
        <button className={`post-action-btn ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          {liked ? '💜' : '🤍'} Like
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>
        <button className="post-action-btn">↗️ Share</button>
      </div>

      {showComments && (
        <div className="comments-section">
          {post.commentsList.map((c) => (
            <div key={c.id} className="comment">
              <img src={c.user.avatar} alt="" className="avatar avatar-sm" />
              <div>
                <div className="comment-content">
                  <div className="comment-author">{c.user.name}</div>
                  <div className="comment-text">{c.text}</div>
                </div>
                <div className="comment-actions">
                  <span>Like</span>
                  <span>Reply</span>
                  <span>{c.time}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="comment-input-row">
            <img src={user?.avatar} alt="" className="avatar avatar-sm" />
            <input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Stories />
      <CreatePost />
      {initialPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
