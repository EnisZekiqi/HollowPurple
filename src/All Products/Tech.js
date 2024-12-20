import * as React from 'react';
import { MdOutlineAccountCircle  ,MdOutlineNotifications ,MdOutlineShoppingCart ,MdMenu 
  ,MdOutlineLocalShipping , MdFavoriteBorder ,MdOutlineKeyboardArrowDown 
  ,MdInfoOutline ,MdEuro,MdCreditCard, MdOutlinePayments ,
  MdOutlineVerified ,MdFavorite,MdArrowBackIos,MdDeleteOutline,MdOutlineHome,MdOutlineClose,MdOutlineDone ,
  MdOutlineCircle ,MdCircle ,MdOutlineDeliveryDining ,MdArrowForwardIos, MdClose,
  MdArrowBack
} from "react-icons/md"
import { useState,useEffect } from 'react';
import { SiLogitechg,SiSamsung,SiApple,SiLenovo ,SiRazer,SiSony ,SiHp ,SiAsus     } from "react-icons/si";
import { motion,AnimatePresence }from 'framer-motion'
import { IoIosArrowForward } from "react-icons/io";
import Slider from 'react-slick';
import notfound from '../images/undraw_empty_cart_co35.svg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { MdMonitor,MdLaptop,MdOutlinePhoneIphone,MdHeadphones ,MdCameraAlt ,MdMouse    } from "react-icons/md";

import Cart from './Cart'
import { ChangeHistoryTwoTone } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';

