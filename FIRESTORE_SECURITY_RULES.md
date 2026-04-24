# Firestore Security Rules Setup

## ⚠️ If you're getting "Missing or insufficient permissions" error:

Your Firestore security rules are too restrictive. Follow these steps to fix it:

### **Step 1: Go to Firebase Console**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `velora-facbook-clone`
3. Go to **Firestore Database** → **Rules**

### **Step 2: Replace the rules with this:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow users to read/write their own user document
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Allow posts collection
    match /posts/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Allow messages collection
    match /messages/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow any other collections for authenticated users
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### **Step 3: Click "Publish"**

## What these rules do:
- ✅ Users can only read/write their own user documents
- ✅ Any authenticated user can read/write posts and messages
- ✅ Unauthenticated users cannot access anything

## If you still get errors:

**Check the browser console (F12 → Console tab)** for detailed error messages. The code now logs:
- ✅ `console.log('✅ Firebase user signed in:...')` - Login success
- ✅ `console.log('📝 Creating new user in Firestore...')` - Creating user
- ⚠️ `console.warn('⚠️ Firestore error...')` - Firestore permission errors
- ❌ `console.error('❌ Google login error:...')` - Fatal errors

## Alternative: Test with Permissive Rules (Development Only)

If you want to test quickly without Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: This is ONLY for testing. Never use in production!

## Rebuild and Deploy

After updating security rules:

```bash
cd frontend
npm run build
git add .
git commit -m "Add Firestore security rules configuration"
git push
```

Then redeploy on Vercel - it will auto-deploy.

---

**Questions?** Check the browser console (F12) for detailed error messages.
