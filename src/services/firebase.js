// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDE46Mo4chW1r9JXqjfbCiOib6O9XRdx6E",
    authDomain: "test-first-base.firebaseapp.com",
    databaseURL: "https://test-first-base-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-first-base",
    storageBucket: "test-first-base.firebasestorage.app",
    messagingSenderId: "223265438599",
    appId: "1:223265438599:web:91289c207dbd8ae83ab122",
    measurementId: "G-Z7G3D9H4N0"
  };
// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Realtime Database
const database = getDatabase(app);

// Fonction pour obtenir la liste des utilisateurs
export const getUsers = async () => {
  const usersRef = ref(database, 'all/users');
  try {
    const snapshot = await get(usersRef);
    const data = snapshot.val();
    if (data) {
      return data; // Retourne les utilisateurs
    } else {
      throw new Error("No users found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
