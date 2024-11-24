import { motion,AnimatePresence,useAnimate  } from "framer-motion";
import * as React from 'react';
import { IoIosTimer } from "react-icons/io";
import useEmblaCarousel from 'embla-carousel-react'
import { IoLogoTwitter } from "react-icons/io";
import avatar1 from '../images/images 12.jpg'
import avatar2 from '../images/images 5.jpg'
import avatar3 from '../images/images 9.jpg'
import avatar4 from '../images/images8.jpg'
import Avatar from '@mui/material/Avatar';
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { useState,useEffect,useRef } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
const container = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 1,
        }
    }
};

const Info = (props) => {


    const { slides =[
        {client:'Don Donaldson',username:'@donnydiesel',comment:"HollowPurple truly revolutionized my workflow! The tools are not only user-friendly but incredibly effective. I can’t believe I managed without them for so long. Highly recommend to anyone!",company:<IoLogoTwitter style={{width:'25px',height:'25px',color:'#0099ff'}}/>,img:avatar1,rated:<div style={{color:'#e8e8f0',backgroundColor:'#585782'}} className="flex p-1 w-fit rounded-full">
            <IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStarOutline/>
        </div>,scroll:<motion.div className="flex items-center" style={{color:'#9f9fac'}} initial={{y:-5}} animate={{y:0,transition:{duration:0.7,ease:'easeInOut',repeatType:'reverse',repeat: Infinity,}}} ><p className="font-extralight text-xs">Drag Down</p><MdOutlineKeyboardDoubleArrowDown style={{width:'20px',height:'20px'}}/> </motion.div>},
        {client:'Chandler Smith',username:'@chandlerSm',comment:"I’ve tried various tools in the past, but HollowPurple stands out as the best! The quality and efficiency of their products have transformed how I work. It’s like having a secret weapon at my disposal. I can’t imagine !",company:<IoLogoTwitter style={{width:'25px',height:'25px',color:'#0099ff'}}/>,img:avatar2,rated:<div style={{color:'#e8e8f0',backgroundColor:'#585782'}} className="flex p-1 w-fit rounded-full">
        <IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStarHalf/>
    </div>,scroll:<motion.div className="flex items-center" style={{color:'#9f9fac'}} initial={{y:-5}} animate={{y:0,transition:{duration:0.7,ease:'easeInOut',repeatType:'reverse',repeat: Infinity,}}} ><p className="font-extralight text-xs">Drag Down</p><MdOutlineKeyboardDoubleArrowDown style={{width:'20px',height:'20px'}}/> </motion.div>},
        {client:'Joe Jonathan',username:'@Joej2',comment:"HollowPurple has completely changed the game for me! The tools are intuitive and powerful, allowing me to achieve results I never thought possible. Their customer support is also top-notch. I’m genuinely impressed and thankful I found them!",company:<IoLogoTwitter style={{width:'25px',height:'25px',color:'#0099ff'}}/>,img:avatar3,rated:<div style={{color:'#e8e8f0',backgroundColor:'#585782'}} className="flex p-1 w-fit rounded-full">
        <IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/>
    </div>,scroll:<motion.div className="flex items-center" style={{color:'#9f9fac'}} initial={{y:-5}} animate={{y:0,transition:{duration:0.7,ease:'easeInOut',repeatType:'reverse',repeat: Infinity,}}} ><p className="font-extralight text-xs">Drag Down</p><MdOutlineKeyboardDoubleArrowDown style={{width:'20px',height:'20px'}}/> </motion.div>},
        {client:'Missy Cooper',username:'@coopermissy',comment:"I can’t say enough good things about HollowPurple! Their tools are essential for anyone serious about their craft. They’ve made complex tasks feel manageable. If you haven’t tried them yet, you’re missing out!",company:<IoLogoTwitter style={{width:'25px',height:'25px',color:'#0099ff'}}/>,img:avatar4,rated:<div style={{color:'#e8e8f0',backgroundColor:'#585782'}} className="flex p-1 w-fit rounded-full">
        <IoIosStar/><IoIosStar/><IoIosStar/><IoIosStarHalf/><IoIosStarOutline/>
    </div>,scroll:<motion.div className="flex items-center" style={{color:'#9f9fac'}} initial={{y:-5}} animate={{y:0,transition:{duration:0.7,ease:'easeInOut',repeatType:'reverse',repeat: Infinity,}}} ><p className="font-extralight text-xs">Drag Up</p><MdOutlineKeyboardDoubleArrowUp  style={{width:'20px',height:'20px'}}/> </motion.div>},
    ], options = {
        axis: 'y', // Enable vertical scrolling
      } } = props

  

    const [emblaRef, emblaApi] = useEmblaCarousel(options)

      const [email,setEmail]=useState('')
      const [emailSub,setEmailSub]=useState('This email is already saved')

      const handleEmail =(e)=>{
        setEmail(e.target.value)
      }
    
      useEffect(() => {
        if (emailSub) {
          const timer = setTimeout(() => {
            setEmailSub(false);
            setEmail('')
          }, 6000); // 6 seconds
    
          // Clear the timeout if component unmounts or emailSub changes
          return () => clearTimeout(timer);
        }
      }, [emailSub]);

      
      const [open, setOpen] = React.useState(false);

      const handleClick = () => {
        const emailSaved = localStorage.getItem('email'); // Get saved email
        const lastUpdateTime = localStorage.getItem('emailUpdateTime'); // Get last update time
        const currentTime = new Date().getTime(); // Get current time
      
        // Set a 1-minute interval (60000 milliseconds)
        const timeLimit = 60000;
      
        if (!email.trim()) {
          // If the email is already saved, notify the user
       return
        }else if (email === emailSaved){
          setEmailSub('This email is already saved');
          setOpen(true);
        } else if (lastUpdateTime && currentTime - lastUpdateTime < timeLimit) {
          // If the time limit hasn't passed since the last update, show an error
          setEmailSub('Cannot change the email, too many requests');
          setOpen(true);
        } else {
          // Save the new email and update the timestamp
          localStorage.setItem('email', email);
          localStorage.setItem('emailUpdateTime', currentTime);
          setEmailSub(`${email} will be notified!`);
          setEmail('')
          setOpen(true);
        }
      };
      
    

      useEffect(() => {
        const emailSaved = localStorage.getItem('email')
  
        if (emailSaved) {
          setEmail(emailSaved)
        }
    },[] );


      const handleClose = (event, reason) => {
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
     
      ///////
      const [gadgets, setGadgets] = useState(12);
      const [brand,setBrand]=useState(0)
      

      const incrementGadgets = () => {
        const interval = setInterval(() => {
          setGadgets(prev => {
            if (prev < 1320) return prev + 30;
            clearInterval(interval);
            return prev;
          });
          setBrand(prev => {
            if (prev < 22) return prev + 1;
            clearInterval(interval);
            return prev;
          });
        }, 10);
   
      };
    
  const [showMore, setShowMore] = useState(false);

    return (
      <div className="wrapperInfo">
          <div id="features" className="infop bg-gray-900 bg-opacity-60 backdrop-blur-md" style={{ backgroundColor: '#010103' }}>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible" // Trigger animation when in view
                viewport={{ once: true, amount: 0.2 }} // Start when 20% of the container is in view
                className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-3 h-full px-8 py-4" // Reduced gap and padding
                style={{ minHeight: '80vh' }} // Adjust the height of the grid
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9,x:-15 }} // Scaling instead of moving off-screen
                    whileInView={{ opacity: 1, scale: 1,x:0, transition: { duration: 1 }, transitionEnd: { opacity: 1, scale: 1 } }} // Scaling effect
                    viewport={{ once: true}}
                    className="col-span-1 xl:row-span-3 rounded-md px-3 py-3"
                    style={{ backgroundColor: '#18181b', border: '1px solid #434363', minHeight: '200px' }} // Adjusted height
                >
                    <h2 className="p-1 px-1.5 rounded-xl w-fit h-fit text-start mx-2 my-3 font-light text-sm"
                    style={{backgroundColor:'#585782',color:'#e8e8f0'}}
                    >Featured Products</h2>
                    <h1 className="text-start pt-2 pl-2 font-semibold text-lg md:text-xl"
                    style={{color:'#fbfbfb'}}
                    >Discover Our Bestsellers</h1>
                    <p className="text-start pt-2 pl-2 font-normal text-xs md:text-sm"
                      style={{color:'#d6d6dc'}}
                    >
                    Explore the top-rated products that our customers love! From trendy fashion to must-have gadgets, find out what’s hot this season.
                    </p>
                    <motion.div
                     whileInView={{ opacity: 1 }} // Optional animation
                     initial={{ opacity: 0 }}
                     onViewportEnter={incrementGadgets} // Start incrementing when in view
                     onViewportLeave={() => { /* Optional: Stop incrementing */ }}
                    className="flex justify-center pt-8 pl-2 items-center mt-4 gap-6">
                      <span className="flex items-center gap-2 text-md sm:text-lg md:text-xl">{gadgets}<b style={{color:'#9f9fac'}}>Gadgets</b></span>
                      <span className="flex items-center gap-2 text-md sm:text-lg md:text-xl">{brand}<b style={{color:'#9f9fac'}}>Brands</b></span>
                      <span></span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 ,y:-15}}
                    whileInView={{ opacity: 1, scale: 1,y:0, transition: { duration: 1 }, transitionEnd: { opacity: 1, scale: 1 } }}
                    viewport={{ once: true}}
                    className="col-span-1 xl:row-span-3 rounded-md px-3 py-3"
                    style={{ backgroundColor: '#18181b', border: '1px solid #434363', minHeight: '200px' }} // Adjusted height
                >
                     <h2 className="p-1 rounded-xl  text-start w-fit md:text-center mx-2 md:mx-32 my-3 font-light text-sm"
                    style={{backgroundColor:'#585782',color:'#e8e8f0'}}
                    >Seasonal Sales</h2>
                    <h1 className="text-start md:text-center pt-2 pl-2 font-semibold text-lg md:text-xl"
                    style={{color:'#fbfbfb'}}
                    >Limited Time Offers</h1>
                    <p className="text-start md:text-center pt-2 pl-2 font-normal text-xs md:text-sm"
                      style={{color:'#d6d6dc'}}
                    >
                   Don’t miss out on our exclusive seasonal sales! Get incredible discounts on selected items. Hurry, these deals won’t last long, <b> Check the timer for the time offers</b>!
                    </p>
                    <div
        className="container flex items-end justify-end pr-2 pb-2 w-full h-36 relative"
      >
       <div className="logocontainersho"
        onMouseEnter={() => setShowMore(true)}
        onMouseLeave={() => setShowMore(false)}
       >
       <span className="relative flex">
          {/* Ping animations */}
          {[0.3, 0.8, 1.2].map((delay, index) => (
            <span
              key={index}
              className="animate-ping absolute inline-flex rounded-full opacity-75"
              style={{
                backgroundColor: '#6f6e9e',
                top: index === 0 ? 10 : 5,
                left: index === 0 ? 10 : 5,
                width: `${45 + index * 5}px`,
                height: `${45 + index * 5}px`,
                animationDelay: `${delay}s`,
                opacity:showMore ? '0':'1',
                transition:'opacity 0.3s ease'
              }}
            ></span>
          ))}
            
          <div className={`coverlogo relative flex items-end justify-end ${showMore ? 'hover' : ''}`}>
            <IoIosTimer style={{ width: '45px', height: '45px', color: '#e8e8f0' ,opacity:showMore ? '0':'1',
                transition:'opacity 0.3s ease' }} />
            <div className={`additional-text ${showMore ? 'visible' : 'hidden'}`}>
              {/* Additional content to show on hover */}
              <motion.p 
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0,tranisition:{
                duration:0.5
              }}}
              style={{ color: '#e8e8f0' }}><ShiftingCountdown/></motion.p>
            </div>
          </div>
        </span>
       </div>
      </div>
                </motion.div>

                <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 15 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 1 },
        transitionEnd: { opacity: 1, scale: 1 },
      }}
      viewport={{ once: true }}
      className="col-span-1 xl:row-span-4 rounded-md px-3 py-3 relative"
      style={{ backgroundColor: '#18181b', border: '1px solid #434363', minHeight: '250px' }} 
    >
      <h2 className="p-1 px-1.5 rounded-xl w-fit h-fit text-start mx-2 my-3 font-light text-sm" style={{ backgroundColor: '#585782', color: '#e8e8f0' }}>
        New Arrivals
      </h2>
      <h1 className="text-start pt-2 pl-2 font-semibold text-lg md:text-xl" style={{ color: '#fbfbfb' }}>
        Fresh Finds Just In
      </h1>
      <p className="text-start pt-2 pl-2 font-normal text-xs md:text-sm " style={{ color: '#d6d6dc' }}>
        Be the first to shop our latest arrivals! From stylish apparel to innovative tech, update your collection with the freshest trends.
      </p>
      
      

    </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 ,x:-15}}
                    whileInView={{ opacity: 1, scale: 1,x:0 ,transition: { duration: 1 }, transitionEnd: { opacity: 1, scale: 1 } }}
                    viewport={{ once: true}}
                    className="gradi xl:col-span-2 xl:row-span-3 rounded-md px-3 py-3 flex gap-4 md:gap-0 flex-col md:flex-row justify-between items-center md:items-stretch"
                    style={{ backgroundColor: '#18181b', minHeight: '200px' }} // Adjusted height
                >
                  <div className="one">
                  <h2 className="p-1 rounded-xl w-fit h-fit  text-start my-3 font-light text-sm"
                    style={{backgroundColor:'#585782',color:'#e8e8f0',border:'1px solid #434363'}}
                    >Customer Reviews</h2>
                    <h1 className="text-start pt-2 pl-2 font-semibold text-lg md:text-xl"
                    style={{color:'#fbfbfb'}}
                    >What Our Customers Say</h1>
                    <p className="text-start pt-2 pl-2 pr-2 md:pr-0 font-normal text-xs md:text-sm w-full md:w-3/5"
                      style={{color:'#d6d6dc'}}
                    >
                  Hear from our satisfied customers! Check out their reviews and see how our products have made a difference in their lives.
                    </p>
                  </div>
                  <div className="two ">
                  <section className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                        {slides.map((slide, index) => (
                            <div className="embla__slide flex flex-col px-3 py-3 rounded-md" key={index}

                            >
                                <div className="flex justify-between items-center">
                                   <div className="flex gap-2">
                                    <Avatar src={slide.img}/>
                                   <div className="flex flex-col">
                                        <p style={{color:'#fbfbfb'}} className="font-semibold text-sm sm:text-md text-start">{slide.client}</p>
                                        <p style={{color:'#9f9fac'}} className="font-light text-xs sm:text-sm text-start">{slide.username}</p>
                                    </div>
                                   </div>
                                    {slide.company}
                                </div>
                                <p style={{color:'#d6d6dc'}} className="font-light md:font-normal text-xs md:text-sm text-start pt-4">{slide.comment}</p>
                                <span className="mt-4">{slide.rated}</span>
                                <span className="w-full flex items-center justify-center mt-3">{slide.scroll}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    </section>
                  </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9,x:15 }}
                    whileInView={{ opacity: 1, scale: 1,x:0 ,transition: { duration: 1 }, transitionEnd: { opacity: 1, scale: 1 } }}
                    viewport={{ once: true}}
                    className="xl:col-span-1 xl:row-span-2 p-3 rounded-md"
                    style={{ backgroundColor: '#18181b', border: '1px solid #434363', minHeight: '150px' }} // Adjusted height
                >
                     <h2 className="p-1 px-1.5 rounded-xl w-fit h-fit text-start mx-2 my-3 font-light text-sm"
                    style={{backgroundColor:'#585782',color:'#e8e8f0'}}
                    >Loyalty Program</h2>
                    <h1 className="text-start pt-2 pl-2 font-semibold text-lg md:text-xl"
                    style={{color:'#fbfbfb'}}
                    >Join Our Rewards Program</h1>
                    <p className="text-start pt-2 pl-2 font-normal text-xs md:text-sm"
                      style={{color:'#d6d6dc'}}
                    >
                  Write your email today and start earning points on every purchase! Enjoy discounts and early access to sales.
               <div className="flex gap-2 items-center mt-3">
               <input className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782'}} type="text" value={email} onChange={handleEmail} />
               <button className="rounded-md p-1" style={{backgroundColor:'#585782'}} onClick={handleClick}><CiLocationArrow1 className="send" style={{color:'#fbfbfb',width:'25px',height:'25px'}}/></button>
               </div>
                    </p>
                </motion.div>

            </motion.div>
        <div className="empty"></div>           
        </div>
        {open && (
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
    message={emailSub} 
    action={action}
  />
)}  
      </div>
        
    );
};

