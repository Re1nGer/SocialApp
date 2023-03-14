import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const location = useLocation();

      const isAuthenticatedStorage = sessionStorage.getItem("isAuthenticated");

    if (!isAuthenticatedStorage) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />;
}

export default PrivateRoute;