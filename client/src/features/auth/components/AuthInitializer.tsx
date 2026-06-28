import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { getCurrentUser } from '../services/auth.service'
import { useAuthStore } from '../../../store/authStore'
import { getToken, removeToken } from '../../../utils/token'

type AuthInitializerProps = {
  children: ReactNode
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading)
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken()

      if (!token) {
        logout()
        setAuthLoading(false)
        return
      }

      try {
        const user = await getCurrentUser()
        login(user, token)
      } catch {
        removeToken()
        logout()
      } finally {
        setAuthLoading(false)
      }
    }

    initializeAuth()
  }, [login, logout, setAuthLoading])

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink text-paper">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-line border-t-signal" />
          <p className="mono-label mt-5 text-xs text-slate">
            Loading CampusSync AI
          </p>
        </div>
      </main>
    )
  }

  return children
}

export default AuthInitializer