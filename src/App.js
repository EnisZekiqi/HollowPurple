
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
        <div className="empty " style={{backgroundColor:'#010103'}}/>
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