//// countdown small component //////

const ShiftingCountdown = () => {
  return (
    <div className="bg-gradient-to-br mt-3 ">
      <div className="o flex w-full justify-around items-center  pt-3"
      style={{backgroundColor:'#e8e8f0',color:'#585782'}}
      >
        <CountdownItem unit="Day" text="days" />
        <CountdownItem unit="Hour" text="hours" />
        <CountdownItem unit="Minute" text="minutes" />
        <CountdownItem unit="Second" text="seconds" />
      </div>
    </div>
  );
};
const CountdownItem = ({ unit, text }) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex flex-col  items-center justify-center gap-1 border-r-[1px] border-slate-200 font-mono ">
      <div className=" w-full  text-center">
        <span
          ref={ref}
          className="block text-lg sm:text-xl font-medium md:text-4xl lg:text-xl xl:text-xl"
          style={{color:'#434363'}}
        >
          {time}
        </span>
      </div>
      <span className="text-xs font-light  md:text-sm lg:text-sm"
      style={{color:'#6f6e9e'}}
      >
        {text}
      </span>
    </div>
  );
};
const COUNTDOWN_FROM = "2024-10-01";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const useTimer = (unit) => {
  const [ref, animate] = useAnimate(); // Ensure this is set up properly in your project
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = end - now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Only run animation if `ref.current` is valid
      if (ref.current) {
        try {
          // Exit animation
          await animate(
            ref.current,
            { y: ["0%", "-50%"], opacity: [1, 0] },
            { duration: 0.35 }
          );

          timeRef.current = newTime;
          setTime(newTime);

          // Enter animation
          await animate(
            ref.current,
            { y: ["50%", "0%"], opacity: [0, 1] },
            { duration: 0.35 }
          );
        } catch (error) {
          console.error('Animation error:', error);
        }
      } else {
        console.warn('ref.current is not defined during animation');
      }
    }
  };

  return { ref, time };
};

export default Info;
