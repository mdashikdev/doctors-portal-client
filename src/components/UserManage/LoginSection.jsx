import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AllContext, MainApi } from '../../App';
import { ClapSpinner } from "react-spinners-kit";

const LoginSection = ({logintoggle,setlogintoggle}) => {
    const [loading, setloading] = useState(false);
    const contexts = useContext(AllContext);
    const location = useLocation();
    const navigate = useNavigate();

    const {handleSubmit,handleChange,handleBlur,values,resetForm} = useFormik({
        initialValues: {
          email : '',
          password : '',
        },
        onSubmit: values => {
            setloading(true);
            axios.post(`${MainApi}/loginuser`,values)
            .then(res => {
                if (res.data[0].email) {
                    contexts.setcurrentUser(res.data[0]);
                    setloading(false);
                    resetForm();
                    location.state ? navigate(`${location.state.from}`,{replace: true}) : navigate('/',{replace: true});
                    contexts.setalert({status:'ok',message:'Logged in successfully...'});
                }else{
                    console.log(res.data);
                    contexts.setalert({status:'error',message:'Failed to login: ' + res.data});
                }
            })
            .catch(err => console.log('api error:',err));
        },
      });
    return (
        loading ? <ClapSpinner className='mt-10' color='#ea580b' size={35} loading={loading}/> :
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} onBlur={handleBlur} value={values.email} id='email' className='px-4 py-3 focus:outline-none rounded-xl border border-neutral-400' type="email" name="" />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} onBlur={handleBlur} value={values.password} id='password' className='px-4 py-3 focus:outline-none rounded-xl border border-neutral-400' type="password" name="" />
            </div>
            <a href="#">Forgot Password?</a>
            <input className='mt-3 w-full px-4 py-3 bg-neutral-600 hover:bg-neutral-700 cursor-pointer duration-200 text-white text-lg rounded-xl' type="submit" value="LOGIN" id="" />
            <div className='flex justify-center mt-2'>
                <p>{logintoggle ? 'New to Doctors Portal?' : 'Already an user?' }</p>
                <a href="#" className='text-[#19D3AE] font-semibold' onClick={() => setlogintoggle(!logintoggle)}> {logintoggle ? 'Create new account' : 'Login' }</a>
            </div>
        </form>
    )
}

export default LoginSection