import { Link } from 'react-router-dom'
import cart from './asset/cart.png'
import styles from './CartWidget.module.css'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'


const CartWidget = ()=>{
    const {totalQuantity} = useContext(CartContext)
    return(
        <Link to='/cart' className={styles.CartWidget} style={{display: totalQuantity > 0 ? 'block' : 'none'}}>
            <img className={styles.CartImg} src={cart} alt="cart-widget" />
            {totalQuantity}
        </Link>
    )
}

export default CartWidget