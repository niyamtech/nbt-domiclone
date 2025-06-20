import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { order, clearOrder } = useOrder();
  const [voucher, setVoucher] = useState('');
  const [card, setCard] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      clearOrder();
    }, 2000);
  };

  if (done) {
    return (
      <div style={{textAlign: 'center', marginTop: 40}}>
        <OrderAnimation />
        <h2>Your order is being processed</h2>
        <h3>______on your way______</h3>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: 400, margin: '0 auto'}}>
      <h2>Checkout</h2>
      <h3>Your Order</h3>
      <ul>
        {order.map((item, idx) => (
          <li key={idx}>{item.qty}x {item.size} {item.crust} {item.pizza}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>Voucher Code: </label>
        <input value={voucher} onChange={e => setVoucher(e.target.value)} placeholder="Enter code" />
        <br /><br />
        <label>Credit Card: </label>
        <input value={card} onChange={e => setCard(e.target.value)} placeholder="Card Number" required />
        <br /><br />
        <button type="submit" disabled={processing}>{processing ? 'Processing...' : 'Submit Order'}</button>
      </form>
    </div>
  );
};

const OrderAnimation = () => (
  <div style={{margin: '20px 0'}}>
    <div style={{display: 'inline-block', animation: 'move 1s infinite alternate'}}>
      <span role="img" aria-label="pizza">🍕</span>
    </div>
    <style>{`
      @keyframes move {
        0% { transform: translateX(0); }
        100% { transform: translateX(40px); }
      }
    `}</style>
  </div>
);

export default Checkout;
