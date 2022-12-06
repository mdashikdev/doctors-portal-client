import React from 'react'
import footer from '../images/footer.png'

function Footer() {
  return (
    <div className='w-full relative flex flex-col justify-center items-center'>
        <img src={footer} className='h-[450px] md:h-[300px] object-cover' alt="" />
        <div className='absolute w-10/12 lg:max-w-[1240px] mx-auto flex flex-col md:flex-row gap-3 justify-between'>
            <ul className='mt-5 font-light'>
                <li className='text-md font-bold text-gray-600'>SERVICES</li>
                <li>Emergency Checkup</li>
                <li>Monthly Checkup</li>
                <li>Weekly Checkup</li>
                <li>Deep Checkup</li>
            </ul>
            <ul className='mt-5 font-light'>
                <li className='text-md font-bold text-gray-600'>ORAL HEALTH</li>
                <li>Emergency Checkup</li>
                <li>Monthly Checkup</li>
                <li>Weekly Checkup</li>
            </ul>
            <ul className='mt-5'>
                <li className='text-md font-bold text-gray-600'>OUR ADDRESS</li>
                <li>New York - 101010 Hudson</li>
            </ul>
        </div>
        <p className='absolute bottom-4  font-semibold text-neutral-800'>Copyright 2022 All Rights Reserved</p>
    </div>
  )
}

export default Footer