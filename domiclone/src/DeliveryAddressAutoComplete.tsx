import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// We'll use react-places-autocomplete for address lookup
import PlacesAutocomplete from 'react-places-autocomplete';

const DeliveryAddressAutoComplete: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [addressSelected, setAddressSelected] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');

  // Generate 15-min interval times
  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const h = String(Math.floor(i / 4)).padStart(2, '0');
    const m = String((i % 4) * 15).padStart(2, '0');
    return `${h}:${m}`;
  });

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <h2>Enter Delivery Address (WA only)</h2>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={value => {
          setAddress(value);
          setAddressSelected(true);
        }}
        searchOptions={{ componentRestrictions: { country: 'au' } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Search Address...' })} />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => (
                <div {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {addressSelected && (
        <div>
          <h3>Select Order Date</h3>
          <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
          <h3>Select Time</h3>
          <select value={orderTime} onChange={e => setOrderTime(e.target.value)}>
            <option value="">Select time</option>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <br />
          <button onClick={() => navigate('/menu')}>Order Now</button>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressAutoComplete;
