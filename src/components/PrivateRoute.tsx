import { Navigate } from "react-router"

export interface PrivateRouteProps {
    component: React.ReactNode,
    redirectTo: string
}

export default function PrivateRoute ({component: Component, redirectTo = '/'} : PrivateRouteProps) {
  const isLoggedIn = !false
    return isLoggedIn ? Component : <Navigate to={redirectTo}/>
}