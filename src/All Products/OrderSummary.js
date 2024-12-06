import React from 'react';

const OrderSummary = ({ orderDetails, orderTime }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p><strong>Ordered by:</strong> {orderDetails.Name} {orderDetails.Surname}</p>
      <p><strong>Product Name:</strong> {orderDetails.productName}</p>
      <p><strong>Quantity:</strong> {orderDetails.productValue}</p>
      <p><strong>Price:</strong> {orderDetails.priceQuantity}$</p>
      <p><strong>Order Time:</strong> {orderTime}</p>
      <p><strong>Delivery City:</strong> {orderDetails.citySelect}</p>
      <p><strong>Address:</strong> {orderDetails.Adress}</p>
      <p><strong>Phone:</strong> {orderDetails.Phone}</p>
      <p><strong>Email:</strong> {orderDetails.Email}</p>
    </div>
  );
};

export default OrderSummary;
