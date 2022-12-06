import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { SelectedContext } from './AvailableServices';
import { AllContext } from '../App';

function SelectedServiceBook({info}) {
  const [setpopup,setbook] = useContext(SelectedContext);

  const contexts = useContext(AllContext);

  const handleBook = (apntId) => {
    setpopup(true);
    setbook(info);
  }

  return (
    <div className='flex flex-col justify-around rounded-xl w-full mt-5 pb-5 shadow-md cursor-pointer hover:shadow-xl duration-200'>
        <div>
          <img src={info[0]?.avatar} className='w-full h-auto max-h-[400px] rounded-t-xl object-cover' alt="" />
        </div>
        <div className='px-5 mt-5'>
          <h2 className='text-xl font-semibold'>Dr. {info[0]?.name}</h2>
          <div className='relative text-xl text-[#19D3AE] font-semibold'>
            {info[0]?.appointment?.Speciality} 
            <span className='text-black text-sm font-normal '>Specialist</span>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Fee : ${info[0]?.appointment?.fee}</h3>
          </div>
          <div>{dayjs(`${info[0]?.appointment?.datefrom}`).format('MMM D, YYYY')}</div>
          <div>{dayjs(`${info[0]?.appointment?.datefrom}`).format('hh:mm A')} - {dayjs(`${info[0]?.appointment?.dateto}`).format('hh:mm A')}</div>
          {
            contexts.currentUser?._id === info[0]?._id ?
            <p className='w-full px-4 py-2 mt-3 text-white bg-red-500 rounded-lg'>You cannot book your appointment!</p>
            : 
            <button onClick={() => handleBook(`${info[0]?.appointment?._id}`)} className='w-fit px-3 py-2 bg-gradient-to-r from-[#0FCFEC] to-[#19D3AE] hover:to-[#0FCFEC] hover:from-[#19D3AE] transition-all rounded-lg text-white mt-5' type="button">Book Appointment</button>
          }
        </div>
    </div>
  )
}

export default SelectedServiceBook