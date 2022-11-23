import React from 'react';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import NotFound from './pages/NotFound.js';
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Consultas from './pages/Consultas';
import Deudas from './pages/Deudas.js';
import NavDown from './components/NavDown.js';
import ShowOld from './pages/ShowOld'
import Users from './pages/Users'
import Maps from './pages/Maps'
import UserDetail from './pages/UserDetail'

function App() {
    return (
        <BrowserRouter>
            {/* <NavComponent/> */}
            <div>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/logIn' element={<LogIn/>}/>
                    <Route path='/Consultas' element={<Consultas/>} />
                    <Route path='/deudas' element={<Deudas/>} />
                    <Route path='/ShowOld' element={<ShowOld/>} />
                    <Route path='/Users' element={<Users/>} />
                    <Route path='/Maps/:coordenadas' element={<Maps/>} />
                    <Route path='/UserDetail/:user' element={<UserDetail/>} />
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div> 
            <NavDown/>   
        </BrowserRouter>   
    );
}
export default App;