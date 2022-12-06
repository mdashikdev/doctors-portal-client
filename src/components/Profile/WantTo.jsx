import React, { useContext, useEffect, useState } from 'react';
import { AllContext, MainApi } from '../../App';
import {RadioGroup,Radio} from 'react-radio-group';
import axios from 'axios';
import { MdOutlineWatchLater } from 'react-icons/md';

function WantTo() {
    const contexts = useContext(AllContext);
    const [getrole, setrole] = useState();
    const [services, setservices] = useState();
    const [specialist, setspecialist] = useState(contexts?.currentUser?.services);

    useEffect(() => {
        allservices();
    }, [])
    
    const allservices = () => {
        axios.get(`${MainApi}/allservices`)
        .then(res => {
            setservices(res.data)
        })
        .catch(err => console.log(err));
      }

    const showRadio = (role) => {
        if (role === 'admin') {
          return <RadioGroup name="role" onChange={setrole}>
                    <Radio value="pending user" />Back to user <br/>
                    <Radio value="pending doctor" />Doctor <br/>
                </RadioGroup>
        }
        else if(role === 'Main Admin'){
          return <h3 className='text-2xl font-semibold'>Not Available</h3>
        }
        else if(role === 'doctor'){
          return <RadioGroup name="role" onChange={setrole}>
                    <Radio value="pending user" />Back to user <br/>
                    <Radio value="pending admin" />Admin <br/>
                </RadioGroup>
        }
        else{
          return <RadioGroup name="role" onChange={setrole}>
                    <Radio value="pending doctor" />Doctor <br/>
                    <Radio value="pending admin" />Admin <br/>
                </RadioGroup>
        }
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        if(getrole){
            axios.post(`${MainApi}/roleupdaterequest`,{getrole,usrId:contexts.currentUser._id})
            .then(res => {
                contexts.setalert({status:'ok',message:'Requested successfully.'});
            })
            .catch(err => contexts.setalert({status:'error',message:err}));
        }
      }

      const handleChangeSpeciality = () => {
        axios.post(`${MainApi}/updatespeciality`,{specialist:specialist,name:contexts.currentUser.name,id:contexts.currentUser._id})
        .then(res => {
            if(res.data === true){
                contexts.setalert({status:'ok',message:'Updated successfully.'});
            }
        })
        .catch(err => contexts.setalert({status:'error',message:err}));
      }


  return (
    <div className='basis-1/2 flex flex-col items-center'>
        {
            contexts?.currentUser?.role.split(' ')[0] === 'pending' ? <button disabled className='px-4 py-2 bg-slate-100 rounded-md flex gap-1 items-center'><MdOutlineWatchLater/><p>Pending {contexts.currentUser.role.split(' ')[1]}</p></button> : 
            <>
                <h3 className='text-xl font-semibold'>Want to?</h3>
                <div className='flex flex-col gap-2'>

                <form action="" onSubmit={handleSubmit}>
                  {
                    showRadio(`${contexts.currentUser.role}`)
                    }
                <input className='mt-3 w-full px-3 py-2 bg-neutral-600 hover:bg-neutral-700 cursor-pointer duration-200 text-white text-md rounded-xl' type="submit" value="Request.." id="" />
                </form>
                </div>
            </>
        }
        {
            contexts?.currentUser?.role === 'doctor' &&
            <div className='flex flex-col items-center py-10 mt-5 w-full'>
                <label htmlFor="email">Update Speciality</label>
                <select onChange={(e) => setspecialist(e.target.value)} className='w-fit p-3 rounded-md bg-transparent border border-neutral-500 text-md font-semibold focus:outline-none' value={specialist} name="" >
                {
                    services?.map(serv => <option key={serv._id} value={serv.serv}>{serv.serv}</option>)
                }
                </select>
                <button onClick={handleChangeSpeciality} className='mt-3 w-8/12 px-3 py-1 bg-neutral-600 hover:bg-neutral-700 cursor-pointer duration-200 text-white text-md rounded-xl'>Update</button>
            </div>
        }
    </div>
  )
}

export default WantTo