import React from 'react';
import people1 from '../images/people1.png';

function Testimonial() {
  return (
    <div className='w-10/12 mx-auto min-h-screen flex flex-col justify-center py-10'>
        <div>
            <h4 className='text-[#19D3AE] font-bold text-xl'>Testimonial</h4>
            <h2 className='text-black/90 text-3xl font-semibold'>What Our Patients Says</h2>
        </div>
        
        <div className=' px-4 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='rounded-xl shadow-md p-5'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus explicabo, inventore repudiandae animi a quae quis facilis ut blanditiis enim mollitia aperiam fugit quisquam veritatis voluptas molestias. Eveniet libero deserunt, beatae impedit ea recusandae vitae.</p>
                <div className='flex gap-3 mt-5'>
                    <img src={people1} className='w-16 ring ring-[#19D3AE] rounded-full' alt="" />
                    <div className='flex flex-col justify-center'>
                        <h3 className='text-md font-semibold'>Winson Herry</h3>
                        <p className='text-black/80 text-sm'>California</p>
                    </div>
                </div>
            </div>

            <div className='rounded-xl shadow-md p-5'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus explicabo, inventore repudiandae animi a quae quis facilis ut blanditiis enim mollitia aperiam fugit quisquam veritatis voluptas molestias. Eveniet libero deserunt, beatae impedit ea recusandae vitae.</p>
                <div className='flex gap-3 mt-5'>
                    <img src={people1} className='w-16 ring ring-[#19D3AE] rounded-full' alt="" />
                    <div className='flex flex-col justify-center'>
                        <h3 className='text-md font-semibold'>Winson Herry</h3>
                        <p className='text-black/80 text-sm'>California</p>
                    </div>
                </div>
            </div>

            <div className='rounded-xl shadow-md p-5'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus explicabo, inventore repudiandae animi a quae quis facilis ut blanditiis enim mollitia aperiam fugit quisquam veritatis voluptas molestias. Eveniet libero deserunt, beatae impedit ea recusandae vitae.</p>
                <div className='flex gap-3 mt-5'>
                    <img src={people1} className='w-16 ring ring-[#19D3AE] rounded-full' alt="" />
                    <div className='flex flex-col justify-center'>
                        <h3 className='text-md font-semibold'>Winson Herry</h3>
                        <p className='text-black/80 text-sm'>California</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Testimonial