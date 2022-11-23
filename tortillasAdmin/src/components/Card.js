import { faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeStatusOrder, deleteOrder} from '../funcGen/crud';
import { Link} from 'react-router-dom';

export default function Card({order}){
    const decideStatus =(estatus)=>{
        if(estatus === 'Recibido'){
            return "statusYellow"
        }
        else if(estatus === 'Completado'){
            return "statusGreen"
        }
        else if(estatus === 'Rechazado'){
            return "statusRed"
        }
        else if(estatus === "Registrado"){
            return 'statusNone'
        }
        else if(estatus === "Pagado"){
            return "statusPagado"
        }
    }

    const handlePay = ()=>{
        changeStatusOrder(order.id,"Pagado");
    }

    const handleComplete = ()=>{
        changeStatusOrder(order.id,"Completado");
    }

    const handleDelivered = ()=>{
        changeStatusOrder(order.id,"Recibido");
    }

    const handleRejected = ()=>{
        deleteOrder(order.id);
    }

    let urlUserDetail = "UserDetail/"+ order.name;
    return(
        <div className="col-sm-12 col-md-12 col-lg-6 card  mb-3">
            {/* card body */}
            <div className="card-body bg-custom-card">
                <header className="d-flex ">
                    <div className="w-8">
                        <span className={decideStatus(order.estate)} ><FontAwesomeIcon icon={faCircle}/></span>
                    </div>
                    <div className="w-60 d-flex justify-content-center align-items-end">
                        <span className="ms-2 fw-bold">{order.date}</span>
                    </div>
                    <div className="w-30 d-flex justify-content-center align-items-end">
                        <span className="fw-bold w-75 d-flex justify-content-center"> {order.amount} $</span>
                        <input type="button" onClick={handleRejected} className='btn btn-danger btn-sm w-25' value='x' />
                    </div>
                </header>
                <hr/>
                <p><span className="fw-bold">cliente:</span> <Link to={urlUserDetail}>{order.name}</Link>  </p>
                <p><span className="fw-bold">Tiempo:</span>  {order.turn}</p>
                
                <footer className='d-flex'>
                    <div className='col p-1'>
                        <input type="button" disabled={order.estate == 'Pagado' || order.estate == 'Recibido' ?true:false} onClick={handleDelivered} className='btn btn-outline-secondary  w-100' value='Entregado' />
                    </div>
                    <div className='col p-1'>
                        <input type="button"  onClick={handleComplete} className='btn btn-outline-secondary w-100' value='Complete' />
                    </div>
                    <div className='col p-1'>
                        <input type="button" disabled={order.estate == 'Recibido' || order.estate == 'Pagado'?true:false} onClick={handlePay} className='btn btn-outline-secondary  w-100' value='Pagado' />
                    </div>
                </footer>
            </div>
        </div>
    );
}