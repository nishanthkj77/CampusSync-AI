export type UserRole = 'student' | 'faculty' | 'hod' | 'admin'

export type LoginFormData = {
  email: string
  password: string
  role: UserRole
}

export type RegisterFormData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
}