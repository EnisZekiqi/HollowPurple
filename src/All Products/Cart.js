import { useState,useEffect } from "react";
import none from '../images/undraw_web_search_re_efla.svg'
import { motion,AnimatePresence } from "framer-motion";
import { MdOutlineAccountCircle  ,MdOutlineNotifications ,MdOutlineShoppingCart 
  ,MdOutlineLocalShipping , MdFavoriteBorder ,MdOutlineKeyboardArrowDown 
  ,MdInfoOutline ,MdEuro,MdCreditCard, MdOutlinePayments ,
  MdOutlineVerified ,MdFavorite,MdArrowBackIos,MdDeleteOutline,MdOutlineHome,MdOutlineClose,
  MdOutlineCircle ,MdCircle ,MdOutlineDeliveryDining 
} from "react-icons/md"
import { Box, Modal } from '@mui/material';
const Cart = ({ seeProduct}) => {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(
        storedCart.map((item) => ({
          ...item,
          stock: Number(localStorage.getItem(`productStock-${item.id}`)) || item.stock,
          quantity: item.quantity || 1, // Default quantity to 1
        }))
      );
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

  

    const [allProducts, setAllProducts] = useState([]);
    const [productStock, setProductStock] = useState({});

    useEffect(() => {
      // Load stock from localStorage for all cart items
      const stocks = {};
      cartItems.forEach((product) => {
        const savedStock = localStorage.getItem(`productStock-${product.id}`);
        if (savedStock) {
          stocks[product.id] = Number(savedStock); // Store in the state object
        } else {
          stocks[product.id] = product.stock; // Default to the initial stock if not found
        }
      });
      setProductStock(stocks);
    }, [cartItems]); // Re-run when 'product' changes

  const handleStockUpdate = (productId, newStock) => {
    setProductStock(newStock);
    localStorage.setItem(`productStock-${productId}`, newStock);
  };


    const[productValue,setProductValue]=useState(1)
    const [manyProduct,setManyProduct]=useState(false)

    const handleQuantityChange = (productId, delta) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)),
              }
            : item
        )
      );
    };

    
    useEffect(() => {
      const savedStock = localStorage.getItem(`productStock-${allProducts.id}`);
      if (savedStock) {
        setProductStock(Number(savedStock)); // Load from localStorage
      } else {
        setProductStock(allProducts.stock); // Default to the product's initial stock if not found in localStorage
      }
    }, [allProducts.id]);
    

   

    const orderNow = (product) => {
      setOrderDrawer(true);
      setOrderProduct(product);
      setProductValue(product.quantity)
    };
  
    const [OrderDrawer, setOrderDrawer] = useState(false);
    const [orderProduct, setOrderProduct] = useState(null);
  
 

    return (
      <div className="">
        <div className="block md:hidden">
          <CartResponsive/>
        </div>
        <div className="hidden md:block">
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
           key={index} className="cart-item pl-12 py-3" 
           style={{borderBottom:'1px solid rgba(67, 67, 99,0.4)'}}>
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
                  <p className="text-sm font-light text-[#d6d6dc] text-start"> {(productStock && productStock[product.id]) ?? product.stock} Available</p>
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
             <button className="order" onClick={() => orderNow(product)}>Order Now</button>
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
          <TheOrderDrawer
  OrderDrawer={OrderDrawer}
  productValue={productValue}
  orderProduct={orderProduct}
  productStock={productStock?.[orderProduct?.id] ?? orderProduct?.stock}
  handleStockUpdate={handleStockUpdate}
  onClose={() => setOrderDrawer(false)}
/>
      </div>
        </div>
      </div>
    );
  };
  
  const TheOrderDrawer = ({ OrderDrawer, onClose,orderProduct,productValue, productStock, handleStockUpdate }) => {
 
    const [quantity, setQuantity] = useState(productValue);


  useEffect(() => {
    setQuantity(productValue); // Sync with the parent value whenever it changes
  }, [productValue]);

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, Math.min(orderProduct.stock, quantity + delta)); // Ensure within range
    setQuantity(newQuantity);
 };

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'rgba( 1, 1, 3, 0.87 )',
  border: '2px solid #585782',
  boxShadow: 24,
  p: 2,
  borderRadius:'10px'
};


    const optionsCity = [
      { city: 'Vushtrri' },
      { city: 'Prishtina' },
      { city: 'Mitrovica' },
      { city: 'Podujeva' },
      { city: 'Gjilan' },
      { city: 'Prizren' },
      { city: 'Obiliq' },
      { city: 'Gjakove' },
      { city: 'Drenas' },
    ];
    
    const [citySelect,setCitySelect]=useState('')
    
    const handleCityChange =(e)=>{
      setCitySelect(e.target.value)
    }
    
    
    
    const [transport,setTransport]=useState('standard')
    
    const [payment,setPayment]=useState('cash')
    
    
    //// input functions //// /
    
    const [Name,setName]=useState('')
    const [Surname,setSurname]=useState('')
    const [Phone,setPhone]=useState('')
    const [Email,setEmail]=useState('')
    const [Adress,setAdress]=useState('')
    const [priceQuantity,setPriceQuantity]=useState(0)
    const [errorBuy,setErrorBuy]=useState('')
    
    const handleNameChange =(e)=>{
      setName(e.target.value)
    }
    const handleSurnameChange =(e)=>{
      setSurname(e.target.value)
    }
    const handlePhoneChange =(e)=>{
      setPhone(e.target.value)
    }
    const handleEmailChange =(e)=>{
      setEmail(e.target.value)
    }
    const handleAdressChange =(e)=>{
      setAdress(e.target.value)
    }
    
    
    useEffect(() => {
      const productPrice = productValue * orderProduct?.price
        if (productPrice) {
          setPriceQuantity(productPrice)
        }


    }, [productValue,orderProduct]);
    
    const submitOrder = () => {
      console.log("Product Stock:", productStock); // Check if stock is valid
      console.log("Order Quantity:", quantity); // Check if quantity is valid
    
      if (
        !Name.trim() || 
        !Surname.trim() || 
        !Phone.trim() || 
        !Email.trim() || 
        !Adress.trim() || 
        !citySelect.trim()
      ) {
        setErrorBuy('Please submit all the fields');
        setTimeout(() => {
          setErrorBuy('');
        }, 3000);
        return;
      }
    
      if (isNaN(productStock) || isNaN(quantity)) {
        alert("Invalid stock or quantity");
        return;
      }
    
      if (quantity > productStock) {
        alert("Insufficient stock for this order");
        return;
      }
    

    
      // Ensure updatedStock is a valid number
      const updatedStock = productStock - quantity;
      handleStockUpdate(orderProduct.id, updatedStock); // Pass correct productId and newStock
    
      setErrorBuy('');
      setTimeout(() => setErrorBuy(''), 3000);
    
      // Reset the form fields
      setName('');
      setSurname('');
      setPhone('');
      setEmail('');
      setAdress('');
      setCitySelect('');
      setTransport('');
      setPayment('');
    };
    
    
    
    
      return (
        <AnimatePresence>
        {OrderDrawer && (
      <>
        <motion.div
         initial={{ opacity:0 }}  // Start with width 0 and off-screen
         animate={{ opacity:1 }}  // Expand width and move into view
         exit={{ opacity:0}}  // Contract width and move off-screen
         transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
        onClick={onClose} 
        className="backdrop" 
        style={{
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          zIndex: 1000, 
        }} 
      />
     
      <div>
            <Modal
        open={OrderDrawer}
        onClose={onClose}
       >
      <Box
      sx={style}
      >
   <div  className="drawer2 flex flex-col justify-start overflow-y-auto px-4 py-2 h-[550px]"
        style={{
          position: '', // Use fixed to center on screen
          
          borderRadius: '10px', // Optional: Add rounded corners
          zIndex: 3000,
          overflow: 'auto', // Hide overflow if content exceeds
        }}>
         <div className=" flex items-center justify-between w-[100%] pb-2" style={{borderBottom:'1px solid rgba(67, 67, 99,0.4)'}}>
         <h3 className='text-lg md:text-xl font-semibold text-[#fbfbfb] mt-6'>Order</h3>
            <div className="s">
            <button className=" w-fit" onClick={onClose} style={{ marginTop: '10px',marginLeft:'10px',zIndex:3001 }}>
            <MdOutlineClose style={{width:'20px',height:'20px',color:'#fbfbfb'}}/></button>
            </div>
            </div> 
         
          <div>
        <div className="sticky flex items-center gap-4 mt-4 px-4 pb-2" style={{borderBottom:'1px solid rgba(67, 67, 99,0.4)'}}>
        <img width="50px" src={orderProduct.images[0]} alt="" />
       <div className="flex flex-col items-start gap-1">
       <p className='text-[#fbfbfb]'> {orderProduct?.name}</p>
       <div className="flex gap-6">
         <p className='font-semibold text-sm flex items-center gap-1 text-[#fbfbfb]'> <strong className='text-xs font-light'>Price</strong>{priceQuantity}$</p>
       <p className='font-semibold text-sm flex items-center gap-1 text-[#fbfbfb]'> <strong className='text-xs font-light'>Quantity</strong> {productValue}</p></div>
       </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-6">
        <input value={Name} onChange={handleNameChange} className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} type="text" placeholder="Name" />
        <input value={Surname} onChange={handleSurnameChange} className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} type="text" placeholder="Surname" />
        </div>
        <div className="flex justify-between items-center gap-4 mt-8">
        <input value={Phone} onChange={handlePhoneChange } className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} type="text" placeholder="Phone Number" />
        <input value={Email} onChange={handleEmailChange} className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} type="text" placeholder="Email" />
        </div>
        <div className="flex justify-between items-center gap-4 mt-8">
        <input value={Adress} onChange={handleAdressChange} className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} type="text" placeholder="Adress" />
        <select
        className="rounded-md p-1 w-full"
        name="City"
        id="city-select"
        aria-label='City'
        style={{ backgroundColor: 'transparent', border: '1px solid #585782', color: "#9f9fac" }}
        value={citySelect} // Bind value to the selected city
        onChange={handleCityChange} // Handle city selection change
      >
        <option value=""style={{backgroundColor:'#18181b',color:"#d6d6dc"}}>Select a City</option>
        {optionsCity.map((option, index) => (
          <option style={{backgroundColor:'#18181b',color:"#d6d6dc"}} key={index} value={option.city}>
            {option.city}
          </option>
        ))}
      </select>
        </div>
        <div className="flex flex-col mt-8">
          <h1 className='text-xs font-light text-[#fbfbfb] text-start'>Mode of Transport</h1>
          <button className='text-start mt-2 mb-2 rounded-md pl-1 py-2 flex items-center gap-1' 
          onClick={()=>setTransport('standard')}
          style={{color:transport === 'standard' ? '#fbfbfb':'#d6d6dc',border:transport ==='standard' ? '1px solid #6f6e9e':'1px solid rgba(59, 59, 69,0.5)',transition:'all 0.5s ease'}}
            >{transport === 'standard' ? <MdCircle style={{color:'#6f6e9e',transition:'all 0.5s ease'}}/> : <MdOutlineCircle style={{color:'#6f6e9e'}}/>} Standard - Transport Free</button>
          <button className='text-start mt-2 rounded-md pl-1 py-2 flex items-center gap-1' onClick={()=>setTransport('office')}
             style={{color:transport ==='office' ? '#fbfbfb':'#d6d6dc',border:transport ==='office' ? '1px solid #6f6e9e':'1px solid rgba(59, 59, 69,0.5)',transition:'all 0.5s ease'}}
            >{transport === 'office' ? <MdCircle style={{color:'#6f6e9e' ,transition :'all 0.5s ease'}}/> : <MdOutlineCircle style={{color:'#6f6e9e'}}/>} Take in our Office - Free</button>
        </div>
        <div className="flex flex-col mt-8">
        <h1 className='text-xs font-light text-[#fbfbfb] text-start'>Mode of Payment</h1>
        <div className="flex items-center justify-between gap-2">
         
          <button className='text-start mt-2 mb-2 rounded-md px-1 py-2 flex items-center gap-1' 
          onClick={()=>setPayment('cash')}
          style={{color:payment === 'cash' ? '#fbfbfb':'#d6d6dc',border:payment ==='cash' ? '1px solid #6f6e9e':'1px solid rgba(59, 59, 69,0.5)',transition:'all 0.5s ease'}}
            >{payment === 'cash' ? <MdCircle style={{color:'#6f6e9e',transition:'all 0.5s ease'}}/> : <MdOutlineCircle style={{color:'#6f6e9e'}}/>} Pay in cash</button>
          <button className='text-start mt-2 rounded-md px-1 py-2 flex items-center gap-1'
           onClick={()=>setPayment('online')}
             style={{color:payment ==='online' ? '#fbfbfb':'#d6d6dc',border:payment ==='online' ? '1px solid #6f6e9e':'1px solid rgba(59, 59, 69,0.5)',transition:'all 0.5s ease'}}
            >{payment === 'online' ? <MdCircle style={{color:'#6f6e9e' ,transition :'all 0.5s ease'}}/> : <MdOutlineCircle style={{color:'#6f6e9e'}}/>} Pay Online</button>
             <button className='text-start mt-2 rounded-md px-1 py-2 flex items-center gap-1'
           onClick={()=>setPayment('bank')}
             style={{color:payment ==='bank' ? '#fbfbfb':'#d6d6dc',border:payment ==='bank' ? '1px solid #6f6e9e':'1px solid rgba(59, 59, 69,0.5)',transition:'all 0.5s ease'}}
            >{payment === 'bank' ? <MdCircle style={{color:'#6f6e9e' ,transition :'all 0.5s ease'}}/> : <MdOutlineCircle style={{color:'#6f6e9e'}}/>} Pay by bank </button>
        </div>
        </div>
        {errorBuy === '' ?  <p className='text-xs font-light text-[#9f9fac] -mb-3 mt-4'>By filling all the forms the order will be more accurate and more faster to you , please fill them with caution</p>
        :  <p className='text-xs font-light text-[#9f9fac] -mb-3 mt-4'>{errorBuy}</p>  } 
         <AnimatePresence>
        {errorBuy === 'Order submitted successfully' ? (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(100% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, 0.5)', // backdrop dark overlay
              backdropFilter: 'blur(10px)', // blur effect
              zIndex: 9999,
              height:'100vh' // ensure it sits on top of other content
            }}
          >
            <motion.svg
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="100px" // Adjust size as needed
              height="100px"
            >
              <motion.path
                d="M5.5 12.5L10.167 17L19.5 8"
                stroke="#6f6e9e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{
                  duration: 1.5, // duration of path drawing
                  ease: 'easeInOut',
                }}
              />
            </motion.svg>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            {errorBuy}
          </motion.div>
        )}
      </AnimatePresence>
       
        <button onClick={submitOrder} className='rounded-md text-lg font-normal text-[#fbfbfb] bg-[#6f6e9e] w-full mt-6 p-1'>Order Now</button>
      </div>
        </div>
      </Box>
       </Modal>
      </div>
     
        
        </>
      )}
    </AnimatePresence>
      );
    };



    const CartResponsive = ()=>{

      const [cartItems, setCartItems] = useState([]);
  
      useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(
          storedCart.map((item) => ({
            ...item,
            stock: Number(localStorage.getItem(`productStock-${item.id}`)) || item.stock,
            quantity: item.quantity || 1, // Default quantity to 1
          }))
        );
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
  
    
  
      const [allProducts, setAllProducts] = useState([]);
      const [productStock, setProductStock] = useState({});
  
      useEffect(() => {
        // Load stock from localStorage for all cart items
        const stocks = {};
        cartItems.forEach((product) => {
          const savedStock = localStorage.getItem(`productStock-${product.id}`);
          if (savedStock) {
            stocks[product.id] = Number(savedStock); // Store in the state object
          } else {
            stocks[product.id] = product.stock; // Default to the initial stock if not found
          }
        });
        setProductStock(stocks);
      }, [cartItems]); // Re-run when 'product' changes
  
    const handleStockUpdate = (productId, newStock) => {
      setProductStock(newStock);
      localStorage.setItem(`productStock-${productId}`, newStock);
    };
  
  
      const[productValue,setProductValue]=useState(1)
      const [manyProduct,setManyProduct]=useState(false)
  
      const handleQuantityChange = (productId, delta) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(item.stock, item.quantity + delta)),
                }
              : item
          )
        );
      };
  
      
      useEffect(() => {
        const savedStock = localStorage.getItem(`productStock-${allProducts.id}`);
        if (savedStock) {
          setProductStock(Number(savedStock)); // Load from localStorage
        } else {
          setProductStock(allProducts.stock); // Default to the product's initial stock if not found in localStorage
        }
      }, [allProducts.id]);
      
  
     
  
      const orderNow = (product) => {
        setOrderDrawer(true);
        setOrderProduct(product);
        setProductValue(product.quantity)
      };
    
      const [OrderDrawer, setOrderDrawer] = useState(false);
      const [orderProduct, setOrderProduct] = useState(null);

      
      return(
        <div>
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
           key={index} className="cart-item pl-6 py-3" 
           style={{borderBottom:'1px solid rgba(67, 67, 99,0.4)'}}>
              <div>
                <div className="flex items-center justify-start w-full mb-4">
                  <div className="flex flex-col px-1.5">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ width: '55px', height: '55px', objectFit: 'contain' }}
                    />
                  )}
                  </div>
                 <div className="flex items-center h-full">
                 <div className="flex flex-col gap-1">
                 <strong className="text-sm font-semibold text-[#fbfbfb] text-start">{product.name}</strong>
                 <p className="text-xs font-light text-[#d6d6dc] text-start mt-1"> {(productStock && productStock[product.id]) ?? product.stock} Available</p>
                 </div>
              <div className="flex flex-col items-center gap-4 mt-4">
                
              <button className="ml-2" onClick={() => handleRemoveItem(product)}><MdDeleteOutline style={{width:'22px',height:'22px'}}/></button>
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
              </div>
              <button className="order3 w-full " onClick={() => orderNow(product)}>Order Now</button>
              {product.quantity >= (product.stock || productStock) && (
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
          <TheOrderDrawer
  OrderDrawer={OrderDrawer}
  productValue={productValue}
  orderProduct={orderProduct}
  productStock={productStock?.[orderProduct?.id] ?? orderProduct?.stock}
  handleStockUpdate={handleStockUpdate}
  onClose={() => setOrderDrawer(false)}
/>
      </div>
        </div>
      )
    }

  export default Cart;
  