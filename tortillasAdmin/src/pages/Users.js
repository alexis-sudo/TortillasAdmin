import Header from "../components/Header";
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import db from "../client";
import { useEffect, useState } from "react";
import CardUser from "../components/CardUser";
import './Users.css'
import swal from "sweetalert";

export default function ShowOld() {
    const [Users, setUsers] = useState([]);

    const [FullName, setFullName] = useState("");
    const [Contra, setContra] = useState("");
    const [Direction, setDirection] = useState("");
    const [Phone, setPhone] = useState("");
    const [TypeUser, setTypeUser] = useState("User");
    const [Usuario, setUsuario] = useState("");
    const [GoogleMaps, setGoogleMaps] = useState("");
    const [knownAs, setKnownAs] = useState("")


    const handleFullName = ({ target }) => setFullName(target.value);
    const handleContra = ({ target }) => setContra(target.value);
    const handleDirection = ({ target }) => setDirection(target.value);
    const handlePhone = ({ target }) => setPhone(target.value);
    const handleTypeUser = ({ target }) => setTypeUser(target.value);
    const handleUsuario = ({ target }) => setUsuario(target.value);
    const handleGoogleMaps = ({ target }) => setGoogleMaps(target.value);
    const handleKnownAs = ({ target }) => setKnownAs(target.value);

    const handleOnSubmitUser = (event) => {
        event.preventDefault();
        const obj = {
            fullName: FullName,
            contra: Contra,
            direction: Direction,
            phone: Phone,
            TypeUser,
            user: Usuario,
            googleMaps: GoogleMaps,
            knownAs
        }
        addUser(obj);

    }

    const addUser = (usuario) => {
        try {
            addDoc(collection(db, "users"), usuario);
            setFullName("")
            setContra("")
            setDirection("")
            setPhone("")
            setUsers("")
            setGoogleMaps("")
            setKnownAs("")
            swal({
                text: "el usuario se registro con exito",
                icon: "success",
                buttons: {
                    confirm: false,
                },
                timer: 2500,
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getUsers = () => {
        try {
            onSnapshot(query(collection(db, "users")), (querySnapshot => {
                const UsersData = [];
                querySnapshot.forEach((doc) => {
                    UsersData.push({ ...doc.data(), id: doc.id });
                });
                setUsers(UsersData);
            }));
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getUsers()
    }, []);


    return (
        <>
            <Header title="Registros de Usuarios" />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 col-lg-4 col-xl-4">
                        <div className="card shadow mb-3 customt">
                            <div className="card-body ">
                                <div className="d-flex justify-content-center"><h4 >Agrega un usuario :)</h4></div>
                                <form onSubmit={handleOnSubmitUser} className="" >
                                    <div className="form-group">
                                        <label htmlFor="Nombre"><b>Nombre Completo:</b></label>
                                        <input value={FullName} onChange={handleFullName} type='text' className="form-control form-control-sm" id="Nombre" required />
                                    </div>

                                    <div className="d-flex">
                                        <div className="form-group my-2 col pe-1">
                                            <label htmlFor="Usuario"><b>Usuario:</b></label>
                                            <input value={Usuario} onChange={handleUsuario} type='text' className="form-control form-control-sm" step='0.5' id="Usuario" />
                                        </div>
                                        <div className="form-group my-2 col ps-1">
                                            <label htmlFor="Contra"><b>Contra:</b></label>
                                            <input value={Contra} onChange={handleContra} type='text' className="form-control form-control-sm" step='0.5' id="Contra" />
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        <div className="form-group my-2 col ps-1">
                                            <label htmlFor="googleMaps"><b>Conocid@ por:</b></label>
                                            <input onChange={handleKnownAs} value={knownAs} type='text' className="form-control form-control-sm" id="googleMaps" required />
                                        </div>
                                        <div className="form-group my-2 col ps-1">
                                            <label htmlFor="Turn"><b>Tipo Usuario:</b></label>
                                            <select onChange={handleTypeUser} defaultValue={TypeUser} className="form-control form-control-sm" id="Turn" >
                                                <option value="User" >User</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Direccion"><b>Dirección:</b></label>
                                        <textarea value={Direction} onChange={handleDirection} className="form-control" id="Direccion" rows="3" required></textarea>
                                    </div>

                                    <div className="d-flex">
                                        <div className="form-group my-2 col pe-1">
                                            <label htmlFor="googleMaps"><b>Google Maps:</b></label>
                                            <input onChange={handleGoogleMaps} value={GoogleMaps} type='text' className="form-control form-control-sm" id="googleMaps" required />
                                        </div>
                                        <div className="form-group my-2 col pe-1">
                                            <label htmlFor="Phone"><b>#Celular:</b></label>
                                            <input value={Phone} onChange={handlePhone} type='text' className="form-control form-control-sm" id="Phone" />
                                        </div>
                                    </div>

                                    <div className=" mt-3">
                                        <button type="submit" className="btn btn-success font-weight-bold  w-100">Agregar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div id="contentCard" className="col-sm-12 col-md-7 col-lg-8 col-xl-8 pb-5">
                        {Users.map(user => {
                            return <CardUser user={user} key={user.id} />
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}