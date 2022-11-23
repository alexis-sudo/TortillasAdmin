import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function NavBar({total}){
    return(
        <>
            <div className="w-100 up d-flex bg-custom2">
                <div className="col d-flex ">
                    <div className='w-50 d-flex'>
                        <h2 className="ps-4 pt-4 text-white" >{JSON.parse(localStorage.getItem('Tsession')).user}</h2>
                        <FontAwesomeIcon className='customFace size mt-4 ms-3' icon={faSmileWink}/>
                    </div>
                    <div className='w-50 me-4 d-flex justify-content-end'>
                        <h1 className='text-white pt-4'>{parseFloat(total).toFixed(2)} $ </h1>
                    </div>
                </div>
            </div>
        </>
    );
}