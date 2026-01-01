import React from 'react';
import { useAuth } from '../Context/authcontext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
    const { isLogged } = useAuth();

    if (!isLogged) {
        toast.info("You must be logged in to view this page.");
        return <Navigate to="/login" />;
    }

    return children;
}