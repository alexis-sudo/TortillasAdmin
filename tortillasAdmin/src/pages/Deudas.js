import Header from "../components/Header";
import Card from "../components/Card";
import db from "../client";
import { onSnapshot, collection,query,orderBy } from "firebase/firestore";
import { useState,useEffect } from "react";
import { isLoged } from "../funcGen/func";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Deudas.css"

export default function Deudas(){
    isLoged();
    const [ordersNoPay,setOrdersNoPay] = useState([]);
    const [deuda,setDeuda] = useState(0);
    const [filtro,setFiltro] = useState("");

    const getMyOrdersNoPay =()=>{
        try{
            onSnapshot(query(collection(db, "orders"), orderBy("oDate", "desc")),(querySnapshot => {
                const orderData = [];
                let counterDeuda = 0;
                querySnapshot.forEach((doc) => {
                    if(doc.data().estate == "Recibido"){
                        orderData.push({...doc.data(), id:doc.id});
                        counterDeuda += parseFloat(doc.data().amount)
                    }
                });
                setOrdersNoPay(orderData);
                setDeuda(counterDeuda);
            }));
        }catch(e){
            console.log(e)
        }
    };

    useEffect(()=>{
        getMyOrdersNoPay();
    },[]);
    
    return(
        <>
            <Header title={parseFloat(deuda).toFixed(2)} sim="$"/>
            <div className="container">
                <div className="d-flex justify-content-center btnDeudas">
                    <form className="d-flex btn-group w-75" role="group">
                        {/* <button class="btn border border-white text-white w-25" type="submit"><FontAwesomeIcon icon={faSearch}/></button>
                        <input class="form-control  me-2 w-75" type="search" placeholder="Search" aria-label="Search"/> */}
                        <div className="input-group">
                            <div className="input-group-text" id="btnGroupAddon"><FontAwesomeIcon icon={faSearch}/></div>
                            <input disabled type="text" className="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon"/>
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-md-7 col-lg-8 col-xl-8 pt-3 pb-5">
                    {ordersNoPay.map(order=>{
                        return <Card order={order} key={order.id}/>
                    })}
                </div>
            </div>
        </>
    )
}