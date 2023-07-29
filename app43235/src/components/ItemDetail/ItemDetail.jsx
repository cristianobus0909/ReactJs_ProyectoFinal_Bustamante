import { useContext, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import styles from './ItemDetail.module.css'
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ItemDetail =({id, name, img, category, description, price, stock}) =>{
    const[quantityAdded, setQuantityAdded] = useState(0);
    const {addItem} = useContext(CartContext)
    
    const handleOnAdd =(quantity) =>{
            setQuantityAdded(quantity);
            
            const item = {
                id, name, price, quantity
            };
            addItem(item, quantity);
    };
    return(
        <article className={styles.cardItem}>
            <header className={styles.header}>
                <h2 className={styles.itemHeader}>
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className={styles.itemImg}/>
            </picture>
            <section>
                <p className={styles.info}>
                    Categoria:{category}
                </p>
                <p className={styles.info}>
                    Descripcion:{description} 
                </p>
                <p className={styles.info}>
                    Precio: ${price} 
                </p>
            </section>
            <footer className={styles.itemFooter}>
                {
                    quantityAdded > 0 ? (
                            <Link to='/cart' className={styles.option}>Terminar Compra</Link>
                        ):(
                            <ItemCount initial={1} stock={stock} onAdd= {handleOnAdd} id={id} />
                        )
                }
                
            </footer>
        </article>
    )
}

export default ItemDetail