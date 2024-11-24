import { motion,AnimatePresence } from "framer-motion";
import { MdLocalPhone,MdAddLocation,MdAppShortcut,MdKeyboardDoubleArrowRight     } from "react-icons/md";
import { useState } from "react";
import { TbWorldShare } from "react-icons/tb";
import { CiTwitter,CiInstagram,CiFacebook  } from "react-icons/ci";
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Contact = () => {

  const father ={
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{
        staggerChildren:1,
        delayChildren:0.5,
        duration:1
      }
    }
  }

    const [info,setInfo]=useState(null) /// hover on the sector 
    const [clickInfo,setClickInfo]=useState('contact') // click on the sector

////// input for sending message //////


const [emailmessage,setEmailMessage]=useState('')
const [textMessage,setTextMessage]=useState('')
const [alertMessage,setAlertMessage]=useState('')
const [open,setOpen]=useState(false)

const handleEmail =(e)=>{
  setEmailMessage(e.target.value)
}

const handleMessage =(e)=>{
  setTextMessage(e.target.value)
}

const [checkBox,setCheckBox]=useState(false)

const toggleCheckBox =()=>{
  const emailSaved = localStorage.getItem('email')

  setCheckBox(!checkBox)

  if (!checkBox && emailSaved) {
    // If the checkbox is checked, use the saved email
    setEmailMessage(emailSaved);
  } else {
    // If the checkbox is unchecked, clear the email message
    setEmailMessage('');
  }

}

