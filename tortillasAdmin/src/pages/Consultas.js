import Header from '../components/Header';
import "./Consultas.css";
import { logOut, isLoged } from '../funcGen/func';
import { doc, getDoc } from 'firebase/firestore';
import db from "../client";
import { useEffect, useState } from 'react';
import{Link} from "react-router-dom"
import {faFolderOpen,faUsers} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Consultas() {
    isLoged();
    const [myUser, setMyUser] = useState({});

    const ShowOld = ()=>{
        alert('show old')
    }


    const getMyUser = async (Id) => {
        try {
            const obj = await getDoc(doc(db, "users", Id));
            setMyUser(obj.data());
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getMyUser(JSON.parse(localStorage.getItem('Tsession')).userId);
    }, []);

    return (
        <>
            <Header title={myUser.fullName}/>
            <div className='w-100 d-flex justify-content-center cimg'>
                <img className='img-profile shadow' src='https://firebasestorage.googleapis.com/v0/b/pedidos-d769c.appspot.com/o/user.png?alt=media&token=98329f5c-9ef2-46d1-a266-93b5f8459da5' />
            </div>
            {/* <div className='w-100 d-flex justify-content-center mt-3 color'>
                <h2>{myUser.fullName}</h2>
            </div> */}
            <div className='px-4 mt-4 '>
                <div className='row'>
                    <div className='col-6 col-md-6'>
                        <Link to="/ShowOld"><button className='btn btn-outline-success w-100 mt-3'>Antiguos - <FontAwesomeIcon icon={faFolderOpen} /></button></Link>
                    </div>
                    <div className='col-6 col-md-6'>
                        <Link to="/Users"><button className='btn btn-outline-primary w-100 mt-3'>Usuarios - <FontAwesomeIcon icon={faUsers} /></button></Link>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-6 col-md-6 d-flex'>
                        <button disabled className='btn btn-outline-secondary w-100 mt-3' onClick={logOut}>Cerrar Session</button>
                    </div>
                    <div className='col-6 col-md-6'>
                        <button disabled className='btn btn-outline-secondary w-100 mt-3' onClick={logOut}>Cerrar Session</button>
                    </div>
                </div>
                <hr className='mt-5'/>
                <button className='btn btn-danger w-100' onClick={logOut}>Cerrar Session</button>
            </div>
        </>
    )
}