import db from "../client";
import swal from "sweetalert";
import { query,collection,orderBy, onSnapshot, deleteDoc, doc, updateDoc, getDoc, } from "firebase/firestore";

// export const getOrders =()=>{
//     try{
//         onSnapshot(query(collection(db, "orders"), orderBy("oDate", "desc")),(querySnapshot => {
//             const orderData = [];
//             let aux = 0;
//             querySnapshot.forEach((doc) => {
//                 if(doc.data().estate == "Registrado"){
//                     orderData.push({...doc.data(), id:doc.id});
//                     aux += parseFloat(doc.data().amount);
//                     // setCounter(aux);
//                 } 
//             });
//             return orderData;
//         }));
//     }catch(e){
//         console.log(e)
//     }
// };

export const deleteOrder = (id)=>{
    swal({
        text:`Enrealidad deseas eliminar este registro?`,
        confirm:{
            className:"btn btn-succes"
        },
        icon:"info",
        dangerMode: true,
        buttons: true,
        }).then((result)=>{
            if(result){
                deleteDoc(doc(db,'orders',id));
                swal({
                    text: "Operacion exitosa",
                    icon: "success",
                    buttons:{
                        confirm:false,
                    },
                    timer:1100,
                })
            }
        });
}

export const deleteUser = (id)=>{
    swal({
        text:`Enrealidad deseas eliminar este registro?`,
        confirm:{
            className:"btn btn-succes"
        },
        icon:"info",
        dangerMode: true,
        buttons: true,
        }).then((result)=>{
            if(result){
                deleteDoc(doc(db,'users',id));
                swal({
                    text: "Operacion exitosa",
                    icon: "success",
                    buttons:{
                        confirm:false,
                    },
                    timer:1100,
                })
            }
        });
}


export const changeStatusOrder = (pId, pStatus)=>{
    swal({
        text:`Deseas marcarlo como ${pStatus}`,
        confirm:{
            className:"btn btn-succes"
        },
        icon:"info",
        dangerMode: true,
        buttons: true,
        }).then((result)=>{
            if(result){
                updateDoc(doc(db,'orders',pId),{estate:pStatus});
                swal({
                    text: "Operacion exitosa",
                    icon: "success",
                    buttons:{
                        confirm:false,
                    },
                    timer:1100,
                })
            }
        });
}