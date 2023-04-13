import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("auth_user") !== '';
    });

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("auth_user") !== '');
    }, [setIsAuthenticated]);

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/login" />;
}
export default PrivateRoute;