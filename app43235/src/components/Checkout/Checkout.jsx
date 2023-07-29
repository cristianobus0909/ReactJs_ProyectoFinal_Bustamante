import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import {db} from "../../services/firebase/firebaseConfig"
import { Timestamp, collection, query, where, documentId, getDocs, writeBatch, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../notification/NotificationService";


const Checkout = ()=>{
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')
    const navigate = useNavigate()
    const { setNotification } = useNotification()
    const[cart, total, clearCart] = useContext(CartContext)


    const createOrder = async({name, phone, email}) =>{
        setLoading(true)
        try {
            const objOrder ={
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            }
            const batch = writeBatch(db)
            const outOfStock = []
            const ids = cart.map(prod=>prod.id)
            const productsRef = collection(db, 'products')
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
            const {docs} = productsAddedFromFirestore
            setNotification('success', 'La orden fue generada correctamente, el id es: ' + docs )
            clearCart()
            navigate('/')

            docs.forEach(doc=>{
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod=> prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity
                if(stockDb >= prodQuantity){
                    batch.update(doc.ref, {stock: stockDb - prodQuantity})
                }else{
                    outOfStock.push({id: doc.id, ...dataDoc})
                }
            })
            if(outOfStock.length === 0){
                await batch.commit()
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                setOrderId(orderAdded.id)
                clearCart()
            }else{
                console.error('Hay productos que estan fuera de stock')
            }
        } catch(error){
            setNotification('error', 'hubo un error en la generacion de la orden')
        }finally{
            setLoading(false)
        }
    }

    if (loading) {
        return <h1>Se esta generando su orden...</h1>
    }
    if (orderId) {
        return <h1>El id de su orden es: {orderId}</h1>
    }
    
    return(
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onConfirm = {createOrder}/>
        </div>

    ) 
}

export default Checkout