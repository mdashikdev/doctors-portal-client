import React from 'react'
import fluoride from '../images/fluoride.png';
import cavity from '../images/cavity.png';
import whitening from '../images/whitening.png';


function Services() {
  return (
    <div className='lg:max-w-[1240px] w-10/12 mx-auto py-10'>
        <h4 className='text-center text-[#19D3AE] text-lg font-normal mt-24'>OUR SERVICES</h4>
        <h2 className='text-center text-4xl text-black/80 font-normal'>Service We Provide</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10'>
            <div className='flex flex-col gap-2 items-center justify-center shadow rounded-xl p-3 py-6'>
                <img src={fluoride} className='w-24' alt="" />
                <h4 className='text-center text-2xl font-semibold'>Fluoride Treatment</h4>
                <p className='text-center text-[16px] leading-8 text-black/90 px-4 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, saepe asperiores? Nemo qui, nobis fugit ass9menda  font-normaldolorem earum?</p>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center shadow rounded-xl p-3 py-6'>
                <img src={cavity} className='w-24' alt="" />
                <h4 className='text-center text-2xl font-semibold'>Cavity Filling</h4>
                <p className='text-center text-[16px] leading-8 text-black/90 px-4 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, saepe asperiores? Nemo qui, nobis fugit ass9menda  font-normaldolorem earum?</p>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center shadow rounded-xl p-3 py-6'>
                <img src={whitening} className='w-24' alt="" />
                <h4 className='text-center text-2xl font-semibold'>Teeth Whitening</h4>
                <p className='text-center text-[16px] leading-8 text-black/90 px-4 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, saepe asperiores? Nemo qui, nobis fugit ass9menda  font-normaldolorem earum?</p>
            </div>
        </div>
    </div>
  )
}

export default Services