const Tech = ({selectedTech,chooseTech,chooseBrand,loadingTech,setLoadingTech}) => {

    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
        // Fetch data from the JSON file
        fetch('/data/brands/all-products.json')
          .then(response => response.json())
          .then(data => {
            setAllProducts(data); // Save all products
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []); // Fetch data only once
      
      useEffect(() => {
        if (selectedTech && allProducts.length > 0) {
          const filtered = allProducts.filter(product => product.type === selectedTech);
          console.log('Filtered Products:', filtered);
          setFilteredProducts(filtered);
          setLoadingTech(false)
        }
      }, [selectedTech, allProducts]);


      const handleClear =()=>{
        setSearchQuery('')
      }

      const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter products by name or other properties
        const results = allProducts.filter(product =>
          product.name.toLowerCase().includes(query)
        );
        setSearchResults(results);
      };

      
      const [showUnderTech,setshowUnderTech]=useState('') /// hover effect over the tech
      const [showTechBrands,setShowTechBrands]=useState('tech') //// show either brands or tech
      const [drawerTechBrand,setDrawerTechBrand]=useState(false)


      const brands = [
        { brand: <SiLogitechg style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Logitech' },
        { brand: <SiSamsung style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Samsung' },
        { brand: <SiApple style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Apple' },
        { brand: <SiLenovo style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Lenovo' },
        { brand: <SiRazer style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Razer' },
        { brand: <SiSony style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Sony' },
        { brand: <SiHp style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Hp' },
        { brand: <SiAsus style={{ width: '35px', height: '35px', color: '#d6d6dc' }} />, name: 'Asus' },
      ];
      

      const tech =[
        {tech:'Pc and Laptops'},
        {tech:'Headphones'},
        {tech:'Monitor'},
        {tech:'Phones'},
        {tech:'Camera'},
        {tech:'Projector'},
        {tech:'Mouse'},
      ]

      const techResponsive =[
        {tech:<MdMonitor style={{color:'#fbfbfb',width:'25px',height:'25px'}}/>,name:'Monitor'},
        {tech:<MdLaptop style={{color:'#fbfbfb',width:'25px',height:'25px'}}/>,name:'Pc and Laptops'},
        {tech:<MdOutlinePhoneIphone style={{color:'#fbfbfb',width:'25px',height:'25px'}}/>,name:'Phones'},
        {tech:<MdHeadphones style={{color:'#fbfbfb',width:'25px',height:'25px'}}/>,name:'Headphones'},
        {tech:<MdCameraAlt style={{color:'#fbfbfb',width:'25px',height:'25px'}}/>,name:'Camera'},
        {tech:<MdMouse style={{color:'#fbfbfb',width:'25px',height:'25px'}}/>,name:'Mouse'},
      ]
      const brandsResponsive = [
        {brand:<SiLogitechg style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Logitech'},
        {brand:<SiSamsung style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Samsung'},
        {brand:<SiApple style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Apple'},
        {brand:<SiLenovo style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Lenovo'},
        {brand:<SiRazer style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Razer'},
        {brand:<SiSony style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Sony'},
        {brand:<SiHp style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Hp'},
        {brand:<SiAsus style={{width:'30px',height:'30px',color:'#fbfbfb'}}/>,name:'Asus'},
      ]

      const toggleDrawer = () => {
        setDrawerTechBrand(!drawerTechBrand);
      };
    
      const handleBrand=(brand)=>{
        chooseBrand(brand)
      }


      const handleTech =(tech)=>{
        chooseTech(tech)
      }

      const parentAnimation = {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          staggerChildren: 0.3, // Staggered animation for children
          transition: { duration: 0.5 },
        },
      };
    
      const childAnimation = {
        initial: { opacity: 0 ,x:-10},
        animate: { opacity: 1,x:0, staggerChildren: 0.3,transition: { duration: 0.3 } },
      };

      const drawerAnimation = {
        open: {
          x: 0, // Drawer slides in (left to right)
          opacity: 1,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
        closed: {
          x: '-100%', // Drawer slides out completely (offscreen)
          opacity: 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
      };

      const backdropAnimation = {
        open: {
          opacity: 1,
          transition: { duration: 0.3 },
        },
        closed: {
          opacity: 0,
          transition: { duration: 0.3 },
        },
      };

////selected product on search //////


const [showProduct,setShowProduct]=useState(null)
const [loadingTime,setLoadingTime]=useState(false)

const seeProduct =(product)=>{
  setShowProduct(product)
  setSearchQuery('')
  setSearchResults([]); 
  setDrawerOpener(false)
  setLoadingTime(true)
  setTimeout(() => {
    setLoadingTime(false)
  }, 4000);
}

///go back to searching function /////


const handleGoBack =()=>{
  setShowProduct(null)
}

const [FavCount,setFavCount]=useState(0)
const [fav,setFav]=useState(false)
const [alertFav,setAlertFav]=useState('')

 useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  setFavCount(storedFavorites.length );
}, []);  //// updating when you add to favorites 


 //// updating when you remove to favorites 

const [DrawerOpener,setDrawerOpener]=useState(false)

const addToFavorites = (product) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isAlreadyFavorite = favorites.some(item => item.id === product.id);
  
  if (!isAlreadyFavorite) {
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 3000);
    setAlertFav('Product added to favorites!');
  } else {
    setAlertFav('Product is already in favorites!');
    setOpen(true)
  }
};


const removeFavorites =(product)=>{
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const updatedFavorites = favorites.filter(item => item.id !== product.id);

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

  setShowProduct(null)
  setFav(false);  // Example of removing from state if needed
  setOpen(true)
  setAlertFav('Product removed from favorites!');

}

const [open, setOpen] = React.useState(false);

const handleClose = (event, reason) => {  //// close the alert 
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const [cartCount,setCartCount]=useState(0)

setTimeout(() => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || []
  setCartCount(storedCart.length)
}, []);


const action = (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);


const [orderCheck,setOrderCheck]=useState(false) //// after ordering the notification on the icon
const [orderCheckInfo,setOrderCheckInfo]=useState(null) 
const [orderCheckPrice,setOrderCheckPrice]=useState(0)
const [orderCountShow, setOrderCountShow] = useState(false);
const [orderCount,setOrderCount]=useState(0) //// count for the completed order 

const DismissOrderInfo = (e) => {
  // Ensure the click is outside the order details
  if (e.target.classList.contains('backdrop')) {
    setOrderCheck(false);
    setOrderCheckInfo(null);
  }
};

const DismissOrderCheck =()=>{
  console.log("DismissOrderCheck triggered");
  setOrderCheck(false)
  setOrderCheckInfo(null)
}

useEffect(() => {
  // Retrieve 'orderDetails' from localStorage
  const notifyOrder = localStorage.getItem('orderDetails');
  
  if (notifyOrder) {
    const orderData = JSON.parse(notifyOrder);  // Parse it into a valid object
    setOrderCheck(true);
    setOrderCheckInfo(orderData);  // Set order data, including product and user info
    setOrderCheckPrice(orderData);
  }

  // Parse the 'orderDetails' or default to an empty array if it's not found or invalid
  const orderValue = JSON.parse(localStorage.getItem('orderDetails')) || [];
  
  // Make sure it's an array before trying to get its length
  const count = orderValue.length;
  console.log('Order count:', count);  // Log to debug
  
  setOrderCount(count);  // Update order count directly
  
  // Check screen width
  const screenWidth = window.innerWidth;

  if (screenWidth >= 764) {
    // Set the order count visible after a timeout (7 seconds) for larger screens
    setTimeout(() => {
      setOrderCountShow(true);  // Show the count after 7 seconds
    }, 7000);
  } else {
    // If the screen width is less than 764px, reset the order check info after 7 seconds
    setTimeout(() => {
      setOrderCheck(false);
      setOrderCheckInfo(null);  // Clear the order check info
    }, 7000);
  }

}, []);

    return ( 
        <div>
          {loadingTech === true ? <div className='h-screen flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-md'
    style={{ backgroundColor: 'rgba(1, 1, 3,0.7)' }}
    >
      <div className="loader"></div>
      <div className="empty"></div>
    </div> :
            <div className='products h-full md:h-screen' >
     {showProduct ? (
      <ProductDetails 
      product={showProduct}
       handleGoBack={handleGoBack} 
       allProducts={allProducts} 
       seeProduct={seeProduct}
       chooseTech={chooseTech}
       loadingTime={loadingTime}/>
     ):(
      <div>
        <div className="navbarfinally" style={{
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%'
  }}>
    {/* Full navbar content that shows only when scrolled up */}
   
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 1 } }}
        className="flex flex-col px-3 md:px-1.5 py-2 mb-2.5"
      >
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-1'>
            <div className="flex items-center gap-1">
            <button   onClick={() => setDrawerTechBrand(!drawerTechBrand)} className='block md:hidden'>
                <MdMenu/>
              </button>
              <h1 onClick={() => console.log('Go back')} className='font-semibold md:font-bold text-lg cursor-pointer md:text-xl'>HollowPurple</h1>
              <svg className='logosmall hidden md:block' style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="hidden  md:flex items-center justify-center w-full mt-2.5">
          <div style={{ position: 'relative', width: '50%' }}>
      <input
        value={searchQuery}
        onChange={handleSearch}
        className="searchProduct"
        style={{
          background: 'transparent',
          border: '1px solid #6f6e9e',
          padding: '3px',
          borderRadius: '5px',
          transition: 'width 0.3s ease-in-out',
          width: '100%',
        }}
        type="text"
        placeholder="Search Products"
      />
      {/* Clear Button (X) */}
      {searchQuery && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '5px', // Position the button on the right side
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#d6d6dc',
          }}
        >
          <MdClose/>
        </button>
      )}
    </div>
        </div>
          <div className="flex gap-3 items-center cursor-pointer">
          <Link 
        to="/order-summary" 
        state={{ orderDetails: orderCheckInfo, orderTime: new Date().toLocaleString() }} // Passing state to the next route
        className="order-info-link"
      >
           <div className='relative'>
           {orderCountShow && (orderCount === 0 ? '' : 
  <p className="absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold">
    !
  </p>
)}
  
  <div className="flex flex-col">
    <MdOutlineDeliveryDining style={{ width: '25px', height: '25px' }} />
  </div>
  
  <div className="absolute">
    {orderCheck && orderCheckInfo && (
        <div className='ml-2 mr-4'>
          <div className="absolute left-1/2 top-[14px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#242329]" style={{borderTop:'1px solid #6f6e9e',borderLeft:'1px solid #6f6e9e', zIndex:100}} />
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[74px] bg-[#242329] p-1.5 rounded-md -ml-14 md:-ml-16" style={{border:'1px solid #6f6e9e',zIndex:10}}>
            <div className="contentorder ">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 " style={{width:'280px'}}>
                  <img width="45px" height="45px" src={orderCheckInfo.productImage} alt="Product" />
                  <div className="flex flex-col">
                    <p className='text-sm font-light text-[#fbfbfb]'>{orderCheckInfo.productName}</p>
                    <p className='text-sm font-normal text-[#d6d6dc] flex items-center gap-1'>
                      <strong className='text-xs font-light text-[#9f9fac]'>Ordered By :</strong> {orderCheckInfo.Name} {orderCheckInfo.Surname}
                    </p>
                    <p className='text-sm font-normal text-[#d6d6dc] flex items-center gap-1'>
                      <strong className='text-xs font-light text-[#9f9fac]'>Quantity</strong> {orderCheckInfo.productValue}
                    </p>
                    <p className='text-sm font-normal text-[#d6d6dc] flex items-center gap-1'>
                      <strong className='text-xs font-light text-[#9f9fac]'>Price</strong> {orderCheckPrice.priceQuantity}$ 
                    </p>
                  </div>
                </div>
                <button
                className='text-sm font-normal text-[#fbfbfb] bg-[#6f6e9e] w-full rounded-md p-0.5 mt-1'
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link navigation
                  e.stopPropagation(); // Prevent event bubbling
                  DismissOrderCheck(); // Close the order check
                }}
                style={{ zIndex: 4000 }}
              >
                Check Later
              </button>
              </div>
            </div>
          </div>
        </div>
    )}
  </div>
</div>
        </Link>
            <div className="relative">
              {FavCount === 0 ? '' : <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{FavCount}</p>}
              <div onClick={()=>setDrawerOpener(true)}>
                <MdFavoriteBorder style={{ width: '25px', height: '25px' }} />
              </div>
            </div>
            <div className="relative">
              {cartCount === 0 ? '' : <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{cartCount}</p>}
              <Link to="/cart">
                <MdOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
              </Link>
            </div>
          </div>
        
        </div>

        {/* Main Search Bar */}
        <div className="flex md:hidden items-center justify-center w-full mt-2.5">
        <div style={{ position: 'relative', width: '100%' }}>
        <input
            value={searchQuery}
            onChange={handleSearch}
            className="searchProduct"
            style={{
              background: 'transparent',
              border: '1px solid #6f6e9e',
              padding: '3px',
              borderRadius: '5px',
              transition: 'width 0.3s ease-in-out',
              width: '100%', // Adjust as needed
            }}
            type="text"
            placeholder='Search Products'
          />
           {searchQuery && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '5px', // Position the button on the right side
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#d6d6dc',
          }}
        >
          <MdClose/>
        </button>
      )}
        </div>
        </div>
      </motion.div>
  

    {/* Floating search bar that stays when scrolled down */}
   
    <AnimatePresence>
      {searchQuery.trim() !== '' && (
  <motion.div
  initial={{opacity:0,y:-10}}
  animate={{opacity:1,y:0,transiton:{duration:0.5}}}
  exit={{opacity:0,y:-10,transition:{duration:0.2}}}
  className="search-results absolute  left-[0%] right-[3%] md:left-[25%] md:right-[20%] z-50 overflow-y-auto h-[400px] -mt-2" style={{ border: '1px solid #6f6e9e', padding: '10px' }}>
    {searchResults.length > 0 ? (
      searchResults.map(product => (
        <div
         key={product.id}
         onClick={()=>seeProduct(product)}
         className="product-card flex items-center cursor-pointer pl-4 pt-2.5 gap-2 mb-3.5">
         {product.brand === 'Sony' && <div className='logoBrand'><SiSony style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Razer' && <div className='logoBrand'><SiRazer style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Hp' && <div className='logoBrand'><SiHp style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Lenovo' && <div className='logoBrand'><SiLenovo style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Asus' && <div className='logoBrand'><SiAsus style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Samsung' && <div className='logoBrand'><SiSamsung style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Apple' && <div className='logoBrand'><SiApple style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Logitech' && <div className='logoBrand'><SiLogitechg style={{padding:'4px',width:'50px',height:'50px'}}/></div>}

         <div className="flex flex-col gap-2">
         <h3 className='font-semibold text-start text-md md:text-lg' style={{color:'#fbfbfb'}}>{product.name}</h3>
         <p className='text-start text-sm md:text-md font-light'style={{color:'#d6d6dc'}}> ${product.price}</p>
         </div>
         
        </div>
      ))
    ) : (
      <p>No products found.</p>
    )}
    </motion.div>
  )}
       </AnimatePresence> </div>
      <div>
  
      
</div>
<div className="empty"></div>
<motion.p 
initial={{opacity:0,y:-10}}
animate={{opacity:1,y:0,transition:{duration:0.5,delay:0}}}
className=" text-start pl-8 mt-4 font-bold text-3xl text-[#fbfbf] mb-4">{selectedTech}</motion.p>
<motion.div
initial={{opacity:0,y:-15}}
animate={{opacity:1,y:0,transition:{duration:0.5,delay:0.5}}}
className="product-grid grid grid-cols-1 md:grid-cols-5 gap-4 justify-items-center px-1.5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card mb-6 px-1 py-2.5 rounded-md bg-[#18181b94] h-[300px] flex flex-col justify-between">
              {product.images && product.images.length > 0 ? (
                <div className="flex w-full items-center justify-center h-[105px]">
                  <img className="w-[100px] h-[100px] object-contain max-w-full max-h-full" src={product.images[0]} alt={product.name} />
                </div>
              ) : (
                <p className="text-sm text-[#9f9fac]">No image available</p>
              )}
               <h3 className='font-bold text-md text-[#fbfbfb] mt-2'>{product.name}</h3>
          <p className="font-light text-xs text-[#9f9fac] line-clamp-2 test-start">
            {product.description}
          </p>
          <p className='font-semibold text-md text-[#d6d6dc] text-start pl-1.5 mt-2'>{product.price}$</p>
          <div className="flex justify-around w-full items-center mt-2 gap-2">
            <button  onClick={()=>seeProduct(product)} className='text-[#fbfbfb] rounded-md bg-transparent p-1 w-full' style={{border:'1px solid #6f6e9e'}}>More Details</button>
            <button 
            onClick={() =>addToFavorites(product)}
            className='bg-[#6f6e9e] text-[#fbfbfb] p-1 rounded-md'>
              <MdFavoriteBorder style={{width:'25px',height:'25px'}}/></button>
          </div>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </motion.div>
      </div>
     
     )}
    
    {drawerTechBrand && 
      <motion.div
      className="backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      variants={backdropAnimation}
      initial="closed"
      animate={drawerTechBrand ? 'open' : 'closed'}
      onClick={toggleDrawer} // Close the drawer when the backdrop is clicked
    />
     }
      <motion.div
        className="drawer1 fixed top-0 left-0 w-64 h-full  text-white"
        style={{zIndex:1000}}
        variants={drawerAnimation}
        initial="closed"
        animate={drawerTechBrand ? 'open' : 'closed'} // Animate based on the state
      >
        <div className="drawer-content">
          <h2 className="flex justify-between text-lg font-semibold bg-[#585782] items-center mt-0 w-full rounded-lg px-2">
           <button onClick={toggleDrawer}> <MdArrowBack/></button>
            HollowPurple</h2>
          <div className="emptyg opacity-0">1</div>
          {techResponsive.map((txt, index) => (
           <Link
           to="/tech"
           >
            <motion.div
              key={index}
              variants={childAnimation}
              initial="initial"
              animate="animate" // Apply stagger animation for each brand item
              className="px-3 mb-3.5"
              onClick={()=>handleTech(txt.name)}
            >
              <div className="flex items-center gap-4">
              <div className="brandcover2">{txt.tech}</div>
              <p className="brandcover2 text-md font-light text-[#d6d6dc]">{txt.name}</p>
              </div>
            </motion.div></Link>
          ))}
          <div className="px-2">
          <hr  style={{width:'100%',height:'2px',backgroundColor:'#9f9fac',marginTop:'5px',marginBottom:'5px'}}/>
          </div>
          {brandsResponsive.map((txt, index) => (
            <Link to='/brand'>
            <motion.div
              key={index}
              variants={childAnimation}
              initial="initial"
              animate="animate" // Apply stagger animation for each brand item
              className="px-3 mt-3.5"
              onClick={()=>handleBrand(txt.name)}
            >
              <div className="flex items-center gap-4">
              <div className="brandcover2">{txt.brand}</div>
              <p className="brandcover2  text-md font-light text-[#d6d6dc]">{txt.name}</p>
              </div>
              
            </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
   <FavoriteDrawer seeProduct={seeProduct} DrawerIsOpen={DrawerOpener} removeFavorites={removeFavorites} onClose={()=>setDrawerOpener(false)} />
    </div>
}
        </div>
     );
}

const ProductDetails =({product, handleGoBack, allProducts, seeProduct,loadingTime,chooseTech })=>{

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
      const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter products by name
        if (query.trim() !== '') {
          const results = allProducts.filter(prod => prod.name.toLowerCase().includes(query));
          setSearchResults(results);
        } else {
          setSearchResults([]); // Clear search results if the query is empty
        }
      };
  
      useEffect(() => {
        // Clear search query and results whenever the product changes
        setSearchQuery('');
        setSearchResults([]);
      }, [product]); // This will run when the product changes
      
  
  
      const brands = [
        {brand:<SiLogitechg style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiSamsung style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiApple style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiLenovo style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiRazer style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiSony style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiHp style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
        {brand:<SiAsus style={{width:'35px',height:'35px',color:'#d6d6dc'}}/>},
      ]
  
  
      const [showProduct,setShowProduct]=useState(null)
  
  
      
      ///select product /////
      
    
      const[productValue,setProductValue]=useState(1)
      const [manyProduct,setManyProduct]=useState(false)
  
      useEffect(() => {
        if (productValue > productStock) {
          setManyProduct(true)
          
        }else{
          setManyProduct(false)
        }
      }, [productValue,product.stock]);
      
  
      const [detailTransport,setDetailTransport]=useState(false) ///// for more information in transport 
  
     const [fav,setFav]=useState(false) /// favorite alert and other functions
     const [alertFav,setAlertFav]=useState('')
  
     useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem('favourite')) || [];
      // Check if the current product is in the favorites list
      if (favorites.includes(product.id)) {
        setFav(true);
      }
    }, [product.id]);
  
  // Function to add a product to favorites
  const addToFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(item => item.id === product.id);
    
    if (!isAlreadyFavorite) {
      favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setFav(true)
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 3000);
      setAlertFav('Product added to favorites!');
    } else {
      setAlertFav('Product is already in favorites!');
      setOpen(true)
    }
  };
  
  const [OrderDrawer,setOrderDrawer]=useState(false)
  const [orderProduct, setOrderProduct] = useState(null);
  
  const orderNow = async (productId) => {
    setOrderProduct(product);
     setOrderDrawer(true);
  };
  
  //// for link 
  
  const navigate = useNavigate();
  
  const orderNowPT2 = (product) => {
    navigate('/Order', { state: { product } });
  };
  
  const removeFavorites =(product)=>{
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(item => item.id !== product.id);
  
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
    // Optionally update state (if you have setFav or similar to update the UI)
    setFav(false); 
    setOpen(true) // Example of removing from state if needed
    setAlertFav('Product removed from favorites!');
  }
  
  useEffect(() => {
    const favIcon = localStorage.getItem('favorites')
  
    if (fav) {
      setFav(favIcon)
    }
  
  }, []);
  
  const [alertCart,setAlertCart]=useState(false)
  const [alertProductId, setAlertProductId] = useState(null);
  
  const handleAddCart = (product) => {
    let addedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = addedCart.some(item => item.id === product.id);
  
    if (!isAlreadyInCart) {
      addedCart.push(product);
      localStorage.setItem('cart', JSON.stringify(addedCart));
  
      // Show alert only if the added product is the one that triggered it
      if (alertProductId !== product.id) {
        setAlertProductId(product.id);
        setAlertCart(true);
        setTimeout(() => setAlertCart(false), 3000);
      }
  
      setOpen(true);
    } else {
      // Reset the alert state if the same product is being added again
      setAlertCart(false);
      setOpen(false);
      setTimeout(() => setAlertCart(false), 3000);
    }
  };
  
  // Use an effect to clear the `alertProductId` after the alert is shown
  useEffect(() => {
    if (alertCart) {
      setTimeout(() => {
        setAlertCart(false);
        setAlertProductId(null);
      }, 3000);
    }
  }, [alertCart]);
  
  const handleRemoveCart = (product) => {
    let addedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = addedCart.filter(item => item.id !== product.id);
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    setOpen(true);
    setAlertCart('Product removed from cart!');
    setTimeout(() => setOpen(false), 3000);
  };
  
  
  useEffect(() => {
    const favIcon = localStorage.getItem('favorites')
  
    if (fav) {
      setFav(favIcon)
    }
  
  }, []);
  
  // Usage in JSX for the button
  
  
      const heightChange = {height:detailTransport ? 'fit-content':'',transition:'height 1.5s ease',padding:'8px'}
     
  
      const [moreDescription,setMoreDescription]=useState('description')
  
      const changeDescription =(change)=>{
        setMoreDescription(change)
      }
  
  ///// carousel for the images of the product //// 
  
  const settings = {
    customPaging: function (i) {
      return (
        <a>      
            <img
            className='h-12 w-20 flex items-center'
              src={product.images[i]}
              alt={`Thumbnail ${i}`}
              style={{
                objectFit: 'contain',border:'2px solid #6f6e9e',borderRadius:'5px',  backgroundColor: 'rgba(36, 35, 41, 0.4)'
              }}
            />
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  const [DrawerOpener,setDrawerOpener]=useState(false)
  
   const [FavCount,setFavCount]=useState(0)
  
   useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavCount(storedFavorites.length );
  }, []);
  
  
  
  const [cartCount,setCartCount]=useState(0)
  
  setTimeout(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCartCount(storedCart.length)
  }, []);
  
  //// add to cart all functions below !! //
  
  const [open, setOpen] = React.useState(false);
  
  const handleClose = (event, reason) => {  //// close the alert 
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  
  
  //// stock changes when the order is complete ///// 
  
  const [productStock, setProductStock] = useState(product.stock);
  
  const handleStockUpdate = (newStock) => {
    setProductStock(newStock);
    localStorage.setItem(`productStock-${product.id}`, newStock);
  };
  
  
  
  useEffect(() => {
    const savedStock = localStorage.getItem(`productStock-${product.id}`);
    if (savedStock) {
      setProductStock(Number(savedStock)); // Load from localStorage
    } else {
      setProductStock(product.stock); // Default to the product's initial stock if not found in localStorage
    }
  }, [product.id]);
  
  
  useEffect(() => {
    if (seeProduct) {
      setDrawerOpener(false) 
    }
  }, [seeProduct]);
  
  
  const [orderCheck,setOrderCheck]=useState(false) //// after ordering the notification on the icon
  const [orderCheckInfo,setOrderCheckInfo]=useState(null) 
  const [orderCheckPrice,setOrderCheckPrice]=useState(0)
  const [orderCountShow, setOrderCountShow] = useState(false);
  const [orderCount,setOrderCount]=useState(0) //// count for the completed order 
  
  
  const DismissOrderCheck =()=>{
    console.log("DismissOrderCheck triggered");
    setOrderCheck(false)
    setOrderCheckInfo(null)
  }
  
  useEffect(() => {
    // Retrieve 'orderDetails' from localStorage
    const notifyOrder = localStorage.getItem('orderDetails');
    
    if (notifyOrder) {
      const orderData = JSON.parse(notifyOrder);  // Parse it into a valid object
      setOrderCheck(true);
      setOrderCheckInfo(orderData);  // Set order data, including product and user info
      setOrderCheckPrice(orderData);
    }
  
    // Parse the 'orderDetails' or default to an empty array if it's not found or invalid
    const orderValue = JSON.parse(localStorage.getItem('orderDetails')) || [];
    
    // Make sure it's an array before trying to get its length
    const count = orderValue.length;
    console.log('Order count:', count);  // Log to debug
    
    setOrderCount(count);  // Update order count directly
    
    // Check screen width
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 764) {
      // Set the order count visible after a timeout (7 seconds) for larger screens
      setTimeout(() => {
        setOrderCountShow(true);  // Show the count after 7 seconds
      }, 7000);
    } else {
      // If the screen width is less than 764px, reset the order check info after 7 seconds
      setTimeout(() => {
        setOrderCheck(false);
        setOrderCheckInfo(null);  // Clear the order check info
      }, 7000);
    }
  
  }, []);  // Empty dependency array ensures it runs only once when the component mounts
  
  const handleTech =(tech)=>{
    chooseTech(tech)
  }
  
    return (
     <div>
      {loadingTime === true ? <div className='h-screen flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-md'
      style={{ backgroundColor: 'rgba(1, 1, 3,0.7)' }}
      >
        <div className="loader"></div>
        <div className="empty"></div>
      </div> :
       <motion.div
       
       className="product-details p-2 md:p-4 h-full">
       <AnimatePresence>
       <div className="navbarfinally" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      {/* Full navbar content that shows only when scrolled up */}
     
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 1 } }}
          className="flex flex-col px-3 md:px-1.5 py-2 mb-2.5"
        >
          <div className="flex justify-between items-center">
            <div className='flex items-center gap-1'>
              <div className="flex items-center gap-1">
                <h1 onClick={() => console.log('Go back')} className='font-semibold md:font-bold text-lg cursor-pointer md:text-xl'>HollowPurple</h1>
                <svg className='logosmall hidden md:block' style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="hidden  md:flex items-center justify-center w-full mt-2.5">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="searchProduct"
              style={{
                background: 'transparent',
                border: '1px solid #6f6e9e',
                padding: '3px',
                borderRadius: '5px',
                transition: 'width 0.3s ease-in-out',
                width: '50%', // Adjust as needed
              }}
              type="text"
              placeholder='Search Products'
            />
          </div>
            <div className="flex gap-3 items-center cursor-pointer">
            <Link 
          to="/order-summary" 
          state={{ orderDetails: orderCheckInfo, orderTime: new Date().toLocaleString() }} // Passing state to the next route
          className="order-info-link"
        >
             <div className='relative'>
             {orderCountShow && (orderCount === 0 ? '' : 
    <p className="absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold">
      !
    </p>
  )}
    
    <div className="flex flex-col">
      <MdOutlineDeliveryDining style={{ width: '25px', height: '25px' }} />
    </div>
    
    <div className="absolute">
      {orderCheck && orderCheckInfo && (
          <div className='ml-2 mr-4'>
            <div className="absolute left-1/2 top-[14px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#242329]" style={{borderTop:'1px solid #6f6e9e',borderLeft:'1px solid #6f6e9e', zIndex:100}} />
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[74px] bg-[#242329] p-1.5 rounded-md -ml-10 md:-ml-12" style={{border:'1px solid #6f6e9e',zIndex:10}}>
              <div className="contentorder ">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 " style={{width:'280px'}}>
                    <img width="45px" height="45px" src={orderCheckInfo.productImage} alt="Product" />
                    <div className="flex flex-col">
                      <p className='text-sm font-light text-[#fbfbfb]'>{orderCheckInfo.productName}</p>
                      <p className='text-sm font-normal text-[#d6d6dc] flex items-center gap-1'>
                        <strong className='text-xs font-light text-[#9f9fac]'>Ordered By :</strong> {orderCheckInfo.Name} {orderCheckInfo.Surname}
                      </p>
                      <p className='text-sm font-normal text-[#d6d6dc] flex items-center gap-1'>
                        <strong className='text-xs font-light text-[#9f9fac]'>Quantity</strong> {orderCheckInfo.productValue}
                      </p>
                      <p className='text-sm font-normal text-[#d6d6dc] flex items-center gap-1'>
                        <strong className='text-xs font-light text-[#9f9fac]'>Price</strong> {orderCheckPrice.priceQuantity}$ 
                      </p>
                    </div>
                  </div>
                  <button
                  className='text-sm font-normal text-[#fbfbfb] bg-[#6f6e9e] w-full rounded-md p-0.5 mt-1'
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link navigation
                    e.stopPropagation(); // Prevent event bubbling
                    DismissOrderCheck(); // Close the order check
                  }}
                  style={{ zIndex: 4000 }}
                >
                  Check Later
                </button>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  </div>
          </Link>
              <div className="relative">
                {FavCount === 0 ? '' : <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{FavCount}</p>}
                <div className="flex flex-col">
                <div onClick={()=>setDrawerOpener(true)}>
                  <MdFavoriteBorder style={{ width: '25px', height: '25px' }} />
                </div>
  
                </div>
              </div>
              <div className="relative">
                {cartCount === 0 ? '' : <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{cartCount}</p>}
                <Link to="/cart">
                  <MdOutlineShoppingCart style={{ width: '25px', height: '25px' }} />
                </Link>
              </div>
            </div>
          
          </div>
  
          {/* Main Search Bar */}
          <div className="flex md:hidden items-center justify-center w-full mt-2.5">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="searchProduct"
              style={{
                background: 'transparent',
                border: '1px solid #6f6e9e',
                padding: '3px',
                borderRadius: '5px',
                transition: 'width 0.3s ease-in-out',
                width: '100%', // Adjust as needed
              }}
              type="text"
              placeholder='Search Products'
            />
          </div>
        </motion.div>
    
  
      {/* Floating search bar that stays when scrolled down */}
     
      <AnimatePresence>
       {searchQuery.trim() !== '' && (
    <motion.div
    initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0,transiton:{duration:0.5}}}
    exit={{opacity:0,y:-10,transition:{duration:0.2}}}
    className="search-results absolute  left-[0%] right-[3%] md:left-[25%] md:right-[20%] z-50 overflow-y-auto h-[400px] mt-2" style={{ border: '1px solid #6f6e9e', padding: '10px' }}>
      {searchResults.length > 0 ? (
        searchResults.map(product => (
          <div
           key={product.id}
           onClick={()=>seeProduct(product)}
           className="product-card flex items-center cursor-pointer pl-4 pt-2.5 gap-2 mb-3.5">
           {product.brand === 'Sony' && <div className='logoBrand'><SiSony style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Razer' && <div className='logoBrand'><SiRazer style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Hp' && <div className='logoBrand'><SiHp style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Lenovo' && <div className='logoBrand'><SiLenovo style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Asus' && <div className='logoBrand'><SiAsus style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Samsung' && <div className='logoBrand'><SiSamsung style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Apple' && <div className='logoBrand'><SiApple style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
             {product.brand === 'Logitech' && <div className='logoBrand'><SiLogitechg style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
  
           <div className="flex flex-col gap-2">
           <h3 className='font-semibold text-start text-md md:text-lg' style={{color:'#fbfbfb'}}>{product.name}</h3>
           <p className='text-start text-sm md:text-md font-light'style={{color:'#d6d6dc'}}> ${product.price}</p>
           </div>
           
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </motion.div>
  )}
       </AnimatePresence> </div>
       </AnimatePresence>
       
    <motion.div
     initial={{opacity:0,y:-5}}
     animate={{opacity:1,y:0,transition:{duration:0.5}}}
    className="bread hidden md:flex items-center gap-1 md:gap-2 text-xs font-light cursor-pointer w-fit mt-4 md:mt-0" style={{color:'#9f9fac',transition:'all 0.5s'}}>
      <a href="/"><MdOutlineHome  style={{width:'15px',height:'15px'}}/></a>
      <IoIosArrowForward/>
     <a href="/products"><p>Product</p></a>
      <IoIosArrowForward/>
      <Link to='/tech'>
         <p onClick={()=>handleTech(product.type)}>
      {product.type}</p></Link>
      <IoIosArrowForward/>
      <p>{product.name}</p>
    </motion.div>
    <div className="empty hidden md:block">
    </div>
    <motion.div
    initial={{opaicty:0}}
    animate={{opacity:1,transition:{duration:0.5}}}
    className="flex flex-col md:flex-row justify-center md:justify-between px-6 items-start">
    <div className='w-full flex justify-center items-center md:w-[35%]'
    >
      <div className="product-details w-[45%] md:w-[50%] ml-8 md:-ml-2">
      <Slider {...settings}>
      {product.images && product.images.length > 0 ? (
        product.images.map((image, index) => (
          <div key={index}>
            <img className='pdoructImage mb-0 md:mb-2' src={image} alt={`${product.name} ${index}`} />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
      </Slider>
    </div>
    </div>
    <div className="empty block md:hidden"/>
      <div className="flex flex-col gap-4 w-full  md:w-[65%] items-center md:items-start justify-start">
     <div className="flex items-center gap-2">
     {product.brand === 'Sony' && <div className='logoBrand'><SiSony style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Razer' && <div className='logoBrand'><SiRazer style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Hp' && <div className='logoBrand'><SiHp style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Lenovo' && <div className='logoBrand'><SiLenovo style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Asus' && <div className='logoBrand'><SiAsus style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Samsung' && <div className='logoBrand'><SiSamsung style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Apple' && <div className='logoBrand'><SiApple style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
           {product.brand === 'Logitech' && <div className='logoBrand'><SiLogitechg style={{padding:'4px',width:'50px',height:'50px'}}/></div>}
     <div className="flex flex-col">
     <h2 className="text-xl md:text-2xl font-bold text-start">{product.name}</h2>
     <p className="text-lg text-start" style={{color:'#d6d6dc'}}>{product.price}$</p>
     </div>
     </div>
     <div className="flex gap-2 items-center w-3/4">
      <p className='text-xs font-light'>Quantity</p>
      <hr className="hr block" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(36, 35, 41, 0.25)', opacity: '0.2' }} />
     </div>
      <div className="flex items-center gap-6 mt-3 mb-3">
      <div className="flex items-center gap-2 ">
              <button className='px-2 py-1' style={{border:'1px solid #3b3b45',borderRadius:'5px'}} onClick={()=>setProductValue(productValue - 1)}>-</button>
              <input className=" w-[30px]  input-no-arrows" type="text"value={productValue}  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {  // Only allow digits
      setProductValue(value);
    }
  }}
                />
              <button className='px-2 py-1' style={{border:'1px solid #3b3b45',borderRadius:'5px'}} onClick={()=>setProductValue(productValue + 1)}>+</button>
            </div>
          <p className='text-xs md:text-sm font-light' style={{borderRadius:'9999px',padding:'4px',backgroundColor:'#242329'}}>{productStock} on Stock</p>
      </div>
      {manyProduct && <p className='text-xs font-extralight'>The value is more than we have on stock</p>}
     <div className="flex flex-col w-full items-center md:items-stretch">
     <div className="flex gap-2 items-center w-3/4">
      <p className='text-xs font-light'>Transportation</p>
      <hr className="hr block" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(36, 35, 41, 0.25)', opacity: '0.2' }} />
     </div>
     <div className="flex flex-col gap-2" >
        <div className="flex items-center gap-2 md:gap-4 mt-3 pt-3" >
        <div className="hidden md:block">  <MdOutlineLocalShipping style={{width:'20px',height:'20px',color:'#6f6e9e'}}/></div>
          <div className="flex items-center gap-3 md:gap-6">
            <p className='text-xs font-extralight md:font-light' style={{color:"#d6d6dc"}}>{product.deliveryKosovo}</p>
            <p className="hr block" style={{ width: '1px', height: '100%', backgroundColor: 'rgba(36, 35, 41, 0.25)', opacity: '0.2' }} >|</p>
            <p className='text-xs font-extralight md:font-light' style={{color:"#d6d6dc"}}>{product.deliveryBallkan}</p>
           <div onClick={()=>setDetailTransport(prev=>!prev)} className="moreInfoText flex items-center gap-0.5 ml-6 cursor-pointer">
            <p className="text-xs font-extralight">More info</p>
           <MdOutlineKeyboardArrowDown/>
           </div>
          </div>
        </div>
        <AnimatePresence>
        {detailTransport && 
        <motion.div
        initial={{opacity:0,y:-10}}
        animate={{opacity:1,y:0,transition:{duration:0.3}}}
        exit={{opacity:0,y:-10,transition:{duration:0.3}}}
        style={heightChange}
        className='transportInfo flex justify-center items-center rounded-md w-full md:w-3/4 mt-1.5'
        >
        <div className="flex items-center gap-6 px-4">
          <div style={{widht:'30px',height:'30px'}}>
          <MdInfoOutline   style={{color:'#d6d6dc'}}/>
          </div>
          <p className='text-xs  font-extralight text-start'>
          Product arrival time means the period from when your order is verified, and the verification notification you receive via email or SMS.
          <p className='hidden md:block'>If the order is placed now, the product arrives according to the time frame set above. You will be continuously notified via email of the location of your order, including when the product arrives at our warehouse, and when it is shipped to you.</p>
          </p>
        </div>
       </motion.div>}
        </AnimatePresence>
      </div>
     </div>
     <div className="flex gap-2 items-center w-3/4 mt-3">
      <p className='text-xs font-light'>Payment</p>
      <hr className="hr block" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(36, 35, 41, 0.25)', opacity: '0.2' }} />
     </div>
     <div className="flex items-center gap-4 justify-between mt-3">
      <div className="flex flex-col md:flex-row items-center gap-2">
      <MdEuro style={{color:'#6f6e9e'}}/>
      <p  className='font-light text-xs md:text-sm' style={{color:'#9f9fac'}}>Pay in cash</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
      <MdCreditCard style={{color:'#6f6e9e'}}/>
      <p className='font-light text-xs md:text-sm' style={{color:'#9f9fac'}}>Pay Online</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 ">
      <MdOutlinePayments  style={{color:'#6f6e9e'}}/>
      <p className='font-light text-xs md:text-sm' style={{color:'#9f9fac'}}>Pay by bank transfer</p>
      </div>
     </div>
     <div className="flex flex-col gap-2">
     <div className="buttonss flex items-center gap-6 mt-3">
     <button onClick={()=>orderNow(product)} className='order flex items-center gap-1 text-xs md:text-xl  font-light md:font-normal'>Order Now</button>
     <button
    onClick={() => handleAddCart(product)}
    className='order2 text-xs md:text-xl font-light md:font-normal rounded-md'
    style={{ border: '1px solid #434363', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 7px' }} // Adjust padding as needed
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {alertCart ? (
        <div className="flex items-center justify-center">
          <span className='opacity-0'>add </span>
          <MdOutlineDone style={{ width: '20px', height: '20px' }} />
          <span className='opacity-0'>cart</span>
        </div> // Adjust size as needed
      ) : (
        'Add to Cart'
      )}
    </span>
  </button>
      <button  onClick={() =>addToFavorites(product)} className='order4'> {fav ? <MdFavorite style={{width:'30px',height:'30px'}}/>:<MdFavoriteBorder style={{width:'30px',height:'30px'}}/>}</button>
     </div>
    
     </div>
     <div className="detailsdescription flex flex-col mt-4 p-2" 
     style={{backgroundColor:'rgba( 1, 1, 3, 0.35 )',
     border:'1px solid rgba(67, 67, 99,0.4)',borderRadius:'10px'}}>
      <div className="flex justify-around gap-1">
      <div className="flex flex-col ">
      <button className='text-sm font-normal' onClick={()=>changeDescription('description')}>Description</button>
      {moreDescription === 'description' ?  <hr className="hr block" style={{ width: '100%', height: '2px', backgroundColor: '#6f6e9e', opacity: '0.4' }} /> : ''}
      </div>
        <div className="flex flex-col">
        <button className='text-sm font-normal' onClick={()=>changeDescription('details')}>Details</button>
        {moreDescription === 'details' ? <div style={{width:moreDescription === 'details' ? '100%':'0%',transition:'width 1 ease',}}><hr className="hr block" style={{ width:'100%' ,height: '2px', backgroundColor: '#6f6e9e', opacity: '0.4' }} /></div> : ''}
        </div>
      </div>
    <AnimatePresence mode='wait'>
    {moreDescription === 'details' ?  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
    >
     <ul className="mt-4 grid-flow-col-dense grid-cols-2 gap-4 justify-center items-center w-full">
        {product.details && product.details.map((detail, index) => (
          <li key={index} className="flex flex-col justify-center items-center">
            {Object.entries(detail).map(([key, value], i) => (
              <div className='flex items-center' key={i}>
                <span className='text-xs font-light'>{key}</span>: 
                <span style={{ color: '#9f9fac', marginLeft: '4px',fontWeight:300,fontSize:'14px' }}>{value}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
  
    </motion.div>:''}
    {moreDescription === 'description' ? <motion.p
      initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
      className='mt-4 text-xs md:text-sm font-light' style={{color:"#fbfbfb"}}>{product.description}</motion.p>:''}
    </AnimatePresence>
        
     </div>
      </div>
    </motion.div>
    <TheOrderDrawer
     productValue={productValue}
      orderProduct={orderProduct}
       OrderDrawer={OrderDrawer} 
       product={product}
       productStock={productStock}
       handleStockUpdate={handleStockUpdate}
       orderCheck={orderCheck}
       setOrderCheck={()=>setOrderCheck(true)}
        onClose={()=>setOrderDrawer(false)}/>
    <FavoriteDrawer seeProduct={seeProduct} setDrawerOpener={setDrawerOpener} DrawerIsOpen={DrawerOpener}  removeFavorites={removeFavorites} onClose={()=>setDrawerOpener(false)} />
    <div className="empty"></div>
    <div className="empty"></div>
    </motion.div>
      }
     </div>
    );
  }
 
  const FavoriteDrawer = ({ DrawerIsOpen, onClose,removeFavorites,seeProduct }) => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
  
      if (DrawerIsOpen) {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [DrawerIsOpen,seeProduct]);
    
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [removeFavorites]);
  
  
    const [alertCart,setAlertCart]=useState('')
    const [open,setOpen]=useState(false)
  
    const handleAddCart = (product) => {
      let addedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const isAlreadyInCart = addedCart.some(item => item.id === product.id);
    
      if (!isAlreadyInCart) {
        addedCart.push(product);
        localStorage.setItem('cart', JSON.stringify(addedCart));
    
        setOpen(true);
        setAlertCart('Product added to cart!');
        setTimeout(() => setOpen(false), 3000);
      } else {
        setAlertCart('Product is already in the cart!');
        setOpen(true);
        setTimeout(() => setOpen(false), 3000);
      }
    };
  
    return (
    <AnimatePresence>
        {DrawerIsOpen && (
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 2999, 
        }} 
      />
        <motion.div
         initial={{ opacity:0 }}  // Start with width 0 and off-screen
         animate={{ opacity:1 }}  // Expand width and move into view
         exit={{ opacity:0}}  // Contract width and move off-screen
         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="drawer1 flex flex-col justify-start overflow-y-auto w-full md:w-[320px]"
         style={{  position: 'fixed',
          top: 0,
          right: 0,height: '100vh',  zIndex: 3000,borderLeft:'1px solid #6f6e9e',transition:'width 0.5 ease' }}>
         <div className=" flex items-start justify-between w-[100%]">
           <button className=" w-fit" onClick={onClose} style={{ marginTop: '10px',marginLeft:'10px' }}>
            <MdArrowBackIos style={{width:'20px',height:'20px'}}/></button>
            <div className="lowo">
            <svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="#e8e8f0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
            </div>
            </div> 
          <h3 className='text-md font-semibold text-[#fbfbfb] mt-6'>Favorite Products</h3>
          <ul className='flex flex-col items-center justify-center px-2'>
            {favorites.length > 0 ? (
              favorites.map((product, index) => (
                <li key={index} style={{ borderBottom: '1px solid #3b3b45', padding: '10px',paddingBottom:'12px' }}>
                  <div onClick={()=>seeProduct(product)}>
                  <div className="flex items-center justify-center w-full mb-4">
                  {product.images && product.images.length > 0 && (
                    <img src={product.images[0]} alt=""style={{ width: '85px', height: '85px',objectFit:'contain' }} />
                  )}
                  </div>
                  <p className='text-[#d6d6dc] text-md'><strong>{product.name}</strong></p>
                  <p className='text-sm font-light text-[#9f9fac]'>{product.price}$</p>
                  </div>
                  <div className="flex justify-around mt-4">
                    <button onClick={()=>handleAddCart(product)} style={{border:'1px solid #6f6e9e'}} className=' rounded-md p-1.5'>Add to Cart</button>
                    <button  onClick={()=>removeFavorites(product)} className='bg-[#585782] text-[#e8e8f0] rounded-md p-1.5 z-100'><MdDeleteOutline style={{width:'20px',height:'20px'}}/></button>
                  </div>
                </li>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center gap-4 mt-8'>
                <img src={notfound} alt="" srcset="" width="200px"height="200px" />
                <p className='font-light text-sm text-[#d6d6dc]'>No favorite products yet</p></div>
            )}
          </ul>
        </motion.div>
        
        </>
      )}
    </AnimatePresence>
    );
  };

  const TheOrderDrawer = ({ OrderDrawer, onClose,orderProduct,productValue, productStock,
   handleStockUpdate,orderCheck,setOrderCheck }) => {
 
 


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
 


const navigate = useNavigate();

const submitOrder = () => {
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

  if (productValue > productStock) {
    setErrorBuy('Insufficient stock for this order');
    setTimeout(() => setErrorBuy(''), 3000);
    return;
  }

  const updatedStock = productStock - productValue;
  handleStockUpdate(updatedStock);

  const orderDetails = {
    Name,
    Surname,
    Phone,
    Email,
    Adress,
    citySelect,
    productValue,
    productName: orderProduct.name,
    productImage: orderProduct.images[0], // first image
    priceQuantity,
  };

  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  
  // Save the order time as the current time
  const orderTime = new Date().toLocaleString();
  localStorage.setItem('orderTime', orderTime);

  setErrorBuy('Order submitted successfully');
  setTimeout(() => setErrorBuy(''), 3000);

  // Reset the form
  setName('');
  setSurname('');
  setPhone('');
  setEmail('');
  setAdress('');
  setCitySelect('');
  setTransport('');
  setPayment('');
  setOrderCheck();

  // Navigate to the Order Summary page after submission
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
        zIndex: 2000, 
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
      <input 
        value={Name} 
        onChange={handleNameChange} 
        maxLength={10}  // Limit to 10 characters
        className="rounded-md p-1 w-full" 
        style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} 
        type="text" 
        placeholder="Name" 
      />
      <input 
        value={Surname} 
        onChange={handleSurnameChange} 
        maxLength={10}  // Limit to 10 characters
        className="rounded-md p-1 w-full" 
        style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} 
        type="text" 
        placeholder="Surname" 
      />
      </div>
      <div className="flex justify-between items-center gap-4 mt-8">
      <input 
        value={Phone} 
        onChange={handlePhoneChange} 
        className="rounded-md p-1 w-full" 
        style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} 
        type="tel" // Phone type for numeric input
        placeholder="Phone Number" 
        pattern="\d*" // Restrict to only numbers (optional: use onInput to filter manually)
      />
      <input 
        value={Email} 
        onChange={handleEmailChange} 
        className="rounded-md p-1 w-full" 
        style={{backgroundColor:'transparent',border:'1px solid #585782',color:'#fbfbfb'}} 
        type="email" // Ensures valid email format
        placeholder="Email" 
        required 
      />
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

export default Tech;