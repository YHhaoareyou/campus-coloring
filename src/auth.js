import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from './atoms';
import {
  getAuth,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

export const login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithRedirect(auth, provider);
};

export const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUser = () => {
  return useRecoilValue(userState);
};