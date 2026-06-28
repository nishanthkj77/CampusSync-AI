import api from '../../../api/axios'
import type {
  StudentRosterItem,
  StudentRosterQuery,
} from '../types/studentRoster.types'

type StudentRosterResponse = {
  success: boolean
  message: string
  data: {
    count: number
    students: StudentRosterItem[]
  }
}

export const getStudentRoster = async (
  query: StudentRosterQuery
): Promise<StudentRosterItem[]> => {
  const response = await api.get<StudentRosterResponse>('/students/roster', {
    params: query,
  })

  return response.data.data.students
}