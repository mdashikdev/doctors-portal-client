import React from 'react';
import appointment from '../images/appointment.png';
import doctorSm from '../images/doctor-small.png';

function Appointment() {
  return (
    <div className='relative w-full flex justify-center h-fit py-10 lg:mt-36'>
        <img src={appointment}  className='lg:max-h-[500px] md:max-h-[400px] min-h-[530px] h-full w-full' alt="" />
        <div className='w-full md:w-11/12 absolute top-0 h-full flex flex-col md:flex-row justify-center items-center'>
            <img src={doctorSm} className='w-auto lg:max-w-fit lg:mt-[-150px] md:max-w-[400px] hidden md:block' alt="" />
            <div className='flex flex-col justify-center gap-4 px-5 md:p-0'>
                <h5 className='text-xl text-[#19D3AE] font-bold'>Appointment</h5>
                <h2 className='text-4xl text-white font-semibold'>Make an appointment Today</h2>
                <p className='text-white/80 leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptate minima tempore tempora, blanditiis autem cupiditate nisi atque, adipisci, possimus odio eius quam reprehenderit quos eum ea numquam temporibus iusto. Cupiditate deserunt nulla debitis in! Exercitationem nihil nulla veniam a dolorem voluptatibus dolores facilis quasi accusantium, maiores consectetur blanditiis fugiat libero! Explicabo saepe soluta optio.</p>
                <button className='w-fit px-3 py-2 bg-gradient-to-r from-[#0FCFEC] to-[#19D3AE] hover:to-[#0FCFEC] hover:from-[#19D3AE] transition-all rounded-lg text-white mt-2 ' type="button">GET STARTED</button>
            </div>
        </div>
    </div>
  )
}

export default Appointment