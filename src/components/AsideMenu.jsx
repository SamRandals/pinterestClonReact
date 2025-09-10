import { BiHome, BiSearch, BiTable, BiAddToQueue, BiNotification, BiChat  } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"
import '../styles/AsideMenu.css'



export default function AsideMenu({setFeedState}){

    
    return(<>
    
    <aside className="aside__menu-container">
        <div className="logo__container">
            <img src="/logos/PintaLessLogo.png"
            width={25} height={25} alt="" />
        </div>
        <div className="aside__buttons-upload">
          <BiHome onClick={()=>setFeedState("Home")} alt="Buenas tetutrras" className="icon"></BiHome>
          <BiSearch  className="icon"></BiSearch>
          <BiTable className="icon"></BiTable>
          <BiAddToQueue onClick={()=>setFeedState("Form")} className="icon"></BiAddToQueue>
          <BiNotification className="icon"></BiNotification>
          <BiChat className="icon"></BiChat>
        </div>
        <div className="configuration">
        <FiSettings className="icon"></FiSettings>
        </div>
    </aside>
    
    </>)
}