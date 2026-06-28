import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserRole } from '../features/auth/types/auth.types'

type AuthUser = {
  id: string
  fullName: string
  email: string
  role: UserRole
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'campussync-auth',
    }
  )
)
