import React, { useState } from 'react'
import About from './About';
import Info from './Info';
import UpdateProfile from './UpdateProfile';

function Profile() {
    const [liToggle, setliToggle] = useState('Info');

    const lis = 'text-sm text-center md:text-md font-semibold cursor-pointer px-2 md:px-3 py-3 pl-4 hover:bg-slate-200/50 duration-200';
    const liActive = 'text-sm text-center md:text-lg font-bold bg-slate-200/50 cursor-pointer px-2 pl-4 md:px-3 py-3 duration-200';

  return (
    <div className=' h-screen w-full'>
        <div className='flex flex-col md:flex-row'>
            <div className='bg-white md:h-screen lg:basis-2/12'>
                <ul className='w-full flex justify-center md:flex-col gap-2 md:gap-5 mt-5'>
                    <li onClick={() => setliToggle('Info')} className={liToggle === 'Info' ? liActive : lis}>Info</li>
                    <li onClick={() => setliToggle('About')} className={liToggle === 'About' ? liActive : lis}>About</li>
                    <li onClick={() => setliToggle('Update profile')} className={liToggle === 'Update profile' ? liActive : lis}>Update profile</li>
                </ul>
            </div>
            <main className='lg:basis-10/12 h-screen bg-slate-100 flex flex-col items-center pt-5'>
                {
                    liToggle === 'Info' && <Info/>
                }
                {
                    liToggle === 'About' && <About/>
                }
                {
                    liToggle === 'Update profile' && <UpdateProfile/>
                }
            </main>
        </div>
    </div>
  )
}

export default Profile