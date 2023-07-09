import { useState, useEffect } from "react"
import {getDocs, collection, query, where} from "firebase/firestore"
import {db} from "../../services/firebase/firebaseConfig"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

const ItemListContainer =({greeting})=>{
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {categoryId} = useParams()
    
    useEffect(()=>{
        setLoading(true)
        
        const collectionRef = categoryId ? query(collection(db, 'products'), where('category', '==', categoryId)) : collection(db, 'products')
        getDocs(collectionRef)
            .then(response=> {
                const productsAdapted = response.docs.map(doc=> {
                    const data = doc.data()
                    return {id: doc.id, ...data}
                })
                setProducts(productsAdapted)
            })
            .catch(error=>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [itemId])
    return(
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>

    )
}

export default ItemListContainer