import React from 'react'
import BannerImg from "../../assets/Women/Women.avif";
import { GrSecure } from "react-icons/gr";
import { FaShippingFast, FaMoneyCheckAlt, FaGift } from "react-icons/fa";

const Banner = () => {
  return (
    <div className='min-h-[550px] flex justify-center
    items-center py-12 sm:py-0'>
      <div className='container'>
        <div className='grid grid-cols-1
        sm:grid-cols-2 gap-6 items-center'>
            {/* image section */}
            <div data-aos="zoom-in">
                <img src={BannerImg}
                alt=''
                className='max-w-[400px] h-[350px] w-full
                mx-auto drop-shadow-[-11px_11px_13px_rgba(0,0,0,1)] object-cover'
                />
            </div>

            {/* text details section */}
            <div className='flex flex-col justify-center gap-6 sm:pt-0'>
                <h1 data-aos="fade-up"className='text-3xl sm:text-4xl
                font-bold'>
                    Winter Sale Upto 50% Off
                </h1>
                <p 
                data-aos="fade-up"
                className='text-sm text-gray-600
                tracking-wide leading-5'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem 
                    magnam quia rerum deserunt vel ullam odio animi 
                    nesciunt, natus quod consequatur. Dolorum ratione fuga modi .
                </p>
                <div className='flex flex-col gap-4'>
                    <div data-aos="fade-up" className='flex items-center gap-4'>
                        <GrSecure className='text-4xl h-12 w-12
                        shadow-sm p-4 rounded-full bg-violet-200
                        dark:bg-violet-500' />
                        <p>Quality Products</p>
                    </div>
                    <div data-aos="fade-up" className='flex items-center gap-4'>
                        <FaShippingFast className='text-4xl h-12 w-12 shadow-sm
                        rounded-full bg-orange-200 dark:bg-orange-500' />
                        <p>Fast Delivery</p>
                    </div>
                    <div data-aos="fade-up" className='flex items-center gap-4'>
                        <FaMoneyCheckAlt className='text-4xl h-12 w-12 shadow-sm
                        rounded-full bg-green-200 dark:bg-green-500' />
                        <p>Easy Payment Method</p>
                    </div>
                    <div data-aos="fade-up" className='flex items-center gap-4'>
                        <FaGift className='text-4xl h-12 w-12 shadow-sm
                        rounded-full bg-yellow-200 dark:bg-yellow-500' />
                        <p>Get Offers</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
