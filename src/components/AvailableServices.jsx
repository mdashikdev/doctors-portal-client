import React, { useContext,createContext, useState, useEffect } from 'react';
import Service from './Service';
import fakedata from '../fakedata.json';
import SelectedServiceBook from './SelectedServiceBook';
import { GiTireIronCross } from 'react-icons/gi';
import dayjs from 'dayjs';
import { AllContext, MainApi } from '../App';
import axios from 'axios';
import { useFormik } from 'formik';
import { ClapSpinner } from "react-spinners-kit";

export const SelectedContext = createContext();

function AvailableServices() {
    const [services, setservices] = useState();
    const [selectedService, setselectedService] = useState();
    const [selectedServiceAppointments, setselectedServiceAppointments] = useState();
    const [book, setbook] = useState({});
    const [popup, setpopup] = useState(false);
    const [loading, setloading] = useState(false);
    const [allusers, setalluser] = useState()
    const contexts = useContext(AllContext);


    useEffect(() => {
        axios.get(`${MainApi}/getallusers`)
        .then(res => {
            if (res?.data?.length > 0) {
                setalluser(res.data);

            }else{
                console.log(res);
            }
        })
        .catch(err => console.log(err))

        axios.get(`${MainApi}/services`)
        .then(res => {
            setservices(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    

    const handleSelectedService = (name) => {
        setselectedService(services?.find(service => service?.serv.toLowerCase() === name.toLowerCase()));

        axios.get(`${MainApi}/appointments/`+ name)
        .then(res => {
            if (res?.data?.length > 0) {
                const appointmentData = res?.data?.map(dt => {
                    const user = allusers?.filter((usr,idx) => usr._id === dt.user);
                    user[0].appointment = dt;
                    return user
                })
                setselectedServiceAppointments(appointmentData);
            }else{
                setselectedServiceAppointments();
                contexts.setalert({status:'error',message:'No appointment Available!'});
            }
        })
        .catch(err => console.log(err))
    }
    
    const {handleSubmit,handleChange,handleBlur,values,resetForm} = useFormik({
        initialValues: {
          datefrom : '',
          dateto : '',
          phone : '',
          name : '',
          payment : ''
        },
        onSubmit: values => {
            setloading(true);
            values.datefrom = book[0]?.appointment?.datefrom;
            values.dateto = book[0]?.appointment?.dateto;
            values.doctor = book[0]?._id;
            values.user = contexts.currentUser?._id;
            values.name = contexts.currentUser?.name;
            values.speciality = book[0]?.services;
            values.fee = book[0]?.appointment?.fee;


            axios.post(`${MainApi}/addAppointment`,values)
            .then(res => {
                setloading(false);
                if (res.data === true) {
                    resetForm();
                    contexts.setalert({status:'ok',message:'Appointment booked. Please pay for this appointment from your dashboard'});
                }else{
                    contexts.setalert({status:'error',message:res.data});
                }
            })
            .catch(err => console.log(err))
        },
      });

  return (
        <div className='w-full md:w-10/12'>
            <div className='mt-16 w-full'>
                <h4 className='text-center text-[#19D3AE] text-lg font-normal mt-16'>Available Services on April 30,2022</h4>
                <p className='text-center text-4xl text-black/80 font-normal mb-10'>Please select a service</p>
            </div>
            {
                loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 w-full'>
                    {
                        contexts?.services?.map((service,idx) => <Service info={service} handleSelectedService={handleSelectedService} key={idx} /> )
                    }
                </div>
            }
                {
                    selectedServiceAppointments && 
                    <SelectedContext.Provider value={[setpopup,setbook]}>{
                        selectedServiceAppointments ? (
                            <>
                                <h4 className='text-center text-[#19D3AE] text-lg font-normal mt-20'>Available appointments for {selectedService?.category}</h4>
                                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 w-full mt-3'>
                                    {
                                        selectedServiceAppointments?.map((ser,idx) => <SelectedServiceBook key={idx} info={ser} /> )
                                    }
                                </div>
                            </>
                        )
                        : <h1 className='text-xl text-center mt-5'>No Service Found</h1>
                    }
                    </SelectedContext.Provider>
 
                }
                {
                    popup &&
                    <div className='fixed w-full h-full top-0 left-0 backdrop-blur-md z-10'></div>
                }
                {
                    popup && 
                    <div className='fixed top-0 left-0 w-full h-full z-20 flex justify-center md:items-center items-end'>
                        <div className='lg:w-1/3 md:w-1/2 w-full h-fit p-2 rounded-t-2xl md:rounded-2xl border border-neutral-500 bg-white shadow-lg'>
                            <div className='flex justify-between'>
                                <h3 className='text-2xl font-semibold'>{book.services}</h3>
                                <GiTireIronCross onClick={() => setpopup(false)} className='p-2 bg-neutral-700 hover:bg-neutral-800 duration-200 rounded-full text-4xl text-white cursor-pointer'/>
                            </div>
                            {
                                loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
                                    <form action="#" className='flex flex-col gap-3 mt-5' onSubmit={handleSubmit}>
                                        <input type="text" className='w-full p-3 rounded-xl bg-neutral-200/80 text-md font-semibold focus:outline-none' value={`${dayjs(`${book[0]?.appointment?.datefrom}`).format('MMM DD, YYYY')}`} />
                                        <input type="text" className='w-full p-3 rounded-xl bg-neutral-200/80 text-md font-semibold focus:outline-none' value={`${dayjs(`${book[0]?.appointment?.datefrom}`).format('hh:mm A')} - ${dayjs(`${book[0]?.appointment?.dateto}`).format('hh:mm A')}`} />
                                        <input type="text" placeholder='Full Name' value={contexts.currentUser?.name} className='w-full p-3 rounded-xl bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                                        <input type="text" required placeholder='Phone Number' id='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} className='w-full p-3 rounded-xl bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                                        <input type="email" placeholder='Email' value={contexts.currentUser?.email} className='w-full p-3 rounded-xl bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                                        <input type="submit" value='SUBMIT FOR BOOK LIST' className='w-full px-4 py-3 rounded-xl text-white bg-neutral-800 hover:bg-neutral-900 duration-200 cursor-pointer' />
                                    </form>
                            }
                        </div>
                    </div>
                }
        </div>
  )
}

export default AvailableServices