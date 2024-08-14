import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [error, setError]=useState('')
    const [loading, setLoading] = useState(true);
    const axiosPublic=useAxiosPublic();

    const googleProvider = new GoogleAuthProvider();
    //create user 
    const createUser= (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //create login
    const login= (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    

    //create user by google account
    const googleSignIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //update profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    // log out 
    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }

    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged (auth, (currentUser) =>{
    //          setUser(currentUser);
    //          console.log('current user',currentUser);
    //          if (currentUser) {
    //              // get token and store client
    //              const userInfo = { email: currentUser.email };
    //              axiosPublic.post('/jwt', userInfo)
    //                  .then(res => {
    //                      if (res.data.token) {
    //                          localStorage.setItem('access-token', res.data.token);
    //                          setLoading(false);
    //                      }
    //                  })
    //          }
    //          else {
    //              // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
    //              localStorage.removeItem('access-token');
    //              setLoading(false);
    //          }
    //      })
    //      return()=>{
    //          return unsubscribe();
    //      }
    //  },[axiosPublic])
    const info={
        user,
        setUser,
        error,
        setError,
        createUser,
        login,
        updateUserProfile,
        googleSignIn,
        logOut,
        loading,
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node,
}
export default AuthProvider;