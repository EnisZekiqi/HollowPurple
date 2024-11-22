import { useState, useEffect } from "react";
import none from "../images/undraw_web_search_re_efla.svg"; // Empty cart illustration
import { motion } from "framer-motion";

const Order = () => {
  const [orderProduct, setOrderProduct] = useState(null);

  useEffect(() => {
    // Get the list of orders from localStorage (this will contain all ordered products)
    const storedOrders = JSON.parse(localStorage.getItem("order")) || [];
    
    // Only display the last ordered product
    if (storedOrders.length > 0) {
      setOrderProduct(storedOrders[storedOrders.length - 1]);
    }
  }, []);
  return (
    <div className="login h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0 },
        }}
        className="mt-4 font-bold text-3xl text-[#fbfbfb] text-start pl-8 mb-8"
      >
        Your Order
      </motion.h2>

      {orderProduct ? (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.5 },
          }}
          key={orderProduct.id} // Use the product ID as the key
          className="cart-item pl-12"
        >
          <div className="flex items-center justify-start w-full mb-4">
            {orderProduct.images && orderProduct.images.length > 0 && (
              <img
                src={orderProduct.images[0]}
                alt={orderProduct.name}
                style={{ width: "85px", height: "85px", objectFit: "contain" }}
              />
            )}

            <div className="flex flex-col gap-2 ml-4">
              <strong className="text-md font-semibold text-[#fbfbfb] text-start">
                {orderProduct.name}
              </strong>
              <p className="text-sm font-light text-[#d6d6dc] text-start">
                {orderProduct.stock} Available
              </p>
              <p className="text-sm font-light text-[#d6d6dc] text-start">
                {orderProduct.price}$ - {orderProduct.type}
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full gap-3">
          <img width="300px" height="300px" src={none} alt="" />
          <p className="text-md font-light text-[#d6d6dc]">Your cart is empty</p>
          <a href="/products">
            <p className="text-sm font-light text-[#9f9fac]">
              Check some product and come again
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

export default Order;
