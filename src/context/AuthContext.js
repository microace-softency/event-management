import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth'; // Make sure createUserWithEmailAndPassword is imported from 'firebase/auth'
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [gym, setGym] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  const signInWithPhone = (phone) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        { size: 'invisible' }
      );
    }
    window.recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); // Corrected function name to signUp
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setToken(currentUser?.accessToken);
      currentUser?.accessToken
        ? sessionStorage.setItem('token', currentUser.accessToken)
        : sessionStorage.removeItem('token');
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.phoneNumber.replace('+91', ''));
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUser({
            ...currentUser,
            ...userDocSnapshot.data()
          });
          return
        }
      }
      setUser(currentUser);
      return
    });
    return unsubscribe;
  }, []);



  return (
    <AuthContext.Provider value={{ user, gym, token, logout, signIn, signInWithPhone, signUp, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);