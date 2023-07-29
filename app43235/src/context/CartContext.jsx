import { createContext, useState, useContext } from "react"


export const CartContext = createContext ({
    cart: []
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    console.log(cart)

    const addItem = (productToAdd) =>{
        if(!isInCart(productToAdd.id)) {
            setCart(prev => {
                console.log(prev)
                return [...prev, productToAdd]
            })
        }else{
            console.error('El producto ya fue agregado');
        }
    };
    const getTotalQuantity = () => {
        let totalQuantity = 0

        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })

        return totalQuantity
    }
    const removeItem = (itemId)=>{
        const cartUpdated = cart.filter(prod=>prod.id !== itemId)
        setCart(cartUpdated)
    }
    const clearCart =()=>{
        setCart([])
    }
    const isInCart = (id)=>{
        return cart.some(prod=>prod.id === id)
    }
    return(
        <CartContext.Provider value={{cart, addItem, removeItem, getTotalQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    return useContext(CartContext)
    
}
