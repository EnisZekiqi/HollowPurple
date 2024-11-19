import { useEffect, useState } from 'react';

const Cart = ({ seeProduct }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (product) => {
    let updatedCart = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((product, index) => (
          <div key={index} className="cart-item">
            <div onClick={() => seeProduct(product)}>
              <div className="flex items-center justify-center w-full mb-4">
                {product.images && product.images.length > 0 && (
                  <img src={product.images[0]} alt="" style={{ width: '85px', height: '85px', objectFit: 'contain' }} />
                )}
              </div>
              <p><strong>{product.name}</strong></p>
              <p>Price: ${product.price}</p>
            </div>
            <button onClick={() => handleRemoveItem(product)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
