import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DeliveryAddressAutoComplete from './DeliveryAddressAutoComplete';
import Menu from './Menu';
import Checkout from './Checkout';
import { OrderProvider } from './OrderContext';

import './App.css'

function App() {

  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery-address-auto-complete" element={<DeliveryAddressAutoComplete />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </OrderProvider>
  )
}

export default App
