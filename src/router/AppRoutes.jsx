import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import { Page404 } from '../pages/Page404'
import UserReduxWrapper from '../components/UserReduxWrapper'

export default function AppRouters() {
    return( 
        <Routes>
            <Route path='*' element={< Page404 />} />
            <Route path='/' element={ < Login />} />
            <Route path='/signup' element={< Signup />} /> 
            <Route path='/home' element={ <UserReduxWrapper> < Home /> </UserReduxWrapper> } />
        </Routes>
    )
} 