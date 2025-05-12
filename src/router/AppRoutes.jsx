import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import VerifyEmail from '../pages/VerifyEmail'
import { Page404 } from '../pages/Page404'

export default function AppRouters() {
    return( 
        <Routes>
            <Route path='/' element={ < Login />} />
            <Route path='/signup' element={< Signup />} /> 
            <Route path='/home' element={ < Home /> } />
            <Route path="/VerifyEmail" element={<VerifyEmail />} />
            <Route path='*' element={< Page404 />} />
        </Routes>
    )
} 