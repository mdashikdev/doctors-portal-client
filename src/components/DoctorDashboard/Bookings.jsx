import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AllContext, MainApi } from '../../App'
import { ClapSpinner } from "react-spinners-kit";
import {BsStopwatch} from 'react-icons/bs';
import {AiOutlineCheck} from 'react-icons/ai'
import dayjs from 'dayjs';

function Bookings() {
  const contexts = useContext(AllContext);
  const [loading, setloading] = useState(false);
  const [allBookings, setallBookings] = useState();

  useEffect(() => {
    if (contexts.currentUser?.role === 'doctor') {
      setloading(true)
      axios.post(`${MainApi}/getcurrentuserbookings`,{id:contexts.currentUser?._id})
      .then(res => {
          setloading(false)
          if (res.data?.length > 0) {
              setallBookings(res.data);
          }else{
              console.log(res)
          }
      })
      .catch(err => console.log(err))
    }

  }, [])
  return (

    <div className='w-full flex flex-col items-center'>
      <div className='relative w-11/12 md:10/12 flex justify-between mt-24 md:mt-10 mb-5'>
          <h3 className='text-2xl font-bold'>Booked : 2</h3>
      </div>
      {
        loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
      <div className='w-11/12 md:W-10/12 h-fit bg-white rounded-xl overflow-auto md:overflow-hidden shadow-sm'>
          <ul className='min-w-[700px] overflow-auto grid grid-cols-5 justify-between items-center py-2 text-lg font-bold bg-neutral-200'>
              <li className='text-center w-full'>NAME</li>
              <li className='text-center w-full'>DATE</li>
              <li className='text-center w-full'>TIME</li>
              <li className='text-center w-full'>TREATMENT</li>
              <li className='text-center w-full'>PAY INFO</li>
          </ul>
          {
              allBookings?.length > 0 ?
              allBookings?.map(book => {
                  return (
                      <ul className='min-w-[700px] overflow-auto grid grid-cols-5 justify-between items-center py-4 mb-1 text-md font-semibold text-black/80 bg-white border border-t-0 border-l-0 border-r-0 border-b-neutral-200/50'>
                          <li className='text-center w-full font-semibold'>{book?.name}</li>
                          <li className='text-center w-full'>{dayjs(`${book?.datefrom}`).format('DD/MM/YY')}</li>
                          <li className='text-center w-full'>{`${dayjs(`${book?.datefrom}`).format('hh:mm A')} - ${dayjs(`${book?.dateto}`).format('hh:mm A')}`}</li>
                          <li className='text-center w-full'>{book.speciality}</li>
                          {
                            book?.payment === 'payed' ?
                            <li className='text-center mx-auto cursor-pointer px-4 py-2 bg-green-500 rounded-lg text-white w-fit flex gap-1 items-center'>Payed <AiOutlineCheck/></li>
                            :
                            <li className='text-center mx-auto cursor-pointer px-4 py-2 bg-neutral-500 rounded-lg text-white w-fit flex gap-1 items-center'>Not Payed <BsStopwatch/></li>
                          }
                      </ul>
                  )
              })
              :
              <p className='text-center my-5 text-xl font-semibold'>No Booked available</p>
          }
      </div>
      }
    </div>
  )
}

export default Bookings