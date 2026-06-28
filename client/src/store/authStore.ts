 import { create } from 'zustand'
import type { AuthUser } from '../features/auth/types/auth.types'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isAuthLoading: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
  setUser: (user: AuthUser) => void
  setAuthLoading: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAuthLoading: true,

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

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setAuthLoading: (value) =>
    set({
      isAuthLoading: value,
    }),
}))