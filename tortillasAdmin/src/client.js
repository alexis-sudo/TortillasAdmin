import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//inicializamos la app con las credenciales que copiamos de firebase.
const firebaseApp = initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
});
//asignamos la funcion a firestore
const db = getFirestore();
//hacemos que este archivo exporte firestore por defecto para usarlo en otro archivo
export default db;
