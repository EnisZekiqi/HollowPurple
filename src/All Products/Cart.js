
import { useState,useEffect } from "react";
import none from '../images/undraw_web_search_re_efla.svg'
import { MdDeleteOutline   } from "react-icons/md"
import { motion } from "framer-motion";
const Cart = ({ seeProduct}) => {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    }, []);
  
    const handleRemoveItem = (product) => {
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart.map(item => ({ ...item, quantity: 1 }))); // Add quantity to each item
    }, []);
  

    const[productValue,setProductValue]=useState(1)
    const [manyProduct,setManyProduct]=useState(false)

    const handleQuantityChange = (productId, delta) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)), // Keep within valid range
              }
            : item
        )
      );
    };
    return (
      <div className="cart h-screen">
        <div className="flex p-1.5"> 
        <div className='flex items-center gap-1'>
          <a href="/products"> <h1  className='font-bold text-lg cursor-pointer md:text-xl'>HollowPurple</h1></a>
            <svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="#5a58a5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
           </div>

        </div>
        <div className="empty"></div>
        <motion.h2
        initial={{opacity:0,y:-10}}
        animate={{opacity:1,y:0,transition:{duration:0.5,delay:0}}}
         className="mt-4 font-bold text-3xl text-[#fbfbfb] text-start pl-8 mb-8">Your Cart</motion.h2>
        {cartItems.length > 0 ? (
          cartItems.map((product, index) => (
            <motion.div
            initial={{opacity:0,y:-15}}
            animate={{opacity:1,y:0,transition:{duration:0.5,delay:0.5}}}
           key={index} className="cart-item pl-12">
              <div onClick={() => seeProduct(product)}>
                <div className="flex items-center justify-start w-full mb-4">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ width: '85px', height: '85px', objectFit: 'contain' }}
                    />
                  )}
                   <div className="flex items-center gap-14 justify-around">
                   <p className="flex flex-col gap-2">
                  <strong className="text-md font-semibold text-[#fbfbfb] text-start">{product.name}</strong>
                  <p className="text-sm font-light text-[#d6d6dc] text-start">{product.stock} Avilable</p>
                </p>
                   <div className="flex flex-col justify-around gap-8">
                   <div className="flex justify-around items-center gap-16">
                    <p className="text-md font-semibold text-[#fbfbfb] text-center">Price</p>
                    <p className="text-md font-semibold text-[#fbfbfb] text-center">Type</p>
                    <p className="text-md font-semibold text-[#fbfbfb] text-center">Brand</p>
                    <p className="text-md font-semibold text-[#fbfbfb] text-center">Quantity</p>
                    </div>
                    <div className="flex justify-around items-center gap-16">
                    <p className="text-sm font-light text-[#d6d6dc] text-center">{product.price}$</p>
                    <p  className="text-sm font-light text-[#d6d6dc] text-center" style={{border:'1px solid #3b3b45',backgroundColor:'#242329',padding:'4px',borderRadius:'10px'}}>{product.type}</p>
                    <p  className="text-sm font-light text-[#d6d6dc] text-center" >{product.brand}</p>
                    <div className="flex flex-col gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1"
                        style={{ border: "1px solid #3b3b45", borderRadius: "5px" }}
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        -
                      </button>
                      <input
                        className="w-[30px] input-no-arrows"
                        type="text"
                        value={product.quantity}
                        readOnly
                      />
                      <button
                        className="px-2 py-1"
                        style={{ border: "1px solid #3b3b45", borderRadius: "5px" }}
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                    </div>
                   </div>
                  
                
             
             <div className="flex gap-2 ml-8">
             <button className="order" onClick={() => handleRemoveItem(product)}>Order Now</button>
             <button onClick={() => handleRemoveItem(product)}><MdDeleteOutline style={{width:'25px',height:'25px'}}/></button>
             </div>
                   </div>
                </div>
              </div>
              {product.quantity >= product.stock && (
                      <p className="text-xs text-center font-extralight">The value exceeds available stock</p>
                    )}
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-3">
            <img width="300px" height="300px" src={none} alt="" />
            <p className="text-md font-light text-[#d6d6dc]">Your cart is empty</p>
            <a href="/products"><p className="text-sm font-light text-[#9f9fac]">Check some product and come again</p></a>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;
  