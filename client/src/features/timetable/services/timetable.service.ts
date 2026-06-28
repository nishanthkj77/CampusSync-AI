 import api from '../../../api/axios'
import type {
  CreateTimetablePayload,
  TimetableConflictReport,
  TimetableEntry,
} from '../types/timetable.types'

type TimetableListResponse = {
  success: boolean
  message: string
  data: {
    count: number
    timetables: TimetableEntry[]
  }
}

type TimetableSingleResponse = {
  success: boolean
  message: string
  data: {
    timetable: TimetableEntry
  }
}

type TimetableConflictResponse = {
  success: boolean
  message: string
  data: TimetableConflictReport
}

export const getMyTimetable = async (): Promise<TimetableEntry[]> => {
  const response = await api.get<TimetableListResponse>('/timetable/my')

  return response.data.data.timetables
}

export const getAllTimetables = async (): Promise<TimetableEntry[]> => {
  const response = await api.get<TimetableListResponse>('/timetable')

  return response.data.data.timetables
}

export const getTimetableConflicts =
  async (): Promise<TimetableConflictReport> => {
    const response = await api.get<TimetableConflictResponse>(
      '/timetable/conflicts'
    )

    return response.data.data
  }

export const createTimetable = async (
  payload: CreateTimetablePayload
): Promise<TimetableEntry> => {
  const response = await api.post<TimetableSingleResponse>(
    '/timetable',
    payload
  )

  return response.data.data.timetable
}

export const updateTimetable = async (
  timetableId: string,
  payload: Partial<CreateTimetablePayload>
): Promise<TimetableEntry> => {
  const response = await api.put<TimetableSingleResponse>(
    `/timetable/${timetableId}`,
    payload
  )

  return response.data.data.timetable
}

export const deleteTimetable = async (
  timetableId: string
): Promise<TimetableEntry> => {
  const response = await api.delete<TimetableSingleResponse>(
    `/timetable/${timetableId}`
  )

  return response.data.data.timetable
}