const sendMessage = () => {
  if (textMessage.trim() === '' || emailmessage.trim() === '') {
    setAlertMessage('Please fill the form');
  } else {
    // Save text message and email to localStorage
    localStorage.setItem('message', textMessage);
    localStorage.setItem('email', emailmessage);

    setAlertMessage('Message sent successfully');
    setOpen(true);

    // Clear fields after 3 seconds
    setTimeout(() => {
      setTextMessage('');
      setEmailMessage('');
      setOpen(false); // Close the alert after 3 seconds
    }, 3000);
  }
};


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



    return ( 
        <div id="contact" className="contact  bg-opacity-60 backdrop-blur-md" style={{ backgroundColor: '#010103' }}>
            <motion.div
            variants={father}
            initial="hidden"
            animate="visible"
            viewport={{once:true}}
            className="flex flex-col md:flex-row gap-4 md:gap-0">
                <div className="gadget w-11/12 mr-4 md:mr-0 md:w-9/12 h-screen">
                <div className="contactus w-fit py-2 px-4 flex flex-col"
                style={{backgroundColor:'#010103'}}
                >
                  <div className="relative">
                  <motion.h1
                  initial={{opacity:0,x:-10}}
                  whileInView={{opacity:1,x:0,transition:{duration:1}}}
                  viewport={{once:true}}
                  className="text-start font-bold text-2xl">Contact</motion.h1>
                    <div className="line absolute h-screen w-8 -ml-5"
                    style={{backgroundColor:'#010103'}}
                    ></div>
                  </div>
                </div>
               <div className="flex  flex-col-reverse justify-around h-full">
               <motion.h1
               initial={{opacity:0,y:-10}}
               whileInView={{opacity:1,x:0,transition:{duration:1}}}
               viewport={{once:true}}
               className="blended-text font-bold text-3xl sm:text-5xl md:text-7xl text-start p-5 flex flex-col justify-end mb-8  ml-8 w-fit h-4/6 md:h-5/6">Know More About Us
                <p  className="blended-text2 text-xs sm:text-sm font-light text-start ">Get to know us , here you will learn about our current location , our contact thru email , thru our service and much more </p>
                </motion.h1>
                <motion.div
            variants={father}
            initial="hidden"
            animate="visible"
            className="contackti flex flex-col w-full items-end gap-6 h-36 p-2 mr-2"
          >
            <div className="contackti flex flex-col w-fit gap-6">
              <motion.p
                className="flex justify-start cursor-pointer items-center gap-2 py-2 pl-1 pr-10 relative"
                style={{
                  backgroundColor: 'rgba(232, 232, 240, 0.25)',
                  borderRadius: '10px',
                  border: '1px solid rgba(221, 221, 226, 0.4)',
                }}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                viewport={{ once: true }}
                onMouseEnter={() => setInfo('phone')}
                onMouseLeave={() => setInfo(null)}
                onClick={() => setClickInfo('phone')}
              >
                <MdLocalPhone style={{ width: '30px', height: '30px' }} />
                <p
                  className="font-light text-sm"
                  style={{ color: '#dddde2' }}
                >
                  Phone
                </p>
              <AnimatePresence>
              {info === 'phone' && (
                
                <motion.div
                initial={{ x: -5,opacity:0 }}
                animate={{
                  x: 0,opacity:1,
                  transition: { duration: 0.7, ease: 'easeInOut', repeatType: 'reverse', repeat: Infinity },
                }}
                exit={{opacity:0,x:5,transiton:{
                  duration:0.7
                }}}
                style={{
                  position: 'absolute',
                  right: '10px', // Position it on the right side of the container
                }}
              >
                <MdKeyboardDoubleArrowRight />
              </motion.div>
            
            )}
              </AnimatePresence>
                
              </motion.p>

              <motion.p
                className="flex justify-start cursor-pointer items-center gap-2 py-2 pl-1 pr-10 relative"
                style={{
                  backgroundColor: 'rgba(232, 232, 240, 0.25)',
                  borderRadius: '10px',
                  border: '1px solid rgba(221, 221, 226, 0.4)',
                }}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                viewport={{ once: true }}
                onMouseEnter={() => setInfo('location')}
                onMouseLeave={() => setInfo(null)}
                onClick={() => setClickInfo('location')}
              >
                <MdAddLocation style={{ width: '30px', height: '30px' }} />
                <p
                  className="font-light text-sm"
                  style={{ color: '#dddde2' }}
                >
                  Location
                </p>
                <AnimatePresence>
                {info === 'location' && (
                
                <motion.div
                  initial={{ x: -5,opacity:0 }}
                  animate={{
                    x: 0,opacity:1,
                    transition: { duration: 0.7, ease: 'easeInOut', repeatType: 'reverse', repeat: Infinity },
                  }}
                  exit={{opacity:0,x:5,transition:{
                    duration:0.7
                  }}}
                  style={{
                    position: 'absolute',
                    right: '10px',
                  }}
                >
                  <MdKeyboardDoubleArrowRight />
                </motion.div>
           
              )}
                </AnimatePresence>
              </motion.p>

            <motion.p
              className="flex justify-start cursor-pointer items-center gap-2 py-2 pl-1 pr-10 relative"
              style={{
                backgroundColor: 'rgba(232, 232, 240, 0.25)',
                borderRadius: '10px',
                border: '1px solid rgba(221, 221, 226, 0.4)',
              }}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              viewport={{ once: true }}
              onMouseEnter={() => setInfo('media')}
              onMouseLeave={() => setInfo(null)}
              onClick={() => setClickInfo('media')}
            >
              <MdAppShortcut style={{ width: '30px', height: '30px' }} />
              <p
                className="font-light text-sm"
                style={{ color: '#dddde2' }}
              >
                Socials
              </p>
              <AnimatePresence>
              {info === 'media' && (
               
               <motion.div
                 key="arrow" // Adding a key helps AnimatePresence track the component
                 initial={{ x: -5, opacity: 0 }}
                 animate={{
                   x: 0,
                   opacity: 1,
                   transition: { duration: 0.7, ease: 'easeInOut', repeatType: 'reverse', repeat: Infinity },
                 }}
                 exit={{ x: 5, opacity: 0, transition: { duration: 0.7 } }}
                 style={{
                   position: 'absolute',
                   right: '10px',
                 }}
               >
                 <MdKeyboardDoubleArrowRight />
               </motion.div>
           )}
              </AnimatePresence>

            </motion.p>
  </div>
</motion.div>

               </div>
                </div>
                <div className="w-full md:w-1/4">
                <div className="empty"/>
                <div className="flex flex-col items-center justify-between md:justify-center">
               
                  <div className="contact px-4 md:pl-0 ">
                   <div className="flex flex-col md:gap-4 items-center gap-6">
                   <div
                        className="contactwrapper flex items-center justify-center relative"
                        style={{
                          color: '#e8e8f0',
                          backgroundColor: '#585782',
                          width: '150px', // Adjust size as needed
                          height: '150px', // Adjust size as needed
                          borderRadius: '50%', // Makes it circular
                        }}
                      >
                        {/* Icon in the Center */}
                        <TbWorldShare style={{ width: '60px', height: '60px', zIndex: 1 }} />

                        {/* SVG Circle with Curved Text */}
                        <svg
                          viewBox="0 0 200 200"
                          width="150"
                          height="150"
                          className="absolute"
                          style={{ top: 0, left: 0 }}
                        >
                          {/* Define the circle path */}
                          <defs>
                            <path
                              id="circlePath"
                              d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                            />
                          </defs>

                          {/* Text following the path */}
                          <text fill="#fbfbfb" fontSize="" fontWeight="light" letterSpacing="2px">
                            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                              Contact  Us     HollowPurple     Contact Us     HollowPurple      Contact Us 
                            </textPath>
                          </text>
                        </svg>
                      </div>
                      <div className="moreInfoo mt-2">
                        {clickInfo === 'contact' && 
                       <div className="textinfoo flex flex-col gap-2 items-center md:items-start px-2.5">
                       <h1 className="font-semibold text-lg text-center md:text-start" style={{color:'#fbfbfb'}}>Need Answers ? </h1>
                       <p className="font-light text-sm text-center md:text-start mb-4 pr-4" style={{color:'#d6d6dc'}}>For every unclear information about us or any question in general send us a message and we will respond quickly</p>
                       </div>
                        }
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence mode='wait'>
  {clickInfo === 'phone' && (
    <motion.div
      key="phone" // Unique key for each item
      variants={father}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="phone flex flex-col justify-center items-center gap-4 mb-3"
    >
      <div className="flex justify-center items-center gap-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          className="phonewrapper p-2 rounded-full"
          style={{ color: '#6f6e9e', backgroundColor: 'transparent' }}
        >
          <MdLocalPhone style={{ width: '20px', height: '20px' }} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          className="font-normal text-md"
          style={{ color: '#fbfbfb' }}
        >
          Phone
        </motion.h1>
      </div>
      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        className="font-light text-sm"
        style={{ color: '#d6d6dc' }}
      >
        +383 44 256 853
      </motion.li>
    </motion.div>
  )}

  {clickInfo === 'location' && (
    <motion.div
      key="location"
      variants={father}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="location flex flex-col justify-center items-center gap-4 mb-3"
    >
      <div className="flex items-center justify-center gap-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          className="phonewrapper p-2 rounded-full"
          style={{ color: '#6f6e9e', backgroundColor: 'transparent' }}
        >
          <MdAddLocation style={{ width: '20px', height: '20px' }} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          className="font-semibold text-xl"
          style={{ color: '#fbfbfb' }}
        >
          Location
        </motion.h1>
      </div>
      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        className="font-light text-sm"
        style={{ color: '#d6d6dc' }}
      >
        Faruk Beqiri Vushtrri
      </motion.li>
    </motion.div>
  )}

  {clickInfo === 'media' && (
    <motion.div
      key="media"
      variants={father}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="media flex flex-col justify-center items-center gap-4 mb-3"
    >
      <div className="flex justify-center items-center gap-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          className="phonewrapper p-2 rounded-full"
          style={{ color: '#6f6e9e', backgroundColor: 'transparent' }}
        >
          <MdAppShortcut style={{ width: '20px', height: '20px' }} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
          className="font-semibold text-xl"
          style={{ color: '#fbfbfb' }}
        >
          Social Media
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
        className="flex justify-around gap-2"
      >
        <CiTwitter style={{ width: '20px', height: '20px', color: '#e8e8f0' }} />
        <CiInstagram style={{ width: '20px', height: '20px', color: '#e8e8f0' }} />
        <CiFacebook style={{ width: '20px', height: '20px', color: '#e8e8f0' }} />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

                   <div className="flex flex-col gap-2 items-center px-3">
                         <div className="flex flex-col gap-4 items-center mt-2">
                          <input className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782'}} type="text" placeholder="Email" value={emailmessage} onChange={handleEmail} />
                          <textarea className="rounded-md p-1 w-full" style={{backgroundColor:'transparent',border:'1px solid #585782'}} name="" placeholder="Message" id="" value={textMessage} onChange={handleMessage}></textarea>
                         </div>
                         <div className="flex justify-between items-center gap-6 mt-2">
                          <div className="useEmail flex gap-2 items-center">
                            <p className="font-light text-xs" style={{color:'#9f9fac'}}>Use previous Email</p>
                            <label class="containeri">
                            <input checked={checkBox}  onChange={toggleCheckBox} type="checkbox"/>
                            <div class="checkmark"></div>
                          </label>
                          </div>
                          <button className="py-1 px-2 rounded-full" style={{border:'1px solid #3b3b45',color:'#d6d6dc'}} onClick={sendMessage}>Send</button>
                         </div>
                        </div>
                </div>
                </div>
            </motion.div>
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
    message={alertMessage} 
    action={action}
  />
)}  
            <div className="empty " style={{backgroundColor:'#010103'}}/>
        </div>
     );
}
 
export default Contact;