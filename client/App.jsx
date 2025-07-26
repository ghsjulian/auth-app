import React,{useEffect} from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Login from "./components/Login"
import Signup from "./components/Signup"
import PasswordReset from "./components/PasswordReset"
import Profile from "./components/Profile"
import EditProfile from "./components/EditProfile"
import useAuthStore from "./store/useAuth"


const App = () => {
    const {authUser,getUser} = useAuthStore() 
    useEffect(() => {
      getUser()
    }, [getUser]);
  return (
    <Router>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/reset-password" element={<PasswordReset/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/edit-profile" element={<EditProfile/>}/>
    </Routes>
    </Router>
  )
}

export default App