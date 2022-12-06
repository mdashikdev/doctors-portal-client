import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

import { AllContext } from '../App';
import { logoutCurrentUser } from './UserManage/firebaseManager';


function Header() {
    const [menu, setmenu] = useState(false);
    const [stickys, setstickys] = useState(false);
    const [profileMenu, setprofileMenu] = useState(false)
    const contexts = useContext(AllContext);
    
    const navigate = useNavigate();

    const sticky ='w-full bg-white md:fixed md:px-5 mx-auto z-30 shadow-md py-2';
    const nonSticky = 'w-full lg:max-w-[1240px] bg-transparent md:px-5 m-auto z-30 py-2';
    
    useEffect(() => {
        window.addEventListener('scroll',()=> {
            if(window.scrollY > 50){
                setstickys(true);
            }else{
                setstickys(false)
            }
        })
    }, [])

    const handleLogout = () => {
        setprofileMenu(false);
        logoutCurrentUser()
        .then(res => {
            if (res === 'signed out') {
                contexts.setcurrentUser();
                contexts.setalert({status:'ok',message:'Logged Out...'});
            }else{
                console.log(res);
            }
        })
        .catch(err => console.log((err)))
    }

    return (
    <div className={stickys ? sticky : nonSticky}>
        <div className='relative flex justify-between py-4'>
            <h3 className='text-2xl font-bold ml-2 cursor-pointer' onClick={() => navigate('../')}>Doctors Portal</h3>
            <AiOutlineMenu onClick={() => setmenu(!menu)} className='md:hidden text-2xl mr-2 text-slate-600 hover:text-slate-900 cursor-pointer'/>
            <div onClick={() => setmenu(!menu)} className={menu ? 'md:hidden block fixed top-0 left-0 w-full h-full backdrop-blur-md z-10' : 'hidden' }></div>
            <ul className='hidden md:flex md:gap-3'>
                <NavLink className='navbtn' to='/home'>Home</NavLink>
                <NavLink className='navbtn' to='/about'>About</NavLink>
                <NavLink className='navbtn' to='/appointment'>Appointment</NavLink>
                <NavLink className='navbtn' to='/reviews'>Reviews</NavLink>
                <NavLink className='navbtn' to='/dashboard'>dashboard</NavLink>
                {
                    contexts.currentUser?.email ?
                        <img onClick={() => setprofileMenu(!profileMenu)} src={`${contexts.currentUser?.avatar}`} title={`${contexts.currentUser?.name}`} className='w-10 h-10 cursor-pointer rounded-full object-cover ring ring-blue-500' alt="" />
                    :
                    <NavLink className='navbtn' to='/login'>Login</NavLink>
                }
            </ul>
            {
                    profileMenu && contexts.currentUser?.email && 
                    <div className='absolute flex flex-col gap-3 right-2 top-[70px] border border-neutral-200 bg-white z-10  rounded-lg shadow-lg'>
                        <NavLink onClick={() => setprofileMenu(false)} className='navbtn ml-0 flex items-center gap-2' to='/profile'><CgProfile className='text-lg'/> Profile</NavLink>
                        <button type="button" onClick={handleLogout} className='navbtn ml-0 flex items-center gap-2'><IoIosLogOut className='text-lg'/> Logout</button>
                    </div>
            }
            <ul className={menu ? 'fixed w-8/12 h-screen bottom-0 top-0 left-0 z-10 bg-white flex flex-col gap-2 pl-2 pr-8 duration-200 md:hidden' : 'fixed bottom-0 top-0 left-[-500px] duration-200 z-10 bg-white flex flex-col gap-2 pl-2 pr-8'}>
                <FaTimes onClick={() => setmenu(!menu)} className='absolute right-0 top-4 text-2xl p-1 rounded hover:text-red-500 hover:bg-slate-400 m-1 transition-all cursor-pointer'/>
                <NavLink onClick={() => setmenu(!menu)} className='navbtn' to='/home'>Home</NavLink>
                <NavLink onClick={() => setmenu(!menu)} className='navbtn' to='/about'>About</NavLink>
                <NavLink onClick={() => setmenu(!menu)} className='navbtn' to='/appointment'>Appointment</NavLink>
                <NavLink onClick={() => setmenu(!menu)} className='navbtn' to='/reviews'>Reviews</NavLink>
                <NavLink onClick={() => setmenu(!menu)} className='navbtn' to='/dashboard'>dashboard</NavLink>
                {
                    contexts.currentUser?.email ?
                    <>
                        <NavLink  to='/profile' onClick={() => setmenu(!menu)}  className='navbtn flex justify-between items-center'>
                            <h4 className='text-xl font-bold'>{`${contexts.currentUser?.name}`}</h4>
                            <img src={`${contexts.currentUser?.avatar}`} title={`${contexts.currentUser?.name}`} className='w-10 h-10 rounded-full object-cover ring ring-blue-500' alt="" />
                        </NavLink>
                        <button type="button" onClick={handleLogout} className='navbtn ml-0 flex items-center gap-2'><IoIosLogOut className='text-lg'/> Logout</button>
                    </>
                    :
                    <NavLink className='navbtn' to='/login'>Login</NavLink>
                }
            </ul>
        </div>
    </div>
  )
}

export default Header