import { faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import {deleteUser} from '../funcGen/crud';

export default function Card({user}){
    let urlmaps = "/Maps/" + user.googleMaps;
    const handleDeleteUser = ()=>{
        deleteUser(user.id);
    }

    return(
        <div className="col-sm-12 col-md-12 col-lg-6 card  mb-3">
            {/* card body */}
            <div className="card-body bg-custom-card">
                <header className="d-flex ">
                    <div className="w-8">
                        <span className="statusGreen"><FontAwesomeIcon icon={faCircle}/></span>
                    </div>
                    <div className="w-60 d-flex justify-content-center align-items-end">
                        <span className="ms-2 fw-bold">{user.knownAs} - {user.TypeUser}</span>
                    </div>
                    <div className="w-30 d-flex justify-content-end align-items-end">
                        <input type="button" onClick={handleDeleteUser} className='btn btn-danger btn-sm w-25' value='x' />
                    </div>
                </header>
                <hr/>
                <p><span className="fw-bold">Nombre:</span>  {user.fullName}</p>
                <p><span className="fw-bold">Usuario:</span>  {user.user}</p>
                <p><span className="fw-bold">Phone:</span>  {user.phone}</p>
                <p><span className="fw-bold">Direcction:</span>  {user.direction}</p>
                <p><span className="fw-bold">TypeUser:</span>  {user.TypeUser}</p>
                <p><span className="fw-bold">Google maps:</span><Link to={urlmaps}>{user.googleMaps}</Link> </p>
                
                {/* <footer className='d-flex'>
                    <div className='col p-1'>
                        <input type="button" disabled={order.estate == 'Pagado' || order.estate == 'Recibido' ?true:false} onClick={handleDelivered} className='btn btn-outline-secondary  w-100' value='Entregado' />
                    </div>
                    <div className='col p-1'>
                        <input type="button"  onClick={handleComplete} className='btn btn-outline-secondary w-100' value='Complete' />
                    </div>
                    <div className='col p-1'>
                        <input type="button" disabled={order.estate == 'Recibido' || order.estate == 'Pagado'?true:false} onClick={handlePay} className='btn btn-outline-secondary  w-100' value='Pagado' />
                    </div>
                </footer> */}
            </div>
        </div>
    );
}