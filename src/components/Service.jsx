import React from 'react'

function Service({info,handleSelectedService}) {
  return (
    <div onClick={()=> handleSelectedService(`${info.serv}`)} className='rounded-xl w-full px-5 py-8 shadow-md cursor-pointer hover:shadow-sm duration-200'>
        <h3 className='text-xl text-[#19D3AE] font-semibold text-center'>{info?.serv}</h3>
    </div>
  )
}

export default Service