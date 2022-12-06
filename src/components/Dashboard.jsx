import React, { useContext, useState } from 'react'
import { AllContext } from '../App';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import DoctorDashboard from './DoctorDashboard/DoctorDashboard';
import UserDashboard from './UserDashboard';

function Dashboard() {
    const contexts = useContext(AllContext);

    const status = contexts.currentUser.role;
    if(status === 'admin' || status === 'Main Admin'){
        return <AdminDashboard/>;
    }else if(status === 'doctor'){
        return <DoctorDashboard/>;
    }else{
       return <UserDashboard/>;
    }
}

export default Dashboard