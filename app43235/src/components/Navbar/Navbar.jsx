import styles from './Navbar.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink, Link } from 'react-router-dom'


export const Navbar = ()=>{
    return (
        <nav className= {styles.navbar}>
            <Link to= '/'>
                <h3>Lara Celulares</h3>
            </Link>
            <div className={styles.categories}>
                <NavLink to={`/category/celular`} className={({isActive})=> isActive ? 'ActiveOption' : 'Option'}>Celulares</NavLink>
                <NavLink to={`/category/tablet`} className={({isActive})=> isActive ? 'ActiveOption' : 'Option'}>Tablets</NavLink>
                <NavLink to={`/category/notebook`} className={({isActive})=> isActive ? 'ActiveOption' : 'Option'}>Notebook</NavLink>
            </div>
            <CartWidget/>    
        </nav>
    )
}

export default Navbar