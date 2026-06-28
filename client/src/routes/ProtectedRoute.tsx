 import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { getToken } from '../utils/token'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const token = getToken()

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute