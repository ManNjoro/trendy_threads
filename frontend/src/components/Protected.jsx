import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../context/Context';

export default function Protected({element}) {
    const { token } = useContext(ShopContext);

    if (!token) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/login" />;
    }
  
    return element;
}
