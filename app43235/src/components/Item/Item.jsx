import styles from './Item.module.css'
import { Link } from 'react-router-dom'

const Item =({id, name, img, price, stock})=>{
    return(
        <article className={styles.cardItem}>
            <header className={styles.header}>
                <h2 className={styles.itemHeader}>
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className={styles.itemImg} />
            </picture>
            <section>
                <p className={styles.info}>
                    precio: ${price}
                </p>
                <p className={styles.info}>
                    stock disponible: {stock}
                </p>
            </section>
            <footer>
                <Link to= {`/item/${id}`} className={styles.option}>Ver detalle</Link>
            </footer>
        </article>
    )
}

export default Item