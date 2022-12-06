import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GiTireIronCross } from 'react-icons/gi';
import {AiOutlineCheck} from 'react-icons/ai'
import {BsStopwatch} from 'react-icons/bs'
import { AllContext, MainApi } from '../App';
import { ClapSpinner } from "react-spinners-kit";
import dayjs from 'dayjs';

function UserDashboard() {
    const [liToggle, setliToggle] = useState('My Appointments');
    const [popup, setpopup] = useState(false);
    const [loading, setloading] = useState(false);
    const [allBookings, setallBookings] = useState();
    const [popupInfo, setpopupInfo] = useState();
    const contexts = useContext(AllContext);

    const lis = 'text-sm md:text-md font-semibold cursor-pointer px-2 md:px-3 py-3 hover:bg-slate-200/50 duration-200';
    const liActive = 'text-sm md:text-md font-semibold bg-slate-200/50 cursor-pointer px-2 md:px-3 py-3 duration-200';

    useEffect(() => {
        setloading(true)
        axios.get(`${MainApi}/getcurrentUserBookings/${contexts.currentUser?._id}`)
        .then(res => {
            setloading(false)
            if (res.data?.length > 0) {
                setallBookings(res.data);
            }
        })
        .catch(err => console.log(err))
    }, [])

    const handlePay = (info) => {
        setpopup(!popup);
        setpopupInfo(info);
    }

  return (
        <div className='w-full relative min-h-screen bg-slate-200/50 flex justify-between'>
        <div className='w-full md:w-[280px] absolute md:relative top-0  md:block bg-white '>
            <ul className='w-full flex justify-center md:flex-col gap-2 md:gap-5 mt-5'>
                <li onClick={() => setliToggle('My Appointments')} className={liToggle === 'My Appointments' ? liActive : lis}>My Appointments</li>
                <li onClick={() => setliToggle('My History')} className={liToggle === 'My History' ? liActive : lis}>My History</li>
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
                                    <h4 className='text-md text-[#19D3AE] font-semibold'>Hello, {popupInfo?.name}</h4>
                                    <GiTireIronCross onClick={() => setpopup(false)} className='p-2 bg-neutral-700 hover:bg-neutral-800 duration-200 rounded-full text-3xl text-white cursor-pointer'/>
                                </div>
                                <h3 className='text-2xl font-semibold'>Please Pay for "{popupInfo?.speciality}"</h3>
                                <p className='text-black/70 '>Your Appointment : <span className='text-yellow-500 font-semibold'>{dayjs(`${popupInfo?.datefrom}`).format('MMM DD, YYYY')}</span> at {`${dayjs(`${popupInfo?.datefrom}`).format('hh:mm A')} - ${dayjs(`${popupInfo?.dateto}`).format('hh:mm A')}`}</p>
                                <h3 className='text-2xl font-semibold'>Please Pay: ${popupInfo?.fee}</h3>
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
            <div className='relative w-11/12 md:10/12 flex justify-between mt-24 md:mt-10 mb-5'>
                <h3 className='text-2xl font-bold'>Booked : {allBookings?.length}</h3>
            </div>
            {
                loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
                <div className='w-11/12 md:10/12 h-fit bg-white rounded-xl overflow-auto md:overflow-hidden shadow-sm'>
                    <ul className='min-w-[550px] grid grid-cols-5 justify-between items-center py-2 text-lg font-bold bg-neutral-200'>
                        <li className='text-center w-full'>NAME</li>
                        <li className='text-center w-full'>DATE</li>
                        <li className='text-center w-full'>TIME</li>
                        <li className='text-center w-full'>TREATMENT</li>
                        <li className='text-center w-full'>PAYMENT</li>
                    </ul>
                    {
                        allBookings?.length > 0 ?
                        allBookings?.map(book => {
                            return (
                                <ul className='min-w-[550px] grid grid-cols-5 justify-between items-center py-4 mb-1 text-md font-semibold text-black/80 bg-white border border-t-0 border-l-0 border-r-0 border-b-neutral-200/50'>
                                    <li className='text-center w-full'>{book?.name}</li>
                                    <li className='text-center w-full'>{dayjs(`${book?.datefrom}`).format('DD/MM/YY')}</li>
                                    <li className='text-center w-full'>{`${dayjs(`${book?.datefrom}`).format('hh:mm A')} - ${dayjs(`${book?.dateto}`).format('hh:mm A')}`}</li>
                                    <li className='text-center w-full'>{book.speciality}</li>
                                    {
                                        book?.payment === 'payed' ?
                                        <li className='flex flex-col gap-2 mx-auto cursor-pointer p-2 bg-green-500 rounded-lg text-white w-fit'>
                                            <div className='flex gap-1 items-center'>
                                                <p>Payed</p>
                                                <AiOutlineCheck className='text-xl'/>
                                            </div>
                                            <p>id: 45634562345</p>
                                        </li>
                                        :
                                        <li onClick={() => handlePay(book)} className='text-center mx-auto cursor-pointer px-4 py-2 bg-green-500 rounded-lg text-white w-fit flex gap-2 items-center'>Pay ${book?.fee} <BsStopwatch/></li>
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
        </div>
  )
}

export default UserDashboard