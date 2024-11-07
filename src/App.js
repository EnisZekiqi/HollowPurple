
import './App.css';
import { useEffect,useState } from 'react';
import Test from './Test';
import Hero from './Hero Section/Hero'
import Info from './Hero Section/Info';
import Contact from './Hero Section/Contact';
import FAQ from './Hero Section/FAQ';
function App() {

  const [theme,setTheme]=useState('light')

  const toggleTheme =(theme)=>{
    setTheme(theme)
    localStorage.setItem('theme',theme)
  }


  useEffect(() => {
      const themeChanger = localStorage.getItem('theme')

      if (themeChanger) {
        setTheme(themeChanger)
      }

  },[] );

  const themeChanger = localStorage.getItem('theme')

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





  return (
    <div className="App">
      <header className="App-header"
      style={{backgroundColor:themeChanger==='light'?'#121221':'#000000'}}
      >
     
        <Hero/>
        <div
  className="blurrer"
  style={{
    height: '10px', // Adjust height as needed for a smoother transition
    backgroundColor: 'rgba(146, 111, 243,0.4)', // Semi-transparent overlay
    backdropFilter: 'blur(15px)', // Adjust the blur amount
    zIndex: 1
  }}
></div>

{/* Gradient section */}
<div
  className="emptySpecial2 backdrop-blur-md bg-opacity-85"
  style={{
    background: 'linear-gradient(180deg, #926FF3, #4E31A2, #000000)',
    height: '150px', // Adjust height as needed
    marginTop:'-10px'
  }}
></div>
        <Info/>
        <div className="empty " style={{backgroundColor:'#010103'}}/>
        <Contact/>
        <div className="empty " style={{backgroundColor:'#010103'}}/>
        <FAQ/>
        <div className="">
        <div className="empty2 " style={{backgroundColor:'#010103'}}/>
        <div className="emptySpecial "></div>
        </div>
      </header>
    </div>
  );
}

export default App;
