import React from 'react'
import Appointment from './Appointment'
import Exceptional from './Exceptional'
import Footer from './Footer'
import Hero from './Hero'
import Services from './Services'
import StayConnected from './StayConnected'
import Testimonial from './Testimonial'

function Home() {
  return (
    <>
        <Hero/>
        <Services/>
        <Exceptional/>
        <Appointment/>
        <Testimonial/>
        <StayConnected/>
        <Footer/>
    </>
  )
}

export default Home