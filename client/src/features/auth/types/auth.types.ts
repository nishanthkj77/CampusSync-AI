 export type UserRole = 'student' | 'faculty' | 'hod' | 'admin'
 
export type AuthUser = {
  id: string
  fullName: string
  email: string
  role: UserRole
  isActive?: boolean
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
  role: UserRole
}

export type AuthResponse = {
  user: AuthUser
  token: string
}