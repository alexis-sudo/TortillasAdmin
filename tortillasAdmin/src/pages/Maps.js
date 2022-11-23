import { useParams } from 'react-router-dom'

export default function ShowOld() {
    let { coordenadas } = useParams();
    window.location.replace('https://maps.app.goo.gl/' + coordenadas);
    return (
        <>
            <p>Cargando</p>
        </>
    )
}