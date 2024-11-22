
import * as React from 'react';
import { MdOutlineAccountCircle  ,MdOutlineNotifications ,MdOutlineShoppingCart 
  ,MdOutlineLocalShipping , MdFavoriteBorder ,MdOutlineKeyboardArrowDown 
  ,MdInfoOutline ,MdEuro,MdCreditCard, MdOutlinePayments ,
  MdOutlineVerified ,MdFavorite,MdArrowBackIos,MdDeleteOutline,MdOutlineHome   } from "react-icons/md"
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
import Cart from './Cart'

function ProductsPage() {

    const [allProducts, setAllProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
        fetch('/data/brands/all-products.json')
          .then(response => response.json())
          .then(data => {
            setAllProducts(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter products by name or other properties
        const results = allProducts.filter(product =>
          product.name.toLowerCase().includes(query)
        );
        setSearchResults(results);
      };


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


////selected product on search //////


const [showProduct,setShowProduct]=useState(null)


const seeProduct =(product)=>{
  setShowProduct(product)
  setSearchQuery('')
  setSearchResults([]); 
  setDrawerOpener(false)
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
}, []);

const [DrawerOpener,setDrawerOpener]=useState(false)

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


  return (
  <div>
      <div className='products h-full' >
     {showProduct ? (
      <ProductDetails 
      product={showProduct}
       handleGoBack={handleGoBack} 
       allProducts={allProducts} 
       seeProduct={seeProduct}/>
     ):(
      <div>
         <navbar className=""  >
       <AnimatePresence>
       <motion.div
       initial={{opacity:0,y:-10}}
       animate={{opacity:1,y:0,transition:{duration:1}}}
       exit={{opacity:0,y:-10,transition:{duration:1}}}
       className="flex justify-between items-center py-2.5 px-5">
           <div className='flex items-center gap-1'>
           <h1 className='font-bold text-lg md:text-xl'>HollowPurple</h1>
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
           <input
            value={searchQuery}
            onChange={handleSearch}
           style={{background:'transparent',border:'1px solid #6f6e9e',padding:'3px',borderRadius:'5px',width:'270px'}} 
           type="text" placeholder='Search Products' />
    <div className="flex gap-3 items-center cursor-pointer">
       <a href="/login"> <MdOutlineAccountCircle  style={{width:'22px',height:'22px'}}/></a>
        <div className="relative">
       {FavCount === 0 ? '':  <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{FavCount}</p>}
        <div onClick={()=>setDrawerOpener(true)}> <MdFavoriteBorder style={{width:'25px',height:'25px'}}/></div>
        </div>
        <div className="relative">
      {cartCount === 0 ?'' : <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{cartCount}</p>}
      <Link to="/cart"> <MdOutlineShoppingCart style={{width:'25px',height:'25px'}} /></Link>
      </div>
    </div>
        </motion.div>
       </AnimatePresence>
      </navbar>
      <div>
  
      <AnimatePresence>
       {searchQuery.trim() !== '' && (
    <motion.div
    initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0,transiton:{duration:0.5}}}
    exit={{opacity:0,y:-10,transition:{duration:0.2}}}
    className="search-results fixed left-[20%] right-[20%] top-14 z-50 overflow-y-auto h-[400px] mt-2" style={{ border: '1px solid #6f6e9e', padding: '10px' }}>
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
           <h3 className='font-semibold text-md md:text-lg' style={{color:'#fbfbfb'}}>{product.name}</h3>
           <p className='text-start text-sm md:text-md font-light'style={{color:'#d6d6dc'}}> ${product.price}</p>
           </div>
           
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </motion.div>
  )}
       </AnimatePresence>

  {/* Always show brands and all products */}
  <div>
    <div className="empty flex items-center justify-around mt-6">
      {brands.map((txt, index) => (
        <div className="px-3" key={index}>
          <div className="brandcover">
            {txt.brand}
          </div>
        </div>
      ))}
    </div>
    <div className="product-grid flex justify-center items-center gap-2">
      {allProducts.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          {product.image && <img src={`/path/to/images/${product.image}`} alt={product.name} />}
        </div>
      ))}
    </div>
  </div>
  
</div>
      </div>
     )}
   <div className="empty"></div>
   <div className="empty"></div>
   <div className="empty"></div>
   <FavoriteDrawer seeProduct={seeProduct} DrawerIsOpen={DrawerOpener} removeFavorites={removeFavorites} onClose={()=>setDrawerOpener(false)} />
    </div>
    {open && 
    <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    ContentProps={{
      style: {
        backgroundColor: '#585782',
        color: '#e8e8f0',
        position: 'fixed', // Change to fixed
        bottom: 20,        // Adjust as needed
        left: '15%',       // Center it horizontally
        transform: 'translateX(-50%)', // Center it based on its width
        zIndex: 1000,     // Ensure it's above other content
      },
    }}
    message={alertFav} 
    action={action}
  />
    }
  </div>
  );
}

