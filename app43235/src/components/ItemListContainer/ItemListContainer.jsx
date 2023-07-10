import { useState, useEffect,  memo } from "react"
import {getDocs, collection, query, where} from "firebase/firestore"
import {db} from "../../services/firebase/firebaseConfig"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import ItemGrid from '../ItemGrid/ItemGrid'

const ItemListMemo = memo(ItemList)

const ItemListContainer =({greeting})=>{
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [displayGrid, setDisplayGrid] = useState(false)
    const {categoryId} = useParams()
    
    useEffect(()=>{
        setLoading(true)
        
        const collectionRef = !categoryId ? collection(db, 'products') : query(collection(db, 'products'), where('category', '==', categoryId)) 
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
    }, [categoryId])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return(
        <div>
            <h1>{greeting}</h1>
            <button onClick={() => setDisplayGrid(true)}>grilla</button>
            <button onClick={() => setDisplayGrid(false)}>lista</button>
            { displayGrid ? <ItemGrid products={products}/> : <ItemListMemo products={products}/>}
        </div>

    )
}

export default ItemListContainer