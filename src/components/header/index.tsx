import logo from "../../assets/images/hot_tub.svg"
import "../../assets/common.css"
import { useNavigate } from "react-router";
export const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <img src={logo} />

      <div className="nav-menu">
        <span onClick={()=>{navigate('/')}} className="elements text-light ">Dashboard</span>
        <span onClick={()=>{navigate('/profile')}} className="elements">Profile</span>
        <span onClick={()=>{navigate('/contact')}} className="elements">Contact</span>
      </div>
    </header>
  )
}