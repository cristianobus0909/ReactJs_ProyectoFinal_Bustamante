import { useState } from "react"
import styles from "./CheckoutForm.module.css"

const CheckoutForm = ({onConfirm}) => {
    const[name, setName] = useState('')
    const[phone, setPhone] = useState('')
    const[email, setEmail] = useState('')

    
    const handleConfirm = (event) =>{
        event.preventDefault()

        const userData ={
            name, phone, email
        }
        onConfirm(userData)
    }
    return (
        <div className={styles.Container}>
            <form onSubmit ={handleConfirm} className={styles.form}>
                <label className={styles.label}>
                    Nombre
                    <input 
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={({target})=> setName(target.value)}
                    />
                </label>
                <label>
                    Telefono
                    <input
                        className={styles.input}
                        type="text"
                        value={phone}
                        onChange={({target})=> setPhone(target.value)}
                    />
                </label>
                <label>
                    Email
                    <input
                        className={styles.input}
                        type="text"
                        value={email}
                        onChange={({target})=> setEmail(target.value)}
                    />
                </label>
                <div>
                    <button type="submit" className={styles.button}>Crear Orden</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutForm