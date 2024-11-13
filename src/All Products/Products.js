import React from 'react';
import { MdOutlineHome,MdOutlineNotifications ,MdOutlineShoppingCart ,MdOutlineLocalShipping , MdFavoriteBorder   } from "react-icons/md"
import { useState,useEffect } from 'react';
import { SiLogitechg,SiSamsung,SiApple,SiLenovo ,SiRazer,SiSony ,SiHp ,SiAsus     } from "react-icons/si";
import { motion,AnimatePresence }from 'framer-motion'
import { IoIosArrowForward } from "react-icons/io";
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
}

///go back to searching function /////


const handleGoBack =()=>{
  setShowProduct(null)
}
  return (
    <div className='products ' >
     {showProduct ? (
      <ProductDetails 
      product={showProduct}
       handleGoBack={handleGoBack} 
       allProducts={allProducts} 
       seeProduct={seeProduct}/>
     ):(
      <div>
         <navbar className="">
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
    <div className="flex gap-3 items-center">
        <MdOutlineHome style={{width:'22px',height:'22px'}}/>
        <MdFavoriteBorder style={{width:'22px',height:'22px'}}/>
        <MdOutlineShoppingCart style={{width:'22px',height:'22px'}}/>
    </div>
        </motion.div>
       </AnimatePresence>
      </navbar>
      <div>
  
  {searchQuery.trim() !== '' && (
    <div className="search-results fixed left-[20%] right-[20%] top-14 z-50 overflow-y-auto h-[400px]" style={{ border: '1px solid #6f6e9e', padding: '10px' }}>
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
    </div>
  )}

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
        setTimeout(() => {
          setManyProduct(false)
        }, 3000);
      }
    }, [productValue,product.stock]);
    


  return (
    <div className="product-details p-4 h-screen ">
       <AnimatePresence>
       <motion.div
       initial={{opacity:0,y:-10}}
       animate={{opacity:1,y:0,transition:{duration:1}}}
       exit={{opacity:0,y:-10,transition:{duration:1}}}
       className="flex justify-between items-center py-2.5 px-5">
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
    <div className="flex gap-3 items-center">
        <MdOutlineNotifications style={{width:'22px',height:'22px'}}/>
        <MdFavoriteBorder style={{width:'22px',height:'22px'}}/>
        <MdOutlineShoppingCart style={{width:'22px',height:'22px'}}/>
    </div>
        </motion.div>
       </AnimatePresence>
       {searchQuery.trim() !== '' && (
    <div className="search-results fixed left-[20%] right-[20%] top-14 z-50 overflow-y-auto h-[400px]" style={{ border: '1px solid #6f6e9e', padding: '10px' }}>
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
    </div>
  )}
    <motion.div
     initial={{opacity:0,y:-5}}
     animate={{opacity:1,y:0,transition:{duration:0.5}}}
    className="bread flex items-center gap-2 text-xs font-light cursor-pointer" style={{color:'#9f9fac',transition:'all 0.5s'}}>
      <a href="/"><MdOutlineHome style={{width:'15px',height:'15px'}}/></a>
      <IoIosArrowForward/>
     <a href="/products"><p>Product</p></a>
      <IoIosArrowForward/>
      <p>{product.type}</p>
      <IoIosArrowForward/>
      <p>{product.name}</p>
    </motion.div>
    <div className="empty"></div>
    <div className="flex justify-between px-2 items-start">
    <div className='w-[35%]'
    >{product.image && <img src={product.image}  alt={product.name} className="pdoructImage " />}</div>
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
      <h2 className="text-2xl font-bold text-start">{product.name}</h2>
     </div>
      <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
              <button onClick={()=>setProductValue(productValue - 1)}>-</button>
              <p>{productValue}</p>
              <button onClick={()=>setProductValue(productValue + 1)}>+</button>
            </div>
          <p className='text-sm font-light' style={{borderRadius:'9999px',padding:'4px',backgroundColor:'#242329'}}>{product.stock} on Stock</p>
      </div>
      {manyProduct && <div>the value is more than we have on stock</div>}
      <p className="text-lg text-start">Price: ${product.price}</p>
      <p className="text-md text-start">{product.description}</p>
      </div>
    </div>
      
     
      <ul className="mt-2">
        {product.details && product.details.map((detail, index) => (
          <li key={index}>{Object.entries(detail).map(([key, value]) => `${key}: ${value}`).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}


export default ProductsPage;