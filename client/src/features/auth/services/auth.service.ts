 import api from '../../../api/axios'
import type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  UserRole,
} from '../types/auth.types'

type BackendUser = {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
}

type BackendAuthResponse = {
  success: boolean
  message: string
  data: {
    user: BackendUser
    token: string
  }
}

type BackendCurrentUserResponse = {
  success: boolean
  message: string
  data: {
    user: BackendUser
  }
}

const mapBackendUser = (user: BackendUser): AuthUser => {
  return {
    id: user.id,
    fullName: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  }
}

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<BackendAuthResponse>('/auth/login', payload)

  return {
    user: mapBackendUser(response.data.data.user),
    token: response.data.data.token,
  }
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<BackendAuthResponse>('/auth/register', payload)

  return {
    user: mapBackendUser(response.data.data.user),
    token: response.data.data.token,
  }
}

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<BackendCurrentUserResponse>('/auth/me')

  return mapBackendUser(response.data.data.user)
}