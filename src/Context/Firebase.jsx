import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBMYrMUexCUOh7KfFavVzPaMsh7nLLmwFg",
  authDomain: "assign-64d23.firebaseapp.com",
  projectId: "assign-64d23",
  storageBucket: "assign-64d23.firebasestorage.app",
  messagingSenderId: "32017643252",
  appId: "1:32017643252:web:c9fe64f9b8626671bb10a1",
  measurementId: "G-2ZWT01D004",
  databaseURL: "https://assign-64d23-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create Context
const FirebaseContext = createContext(null);

// Custom Hook
export const useFirebase = () => useContext(FirebaseContext);

// Provider Component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Track Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(user?.email === "admin@yml.com"); // Ensure admin role is correctly set
    });
    return () => unsubscribe();
  }, []);

  // Signup with Email & Password
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Login with Email & Password
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google Sign-In
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Logout
  const logout = () => signOut(auth);

  // Add a New Ticket to Firestore
  const addTicket = async (ticketData) => {
    if (!user) {
      console.error("No authenticated user!");
      return;
    }

    const newTicket = {
      ...ticketData,
      email: user.email, // Store correct email
      createdBy: user.email,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "tickets"), newTicket);
    return docRef.id;
  };

  // Get All Tickets
  const getTickets = async () => {
    const querySnapshot = await getDocs(collection(db, "tickets"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  // Update a Ticket
  const updateTicket = async (ticketId, updateData) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, updateData);
  };

  // Delete a Ticket (Only Customers)
  const deleteTicket = async (ticketId) => {
    const ticketRef = doc(db, "tickets", ticketId);
    await deleteDoc(ticketRef);
  };

  // Upload a File to Firebase Storage
  const uploadFile = async (file) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // Add user data to Firestore
  const putData = async (path, data) => {
    const docRef = doc(db, path);
    await setDoc(docRef, data, { merge: true });
  };

  // Fetch Support Agents
  const getSupportAgents = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "SupportAgent"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAdmin,
        putData,
        getSupportAgents,
        signUp,
        login,
        signInWithGoogle,
        logout,
        addTicket,
        getTickets,
        updateTicket,
        deleteTicket,
        uploadFile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
