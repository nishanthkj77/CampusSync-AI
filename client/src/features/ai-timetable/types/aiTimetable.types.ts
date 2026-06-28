import type {
  DayOfWeek,
  SessionType,
  TimetableEntry,
} from '../../timetable/types/timetable.types'

export type AITimeSlot = {
  startTime: string
  endTime: string
}

export type AICourseInput = {
  courseCode: string
  courseTitle: string
  facultyName: string
  facultyEmail: string
  sessionsPerWeek: number
  sessionType: SessionType
}

export type GenerateAITimetablePayload = {
  department: string
  semester: number
  section: string
  rooms: string[]
  days: DayOfWeek[]
  timeSlots: AITimeSlot[]
  courses: AICourseInput[]
}

export type AITimetablePreviewEntry = Omit<TimetableEntry, '_id' | 'isActive'> & {
  tempId: string
}

export type AITimetablePreviewData = {
  generatedCount: number
  unscheduledCount: number
  preview: AITimetablePreviewEntry[]
  unscheduled: string[]
  message: string
}

export type SaveAITimetablePayload = {
  entries: AITimetablePreviewEntry[]
}

export type SaveAITimetableResponseData = {
  savedCount: number
  timetables: TimetableEntry[]
}