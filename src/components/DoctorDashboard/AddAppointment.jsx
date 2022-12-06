import axios from 'axios';
import React, { useContext, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { AllContext, MainApi } from '../../App';
import './style.css';

function AddAppointment() {
    const [datefrom, setdatefrom] = useState(new Date());
    const [dateto, setdateto] = useState(new Date());
    const [fee, setfee] = useState()
    const contexts = useContext(AllContext);

    const handleAddAppointment = () => {
        if (contexts.currentUser?.services) {
            axios.post(`${MainApi}/addnewappointment`, {user:contexts.currentUser._id,datefrom,dateto,Speciality:contexts.currentUser.services,fee:fee})
            .then(res => {
                setfee('')
                contexts.setalert({status:'ok',message:'New appointment added successfully'});
            })
            .catch(err => console.error(err));
        }else{
            contexts.setalert({status:'error',message:'Please update your speciality'});
        }
    }

  return (
    <div className='w-full flex flex-col items-center mt-5'>
        <div className='w-11/12 md:10/12 h-fit bg-white min-h-screen rounded-xl overflow-hidden flex justify-center py-5 shadow-sm'>
            <form action="" className='w-11/12 md:7/12 lg:w-4/12 flex flex-col gap-3 '>
                <h3 className='text-2xl font-semibold'>Add Appointment</h3>
                <div>
                    <h2>From</h2>
                    <DateTimePicker onChange={setdatefrom} value={datefrom} className='w-full p-3 mt-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                </div>
                <div>
                    <h2>To</h2>
                    <DateTimePicker onChange={setdateto} value={dateto} className='w-full p-3 mt-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                </div>
                <div>
                    <h2>Fee ($)</h2>
                    <input type="number" value={fee} onChange={(e) => setfee(`${e.target.value}`)} placeholder='Enter appointment fees' required className='px-4 py-2 rounded-xl bg-white border border-neutral-200 focus:outline-none w-full' />
                </div>
                <input type="button" onClick={handleAddAppointment} value='Add Appointment' className='w-full px-4 py-3 rounded-md text-white bg-neutral-800 hover:bg-neutral-900 duration-200 cursor-pointer' />
            </form>
        </div>
    </div>
  )
}

export default AddAppointment