import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, provider, db } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPersistentLoginPrompt, setShowPersistentLoginPrompt] = useState(false);
  const [persistLoginData, setPersistLoginData] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('velora_token');
      if (token) {
        await validateToken(token);
      } else {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const validateToken = async (token) => {
    try {
      console.log('🔍 Validating token...');
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        console.warn('⚠️ Token validation failed:', res.status);
        throw new Error('Invalid token');
      }
      
      if (!res.body) throw new Error('Empty response from server');
      const data = await res.json();
      
      console.log('✅ Token valid, user:', data.email);
      setUser(data);
      setIsAuthenticated(true);
    } catch (e) {
      console.error('❌ Token validation error:', e.message);
      localStorage.removeItem('velora_token');
      localStorage.removeItem('velora_persist_login');
      localStorage.removeItem('velora_user_id');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, shouldPersist = false) => {
    try {
      console.log('🔐 Attempting email/password login for:', email);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Check response status before parsing JSON
      if (!res.ok) {
        let errorMessage = 'Login failed';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        console.error('❌ Login failed:', errorMessage, 'Status:', res.status);
        throw new Error(errorMessage);
      }

      // Only try to parse JSON if response is OK
      const data = await res.json();
      if (!data.token || !data.user) {
        console.error('❌ Invalid response structure from server');
        throw new Error('Invalid response structure from server');
      }

      console.log('✅ Login successful:', data.user.email);
      localStorage.setItem('velora_token', data.token);
      if (shouldPersist) {
        localStorage.setItem('velora_persist_login', 'true');
        localStorage.setItem('velora_user_email', email);
      }
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Sign in with Firebase
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      console.log('✅ Firebase user signed in:', firebaseUser.email);

      // Try to access Firestore (with error handling)
      let userData = null;
      let firestoreError = null;

      try {
        // Check if user already exists in Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.log('📝 Creating new user in Firestore...');
          // Create new user in Firestore
          await setDoc(userRef, {
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${firebaseUser.displayName || 'user'}`,
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
          console.log('✅ User created in Firestore');
        } else {
          console.log('✅ User already exists in Firestore');
        }

        userData = userSnap.exists() ? userSnap.data() : {
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${firebaseUser.displayName || 'user'}`,
        };
      } catch (err) {
        // Firestore error - use Firebase user data as fallback
        console.warn('⚠️ Firestore error (will use Firebase data as fallback):', err.message);
        firestoreError = err;
        userData = {
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${firebaseUser.displayName || 'user'}`,
        };
      }

      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // Set user in state with Firebase data + Firestore data (if available)
      setUser({
        id: firebaseUser.uid,
        ...userData
      });

      // Store Firebase token
      localStorage.setItem('velora_token', idToken);
      localStorage.setItem('velora_persist_login', 'true');
      localStorage.setItem('velora_user_id', firebaseUser.uid);
      setIsAuthenticated(true);

      if (firestoreError) {
        console.warn('⚠️ Note: Firestore permissions may need configuration, but login succeeded with Firebase auth');
      }

      return true;
    } catch (error) {
      console.error('❌ Google login error:', error);
      
      // Re-throw with a user-friendly message
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in cancelled. You closed the popup.');
      }
      
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied. Please check Firestore security rules or contact support.');
      }
      
      throw error;
    }
  };

  const register = async (userData, shouldPersist = false) => {
    try {
      console.log('📝 Attempting registration for:', userData.email);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      // Check response status before parsing JSON
      if (!res.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If we can't parse error JSON, use default message
          console.error('Failed to parse error response:', e);
        }
        console.error('❌ Registration failed:', errorMessage, 'Status:', res.status);
        throw new Error(errorMessage);
      }

      // Only try to parse JSON if response is OK
      const data = await res.json();
      if (!data.token || !data.user) {
        console.error('❌ Invalid response structure from server');
        throw new Error('Invalid response structure from server');
      }

      console.log('✅ Registration successful:', data.user.email);
      localStorage.setItem('velora_token', data.token);
      if (shouldPersist) {
        localStorage.setItem('velora_persist_login', 'true');
        localStorage.setItem('velora_user_email', userData.email);
      }
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('❌ Register error:', error.message);
      throw error;
    }
  };

  const logout = () => {
    console.log('👋 Logging out user');
    localStorage.removeItem('velora_token');
    localStorage.removeItem('velora_persist_login');
    localStorage.removeItem('velora_user_email');
    localStorage.removeItem('velora_user_id');
    setUser(null);
    setIsAuthenticated(false);
    console.log('✅ Logged out successfully');
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('velora_token');
    if (token) await validateToken(token);
  };

  const requestPersistentLogin = (email, password) => {
    setPersistLoginData({ email, password });
    setShowPersistentLoginPrompt(true);
  };

  const confirmPersistentLogin = async () => {
    if (persistLoginData) {
      await login(persistLoginData.email, persistLoginData.password, true);
    }
    setShowPersistentLoginPrompt(false);
    setPersistLoginData(null);
  };

  const declinePersistentLogin = () => {
    setShowPersistentLoginPrompt(false);
    setPersistLoginData(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      loginWithGoogle,
      register,
      logout,
      refreshUser,
      requestPersistentLogin,
      confirmPersistentLogin,
      declinePersistentLogin,
      showPersistentLoginPrompt,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
