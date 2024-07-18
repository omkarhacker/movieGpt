import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {


  const dispatch =useDispatch();
  const navigate=useNavigate();
  const user =useSelector(store=>store.user);
  
  const handleSignOut=()=>{
       
    signOut(auth).then(() => {
      
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (user) => {
      if (user) {
      
        const {uid,email,displayName,photoURL}=user;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL,
        }));
      
        navigate("/browse");
      } else {

        dispatch(removeUser());
        navigate("/")
      }
    });

    return ()=>unsubscribe();
  },[]);

  return (
    <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44 mx-auto md:mx-0'
      src={LOGO} 
      alt='logo'></img>

     {user && 
          <div className='flex p-2 justify-between'>
          <img className='w-12 h-12' alt='user icon'
          src={user.photoURL}>
          </img>
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>
     }
      
    </div>

  )
}

export default Header
