import { initializeApp } from '@firebase/app'
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth'

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    onSnapshot,
    doc,
    getDoc
} from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

import { firebaseConfig } from './firebase-config'

//init firebase
initializeApp(firebaseConfig)

//init services
export const auth = getAuth()
export const db = getFirestore()
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage()

//collections
export const projColRef = collection(db, 'projects')
export const accessoriesColRef = collection(db, 'accessories')
export const productColRef = collection(db, 'products')

export const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const registerWithEmailAndPassword = async (displayName, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const logout = () => {
    signOut(auth);
  };


  