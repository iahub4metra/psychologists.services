import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export interface PrivateRouteProps {
    component: React.ReactNode;
    redirectTo: string;
}

export default function PrivateRoute({
    component: Component,
    redirectTo = '/',
}: PrivateRouteProps) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
