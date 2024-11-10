import React from 'react';
import { MdOutlineHome,MdOutlineListAlt,MdOutlineShoppingCart ,MdOutlineQuestionAnswer, MdFavoriteBorder   } from "react-icons/md"
import { useState,useEffect } from 'react';
import { SiLogitechg,SiSamsung,SiApple,SiLenovo ,SiRazer,SiSony ,SiHp ,SiAsus     } from "react-icons/si";


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


  return (
    <div className='products h-screen' >
      <navbar className="">
        <div className="flex justify-between items-center py-2.5 px-5">
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
        </div>
      </navbar>
      {searchQuery && (
        <div className="search-results fixed left-[20%] right-[20%] top-14" style={{border:'1px solid #6f6e9e',padding: '10px' }}>
          <h2>Search Results:</h2>
          {searchResults.length > 0 ? (
            searchResults.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                {product.image && <img src={`/path/to/images/${product.image}`} alt={product.name} />}
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
      <div className="empty flex items-center justify-around mt-6">
        {brands.map((txt,index)=>(
            <div className='px-3' key={index}>
                <div className="brandcover">
                    {txt.brand}
                </div>
            </div>
        ))}
      </div>
      <div className="empty"></div>
      
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
  );
}

export default ProductsPage;