import React, { useEffect } from 'react'
import Navbar from './component/Navbar'
import { Routes ,Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Settingpage from './pages/settingpage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Account from './pages/Account'
import { useAuthStore } from './store/Authstore'
import  {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/ThemeStore'
const App = () => {
  const { user , checkAuth ,isCheckingAuth} = useAuthStore();
 const {theme} = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth && !user){
    return(
   <div className="flex items-center justify-center h-screen">
    <Loader className='size-10 animate-spin'/>
   </div>);
   }
  
  return (
    <div data-theme={theme} >
      
    <Navbar/>
    <Routes>
        <Route path='/' element={ user ? <Homepage/>: <Navigate to={"/signup"}/>} />
        <Route path='/profile' element={ user ? <Account/>: <Navigate to={"/login"}/>} />
        <Route path='/settings' element={user ? <Settingpage/>: <Navigate to={"/login"}/>}/>
        <Route path='/login' element={! user ?<Signin/>:<Navigate to={"/"}/>} />
        <Route path='/signup' element={ !user? <Signup/>:<Navigate to={"/"}/>} />
        
    </Routes>

    <Toaster />
    </div>
  )
}

export default App
