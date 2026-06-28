import api from '../../../api/axios'
import type {
  Attendance,
  CreateAttendancePayload,
  UpdateAttendancePayload,
} from '../types/attendance.types'

type AttendanceListResponse = {
  success: boolean
  message: string
  data: {
    count: number
    attendance: Attendance[]
  }
}

type AttendanceSingleResponse = {
  success: boolean
  message: string
  data: {
    attendance: Attendance
  }
}

export const getAttendance = async (): Promise<Attendance[]> => {
  const response = await api.get<AttendanceListResponse>('/attendance')

  return response.data.data.attendance
}

export const createAttendance = async (
  payload: CreateAttendancePayload
): Promise<Attendance> => {
  const response = await api.post<AttendanceSingleResponse>(
    '/attendance',
    payload
  )

  return response.data.data.attendance
}

export const updateAttendance = async (
  attendanceId: string,
  payload: UpdateAttendancePayload
): Promise<Attendance> => {
  const response = await api.put<AttendanceSingleResponse>(
    `/attendance/${attendanceId}`,
    payload
  )

  return response.data.data.attendance
}