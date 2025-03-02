import logo from "../../assets/images/hot_tub.svg"
import "../../assets/common.css"
import { useNavigate } from "react-router";
export const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <img src={logo} alt='Logo' />

      <div className="nav-menu">
        <span onClick={()=>{navigate('/')}} className="elements text-light cur-ptr ">Dashboard</span>
        <span onClick={()=>{navigate('/profile')}} className="elements cur-ptr">Profile</span>
      </div>
    </header>
  )
}