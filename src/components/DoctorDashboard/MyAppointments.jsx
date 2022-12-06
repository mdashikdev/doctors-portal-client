import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import { AllContext, MainApi } from '../../App';
import { ClapSpinner } from "react-spinners-kit";
import { AiOutlineDelete } from 'react-icons/ai';

function MyAppointments() {
    const [togglecalender, settogglecalender] = useState(false);
    const [calender, setCalender] = useState(new Date());
    const [selected, setSelected] = useState();
    const [loading, setloading] = useState(false);
    const [appointments, setappointments] = useState();
    const contexts = useContext(AllContext);
    

    useEffect(() => {
        setloading(true);
        currentAppointments();
    }, [])

    const currentAppointments = () => {
        axios.post(`${MainApi}/currenusertAppointments`,{user:contexts.currentUser._id})
        .then(res => {
          setloading(false);
          setappointments(res.data);
        })
        .catch(err => console.log(err))
    }
    const handleDeleteAppointment = (id) => {
        axios.post(`${MainApi}/deleteAppointmentById`,{id:id})
        .then(res => {
            if (res.data === true) {
                currentAppointments();
                contexts.setalert({status:'ok',message:'Appointment Deleted!'});
            }else{
                console.log(res)
            }
        })
        .catch(err => console.log(err))
    } 
    
  return (
    loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :

    <div className='w-full flex flex-col items-center'>
        <div className='relative w-11/12 md:10/12 flex justify-between mt-10 mb-5'>
            <h3 className='text-2xl font-semibold'>My Appointment</h3>
            <button onClick={() => settogglecalender(!togglecalender)} className='px-4 py-2 rounded-xl bg-slate-500 hover:bg-slate-600 text-white duration-200'>{dayjs(calender).format('MMM DD,YYYY')}</button>
            {
                togglecalender && <DayPicker mode="single" className='absolute right-0 top-10 bg-white rounded-xl p-5 shadow-lg' selected={selected} onSelect={setSelected}
            />
            }
        </div>
        <div className='w-11/12 md:w-10/12 min-w-[500px] overflow-auto h-fit bg-white rounded-xl shadow-sm'>
            <ul className='flex justify-between py-2 text-lg font-bold bg-neutral-200'>
                <li className='text-center w-full'>SERVICE</li>
                <li className='text-center w-full'>DATE</li>
                <li className='text-center w-full'>TIME</li>
                <li className='text-center w-full'>ACTION</li>
            </ul>
            {
                appointments?.map( appt => {
                    return (
                        <ul className='flex justify-between py-2 my-3 text-lg font-semibold bg-white'>
                            <li className='text-center w-full'>{appt?.Speciality}</li>
                            <li className='text-center w-full'>{dayjs(`${appt?.datefrom}`).format('MMM D, YYYY')}</li>
                            <li className='text-center w-full'>{dayjs(`${appt?.datefrom}`).format('hh:mm A')} - {dayjs(`${appt?.dateto}`).format('hh:mm A')}</li>
                            <li className='text-center w-full flex justify-center gap-2'><AiOutlineDelete onClick={() => window.confirm('Are you sure to delete your appointment?') && handleDeleteAppointment(`${appt?._id}`)} className='text-4xl cursor-pointer text-white bg-orange-500 hover:bg-orange-600 duration-200 px-2 py-1 rounded-lg '/></li>
                        </ul>
                    )
                })
            }

        </div>
    </div>
  )
}

export default MyAppointments