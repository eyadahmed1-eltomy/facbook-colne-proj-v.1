export const currentUser = {
  id: '1',
  name: 'Alex Velorum',
  username: 'alexvelorum',
  avatar: 'https://i.pravatar.cc/150?img=11',
  cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
  bio: 'Digital creator & explorer. Living the Velora lifestyle ✨',
  friends: 1284,
  followers: 5420,
  location: 'San Francisco, CA',
  work: 'Creative Director at Velora Inc.',
  education: 'Stanford University',
  joined: 'January 2023',
};

export const users = [
  { id: '2', name: 'Sophia Laurent', avatar: 'https://i.pravatar.cc/150?img=5', online: true },
  { id: '3', name: 'Marcus Chen', avatar: 'https://i.pravatar.cc/150?img=12', online: true },
  { id: '4', name: 'Isabella Rose', avatar: 'https://i.pravatar.cc/150?img=9', online: false },
  { id: '5', name: 'James Blackwood', avatar: 'https://i.pravatar.cc/150?img=15', online: true },
  { id: '6', name: 'Luna Starfield', avatar: 'https://i.pravatar.cc/150?img=16', online: false },
  { id: '7', name: 'Oliver Night', avatar: 'https://i.pravatar.cc/150?img=33', online: true },
  { id: '8', name: 'Aria Moonlight', avatar: 'https://i.pravatar.cc/150?img=20', online: true },
  { id: '9', name: 'Ethan Storm', avatar: 'https://i.pravatar.cc/150?img=53', online: false },
  { id: '10', name: 'Mia Goldstein', avatar: 'https://i.pravatar.cc/150?img=25', online: true },
];

