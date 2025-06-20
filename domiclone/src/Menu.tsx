import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import { useNavigate } from 'react-router-dom';

const pizzaSizes = ['Small', 'Medium', 'Large'];
const crustTypes = ['Thin', 'Thick', 'Cheese Burst'];

// Generate a random pizza menu
const randomPizzas = [
  'Margherita',
  'Pepperoni',
  'BBQ Chicken',
  'Veggie Supreme',
  'Hawaiian',
  'Meat Lovers',
  'Four Cheese',
  'Peri Peri',
  'Tandoori Paneer',
  'Mushroom Feast',
].sort(() => 0.5 - Math.random()).slice(0, 5);

const Menu: React.FC = () => {
  const { order, addToOrder, clearOrder } = useOrder();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Pizza Menu</h2>
      {randomPizzas.map((pizza) => (
        <PizzaItem key={pizza} name={pizza} onAdd={addToOrder} />
      ))}
      <h3>Your Order</h3>
      <ul>
        {order.map((item, idx) => (
          <li key={idx}>{item.qty}x {item.size} {item.crust} {item.pizza}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/checkout')} disabled={order.length === 0}>
        Go to Checkout
      </button>
      <button onClick={clearOrder} disabled={order.length === 0} style={{marginLeft: 8}}>
        Clear Order
      </button>
    </div>
  );
};

const PizzaItem: React.FC<{ name: string; onAdd: (item: import('./OrderContext').OrderItem) => void }> = ({ name, onAdd }) => {
  const [size, setSize] = useState(pizzaSizes[0]);
  const [crust, setCrust] = useState(crustTypes[0]);
  const [qty, setQty] = useState(1);

  return (
    <div style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
      <h4>{name}</h4>
      <label>Size: </label>
      <select value={size} onChange={e => setSize(e.target.value)}>
        {pizzaSizes.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <label> Crust: </label>
      <select value={crust} onChange={e => setCrust(e.target.value)}>
        {crustTypes.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label> Qty: </label>
      <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} style={{ width: 40 }} />
      <button onClick={() => onAdd({ pizza: name, size, crust, qty })}>Add</button>
    </div>
  );
};

export default Menu;
