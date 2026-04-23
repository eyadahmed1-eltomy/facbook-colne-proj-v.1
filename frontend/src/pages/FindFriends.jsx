import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function FindFriends() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sentRequests, setSentRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // all, friends, pending

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setError(null);
    try {
      const token = localStorage.getItem('velora_token');
      console.log('🔍 Token exists:', !!token);
      
      if (!token) {
        setError('No authentication token. Please log in.');
        setLoading(false);
        return;
      }

      console.log('📡 Fetching /api/friends/all');
      const res = await fetch('/api/friends/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('📊 Response status:', res.status);
      console.log('📋 Response headers:', Object.fromEntries(res.headers));
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ API Error Response:', errorText);
        setError(`HTTP ${res.status}: ${errorText.substring(0, 200)}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('✅ Users fetched:', data.length, 'users');
      setUsers(data || []);
      setSentRequests((data || []).filter(u => u.requestStatus === 'pending' && u.id !== user?.id).map(u => u.id));
    } catch (e) {
      console.error('🚨 Fetch error:', e);
      setError(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      const res = await fetch(`/api/friends/request/send/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('velora_token')}` }
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, requestStatus: 'pending' } : u));
        setSentRequests([...sentRequests, userId]);
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const cancelFriendRequest = async (userId) => {
    try {
      const res = await fetch(`/api/friends/request/cancel/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('velora_token')}` }
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, requestStatus: null } : u));
        setSentRequests(sentRequests.filter(id => id !== userId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeFriend = async (userId) => {
    if (!window.confirm('Remove this friend?')) return;
    try {
      const res = await fetch(`/api/friends/remove/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('velora_token')}` }
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, isFriend: false } : u));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = (userId) => {
    navigate(`/messages?userId=${userId}`);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'friends') return matchesSearch && u.isFriend;
    if (filter === 'pending') return matchesSearch && u.requestStatus === 'pending';
    return matchesSearch;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-6">
      <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      <div className="font-black text-xl uppercase tracking-[0.4em]">Loading Users...</div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-6">
      <div className="text-6xl">⚠️</div>
      <div className="font-black text-xl uppercase tracking-tighter">Error</div>
      <div className="text-red-400 text-center max-w-md">{error}</div>
      <button 
        onClick={() => { setError(null); setLoading(true); fetchUsers(); }}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold uppercase text-sm mt-4"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Find Friends</h1>
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Discover and connect with users</p>
      </div>

      {/* Search & Filters */}
      <div className="glass-card rounded-3xl border border-white/10 p-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-white outline-none focus:bg-white/10 focus:border-purple-500/30 transition-all placeholder-gray-600"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'friends', 'pending'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-bold uppercase text-sm tracking-widest transition-all ${
                filter === f
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {f === 'all' ? 'All Users' : f === 'friends' ? 'Friends' : 'Pending Requests'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((userItem) => (
          <div key={userItem.id} className="glass-card rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all group">
            <div className="p-6 space-y-4">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4">
                <img
                  src={userItem.avatar}
                  alt={userItem.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-600/20 group-hover:border-purple-500/50 transition-all"
                />
                <div className="flex-1">
                  <h3 className="font-black text-white text-lg tracking-tight">{userItem.name}</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{userItem.email}</p>
                </div>
              </div>

              {/* Bio */}
              {userItem.bio && (
                <p className="text-gray-300 text-sm leading-relaxed italic">{userItem.bio}</p>
              )}

              {/* Info */}
              <div className="flex flex-wrap gap-2">
                {userItem.workplace && (
                  <span className="bg-purple-600/10 border border-purple-500/20 rounded-full px-3 py-1 text-xs font-bold text-purple-400">
                    💼 {userItem.workplace}
                  </span>
                )}
                {userItem.college && (
                  <span className="bg-blue-600/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs font-bold text-blue-400">
                    🎓 {userItem.college}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {userItem.isFriend ? (
                  <>
                    <button
                      onClick={() => sendMessage(userItem.id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg text-sm uppercase tracking-widest transition-all"
                    >
                      💬 Message
                    </button>
                    <button
                      onClick={() => removeFriend(userItem.id)}
                      className="flex-1 bg-red-600/10 hover:bg-red-600/20 text-red-400 font-bold py-2 rounded-lg text-sm uppercase tracking-widest transition-all border border-red-500/20"
                    >
                      Remove
                    </button>
                  </>
                ) : userItem.requestStatus === 'pending' ? (
                  <button
                    onClick={() => cancelFriendRequest(userItem.id)}
                    className="w-full bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-400 font-bold py-2 rounded-lg text-sm uppercase tracking-widest transition-all border border-yellow-500/20"
                  >
                    ⏳ Pending
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => sendFriendRequest(userItem.id)}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg text-sm uppercase tracking-widest transition-all"
                    >
                      ➕ Add Friend
                    </button>
                    <button
                      onClick={() => sendMessage(userItem.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg text-sm uppercase tracking-widest transition-all"
                    >
                      💬 Message
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
          <div className="text-6xl opacity-20">🔍</div>
          <h3 className="text-xl font-black text-white uppercase">No Users Found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
