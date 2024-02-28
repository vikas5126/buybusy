import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsBasketFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./styles/Navbar.module.css"
import { useValue } from "../buyBusyContext";
function Navbar(){
    const {isLoading, isLoggedIn, setIsLoggedIn, logOut} = useValue();
    return (
        <div>
        <div className={styles.navbar}>
         <NavLink 
             style={({isActive}) => (isActive ? {color: "#4d008b"} : undefined)}
             to="/"
         >
             <div className={styles.link}>
                 <FaHome />
                 <h4>Home</h4>
             </div>
         </NavLink>
         {isLoggedIn ? <NavLink 
             style={({isActive}) => (isActive ? {color: "#4d008b"} : undefined)}
             to="/cart"
         >
             <div className={styles.link}>
                 <FaShoppingCart />
                 <h4>Cart</h4>
             </div>
         </NavLink> : ""}
         {isLoggedIn ? <NavLink 
             style={({isActive}) => (isActive ? {color: "#4d008b"} : undefined)}
             to="/myorder"
         >
             <div className={styles.link}>
                 <BsBasketFill />
                 <h4>My Order</h4>
             </div>
         </NavLink> : ""}
         {isLoggedIn ? <NavLink 
         className={styles.hover}
         to="/" onClick={logOut}
         >
             <h4>Sign Out</h4>
         </NavLink> : <NavLink 
         className={styles.hover}
         to="/signIn"
         >
             <h4>Sign In</h4>
         </NavLink>}
     </div>
     <Outlet/>
     </div>
    )
}

export default Navbar;