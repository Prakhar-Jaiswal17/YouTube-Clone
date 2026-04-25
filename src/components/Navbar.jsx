import YoutubeIcon from "../images/YoutubeIcon.svg";
import DarkSearch from "../images/DarkSearchIcon.svg";
import WhiteSearch from '../images/WhiteSearchIcon.svg'
import DarkBell from "../images/DarkBellicon.svg";
import WhiteBell from "../images/WhiteBellicon.svg"
import userProfile from "../images/Default_pfp.svg"
import DarkMenu from "../images/DarkMenu.svg"
import LightMenu from "../images/LightMenu.svg"
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({setSidebarDisplay}){
    const [searchIcon,setSeachIcon] = useState(DarkSearch)
    const [bellIcon,setBellIcon] = useState(DarkBell)
    const [menuIcon,setMenuIcon] = useState(DarkMenu)
    const [displayUserBlock,setUserDisplayBlock] = useState(false)
    const [theme,setTheme] = useState('light')
    const navigate = useNavigate()

    const toggleTheme = ()=>{
        if(theme==='light'){
            document.body.classList.add('dark')
            setTheme('dark')
            setSeachIcon(WhiteSearch)
            setBellIcon(WhiteBell)
            setMenuIcon(LightMenu)
        }
        else{
            setTheme('light')
            document.body.classList.remove('dark')
            setSeachIcon(DarkSearch)
            setBellIcon(DarkBell)
            setMenuIcon(DarkMenu)
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        const val = e.target.elements.search.value.trim();
        if(val)
            navigate(`/search/${val}`)
    }

    return (
        <>
            <nav>
                <div >
                    <img src={menuIcon} alt="Menu" id="menu-icon" onClick={()=>setSidebarDisplay(prev=>!prev)}/>
                    <Link to="/" className="logo">
                        <img id="youtube-icon" src={YoutubeIcon} alt="YouTube" />
                        <h2>YouTube</h2>
                    </Link>
                </div>
                <form id="search-container" onSubmit={handleSubmit}>
                    <button style={{display: "flex", justifyContent: "center", alignItems:"center"}} type="submit" id="search-btn"><img className="utility-icons" src={searchIcon} alt="search" /></button>
                    <input id="search-box" name="search" type="search" placeholder="Search" />
                </form>
                <div id="side-icons">
                    <img src={bellIcon} className="utility-icons" alt="bell" />
                    <button onClick={toggleTheme} id="theme-button">{theme==='light'?'Dark':'Light'}</button>
                    <img className="user-profile" src={userProfile} alt="user" onClick={()=>setUserDisplayBlock(prev=>!prev)}/>
                </div>
            </nav>
            {displayUserBlock && 
            <div className="user-block">
                <div>
                    <img src={userProfile} alt="user" className="user-profile"/>
                    <h3>John Doe</h3>
                </div>
                <hr />
                <div>
                    <span>Account</span>
                    <span>Google Account</span>
                    <span>Sign out</span>
                    <span>Youtube Studio</span>
                    <span>Location</span>
                    <span>Settings</span>
                    <span>Help</span>
                    <span>Send Feedback</span>
                </div>
            </div>}
        </>
    )
}