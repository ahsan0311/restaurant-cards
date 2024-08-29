
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
 import { signOut,getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
 import { doc, deleteDoc, getFirestore,collection, addDoc ,getDocs} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
 import {  getStorage,ref,uploadBytes,uploadBytesResumable,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
 

 
 const firebaseConfig = {
   apiKey: "AIzaSyA2ZBMfcdSmO6KMDeGgE_Mt_HxuSPJgi1Y",
   authDomain: "minihackathonbyahsan.firebaseapp.com",
   projectId: "minihackathonbyahsan",
   storageBucket: "minihackathonbyahsan.appspot.com",
   messagingSenderId: "915210405274",
   appId: "1:915210405274:web:0310d54e7af9b2fdfee623",
   measurementId: "G-4T5JK9T7JV"
 };


 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 const storage = getStorage(app)

 export{auth,db,storage,doc, deleteDoc,ref,uploadBytes,uploadBytesResumable,getDownloadURL ,signOut,getDocs,collection, addDoc,createUserWithEmailAndPassword,signInWithEmailAndPassword}