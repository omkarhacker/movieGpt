import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {


  const dispatch =useDispatch();
  const navigate=useNavigate();
  const user =useSelector(store=>store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
  
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

  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange =(e)=>{
     dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44 mx-auto md:mx-0'
      src={LOGO} 
      alt='logo'></img>


     {user && 
          <div className='flex p-2 '>
            {showGptSearch && 
                 <select className='p-2 m-2 bg-gray-900 text-white'
                 onChange={handleLanguageChange}>
                   {SUPPORTED_LANGUAGES.map((lang)=>(
                     <option key={lang.indentifier} value={lang.indentifier} >
                             {lang.name}
                     </option>
                   ))}
                 </select>
            }
           
            <button onClick={handleGptSearchClick}
            className='py-2 px-4 mx-4 my-2 bg-blue-400 text-white rounded-lg' >
             {showGptSearch?"Home Page" : "GPT Search"}
            </button>
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
