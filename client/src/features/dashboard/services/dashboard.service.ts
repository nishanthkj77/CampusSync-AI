import api from '../../../api/axios'

export const getStudentProfile = async () => {
  const response = await api.get('/student/profile')
  return response.data.data
}

export const getFacultyClasses = async () => {
  const response = await api.get('/faculty/classes')
  return response.data.data
}

export const getHodOverview = async () => {
  const response = await api.get('/hod/overview')
  return response.data.data
}

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users')
  return response.data.data
}