import React from 'react'
import appointment from '../images/appointment.png'

function StayConnected() {
  return (
    <div className='relative flex flex-col justify-center items-center'>
        <img src={appointment} className='w-full h-[400px] max-h-[600px] object-cover' alt="" />
        <div className='w-full flex flex-col justify-center items-center absolute'>
            <h4 className='text-[#19D3AE] text-lg font-bold'>Contact Us</h4>
            <h1 className='text-white/90 text-3xl '>Stay connected with us</h1>
            <form className='flex flex-col gap-4 mt-5 w-10/12 md:w-6/12 lg:w-4/12' onSubmit={(e) => e.preventDefault()}>
                <input className='inptBtn' type="email" placeholder='Email Address' />
                <input className='inptBtn' type="text" placeholder='Subject' />
                <textarea className='h-16 inptBtn' placeholder='Your message'></textarea>
                <button type='submit' className='w-fit px-6 py-2 bg-gradient-to-r from-[#0FCFEC] to-[#19D3AE] hover:to-[#0FCFEC] hover:from-[#19D3AE] transition-all rounded-lg text-white mt-2 '>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default StayConnected