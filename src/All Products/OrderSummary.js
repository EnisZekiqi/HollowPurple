import React from 'react';
import { useState,useEffect } from "react";
import none from '../images/undraw_web_search_re_efla.svg'
import none2 from '../images/undraw_order_delivered_re_v4ab.svg'
import { motion,AnimatePresence } from "framer-motion";
import { MdOutlineAccountCircle  ,MdOutlineNotifications ,MdOutlineShoppingCart 
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

  return (
    <div className="order-summary h-full" >
       <div className="flex p-1.5"> 
        <div className='flex items-center gap-1'>
          <a href="/products"> <h1  className='font-bold text-lg cursor-pointer md:text-xl'>HollowPurple</h1></a>
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