export const stories = [
  { id: 1, user: users[0], image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop' },
  { id: 2, user: users[1], image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop' },
  { id: 3, user: users[2], image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop' },
  { id: 4, user: users[3], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop' },
  { id: 5, user: users[4], image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop' },
  { id: 6, user: users[5], image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop' },
];

export const posts = [
  {
    id: 1,
    user: users[0],
    content: 'Just finished a stunning photoshoot at Golden Gate Park! The light was absolutely magical today. 🌟📸 Anyone else loving this weather?',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    likes: 234,
    comments: 42,
    shares: 12,
    time: '2 hours ago',
    liked: false,
    commentsList: [
      { id: 1, user: users[1], text: 'This is breathtaking! Where exactly was this taken? 😍', time: '1h' },
      { id: 2, user: users[2], text: 'The colors are insane! Great composition.', time: '45m' },
    ],
  },
  {
    id: 2,
    user: users[1],
    content: 'Excited to announce that our startup just closed Series A funding! 🚀 Thank you to everyone who believed in our vision. The journey has just begun!',
    image: null,
    likes: 567,
    comments: 89,
    shares: 45,
    time: '4 hours ago',
    liked: true,
    commentsList: [
      { id: 1, user: users[3], text: 'Congratulations! So well deserved! 🎉', time: '3h' },
    ],
  },
  {
    id: 3,
    user: users[2],
    content: 'Weekend vibes at the new rooftop bar downtown. The view is unreal! 🌃🍸',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
    likes: 128,
    comments: 23,
    shares: 5,
    time: '6 hours ago',
    liked: false,
    commentsList: [],
  },
  {
    id: 4,
    user: users[4],
    content: 'Just adopted this little guy! Meet Luna, the newest member of our family 🐱❤️ She\'s already stolen everyone\'s hearts.',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    likes: 892,
    comments: 156,
    shares: 67,
    time: '8 hours ago',
    liked: false,
    commentsList: [
      { id: 1, user: users[5], text: 'OMG so adorable!! 😻', time: '7h' },
      { id: 2, user: users[0], text: 'Welcome to the family Luna!', time: '6h' },
    ],
  },
  {
    id: 5,
    user: users[6],
    content: 'The future of AI is not about replacing humans — it\'s about augmenting our capabilities. Excited about what\'s coming next in tech. #AI #Innovation',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    likes: 345,
    comments: 78,
    shares: 34,
    time: '12 hours ago',
    liked: true,
    commentsList: [],
  },
];

export const groups = [
  { id: 1, name: 'Velora Photography Club', members: '12.5K', cover: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600', category: 'Photography', desc: 'Share your best shots and learn from fellow photographers' },
  { id: 2, name: 'Tech Innovators Hub', members: '34.2K', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', category: 'Technology', desc: 'Discussing the latest in tech and innovation' },
  { id: 3, name: 'Foodie Paradise', members: '8.7K', cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', category: 'Food & Drink', desc: 'Recipes, restaurant reviews, and food photography' },
  { id: 4, name: 'Travel Wanderers', members: '21.3K', cover: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600', category: 'Travel', desc: 'Share your travel stories and get inspired' },
  { id: 5, name: 'Fitness Warriors', members: '15.8K', cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', category: 'Fitness', desc: 'Workout tips, nutrition advice, and motivation' },
  { id: 6, name: 'Art & Design Collective', members: '9.4K', cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600', category: 'Art', desc: 'Creative minds sharing their art and designs' },
];

export const pages = [
  { id: 1, name: 'Velora Official', followers: '2.1M', cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600', category: 'Technology', verified: true },
  { id: 2, name: 'Midnight Coffee Co.', followers: '156K', cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', category: 'Coffee Shop', verified: true },
  { id: 3, name: 'Neon Beats Music', followers: '890K', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', category: 'Music', verified: true },
  { id: 4, name: 'Urban Style Fashion', followers: '450K', cover: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600', category: 'Fashion', verified: false },
  { id: 5, name: 'Green Earth Initiative', followers: '320K', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', category: 'Non-Profit', verified: true },
  { id: 6, name: 'Pixel Perfect Studio', followers: '78K', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', category: 'Design Studio', verified: false },
];

export const marketplace = [
  { id: 1, title: 'Vintage Camera Collection', price: '$450', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600', location: 'San Francisco, CA', condition: 'Like New' },
  { id: 2, title: 'MacBook Pro 16" M3', price: '$2,200', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', location: 'New York, NY', condition: 'Excellent' },
  { id: 3, title: 'Handcrafted Leather Bag', price: '$180', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', location: 'Los Angeles, CA', condition: 'New' },
  { id: 4, title: 'Electric Guitar - Fender', price: '$850', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600', location: 'Austin, TX', condition: 'Good' },
  { id: 5, title: 'Mid-Century Modern Chair', price: '$320', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600', location: 'Chicago, IL', condition: 'Vintage' },
  { id: 6, title: 'Professional Drone DJI', price: '$1,100', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600', location: 'Miami, FL', condition: 'Like New' },
];

export const conversations = [
  {
    id: 1, user: users[0], lastMessage: 'That sounds amazing! Let me know when you\'re free 😊', time: '2m',
    messages: [
      { id: 1, text: 'Hey! How are you?', sent: false, time: '10:30 AM' },
      { id: 2, text: 'I\'m great! Just got back from the trip 🌴', sent: true, time: '10:32 AM' },
      { id: 3, text: 'Oh nice! How was it?', sent: false, time: '10:33 AM' },
      { id: 4, text: 'Incredible! We should plan one together', sent: true, time: '10:35 AM' },
      { id: 5, text: 'That sounds amazing! Let me know when you\'re free 😊', sent: false, time: '10:36 AM' },
    ],
  },
  {
    id: 2, user: users[1], lastMessage: 'The meeting is at 3 PM tomorrow', time: '15m',
    messages: [
      { id: 1, text: 'Hi Marcus, about the project update...', sent: true, time: '9:00 AM' },
      { id: 2, text: 'Yes, I\'ve been working on it', sent: false, time: '9:15 AM' },
      { id: 3, text: 'The meeting is at 3 PM tomorrow', sent: false, time: '9:16 AM' },
    ],
  },
  {
    id: 3, user: users[2], lastMessage: 'See you tonight! 🎉', time: '1h',
    messages: [
      { id: 1, text: 'Are you coming to the party?', sent: false, time: '8:00 PM' },
      { id: 2, text: 'Wouldn\'t miss it!', sent: true, time: '8:05 PM' },
      { id: 3, text: 'See you tonight! 🎉', sent: false, time: '8:06 PM' },
    ],
  },
  {
    id: 4, user: users[4], lastMessage: 'Thanks for sharing that article', time: '3h',
    messages: [
      { id: 1, text: 'Did you see the latest news?', sent: false, time: '2:00 PM' },
      { id: 2, text: 'Thanks for sharing that article', sent: false, time: '2:15 PM' },
    ],
  },
  {
    id: 5, user: users[6], lastMessage: 'Let\'s catch up this weekend!', time: '5h',
    messages: [
      { id: 1, text: 'Hey! It\'s been a while', sent: true, time: '12:00 PM' },
      { id: 2, text: 'I know! Let\'s catch up this weekend!', sent: false, time: '12:30 PM' },
    ],
  },
];

export const notifications = [
  { id: 1, user: users[0], text: 'liked your post', time: '5 minutes ago', unread: true, type: 'like' },
  { id: 2, user: users[1], text: 'commented on your photo', time: '15 minutes ago', unread: true, type: 'comment' },
  { id: 3, user: users[2], text: 'sent you a friend request', time: '1 hour ago', unread: true, type: 'friend' },
  { id: 4, user: users[3], text: 'shared your post', time: '2 hours ago', unread: false, type: 'share' },
  { id: 5, user: users[5], text: 'invited you to join "Photography Club"', time: '3 hours ago', unread: false, type: 'group' },
  { id: 6, user: users[6], text: 'mentioned you in a comment', time: '5 hours ago', unread: false, type: 'mention' },
  { id: 7, user: users[7], text: 'started a live video', time: '6 hours ago', unread: false, type: 'live' },
  { id: 8, user: users[4], text: 'reacted to your story', time: '8 hours ago', unread: false, type: 'story' },
];
