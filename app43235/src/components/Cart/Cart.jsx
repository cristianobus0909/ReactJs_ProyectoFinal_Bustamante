import styles from './Cart.module.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart =()=>{
    const {cart, clearCart, totalQuantity, total} = useContext(CartContext)

    if(totalQuantity === 0) {
        return(
            <div>
                <h1>No hay items en el carrito</h1>
                <Link to= '/' className= {styles.option}>Productos</Link>
            </div>
        )
    }
    return(
        <div>
            { cart.map(p=> <CartItem key={p.id}{...p}/>)};
            <h3>Total:${total}</h3>
            <button onClick={()=> clearCart()} className={styles.button}>
                Limpiar carrito
            </button>
            <Link to='/checkout' className={styles.option}>
                Checkout
            </Link>
        </div>
    )
}

export default Cart