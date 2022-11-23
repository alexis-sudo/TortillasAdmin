import "./Header.css";

export default function Header({title,sim}){
    const simbolo = sim;

    return(
        <div className="title-top" >
            <div className="d-flex justify-content-center h-block">
                <h3 className="my-0 text-white title">{title} {sim}</h3>
            </div>
            
        </div>
    );
}