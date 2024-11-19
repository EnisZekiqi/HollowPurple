import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState,useRef } from "react";
import Avatar from '@mui/material/Avatar';
import avatar1 from '../images/images 12.jpg'
import avatar2 from '../images/images 5.jpg'
import avatar3 from '../images/images 9.jpg'
import avatar4 from '../images/images8.jpg'
import { MdOutlineHome,MdOutlineListAlt,MdOutlineContactEmergency,MdOutlineQuestionAnswer    } from "react-icons/md";
import { Link } from 'react-router-dom';



const Hero = () => {
  const [introVisible, setIntroVisible] = useState(true);

  // Automatically hide the intro after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // Intro animation
  const firstAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  // Animation for the hero section content
  const heroAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 ,staggerChildren: 0.3},
    },
  };

  // Animation for the <p> tags with individual delays
  const pTagAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  // Navbar animation with staggerChildren for delayed animations
  const navbarAnimation = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.3, // Stagger each <p> by 0.3 seconds
      },
    },
  };

  return (
    <div id="home" className="relative w-full h-screen "
    
    >
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="intro flex flex-col gap-2 items-center justify-center absolute inset-0  bg-opacity-60 backdrop-blur-lg"
            variants={firstAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center">
              <motion.h1 className="text-3xl md:text-6xl font-bold text-white">
                HollowPurple
              </motion.h1>
              <svg style={{ width: "60px", height: "60px" }} viewBox="0 0 24 24">
                <motion.path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="#5a58a5"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={firstAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The content of the Hero section that will be revealed */}
      {!introVisible && (
        <div id="home" className="hero-content w-full h-screen flex flex-col gap-8">
          <motion.div
            variants={navbarAnimation}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-between items-center p-1.5"
          >
            <motion.h1 className="md:flex hidden items-center gap-1 font-bold text-lg md:text-xl text-start" variants={pTagAnimation}>
              HollowPurple
              <svg style={{ width: "30px", height: "30px" }} viewBox="0 0 24 24">
                <motion.path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  stroke="#5a58a5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={firstAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              </svg>
              </motion.h1>
              <motion.p  className="hidden md:block" variants={pTagAnimation}><SlideTabs /></motion.p>
            <motion.p style={{opacity:0}} >3</motion.p>
          </motion.div>

          <motion.div
          variants={heroAnimation}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 justify-center items-center w-full h-full">
            <motion.h1
              variants={pTagAnimation}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl md:text-5xl font-bold"
              style={{color:'#fbfbfb'}}
            >
              Unlock Your Style with HollowPurple
            </motion.h1>
            <motion.p
               variants={pTagAnimation}
               initial="hidden"
               animate="visible"
              className=" text-sm sm:text-lg font-light w-full md:w-1/2"
              style={{color:'#d6d6dc'}}
            >
            We're here to empower your every step of the way. Explore unique fashion pieces and accessories that elevate you
            </motion.p>
            <motion.div
             variants={pTagAnimation}
             initial="hidden"
             animate="visible"
            className="flex gap-2">
            <button class="button">
              <div class="dots_border"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="sparkle"
              >
                <path
                  class="path"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke="black"
                  fill="black"
                  d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                ></path>
                <path
                  class="path"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke="black"
                  fill="black"
                  d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                ></path>
                <path
                  class="path"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke="black"
                  fill="black"
                  d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                ></path>
              </svg>
              <Link to="/products" className="text_button">Check Products</Link>
            </button>

              <button className="p-2 rounded-full text-sm md:text-md"
              style={{backgroundColor:'rgba(36, 35, 41,0.4)',color:'#d6d6dc',border:'1px solid #6f6e9e'}}
              ><a href="#features">Learn More</a></button>
            </motion.div>
            <motion.div
             variants={pTagAnimation}
             initial="hidden"
             animate="visible"
            className="flex items-center mb-20 gap-3">
            <div className="flex items-center">
            <Avatar sx={{border:'1px solid #3b3b45'}} alt="Remy Sharp" src={avatar1} />
            <Avatar sx={{marginLeft:'-15px',zIndex:10 ,border:'1px solid #3b3b45'}} alt="Travis Howard" src={avatar2} />
            <Avatar sx={{marginLeft:'-15px',zIndex:20,border:'1px solid #3b3b45'}} alt="Cindy Baker" src={avatar3}/>
            <Avatar sx={{marginLeft:'-15px',zIndex:30,border:'1px solid #3b3b45'}} alt="Cindy Baker" src={avatar4} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="font-light text-xs" style={{color:'#d6d6dc'}}>Over 10,000+</p>
              <p className="font-light text-xs"  style={{color:'#d6d6dc'}}>Active Clients</p>
            </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    
  <motion.p  
  initial={{ opacity: 0, }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5,delay:3 }} // Increase duration for debugging
  style={{ zIndex: 2000 }} className="fixed md:hidden top-1.5 left-1/2 transform -translate-x-1/2">
    <SlideTabs />
  </motion.p>

    </div>
  );
};

///// tabb//////


const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('div[id]');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Lowering the threshold may help detect intersections more easily
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Intersecting section:', entry.target, 'with id:', entry.target.id);
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <ul
      onMouseLeave={() => {
        setPosition((prev) => ({
          ...prev,
          opacity: 0,
        }));
      }}
      className="heroControler relative mx-auto flex w-fit rounded-full p-0.5 -ml-0 md:-ml-36"
    >
      <div className="hidden md:flex">
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}><a href="#features">Features</a></Tab>
      <Tab setPosition={setPosition}><a href="#contact">Contact</a></Tab>
      <Tab setPosition={setPosition}><a href="#faq">FAQ</a></Tab>
      </div>

      <div className="flex md:hidden">
  <Tab 
    setPosition={setPosition} 
    style={{ backgroundColor: activeSection === 'home' ? '#6f6e9e' : 'transparent',borderRadius:'10px',transition:'all 0.7s ease' }}
  >
    <a href="#home"><MdOutlineHome style={{ width: '20px', height: '20px' }} /></a> 
  </Tab>
  <Tab 
    setPosition={setPosition} 
    style={{ backgroundColor: activeSection === 'features' ? '#6f6e9e' : 'transparent',borderRadius:'10px',transition:'all 0.7s ease' }}
  >
    <a href="#features"><MdOutlineListAlt style={{ width: '20px', height: '20px' }} /></a>
  </Tab>
  <Tab 
    setPosition={setPosition} 
    style={{ backgroundColor: activeSection === 'contact' ? '#6f6e9e' : 'transparent',borderRadius:'10px',transition:'all 0.7s ease' }}
  >
    <a href="#contact"><MdOutlineContactEmergency style={{ width: '20px', height: '20px' }} /></a>
  </Tab>
  <Tab 
    setPosition={setPosition} 
    style={{ backgroundColor: activeSection === 'faq' ? '#6f6e9e' : 'transparent',borderRadius:'10px',transition:'all 0.7s ease' }}
  >
    <a href="#faq"><MdOutlineQuestionAnswer style={{ width: '20px', height: '20px' }} /></a>
  </Tab>
</div>


     <div className="hidden md:block">
     <Cursor position={position} />
     </div>
    </ul>
  );
};


const Tab = ({ children, setPosition,style }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base"
      style={style} 
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-8 sm:h-7 rounded-full  md:h-12"
      style={{backgroundColor:'#6f6e9e'}}
    />
  );
};




export default Hero;