const ProductDetails =({product, handleGoBack, allProducts, seeProduct })=>{

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
      if (productValue > product.stock) {
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

const [alertCart,setAlertCart]=useState('')

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



  return (
   <div>
     <div className="product-details p-4 h-screen">
       <AnimatePresence>
      <div className="navbarfinally" style={{
  position: 'sticky',
  top: 0, // Keeps the navbar at the top of the viewport
  zIndex: 1000, // Ensures it stays above other elements, // Optional background color
  width: '100%',
}}>
      <motion.div
       initial={{opacity:0,y:-10}}
       animate={{opacity:1,y:0,transition:{duration:1}}}
       exit={{opacity:0,y:-10,transition:{duration:1}}}
       className=" flex justify-between items-center px-1.5 py-2" >
           <div className='flex items-center gap-1'>
           <h1 onClick={handleGoBack} className='font-bold text-lg cursor-pointer md:text-xl'>HollowPurple</h1>
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
           <input
            value={searchQuery}
            onChange={handleSearch}
           style={{background:'transparent',border:'1px solid #6f6e9e',padding:'3px',borderRadius:'5px',width:'270px'}} 
           type="text" placeholder='Search Products' />
    <div className="flex gap-3 items-center cursor-pointer">
      <a href="/login">  <MdOutlineAccountCircle  style={{width:'25px',height:'25px'}}/></a>
        <div className="relative">
       {FavCount === 0 ? '':  <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{FavCount}</p>}
        <div onClick={()=>setDrawerOpener(true)}> <MdFavoriteBorder style={{width:'25px',height:'25px'}}/></div>
        </div>
      <div className="relative">
      {cartCount === 0 ?'' : <p className='absolute ml-4 -mt-2.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold'>{cartCount}</p>}
      <Link to="/cart"> <MdOutlineShoppingCart style={{width:'25px',height:'25px'}} /></Link>
      </div>
    </div>
        </motion.div>
      </div>
       </AnimatePresence>
       <AnimatePresence>
       {searchQuery.trim() !== '' && (
    <motion.div
    initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0,transiton:{duration:0.5}}}
    exit={{opacity:0,y:-10,transition:{duration:0.2}}}
    className="search-results fixed left-[20%] right-[20%] top-14 z-50 overflow-y-auto h-[400px] mt-2" style={{ border: '1px solid #6f6e9e', padding: '10px' }}>
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
           <h3 className='font-semibold text-md md:text-lg' style={{color:'#fbfbfb'}}>{product.name}</h3>
           <p className='text-start text-sm md:text-md font-light'style={{color:'#d6d6dc'}}> ${product.price}</p>
           </div>
           
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </motion.div>
  )}
       </AnimatePresence>
    <motion.div
     initial={{opacity:0,y:-5}}
     animate={{opacity:1,y:0,transition:{duration:0.5}}}
    className="bread flex items-center gap-2 text-xs font-light cursor-pointer w-fit" style={{color:'#9f9fac',transition:'all 0.5s'}}>
      <a href="/login"><MdOutlineHome  style={{width:'15px',height:'15px'}}/></a>
      <IoIosArrowForward/>
     <a href="/products"><p>Product</p></a>
      <IoIosArrowForward/>
      <p>{product.type}</p>
      <IoIosArrowForward/>
      <p>{product.name}</p>
    </motion.div>
    <div className="empty">
    </div>
    <div className="flex justify-between px-6 items-start">
    <div className='w-[35%]'
    >
      <div className="product-details w-[50%] ml-8">
      <Slider {...settings}>
      {product.images && product.images.length > 0 ? (
        product.images.map((image, index) => (
          <div key={index}>
            <img className='pdoructImage mb-2' src={image} alt={`${product.name} ${index}`} />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
      </Slider>
    </div>
    </div>
      <div className="flex flex-col gap-4 w-[65%] items-start justify-start">
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
     <h2 className="text-2xl font-bold text-start">{product.name}</h2>
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
          <p className='text-sm font-light' style={{borderRadius:'9999px',padding:'4px',backgroundColor:'#242329'}}>{product.stock} on Stock</p>
      </div>
      {manyProduct && <p className='text-xs font-extralight'>The value is more than we have on stock</p>}
     <div className="flex flex-col w-full">
     <div className="flex gap-2 items-center w-3/4">
      <p className='text-xs font-light'>Transportation</p>
      <hr className="hr block" style={{ width: '100%', height: '1px', backgroundColor: 'rgba(36, 35, 41, 0.25)', opacity: '0.2' }} />
     </div>
     <div className="flex flex-col gap-2" >
        <div className="flex items-center gap-4 mt-3 pt-3" >
          <MdOutlineLocalShipping style={{width:'20px',height:'20px',color:'#6f6e9e'}}/>
          <div className="flex items-center gap-6">
            <p className='text-xs font-light' style={{color:"#d6d6dc"}}>{product.deliveryKosovo}</p>
            <p className="hr block" style={{ width: '1px', height: '100%', backgroundColor: 'rgba(36, 35, 41, 0.25)', opacity: '0.2' }} >|</p>
            <p className='text-xs font-light' style={{color:"#d6d6dc"}}>{product.deliveryBallkan}</p>
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
        className='transportInfo flex justify-center items-center rounded-md w-3/4 mt-1.5'
        >
        <div className="flex items-center gap-6 px-4">
          <div style={{widht:'30px',height:'30px'}}>
          <MdInfoOutline   style={{color:'#d6d6dc'}}/>
          </div>
          <p className='text-xs font-extralight text-start'>
          Product arrival time means the period from when your order is verified, and the verification notification you receive via email or SMS.
          If the order is placed now, the product arrives according to the time frame set above. You will be continuously notified via email of the location of your order, including when the product arrives at our warehouse, and when it is shipped to you.
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
      <div className="flex items-center gap-2">
      <MdEuro style={{color:'#6f6e9e'}}/>
      <p  className='font-light text-sm' style={{color:'#9f9fac'}}>Pay in cash</p>
      </div>
      <div className="flex items-center gap-2">
      <MdCreditCard style={{color:'#6f6e9e'}}/>
      <p className='font-light text-sm' style={{color:'#9f9fac'}}>Pay Online</p>
      </div>
      <div className="flex items-center gap-2 ">
      <MdOutlinePayments  style={{color:'#6f6e9e'}}/>
      <p className='font-light text-sm' style={{color:'#9f9fac'}}>Pay by bank transfer</p>
      </div>
     </div>
     <div className="flex flex-col gap-2">
     <div className="buttonss flex items-center gap-6 mt-3">
      <button className='order flex items-center gap-1 text-xl font-normal'><MdOutlineVerified /> Order Now</button>
      <button onClick={()=> handleAddCart(product)} className='order2 text-xl font-normal rounded-md' style={{border:'1px solid #434363'}}>Add to Cart</button>
      <button  onClick={() =>addToFavorites(product)} className='order2'> {fav ? <MdFavorite style={{width:'30px',height:'30px'}}/>:<MdFavoriteBorder style={{width:'30px',height:'30px'}}/>}</button>
     </div>
    
     </div>
     <div className="detailsdescription flex flex-col mt-4 p-2" 
     style={{backgroundColor:'rgba( 1, 1, 3, 0.35 )',
     border:'1px solid rgba(67, 67, 99,0.4)',borderRadius:'10px'}}>
      <div className="flex justify-around gap-1">
      <div className="flex flex-col ">
      <button onClick={()=>changeDescription('description')}>Description</button>
      {moreDescription === 'description' ?  <hr className="hr block" style={{ width: '100%', height: '2px', backgroundColor: '#6f6e9e', opacity: '0.4' }} /> : ''}
      </div>
        <div className="flex flex-col">
        <button onClick={()=>changeDescription('details')}>Details</button>
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
              <div className='flex' key={i}>
                <span className='text-sm font-light'>{key}</span>: 
                <span style={{ color: '#9f9fac', marginLeft: '4px' }}>{value}</span>
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
      className='mt-4 text-sm font-light' style={{color:"#fbfbfb"}}>{product.description}</motion.p>:''}
    </AnimatePresence>
        
     </div>
      </div>
    </div>
    <FavoriteDrawer seeProduct={seeProduct} DrawerIsOpen={DrawerOpener}  removeFavorites={removeFavorites} onClose={()=>setDrawerOpener(false)} />
    </div>
    {open && 
    <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    ContentProps={{
      style: {
        backgroundColor: '#585782',
        color: '#e8e8f0',
        position: 'fixed', // Change to fixed
        bottom: 20,        // Adjust as needed
        left: '15%',       // Center it horizontally
        transform: 'translateX(-50%)', // Center it based on its width
        zIndex: 1000,     // Ensure it's above other content
      },
    }}
    message={alertFav} 
    action={action}
  />
  }
   </div>
  );
}




// Drawer component
const FavoriteDrawer = ({ DrawerIsOpen, onClose,removeFavorites,seeProduct }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [DrawerIsOpen]); // Reload favorites when the drawer opens

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
        zIndex: 999, 
      }} 
    />
      <motion.div
       initial={{ opacity:0 }}  // Start with width 0 and off-screen
       animate={{ opacity:1 }}  // Expand width and move into view
       exit={{ opacity:0}}  // Contract width and move off-screen
       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="drawer1 flex flex-col justify-start overflow-y-auto"
       style={{  position: 'absolute',
        top: 0,
        right: 0, width: '320px', height: '100%',  zIndex: 1000,borderLeft:'1px solid #6f6e9e',transition:'width 0.5 ease' }}>
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
              <li key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                <div onClick={()=>seeProduct(product)}>
                <div className="flex items-center justify-center w-full mb-4">
                {product.images && product.images.length > 0 && (
                  <img src={product.images[0]} alt=""style={{ width: '85px', height: '85px',objectFit:'contain' }} />
                )}
                </div>
                <p><strong>{product.name}</strong></p>
                <p>Price: ${product.price}</p>
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


export default ProductsPage;