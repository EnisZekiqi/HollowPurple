
import './App.css';
import { useEffect,useState } from 'react';
import Test from './Test';
import Hero from './Hero Section/Hero'
import Info from './Hero Section/Info';
import Contact from './Hero Section/Contact';
import FAQ from './Hero Section/FAQ';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import ProductsPage from './All Products/Products';
import Cart from './All Products/Cart'
import { useNavigate } from 'react-router-dom';
import Order from './All Products/Order';
import OrderSummary from './All Products/OrderSummary';

function App() {

  //////////////

  const [data, setData] = useState([]);
  const [load,setLoad]=useState(false)

  

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run only once


  const [headerHeight, setHeaderHeight] = useState('100vh');

  // Track pathname changes using window.location
  useEffect(() => {
    // Listen for changes to the pathname
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/products') {
        setHeaderHeight('100%'); // Adjust header height for the products page
      } else {
        setHeaderHeight('100vh'); // Default header height
      }
    };

    // Set up event listener for path changes (on initial load and subsequent changes)
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange(); // Run initially to set the correct height

    // Clean up the event listener
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []); // Empty dependency arra


  const [selectedProduct, setSelectedProduct] = useState(null);

  const seeProduct = (product) => {
    setSelectedProduct(product);
    console.log('Selected product:', product);
    // You can navigate or show a modal with detailed product information.
  };
  


  return (
    <Router>
  <div className="App">
  <header
      className="App-header"
      style={{
        backgroundColor: '#121221',
        // Dynamically set height based on the current path
      }}
    >
      <Routes>
        {/* Home route, which includes all sections */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="empty" style={{ backgroundColor: '#010103' }} />
              <Info />
              <div className="empty" style={{ backgroundColor: '#010103' }} />
              <Contact />
              <div className="empty" style={{ backgroundColor: '#010103' }} />
              <FAQ />
              <div className="">
                <div className="empty2" style={{ backgroundColor: '#010103' }} />
                <div className="emptySpecial"></div>
              </div>
            </>
          }
        />
        {/* Products page route */}
        <Route path="/products" element={<ProductsPage selectedProduct={selectedProduct}/>} />
        <Route
              path="/cart"
              element={<Cart  seeProduct={seeProduct}/>}
            />
            <Route
              path="/Order"
              element={<Order seeProduct={seeProduct}/>}
            />
            <Route
          path="/order-summary"
          element={<OrderSummary orderDetails={JSON.parse(localStorage.getItem('orderDetails'))} orderTime={localStorage.getItem('orderTime')} />}
        />
      </Routes>
    </header>
  </div>
</Router>

  );
}



export default App;
