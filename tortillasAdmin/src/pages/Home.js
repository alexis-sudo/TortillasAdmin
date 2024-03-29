import NavBar from "../components/NavBar";
import Card from "../components/Card";
import swal from "sweetalert";
import db from "../client";
import {collection,onSnapshot,addDoc,query,orderBy} from "firebase/firestore";
import { useEffect, useState } from "react";
import { createDate , isLoged, validateTiempo} from "../funcGen/func";
// import { getOrders } from "../funcGen/crud";
import './Home.css';

export default function Home(){
    isLoged();

    const [myOrders,setMyOrders] = useState([]);
    const [name,setName] = useState("");
    const [amount,setAmount] = useState(""); 
    const [direction,setDirection] = useState("");
    const [turn,setTurn] = useState(validateTiempo());
    const [counter,setCounter] = useState(0);

    const handleName = ({target})=> setName(target.value);
    const handleAmount = ({target})=> setAmount(target.value);
    const handleDirection = ({target})=> setDirection(target.value);
    const handleTurn = ({target})=>setTurn(target.value);
    const handleOnSubmitOrder = (event)=>{
        event.preventDefault();
        const now = new Date();
        if(amount != 0){
            const obj = {
                name,
                date: createDate(),
                amount:parseFloat(amount).toFixed(2),
                direction,
                estate: 'Registrado',
                turn,
                oDate: parseInt(`${now.getMonth()+1}${now.getDate()}${now.getHours()<10?`0${now.getHours()}`:now.getHours()}${now.getMinutes()<10?`0${now.getMinutes()}`:now.getMinutes()}`),
                userId : JSON.parse(localStorage.getItem('Tsession')).userId
            }
            addOrder(obj);
        }else{
            swal({
                text: "Aun no has ingresado la cantidad que deseas",
                icon: "error",
                buttons:{
                    confirm:true,
                },
            })
        }
    }

    const getOrders =()=>{
        try{
            onSnapshot(query(collection(db, "orders"), orderBy("oDate", "desc")),(querySnapshot => {
                const orderData = [];
                let aux = 0;
                querySnapshot.forEach((doc) => {
                    if(doc.data().estate == "Registrado" || doc.data().estate == "Pagado"){
                        orderData.push({...doc.data(), id:doc.id});
                        aux += parseFloat(doc.data().amount);
                        setCounter(aux);
                    } 
                });
                setMyOrders(orderData);
            }));
        }catch(e){
            console.log(e)
        }
    };

    const addOrder =(order)=> {
        try {
            addDoc(collection(db, "orders"),order);
            setAmount("");
            setName("");
            setDirection("");
            swal({
                text: "su pedido se registro con exito",
                icon: "success",
                buttons:{
                    confirm:false,
                },
                timer:2500,
            })
        } catch (e) {
            
            console.error("Error adding document: ", e);
        }
    }

    useEffect(()=>{
        getOrders()
    },[]);
    
    return(
        <>
            <NavBar total={counter}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 col-lg-4 col-xl-4">
                        <div className="card shadow mb-3 customTop">
                            <div className="card-body ">
                                <div className="d-flex justify-content-center"><h4 >Pide Ahora Admin 😉</h4></div>
                                <form className="" onSubmit={handleOnSubmitOrder}>
                                    <div className="form-group">
                                        <label htmlFor="Nombre"><b>Nombre:</b></label>
                                        <input value={name} onChange={handleName} type='text' className="form-control form-control-sm" id="Nombre" required/>
                                    </div>

                                    <div className="d-flex">
                                        <div className="form-group my-2 col pe-1">
                                            <label htmlFor="Cantidad"><b>Cantidad:</b></label>
                                            <input value={amount} onChange={handleAmount} type='number' className="form-control form-control-sm" step='0.5' id="Cantidad" />
                                        </div>
                                        <div className="form-group my-2 col ps-1">
                                            <label htmlFor="Turn"><b>Tiempo:</b></label>
                                            <select onChange={handleTurn} defaultValue={turn} className="form-control form-control-sm" id="Turn" >
                                                <option value="Almuerzo">Almuerzo</option>
                                                <option value="Cena" >Cena</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Direccion"><b>Dirección:</b></label>
                                        <textarea value={direction} onChange={handleDirection} className="form-control" id="Direccion" rows="3" required></textarea>
                                    </div>
                                    <div className=" mt-3">
                                        <button type="submit" className="btn btn-success font-weight-bold  w-100">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    

                    {/* content card */}
                    <div id="contentCard" className="col-sm-12 col-md-7 col-lg-8 col-xl-8 pb-5">
                       {myOrders.map(order=>{
                           return <Card order={order} key={order.id}/>
                       })}

                    </div>


                </div>
            </div>
        </>
    );
}