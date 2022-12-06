import React from 'react';
import treatment from '../images/treatment.png';

function Exceptional() {
  return (
    <div className='lg:max-w-[1240px] lg:w-6/12 w-10/12 mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-10 py-10'>
        <img src={treatment} className='w-72 rounded-lg shadow-2xl' alt="" />
        <div className='flex flex-col gap-3'>
          <h3 className='text-3xl text-slate-800 font-bold'>Exceptional Dental Care, on Your Terms</h3>
          <p className='text-black/80'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, harum. Atque obcaecati id minus voluptatum, recusandae nesciunt cumque, laborum vel iusto architecto numquam ratione esse vitae, aliquam est culpa laudantium. Fugit tempora molestias consectetur.</p>
          <button className='w-fit px-3 py-2 bg-gradient-to-r from-[#0FCFEC] to-[#19D3AE] hover:to-[#0FCFEC] hover:from-[#19D3AE] transition-all rounded-lg text-white mt-2 ' type="button">GET STARTED</button>
        </div>
      </div>
    </div>
  )
}

export default Exceptional