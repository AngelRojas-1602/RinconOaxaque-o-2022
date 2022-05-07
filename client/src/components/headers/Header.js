import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Crear Producto</Link></li>
                <li><Link to="/category">Categorias</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">Historia</Link></li>
                <li><Link to="/" onClick={logoutUser}>Cerrar Sesion</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="Menu" width="30" />
            </div>

            <div className="logo">
                <h1>
                <img alt="Logo" src="https://res.cloudinary.com/ecommerce-buap/image/upload/v1651687807/ecommerce/WhatsApp_Image_2022-05-04_at_1.08.58_PM_bltbnf.jpg"
                        className="img_logo" 
                ></img> 
                    <Link to="/" className='nombre-logo'>{isAdmin ? 'Admin' : 'Rincon Oaxqueño'}</Link>
                    
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'Products' : 'Comprar'}</Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Iniciar Sesion | Registrarse</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="Menu" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="Carrito" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
