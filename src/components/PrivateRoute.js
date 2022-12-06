import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AllContext } from '../App';

function PrivateRoute({children}) {
    const contexts = useContext(AllContext);
    const history = useLocation();

  return (
    contexts.currentUser?.email ? children : <Navigate to='/login' replace={true} state={{from:history.pathname}} />
  )
}

export default PrivateRoute