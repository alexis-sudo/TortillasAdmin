import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { query, where, collection, onSnapshot } from 'firebase/firestore';
import db from "../client";
import Header from "../components/Header"
import { Link } from 'react-router-dom';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserDetail() {

    let { user } = useParams();
    const [UserDetail, setUserDetail] = useState({});

    const getUser = async (user) => {
        try {
            onSnapshot(query(collection(db, "users"), where("user", "==", user)), (querySnapshot => {
                const userData = [];

                querySnapshot.forEach((doc) => {
                    userData.push({ ...doc.data(), id: doc.id });
                });
                setUserDetail(userData[0]);
            }))

        } catch (e) {
            console.log(e)
        }
    };


    useEffect(() => {
        getUser(user);
    }, []);


    let urlmaps = "/Maps/" + UserDetail.googleMaps;

    return (
        <>
            <Header/>
            <div className='w-100 d-flex justify-content-center cimg'>
                <img className='img-profile shadow' src='https://firebasestorage.googleapis.com/v0/b/pedidos-d769c.appspot.com/o/user.png?alt=media&token=98329f5c-9ef2-46d1-a266-93b5f8459da5'/>
            </div>
            <div className='w-100 d-flex justify-content-center mt-3 color'>
                <h2>{UserDetail.fullName}</h2>
            </div>
            <div className='px-4 mt-4 '>
                <hr/>
                <p>
                    <strong>User:</strong> {UserDetail.user}
                </p>
                <p>
                    <strong>Cel:</strong> {UserDetail.phone}
                </p>
                <p>
                    <strong>Direccion:</strong> {UserDetail.direction}
                </p>

                <p>
                    <strong>Maps:</strong> <Link to={urlmaps}><button className='btn btn-outline-success btn-sm'>Abrir en googleMaps - <FontAwesomeIcon icon={faArrowCircleRight} /></button></Link> 
                </p>
                <p>
                    <strong>Conocido por:</strong> {UserDetail.knownAs}
                </p>
                <p>
                    <strong>tipo usuario:</strong> {UserDetail.TypeUser}
                </p>
                <hr/>
            </div>
        </>
    )
}