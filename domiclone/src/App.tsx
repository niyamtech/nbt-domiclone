import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DeliveryAddressAutoComplete from './DeliveryAddressAutoComplete';
import Menu from './Menu';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delivery-address-auto-complete" element={<DeliveryAddressAutoComplete />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
