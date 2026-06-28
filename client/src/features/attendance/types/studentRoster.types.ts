export type StudentRosterItem = {
  _id: string
  name: string
  email: string
  rollNumber?: string
  department: string
  semester: number
  section: string
  role: 'student'
}

export type StudentRosterQuery = {
  department: string
  semester: number
  section: string
}