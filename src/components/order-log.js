import React, { useState } from 'react';
import { db, ref, push, serverTimestamp } from '../firebase';  // ✅ updated imports

const OrderLog = () => {
  const [pizzaType, setPizzaType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  // Function to add a pizza sale to Realtime Database
  const addPizzaSale = async () => {
    try {
      const pizzaSalesRef = ref(db, 'pizza_sales');  // reference to 'pizza_sales' node
      await push(pizzaSalesRef, {
        pizza_type: pizzaType,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        timestamp: Date.now(), // ✅ using Date.now() for simplicity (or keep serverTimestamp if configured)
      });
      console.log('Pizza sale added!');
      setPizzaType('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error adding sale: ', error);
    }
  };

  return (
    <div>
      <h2>Order Log</h2>
      <input
        type="text"
        placeholder="Pizza Type"
        value={pizzaType}
        onChange={(e) => setPizzaType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addPizzaSale}>Add Sale</button>
    </div>
  );
};

export default OrderLog;
