import { NavLink } from "react-router-dom";

export default function NavBar({ user }) {
    return (
        <div className='pic-navbar-div'>
            <div className='pic-navbar-start'>
                <img className='pic-icon' src={require("../images/tsuki-red.png")} alt="" />
                <h1 className='pic-brand'><i>PicSharez</i></h1>
            </div>
            
            <nav>
                <ul className='pic-navbar'>
                    <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="">Home</NavLink></li>
                    <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="/about">About</NavLink></li>
                    <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="/pictures">Pictures</NavLink></li>
                    <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="/contact">Contact</NavLink></li>
                    <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="/post">Post</NavLink></li>
                    {!user && <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="/login">Login</NavLink></li>}
                    {user && <li className='pic-navbar-item'><NavLink style={{textDecoration: "none", color: "black"}} to="/logout">Logout</NavLink></li>}
                </ul>
            </nav>
        </div>
    )
}