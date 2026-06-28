export type ReportScope = 'campus' | 'department'

export type CountMap<T extends string> = Record<T, number>

export type AttendanceSummary = {
  totalClasses: number
  totalMarked: number
  presentCount: number
  absentCount: number
  lateCount: number
  attendancePercentage: number
}

export type ComplaintSummary = {
  totalComplaints: number
  byStatus: CountMap<'pending' | 'in_progress' | 'resolved'>
  byPriority: CountMap<'low' | 'medium' | 'high'>
}

export type TimetableSummary = {
  totalEntries: number
  roomCount: number
  facultyCount: number
  bySessionType: CountMap<'lecture' | 'lab' | 'seminar' | 'exam'>
}

export type DepartmentBreakdown = {
  department: string
  students: number
  timetableEntries: number
  complaints: number
  attendancePercentage: number
}

export type SectionBreakdown = {
  department: string
  semester: number
  section: string
  students: number
  timetableEntries: number
  attendancePercentage: number
}

export type OverviewReport = {
  scope: ReportScope
  department: string
  generatedAt: string
  summary: {
    students: number
    faculty: number
    timetableEntries: number
    attendanceRecords: number
    complaints: number
  }
  attendanceSummary: AttendanceSummary
  complaintSummary: ComplaintSummary
  timetableSummary: TimetableSummary
  departmentBreakdown: DepartmentBreakdown[]
  sectionBreakdown: SectionBreakdown[]
  alerts: string[]
}