// import { initializeApp } from 'firebase/app'
// import { 
//     getFirestore, collection, onSnapshot
// } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };

//init firebase app
// initializeApp(firebaseConfig);

//init services
// export const db = getFirestore()
// export const storage = getStorage()
// export const auth = getAuth()

//collection ref
// export const projectColRef = collection(db, 'projects')
// export const userColRef = collection(db, 'users')

//subscribe to auth state changes
// onAuthStateChanged(auth, (user) => {
//   console.log('user status changed:', user)
// })
 
//realtime collection data: 
// onSnapshot(projectColRef, (snapshot) => {
//   let projects = []
//   snapshot.docs.forEach((doc) => {
//     projects.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(projects)
// })
