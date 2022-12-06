import React, { useContext, useState } from 'react'
import bg from '../images/bg.png';
import chair from '../images/chair.png';
import AvailableServices from './AvailableServices';
import Footer from './Footer';
import './style.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { AllContext } from '../App';
import mainLoadingImg from '../images/running.gif';


function AppointmentPage() {
    const [calender, setCalender] = useState(new Date());
    const [selected, setSelected] = useState();
    const contexts = useContext(AllContext);

  return (
    
    <>
        <div className='relative flex flex-col items-center overflow-hidden'>
        {/* top content */}
        <img className='max-h-[700px] hidden md:block' src={bg} alt=""/>
        <div className='md:absolute lg:max-w-[1240px] w-10/12 h-full top-[-80px] flex flex-col md:flex-row gap-2 justify-between items-center'>
          <div className='basis-1/2 flex flex-col gap-3 justify-end order-2 md:order-1 mt-5'>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
              />
          </div>
          <div className='basis-1/2 order-1 md:order-2'>
            <img src={chair} alt="" />
          </div>
        </div>
      </div>
        {/* Available services */}
        <div className='w-10/12 py-10 flex justify-center mx-auto'>
          <AvailableServices/>
        </div>

        <Footer/>
    </>
  )
}

export default AppointmentPage