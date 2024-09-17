import {create} from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

// Zustand store setup
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// Firebase auth listener
const useAuthListener = () => {
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);
};

export { useUserStore, useAuthListener };
