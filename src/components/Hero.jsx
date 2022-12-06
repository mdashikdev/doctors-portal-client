import React from 'react';
import bg from '../images/bg.png';
import chair from '../images/chair.png';
import { AiOutlineClockCircle,AiOutlinePhone } from 'react-icons/ai';
import {BiMap} from 'react-icons/bi';

function Hero() {
  return (
    <div className='relative flex flex-col items-center overflow-hidden'>
      {/* top content */}
      <img className='max-h-[700px] hidden md:block' src={bg} alt=""/>
      <div className='md:absolute lg:max-w-[1140px] w-10/12 h-full md:top-[-80px] flex flex-col md:flex-row gap-2 justify-between items-center'>
        <div className='basis-1/2 md:w-8/12 flex flex-col gap-3 justify-start order-2 md:order-1'>
          <h2 className='lg:text-5xl md:text-4xl text-2xl font-semibold text-gray-700 mr-1'>Your New Smile Starts Here</h2>
          <p className=' mt-1 text-gray-500 mr-4 font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Saepe blanditiis non neque ipsum illum</p>
          <button className='w-fit px-3 py-2 bg-gradient-to-r from-[#0FCFEC] to-[#19D3AE] hover:to-[#0FCFEC] hover:from-[#19D3AE] duration-200 rounded text-white mt-2 ' type="button">GET STARTED</button>
        </div>
        <div className='basis-1/2 order-1 md:order-2'>
          <img src={chair} alt="" />
        </div>
      </div>

      {/* bottom content */}
      <div className='lg:max-w-[1140px] w-10/12 md:mt-[-50px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 m-4'>
        <div className='flex items-center gap-2 p-3 rounded bg-gradient-to-r to-[#0FCFEC] from-[#19D3AE]'>
          <AiOutlineClockCircle className='text-7xl text-white'/>
          <div>
            <h4 className='text-white text-xl'>Opening Hours</h4>
            <p className='text-white/80 font-light'>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
        <div className='flex items-center gap-2 p-3 rounded bg-slate-700'>
          <BiMap className='text-7xl text-white'/>
          <div>
            <h4 className='text-white text-xl'>Visit our location</h4>
            <p className='text-white/80 font-light'>Broklyn,NY 10035,United States</p>
          </div>
        </div>

        <div className='flex items-center gap-2 p-3 rounded bg-gradient-to-r to-[#0FCFEC] from-[#19D3AE]'>
          <AiOutlinePhone className='text-7xl text-white'/>
          <div>
            <h4 className='text-white text-xl'>Contact us now</h4>
            <p className='text-white/80 font-light'>+000 123 456789</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero