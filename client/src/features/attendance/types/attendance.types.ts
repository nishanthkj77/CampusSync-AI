 export type AttendanceStatus = 'present' | 'absent' | 'late'

export type AttendanceStudentRecord = {
  rollNumber?: string
  studentName: string
  studentEmail: string
  status: AttendanceStatus
  remarks?: string
}

export type AttendanceCreator = {
  _id: string
  name: string
  email: string
  role: string
}

export type Attendance = {
  _id: string
  courseCode: string
  courseTitle: string
  department: string
  semester: number
  section: string
  facultyName: string
  facultyEmail: string
  date: string
  records: AttendanceStudentRecord[]
  createdBy: AttendanceCreator
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type CreateAttendancePayload = {
  courseCode: string
  courseTitle: string
  department: string
  semester: number
  section: string
  date: string
  records: AttendanceStudentRecord[]
}

export type UpdateAttendancePayload = Partial<CreateAttendancePayload>