import { BiSearch, BiArrowToBottom } from "react-icons/bi"
import { useState } from "react";
import '../styles/Header.css'


export default function Header({setSearchValue}){


    const [value, setValue] = useState("");
    return(<>

    <header className="header">
        <div className="input__container-header">
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    setSearchValue(value);
                }
            }}  placeholder="Buscar imagen"/>
            <BiSearch className="search-icon"></BiSearch>
        
        </div>
        <div className="perfil__container-image">
            <div className="image__container">
                <img src="https://i.pinimg.com/736x/b0/02/78/b00278f0e21246f8ac0eab6f6b9a533f.jpg" alt="cat"  />
            </div>
            <BiArrowToBottom/>
        </div>
    </header>

        </>)
}