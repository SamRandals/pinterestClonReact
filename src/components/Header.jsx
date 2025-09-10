import { BiSearch, BiArrowToBottom } from "react-icons/bi"
import '../styles/Header.css'


export default function Header(){

    return(<>

    <header className="header">
        <div className="input__container-header">
            <input type="text" />
            <BiSearch className="search-icon"></BiSearch>
        </div>
        <div className="perfil__container-image">
            <div className="image__container">
                <img src="https://i.pinimg.com/736x/c8/cf/08/c8cf08ead61961cda50545f1648eda12.jpg" alt=""  />
            </div>
            <BiArrowToBottom/>
        </div>
    </header>

        </>)
}