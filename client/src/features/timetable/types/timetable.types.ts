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