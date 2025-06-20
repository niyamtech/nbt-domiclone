import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>domiclone</h1>
      <button onClick={() => navigate('/delivery-address-auto-complete')}>Delivery</button>
      <button>Pickup</button>
    </div>
  );
};

export default Home;
