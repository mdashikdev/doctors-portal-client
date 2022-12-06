import React, { useState } from 'react'
import AddAppointment from './AddAppointment';
import Bookings from './Bookings';
import MyAppointments from './MyAppointments';


function DoctorDashboard() {
    const [liToggle, setliToggle] = useState('My Appointments');

    const lis = 'text-sm md:text-md font-semibold cursor-pointer px-2 md:px-3 py-3 pl-4 hover:bg-slate-200/50 duration-200 rounded-lg';
    const liActive = 'text-md md:text-lg font-bold bg-slate-200/50 cursor-pointer px-2 pl-4 md:px-3 py-3 duration-200 rounded-lg';

  return (
    <div className='w-full min-h-screen bg-gray-200/50 flex justify-between'>
        <div className='w-[280px] hidden md:block bg-white px-8 py-4 pl-10'>
            <ul className='w-full flex justify-center md:flex-col gap-2 md:gap-5 mt-5'>
                <li onClick={() => setliToggle('My Appointments')} className={liToggle === 'My Appointments' ? liActive : lis}>My Appointments</li>
                <li onClick={() => setliToggle('My Bookings')} className={liToggle === 'My Bookings' ? liActive : lis}>Bookings</li>
                <li onClick={() => setliToggle('Add Appointments')} className={liToggle === 'Add Appointments' ? liActive : lis}>Add Appointments</li>
            </ul>
        </div>
        {
            liToggle === 'My Appointments' && <MyAppointments/>
        }
        {
            liToggle === 'Add Appointments' && <AddAppointment/>
        }
        {
            liToggle === 'My Bookings' && <Bookings/>
        }
    </div>
  )
}

export default DoctorDashboard