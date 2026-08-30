import React from 'react'
import {auth, googleProvider} from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import {login} from './features/login'


function App() {

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();

    const data = await login(token);
    console.log(data);


  }

  return (
    <>
    <div className="text-3xl font-bold underline">
      Hello Frontend!!
      <br />
      <br />
      <button 
      className='border-2 rounded-2xl p-1.5 m-1 text-white bg-blue-500 text-[20px] font-mono '
      onClick={handleLogin}>
        Continue with Google
      </button>
    </div>
    </>
    
  )
}

export default App
