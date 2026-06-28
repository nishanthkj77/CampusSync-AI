 export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export type SessionType = 'lecture' | 'lab' | 'seminar' | 'exam'

export type TimetableEntry = {
  _id: string
  courseCode: string
  courseTitle: string
  department: string
  semester: number
  section: string
  facultyName: string
  facultyEmail: string
  room: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  sessionType: SessionType
  isActive: boolean
}

export type CreateTimetablePayload = {
  courseCode: string
  courseTitle: string
  department: string
  semester: number
  section: string
  facultyName: string
  facultyEmail: string
  room: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  sessionType: SessionType
}

export type TimetableConflictType =
  | 'room_conflict'
  | 'faculty_conflict'
  | 'section_conflict'

export type TimetableConflictSeverity = 'high' | 'medium'

export type TimetableConflict = {
  id: string
  type: TimetableConflictType
  severity: TimetableConflictSeverity
  message: string
  dayOfWeek: string
  timeWindow: string
  entries: TimetableEntry[]
  suggestion: string
}

export type TimetableConflictReport = {
  totalEntries: number
  conflictCount: number
  conflicts: TimetableConflict[]
}