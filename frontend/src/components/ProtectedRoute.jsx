import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useContext(AuthContext);

    // Show a loading state while we verify the token on first load
    if (loading) return <div>Loading...</div>;
    
    // If no token exists, boot them back to the login page
    if (!token) return <Navigate to="/login" replace />;

    // Otherwise, render the protected component
    return children;
};

export default ProtectedRoute;