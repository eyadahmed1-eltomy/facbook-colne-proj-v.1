import { useState } from 'react';
import { conversations as convos } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(convos[0]);
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState(convos[0].messages);
  const { user } = useAuth();

  const selectConvo = (c) => {
    setActiveConvo(c);
    setMessages(c.messages);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMsg, sent: true, time: 'Just now' }]);
    setNewMsg('');
  };

  return (
    <div className="messages-page">
      <div className="conversations-list">
        <div className="conversations-header">
          <h2>Chats</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-icon" style={{ width: 32, height: 32 }}>⋯</button>
            <button className="btn-icon" style={{ width: 32, height: 32 }}>✏️</button>
          </div>
        </div>
        <div style={{ padding: '0 12px 12px' }}>
          <input placeholder="Search Messenger" style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem' }} />
        </div>
        {convos.map((c) => (
          <div key={c.id} className={`conversation-item ${activeConvo?.id === c.id ? 'active' : ''}`} onClick={() => selectConvo(c)}>
            <div style={{ position: 'relative' }}>
              <img src={c.user.avatar} alt="" className="avatar avatar-md" />
              {c.user.online && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, background: '#00d26a', borderRadius: '50%', border: '2px solid var(--bg-secondary)' }} />
              )}
            </div>
            <div className="conversation-info">
              <div className="conversation-name">{c.user.name}</div>
              <div className="conversation-last-msg">{c.lastMessage}</div>
            </div>
            <div className="conversation-time">{c.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-area">
        {activeConvo ? (
          <>
            <div className="chat-header">
              <img src={activeConvo.user.avatar} alt="" className="avatar avatar-md" />
              <div>
                <div style={{ fontWeight: 700 }}>{activeConvo.user.name}</div>
                <div style={{ fontSize: '0.78rem', color: activeConvo.user.online ? '#00d26a' : 'var(--text-muted)' }}>
                  {activeConvo.user.online ? 'Active now' : 'Offline'}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                <button className="btn-icon" style={{ width: 36, height: 36 }}>📞</button>
                <button className="btn-icon" style={{ width: 36, height: 36 }}>📹</button>
                <button className="btn-icon" style={{ width: 36, height: 36 }}>ℹ️</button>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((m) => (
                <div key={m.id} className={`message ${m.sent ? 'sent' : 'received'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={sendMessage}>
              <button type="button" className="btn-icon" style={{ width: 36, height: 36 }}>➕</button>
              <button type="button" className="btn-icon" style={{ width: 36, height: 36 }}>🖼️</button>
              <button type="button" className="btn-icon" style={{ width: 36, height: 36 }}>🎁</button>
              <input placeholder="Aa" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} style={{ borderRadius: 'var(--radius-full)' }} />
              <button type="submit" className="btn-icon" style={{ width: 36, height: 36, color: 'var(--accent-light)' }}>➤</button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
