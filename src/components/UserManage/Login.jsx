import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GoogleLogin } from './firebaseManager';
import { AllContext, MainApi } from '../../App';
import LoginSection from './LoginSection';
import SignUpSection from './SignUpSection';

function Login() {
    const [logintoggle, setlogintoggle] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    
    const contexts = useContext(AllContext);


    const handleGoogleLogin = () => {
        GoogleLogin()
        .then(user => {
            if (user.email) {
                axios.post(`${MainApi}/googleloginstoreuser`,user)
                .then(goggleres => {
                    if (goggleres.data) {
                        contexts.setcurrentUser(...goggleres.data);
                        location.state ? navigate(`${location.state.from}`,{replace: true}) : navigate('/',{replace: true});
                        contexts.setalert({status:'ok',message:'Logged in successfully...'});
                    }else{
                        contexts.setalert({status:'error',message:'Failed to login.Error: ' + goggleres});
                        console.log('error: ',goggleres)
                    }
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div action="#" className='w-11/12 md:w-7/12 lg:w-5/12 rounded-xl shadow-lg p-5 border border-neutral-300' onSubmit={(e)=> e.preventDefault()}>
            <h3 className='text-xl text-center font-semibold'>{logintoggle ? 'Login' : 'Sign Up' }</h3>
            {
                logintoggle ? <LoginSection logintoggle={logintoggle} setlogintoggle={setlogintoggle} /> : <SignUpSection logintoggle={logintoggle} setlogintoggle={setlogintoggle} />
            }
            <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">OR</span>
                <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <button onClick={handleGoogleLogin} className='w-full rounded-xl px-4 py-3 border border-neutral-400 text-xl bg-transparent hover:bg-neutral-200 duration-200'>CONTINUE WITH GOOGLE</button>
        </div>
    </div>
  )
}


export default Login