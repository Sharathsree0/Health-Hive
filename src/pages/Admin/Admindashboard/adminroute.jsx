import React, { useEffect } from 'react'
import { useAuth } from '../../Context/authcontext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Adminroute({children}) {
    const{isLogged,user,authLoading}=useAuth()
          if (authLoading){return <div>Authenticating...</div>;}
    useEffect(()=>{
      if(isLogged && user && !user.isAdmin){
        toast.error("Access Denied: You are not an administrator.")
      }
    })    
    if (isLogged && !user) {
    return <div>Loading user...</div>;
  }

    if(!isLogged ){
return <Navigate to="/login" />
    }
    if(!user||!user.isAdmin){
      toast.error("Access Denied: You are not an Administractor.")
  return <Navigate to="/" />
    }


  return  children;
  
}
