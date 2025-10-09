import { FC, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthT {
    children: ReactNode;
}

const Auth: FC<AuthT> = ({ children }: AuthT): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect((): void => {
        const isAuthenticated =
            localStorage.getItem('isAuthenticated') === 'true';

        if (!isAuthenticated && location.pathname !== '/login') {
            navigate('/login');
        } else if (isAuthenticated && location.pathname === '/login') {
            navigate('/home');
        }
    }, [navigate, location]);

    return <>{children}</>;
};

export default Auth;
