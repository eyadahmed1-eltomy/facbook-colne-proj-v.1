import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe0pQOnu14V_gv_4TOB_cvstiNQFIgSBQ",
  authDomain: "velora-facbook-clone.firebaseapp.com",
  projectId: "velora-facbook-clone",
  storageBucket: "velora-facbook-clone.firebasestorage.app",
  messagingSenderId: "416747679989",
  appId: "1:416747679989:web:ff8649d13c88279b8095bc"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();