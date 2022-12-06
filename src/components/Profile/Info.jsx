import React, { useContext } from 'react'
import { AllContext } from '../../App';

function Info() {
    const contexts = useContext(AllContext);

  return (
    <div className='w-11/12 md:w-12/12 h-screen bg-white rounded-md mx-auto flex flex-col items-center py-4 px-5'>
        <div className='w-fit flex flex-col items-center'>
            <img src={contexts.currentUser.avatar} className='lg:w-52 md:w-36 w-24 lg:h-52 md:h-w-36 h-24 rounded-full object-cover ring-4 ring-blue-600' alt="" />
            <h4 className='text-3xl font-bold mt-3 flex items-center gap-2'>{contexts.currentUser.name} 
                {
                    contexts.currentUser?.role !== 'user' && <h2 className='text-xl font-semibold'>({contexts.currentUser?.role})</h2>
                }
            </h4>
        </div>
    </div>
  )
}

export default Info