import Header from "../components/Header";
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import db from "../client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import "./ShowOld.css"

export default function ShowOld() {
    const [OrdersOld, setOrdersOld] = useState([]);

    const getOrdersOld = () => {
        try {
            onSnapshot(query(collection(db, "orders"), orderBy("oDate", "desc")), (querySnapshot => {
                const orderData = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().estate == "Completado") {
                        orderData.push({ ...doc.data(), id: doc.id });
                    }
                });
                setOrdersOld(orderData);
            }));
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getOrdersOld()
    }, []);


    return (
        <>
            <Header title="Registros Completados" />
            <div className="container custop">
                <div id="contentCard" className="col-sm-12 col-md-7 col-lg-8 col-xl-8 pb-5">
                    {OrdersOld.map(order => {
                        return <Card order={order} key={order.id} />
                    })}
                </div>
            </div>
        </>
    )
}