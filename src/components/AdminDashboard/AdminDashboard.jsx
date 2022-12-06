import React, { useState } from 'react'
import { GiTireIronCross } from 'react-icons/gi';

import AddDoctor from './AddDoctor';
import AddService from './AddService';
import AllUsers from './AllUsers';
import ManageDoctors from './ManageDoctors';

function AdminDashboard() {
  const [liToggle, setliToggle] = useState('All Users');
  const [popup, setpopup] = useState(false);

  const lis = 'text-sm md:text-md font-semibold cursor-pointer px-2 md:px-3 py-3 pl-4 hover:bg-slate-200/50 duration-200';
  const liActive = 'text-sm md:text-md font-bold bg-slate-200/50 cursor-pointer px-2 pl-4 md:px-3 py-3 duration-200';

  const handlePay = () => {
      setpopup(!popup);
  }


  return (
    <div className='w-full relative min-h-screen bg-slate-200/50 flex justify-between'>
        <div className='w-full md:w-[280px] absolute md:relative top-0  md:block bg-white '>
            <ul className='w-full flex justify-center md:flex-col gap-2 md:gap-5 mt-5'>
                <li onClick={() => setliToggle('All Users')} className={liToggle === 'All Users' ? liActive : lis}>All Users</li>
                <li onClick={() => setliToggle('Manage Doctors')} className={liToggle === 'Manage Doctors' ? liActive : lis}>Manage Doctors</li>
                <li onClick={() => setliToggle('Add a Doctor')} className={liToggle === 'Add a Doctor' ? liActive : lis}>Add a Doctor</li>
                <li onClick={() => setliToggle('Add a Service')} className={liToggle === 'Add a Service' ? liActive : lis}>Add a Service</li>
            </ul>

        </div>
        <div className='w-full flex flex-col items-center'>
                {
                    popup &&
                    <div onClick={() => setpopup(!popup)} className='fixed w-full h-full top-0 left-0 backdrop-blur-md z-10'></div>
                }
                {
                    popup &&
                    <div className='fixed top-0 left-0 w-full h-full z-20 flex justify-center md:items-center items-end'>
                        <div className='lg:w-1/3 md:w-1/2 w-full h-fit p-4 rounded-t-2xl md:rounded-2xl border border-neutral-500 bg-white shadow-lg'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <h4 className='text-md text-[#19D3AE] font-semibold'>Hello, Name</h4>
                                    <GiTireIronCross onClick={() => setpopup(false)} className='p-2 bg-neutral-700 hover:bg-neutral-800 duration-200 rounded-full text-3xl text-white cursor-pointer'/>
                                </div>
                                <h3 className='text-2xl font-semibold'>Please Pay for Tech Cleaning</h3>
                                <p className='text-black/70 '>Your Appointment : <span className='text-yellow-500 font-semibold'>Nov 09, 2022</span> at 08:00 AM - 08:30 AM</p>
                                <h3 className='text-2xl font-semibold'>Please Pay: $200</h3>
                                <hr />
                            </div>
                            <form action="#" className='flex flex-col gap-3 mt-5' onSubmit={(e)=> e.preventDefault()}>
                                <input type="number" placeholder='Card Number' className='w-full p-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                                <input type="email" placeholder='MM/YY/CVC' className='w-full p-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                                <input type="submit" value='Pay' className='w-full px-4 py-3 rounded-md text-white bg-neutral-800 hover:bg-neutral-900 duration-200 cursor-pointer' />
                            </form>
                        </div>
                    </div>
                }
                {liToggle === 'All Users' && <AllUsers/>}
                {liToggle === 'Add a Doctor' && <AddDoctor/>}
                {liToggle === 'Manage Doctors' && <ManageDoctors/>}
                {liToggle === 'Add a Service' && <AddService/>}

        </div>
    </div>
  )
}

export default AdminDashboard