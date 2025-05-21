import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect((): void => {
        const isAuthenticated =
            localStorage.getItem('isAuthenticated') === 'true';

        if (!isAuthenticated && location.pathname !== '/login') {
            navigate('/login');
        } else if (isAuthenticated && location.pathname === '/login') {
            navigate('/portfolio');
        }
    }, [navigate, location]);

    return <>{children}</>;
};

export default AuthGuard;
