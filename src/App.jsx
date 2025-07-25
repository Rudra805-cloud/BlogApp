import  { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice';
import { Header, Footer } from './Components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loding,setLoding]=useState(true);
  const  dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }

    })
    .finally(()=>setLoding(false))
  },[])

  return ! loding ? (<div className='min-h-screen flex
   flex-wrap content-between bg-white'
   >
    <div className='w-full block'>
       <Header/>
       <main>
        <Outlet className/>
       </main>
       <Footer/>
    </div>
  </div>
  ):null
}

export default App
