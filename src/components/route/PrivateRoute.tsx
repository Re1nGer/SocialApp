import React from 'react'
import { Navigate, Outlet, OutletProps, useLocation } from 'react-router-dom'

type PrivateRoutePropType = {
  children?: JSX.Element | undefined
}

function PrivateRoute({ children }: PrivateRoutePropType): JSX.Element | React.ReactElement {
  const location = useLocation()

  const isAuthenticatedStorage: string | null = sessionStorage.getItem('isAuthenticated')

  if (!isAuthenticatedStorage) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children || <Outlet />
}

export default PrivateRoute
