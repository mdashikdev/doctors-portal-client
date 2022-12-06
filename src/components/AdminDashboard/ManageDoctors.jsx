import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MainApi } from '../../App';
import { ClapSpinner } from "react-spinners-kit";

function ManageDoctors() {
    const [doctors, setdoctors] = useState();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        axios.get(`${MainApi}/getalldoctors`)
        .then(res => {
            setdoctors(res.data);
            setloading(false);
        })
        .catch(err => console.log(err));
    }, [])

  return (
    <>
        <div className='relative w-11/12 md:10/12 flex justify-between mt-24 md:mt-10 mb-5'>
            <h3 className='text-2xl font-bold'>Manage Doctors : {doctors?.length}</h3>
        </div>

        <div className='w-11/12 md:10/12 h-fit bg-white rounded-xl overflow-auto md:overflow-hidden shadow-sm'>
            <ul className='min-w-[550px] grid grid-cols-4 justify-between items-center py-2 text-lg font-bold bg-neutral-200'>
                <li className='text-center w-full'>AVATAR</li>
                <li className='text-center w-full'>NAME</li>
                <li className='text-center w-full'>SPECIALITY</li>
                <li className='text-center w-full'>ACTION</li>
            </ul>
            { loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
                doctors?.map(doctor => {
                    return (
                        <ul key={doctor._id} className='min-w-[550px] grid grid-cols-4 justify-between items-center py-4 mb-1 text-md font-semibold text-black/80 bg-white border border-t-0 border-l-0 border-r-0 border-b-neutral-200/50'>
                            <li className='mx-auto text-black/70 w-fit'>
                            <img className='w-12 h-12 rounded-full' src={doctor?.avatar} alt="" />
                            </li>
                            <li className='text-center text-black/70 w-full'>{doctor?.name}</li>
                            {
                                doctor?.speciality ?
                                    <select name="" id="">
                                        {
                                            doctor?.map(spec => <option key={spec._id} value={`${spec.speciality}`}>{spec.speciality}</option>)
                                        }
                                    </select>
                                :
                                <li className='text-center text-black/70 w-full'>No Speciality</li>

                            }
                            <li className='text-center mx-auto cursor-pointer px-4 py-2 bg-[#E11244] rounded-lg text-white w-fit'>Delete</li>
                        </ul>
                    )
                })
            }
        </div>
    </>
  )
}

export default ManageDoctors