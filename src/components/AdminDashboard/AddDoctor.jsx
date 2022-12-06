import React, { useContext, useEffect, useState } from 'react'
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import axios from 'axios';
import { AllContext, MainApi } from '../../App';
import { useFormik } from 'formik';

function AddDoctor() {
    const [users, setusers] = useState();
    const [services, setservices] = useState();
    const contexts = useContext(AllContext);
    const [datalistname, setname] = useState();

    useEffect(() => {
        if (contexts?.users) {
            const onlyuser = contexts?.users?.filter(user => user.role === 'user');
            const name = onlyuser.map(usr => usr)
            const nameObj = name.map(name => {
                return {id:name.name, value:name.name,userId:name._id}
            })
            setusers(nameObj);
        }else{
            console.log(contexts?.users)
        }
        allservices();
    }, [])

  const allservices = () => {
    axios.get(`${MainApi}/allservices`)
    .then(res => {
        setservices(res.data)
    })
    .catch(err => console.log(err));
  }

  const {handleSubmit,handleChange,handleBlur,values,resetForm} = useFormik({
    initialValues: {
      name : '',
      id:'',
      specialist : '',
    },
    onSubmit: values => {
        values.name = datalistname.value;
        values.id = datalistname.userId;

        axios.post(`${MainApi}/updatespeciality`,values)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
    },
  });


  return (
    <>
        <div className='w-11/12 md:w-10/12 lg:w-5/12 p-7 md:p-10 h-fit bg-white mt-24  md:mt-10 rounded-xl overflow-auto md:overflow-hidden shadow-sm'>
            <h3 className='text-2xl font-bold'>Add a New Doctor</h3>

            <form action="#" className='flex flex-col gap-3 mt-5' onSubmit={handleSubmit}>
                {
                    users &&
                        <DatalistInput
                            className='w-full p-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none'
                            placeholder="Search Name"
                            label="Name"
                            onSelect={(item) => setname(item)}
                            items={[...users]}
                        />
                }
            <div className='flex flex-col'>
                <label htmlFor="email">Speciality</label>
                <select onChange={handleChange} onBlur={handleBlur} className='w-full p-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' name="" id="specialist">
                {
                    services?.map(serv => <option key={serv._id} value={serv.serv}>{serv.serv}</option>)
                }
                </select>
            </div>
            <input type="submit" value='Add' className='w-full px-4 py-3 rounded-md text-white bg-neutral-800 hover:bg-neutral-900 duration-200 cursor-pointer' />
            </form>
        </div>
    </>
  )
}

export default AddDoctor