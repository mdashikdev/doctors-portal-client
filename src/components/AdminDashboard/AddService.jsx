import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { AllContext, MainApi } from '../../App';
import { ClapSpinner } from "react-spinners-kit";
import { HiOutlineTrash } from 'react-icons/hi';


function AddService() {
    const [services, setservices] = useState();
    const [loading, setloading] = useState(false);
    const contexts = useContext(AllContext);

    const {handleSubmit,handleChange,handleBlur,values,resetForm} = useFormik({
        initialValues: {
          service: '',
        },
        onSubmit: values => {
            setloading(true)
            axios.post(`${MainApi}/addnewservices`,values)
            .then(res => {
                if(res.data === true){
                    contexts.setalert({status:'ok',message:'Service added successfully'});
                    setloading(false);
                    allservices();
                    resetForm();
                }else{
                    contexts.setalert({status:'error',message:res.data});
                }
            })
            .catch(err => console.log(err))
        },
      });
      useEffect(() => {
        setloading(true)
        allservices();
      }, [])
      const allservices = () => {
        axios.get(`${MainApi}/allservices`)
        .then(res => {
            setloading(false)
            setservices(res.data)
        })
        .catch(err => console.log(err));
      }
  return (
        <div className='w-11/12 md:w-10/12 bg-white p-7 md:p-10 h-fit mt-24  md:mt-10 rounded-xl overflow-auto md:overflow-hidden shadow-sm flex flex-col md:flex-row md:justify-between'>
            <div className='basis-1/2'>
                <h3 className='text-2xl font-bold'>Add a New Service</h3>
                {
                    loading ? <ClapSpinner/> :
                    <form action="#" className='flex flex-col gap-3 mt-5' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input required onChange={handleChange} onBlur={handleBlur} value={values.service} id='service' type="text" placeholder='Enter Service Name' className='w-full p-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' />
                        </div>
                        <input type="submit" value='Add' className='w-full px-4 py-3 rounded-md text-white bg-neutral-800 hover:bg-neutral-900 duration-200 cursor-pointer' />
                    </form>
                }
            </div>
            <div className='basis-1/2 mx-4 text-center'>
                <h3 className='text-center text-lg mt-3'>All services</h3>
                <ul className='max-h-[400px] overflow-auto'>
                    { loading ? <ClapSpinner/> :
                        services?.map(service => <li className='w-full flex justify-between items-center text-center bg-neutral-100 px-4 py-2 rounded-md mt-2' key={service._id} >{service.serv}
                            <button className='px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-2xl rounded-lg duration-200' title='Delete?'><HiOutlineTrash/></button>
                        </li>)
                    }
                </ul>
            </div>
        </div>
  )
}

export default AddService