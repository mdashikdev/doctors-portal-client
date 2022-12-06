import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AllContext, MainApi } from '../../App';
import { AiOutlineDelete } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { ClapSpinner } from "react-spinners-kit";

function AllUsers() {
    const [loading, setloading] = useState(false);
    const contexts = useContext(AllContext);

    useEffect(() => {
        setloading(true)
        getAlluser();
    }, [])

    const getAlluser = () => {
        axios.get(`${MainApi}/getallusers`)
        .then(res => {
            contexts.setusers(res.data);
            setloading(false);
        })
        .catch(err => console.log(err));
    }
    const selectOption = (role) => {
        if (role === 'Main Admin') {
            return <option value="creator">Creator</option>
        }else if(role === 'admin'){
            return <>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
            </>
        }else if(role === 'doctor'){
            return <>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </>
        }else{
            return <>
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
            </>
        }
    }

    const handleChangeRole = (role,id) => {
        const info = {
            role,id
        }

        axios.post(`${MainApi}/changerole`,info)
        .then(res => {
            getAlluser();
            contexts.setalert({status:'ok',message:'Role Updated successfully'});
        })
        .catch(err => contexts.setalert({status:'error',message:err}));
    }

  return (
    loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
        <>
            <div className='relative w-11/12 md:10/12 flex justify-between mt-24 md:mt-10 mb-5'>
                <h3 className='text-2xl font-bold'>All Users : {contexts.users?.length}</h3>
            </div>

            <div className='w-11/12 md:10/12 h-fit bg-white rounded-xl overflow-auto md:overflow-hidden shadow-sm'>
                <ul className='min-w-[700px] grid grid-cols-6 justify-between items-center py-2 text-md font-bold bg-neutral-200'>
                    <li className='text-center w-full'>AVATAR</li>
                    <li className='text-center w-full'>NAME</li>
                    <li className='text-center w-full'>ROLE</li>
                    <li className='text-center w-full'>JOB</li>
                    <li className='text-center w-full'>WANT TO</li>
                    <li className='text-center w-full'>ACTION</li>
                </ul>
                {
                    contexts.users?.map(user => {
                        return (
                            <ul key={user._id} className='min-w-[550px] grid grid-cols-6 justify-between items-center py-4 mb-1 text-md font-semibold text-black/80 bg-white border border-t-0 border-l-0 border-r-0 border-b-neutral-200/50'>
                                <li className='mx-auto text-black/70 w-fit'>
                                    <img className='w-12 h-12 rounded-full' src={user.avatar} alt="" />
                                </li>
                                <li className='text-center text-black/70 w-full'>{user.name}</li>
                                <li className='text-center text-black/70 w-full'>{user.role}</li>
                                <select className='focus:outline-none hover:bg-neutral-200 rounded px-2 py-1 cursor-pointer' onChange={(e) => handleChangeRole(`${e.target.value}`,`${user._id}`)}>
                                    {selectOption(user.role)}
                                </select>
                                {
                                    user?.role.split(' ')[0] === 'pending' ? 
                                        <ul className='text-sm w-full font-light bg-neutral-200 pl-2 overflow-hidden rounded-md flex gap-1 items-center justify-between'>
                                            <li className='font-semibold'>{user?.role.split(' ')[1]}</li>
                                            <li className='flex gap-1 p-2 text-white h-full items-center bg-green-500 hover:bg-green-600 cursor-pointer' onClick={() => handleChangeRole(`${user?.role.split(' ')[1]}`,`${user._id}`)}>Approve <GiConfirmed className='text-lg'/></li>
                                        </ul>
                                        : <p>Not Request</p>
                                }
                                <li className='text-center mx-auto cursor-pointer px-2 py-1.5 hover:bg-orange-600 bg-orange-500 rounded-lg w-fit flex gap-1 items-center text-white'><AiOutlineDelete className='text-2xl text-white'/> Delete</li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
  )
}

export default AllUsers