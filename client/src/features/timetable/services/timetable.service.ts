import api from '../../../api/axios'
import type { TimetableEntry } from '../types/timetable.types'

type TimetableResponse = {
  success: boolean
  message: string
  data: {
    count: number
    timetables: TimetableEntry[]
  }
}

export const getMyTimetable = async (): Promise<TimetableEntry[]> => {
  const response = await api.get<TimetableResponse>('/timetable/my')

  return response.data.data.timetables
}

export const getAllTimetables = async (): Promise<TimetableEntry[]> => {
  const response = await api.get<TimetableResponse>('/timetable')

  return response.data.data.timetables
}