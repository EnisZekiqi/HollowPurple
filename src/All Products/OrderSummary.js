import React from 'react';
import { useState,useEffect } from "react";
import none from '../images/undraw_web_search_re_efla.svg'
import none2 from '../images/undraw_order_delivered_re_v4ab.svg'
import { motion,AnimatePresence } from "framer-motion";
import { MdNotificationsNone   ,MdOutlineNotifications ,MdOutlineShoppingCart 
  ,MdOutlineLocalShipping , MdFavoriteBorder ,MdOutlineKeyboardArrowDown 
  ,MdInfoOutline ,MdEuro,MdCreditCard, MdOutlinePayments ,
  MdOutlineVerified ,MdFavorite,MdArrowBackIos,MdDeleteOutline,MdOutlineHome,MdOutlineClose,
  MdOutlineCircle ,MdCircle ,MdOutlineDeliveryDining 
} from "react-icons/md"
import { Box, Modal } from '@mui/material';
const OrderSummary = ({ orderDetails, orderTime }) => {


  const [ArrivalTime,setArrivalTime]=useState('')

  useEffect(() => {
    if (orderTime) {
      // Convert the orderTime string into a Date object
      const orderDate = new Date(orderTime);
  
      // Add 3 days to the orderDate
      orderDate.setDate(orderDate.getDate() + 3);
  
      // Format the new date to a readable string
      const formattedArrivalTime = orderDate.toLocaleString();
  
      // Update the state with the calculated arrival time
      setArrivalTime(formattedArrivalTime);
    }
  }, [orderTime]);


  const [notificationArrival,setNotificationArrival]=useState(false)


  useEffect(() => {
    if (ArrivalTime) {
      const checkArrival = setInterval(() => {
        const currentTime = new Date();
        const arrivalDate = new Date(ArrivalTime);

        // Check if the current time matches the arrival time
        if (currentTime >= arrivalDate) {
          clearInterval(checkArrival); // Stop the interval
          setNotificationArrival(true); // Trigger notification
        }
      }, 1000); // Check every second

      // Cleanup interval on component unmount
      return () => clearInterval(checkArrival);
    }
  }, [ArrivalTime]);

  return (
    <div className="order-summary h-full" >
       <div className="flex justify-between items-center p-1.5">
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
         
          <div className="flex gap-3 items-center cursor-pointer">
          
           <a href="/products"> <MdArrowBackIos  style={{color:'#fbfbfb',width:'25px',height:'25px',marginTop:'5px'}}/></a>
           <div className="relative">
  {notificationArrival === true && (
    <p className="absolute ml-4 -mt-1.5 rounded-full bg-[#6f6e9e] text-[#e8e8f0] px-1 py-0.5 w-4 h-fit text-xs font-bold">
      !
    </p>
  )}

  <div className="flex flex-col mr-2 ">
    <MdOutlineNotifications style={{ width: "25px", height: "25px" }} />
  </div>

  <div className="absolute">
    {notificationArrival && (
      <div className="ml-2 mr-4">
        {/* Arrow pointer */}
        <div
          className="absolute left-[65%] top-[14px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#242329]"
          style={{
            borderTop: "1px solid #6f6e9e",
            borderLeft: "1px solid #6f6e9e",
            zIndex: 200,
            borderTopRightRadius:'8px'
          }}
        />
        {/* Notification content */}
        <div
          className="absolute -left-full -translate-x-[80%] -translate-y-1/2 top-[181px] bg-[#242329] p-4 rounded-lg w-60 shadow-lg"
          style={{ border: "1px solid #6f6e9e", zIndex: 100 }}
        >
          <h2 className="text-lg font-bold text-[#fbfbfb] mb-2">Order Arrived!</h2>
          <p className="text-sm text-[#d6d6dc] mb-4">
            Your order has arrived. Please check your drawer for details.
          </p>
          <div className="bg-[#6f6e9e] p-3 rounded-lg">
            <h3 className="text-base font-bold text-[#fbfbfb] mb-2">Order Details</h3>
            <p className="text-sm text-[#fbfbfb] mb-1">
              <strong>Product:</strong> {orderDetails.productName}
            </p>
            <p className="text-sm text-[#fbfbfb] mb-1">
              <strong>Quantity:</strong> {orderDetails.productValue}
            </p>
            <p className="text-sm text-[#fbfbfb]">
              <strong>Price:</strong> {orderDetails.priceQuantity}$
            </p>
            <button
              className="mt-4 bg-[#9f9fac] text-[#242329] px-3 py-1 rounded-md"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link navigation
                e.stopPropagation(); // Prevent event bubbling
                setNotificationArrival(false); // Close the notification
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

          </div>
        
        </div>
        <div className="empty md:block hidden"></div>
        <div className="emptyg md:hidden block"></div>
      <motion.h2
       initial={{opacity:0,y:-10}}
       animate={{opacity:1,y:0,transition:{duration:0.5,delay:0}}}
      className='text-3xl font-bold text-[#fbfbfb] text-center md:text-start pl-0 md:pl-8 mb-8 mt-4'>Last Order</motion.h2>
        {orderDetails.length === '' ? 
       <div className="flex flex-col justify-center items-center w-full gap-3">
       <img width="300px" height="300px" src={none2} alt="" />
       <p className="text-md font-light text-[#d6d6dc]">Your cart is empty</p>
       <a href="/products"><p className="text-sm font-light text-[#9f9fac]">Check some product and come again</p></a>
     </div> :
          <motion.div
          initial={{opacity:0,y:-15}}
          animate={{opacity:1,y:0,transition:{duration:0.5,delay:0.5}}}
         className="flex flex-col md:flex-row justify-around">
           <div className="flex flex-col items-center gap-2 px-2 md:px-0">
             <h1 className='font-bold text-lg md:text-xl text-[#d6d6dc] '>Product Details</h1>
             <div className="flex gap-4 items-center mt-6 md:mt-0">
             <img src={orderDetails.productImage} width="65px" height='65px' alt="" />
            <div className="flex flex-col">
            <p className='text-md font-semibold text-[#fbfbfb] text-start'> {orderDetails.productName}</p>
             <p className='text-md font-normal text-[#fbfbfb] flex items-center gap-1'>
           <strong className='text-sm font-light text-[#9f9fac]'>Quantity</strong> {orderDetails.productValue}
           </p>
            <p className='text-md font-normal text-[#fbfbfb] flex items-center gap-1'>
             <strong className='text-sm font-light text-[#9f9fac]'>Price</strong> {orderDetails.priceQuantity}$ 
           </p>
            </div>
             </div>
           </div>
           <div className="flex flex-col col-span-2 items-center justify-center gap-2 px-2 md:px-0 mt-6 md:mt-0" >
  <h1 className="font-bold text-xl text-[#d6d6dc]">Order Details</h1>
  <div className="grid md:grid-cols-2 gap-4 w-full mt-4 mgrid-cols-1">
    <div>
      <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
        <strong className="text-sm font-light text-[#9f9fac]">Ordered by:</strong>
        {orderDetails.Name} {orderDetails.Surname}
      </p>
      <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
        <strong className="text-sm font-light text-[#9f9fac]">Order Time:</strong>
        {orderTime}
      </p>
      <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
        <strong className="text-sm font-light text-[#9f9fac]">Delivery City:</strong>
        {orderDetails.citySelect}
      </p>
    </div>
    <div>
      <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
        <strong className="text-sm font-light text-[#9f9fac]">Address:</strong>
        {orderDetails.Adress}
      </p>
      <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
        <strong className="text-sm font-light text-[#9f9fac]">Phone:</strong>
        {orderDetails.Phone}
      </p>
      <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
        <strong className="text-sm font-light text-[#9f9fac]">Email:</strong>
        {orderDetails.Email}
      </p>
    </div>
  </div>
</div>

         </motion.div>
        }
      <motion.h2
       initial={{opacity:0,y:-10}}
       animate={{opacity:1,y:0,transition:{duration:0.5,delay:0}}}
      className='text-3xl font-bold text-[#fbfbfb] text-center md:text-start pl-0 md:pl-8 mb-8 mt-12'> Order Arrival</motion.h2>
      <motion.div
       initial={{opacity:0,y:-15}}
       animate={{opacity:1,y:0,transition:{duration:0.5,delay:0.5}}}>
        <div className="flex flex-col md:flex-row justify-around">
        <div className="flex flex-col items-center gap-2 w-full md:w-[50%] px-2 md:px-0">
             <h1 className='font-bold text-xl text-[#d6d6dc] text-center'>Order Outgoing</h1>
            <div className="flex flex-col items-start w-full md:w-fit">
            <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1 mt-4">
                 <strong className="text-sm font-light text-[#9f9fac] text-start">Order Time:</strong>
                 {orderTime}
               </p>
               <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
                 <strong className="text-sm font-light text-[#9f9fac] text-start">Address:</strong>
                 {orderDetails.Adress}
               </p>
               <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
                 <strong className="text-sm font-light text-[#9f9fac] text-start">Delivery City:</strong>
                 {orderDetails.citySelect}
               </p>
            </div>
           </div>
           <div className="flex flex-col items-center gap-2 w-full md:w-[50%] mt-6 md:mt-0 px-2 md:px-0">
             <h1 className='font-bold text-xl text-[#d6d6dc]'>Order Arival</h1>
             <p className="text-md font-normal text-[#fbfbfb] flex items-center gap-1">
                  <strong className="text-sm font-light text-[#9f9fac] text-start">Estimated Arrival Time::</strong>
                  {ArrivalTime}
               </p>
               <div className='transportInfo flex justify-center items-center rounded-md w-full md:w-[40%] mt-1.5' >
      <div className="flex items-center gap-6 px-4 py-2">
        <div style={{widht:'30px',height:'30px'}}>
        <MdInfoOutline   style={{color:'#d6d6dc'}}/>
        </div>
        <p className='text-xs  font-extralight text-start'>
       Product is estimated to come in this period of time , please be wary that the product may come sonner or later based on that specific time , in that period of time stay wary on the email of phone number 
        </p>
      </div>
     </div>
           </div>
        </div>
       </motion.div>
       <div className="empty"></div>
    </div>
  );
};

export default OrderSummary;
