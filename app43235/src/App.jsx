
import styles from './App.module.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import {CartProvider} from './context/CartContext'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import { NotificationProvider } from "./notification/NotificationService"



function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <NotificationProvider>
          <CartProvider>
            <Navbar/>
            <Routes>
              <Route path='/' element={<ItemListContainer greeting={'Productos'} />} />
              <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Filtrado por Categoria'}/>} />
              <Route path='Item/:itemId' element={<ItemDetailContainer/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='*' element={<h1>404 NOT fOUND</h1>} />
            </Routes>
          </CartProvider>
        </NotificationProvider>  
      </BrowserRouter>
    </div>
  );
}

export default App
