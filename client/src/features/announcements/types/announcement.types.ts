export type AnnouncementCategory =
  | 'general'
  | 'academic'
  | 'exam'
  | 'event'
  | 'urgent'

export type AnnouncementPriority = 'low' | 'medium' | 'high'

export type AnnouncementAudienceRole = 'student' | 'faculty' | 'hod' | 'admin'

export type AnnouncementCreator = {
  _id: string
  name: string
  email: string
  role: string
}

export type Announcement = {
  _id: string
  title: string
  message: string
  category: AnnouncementCategory
  priority: AnnouncementPriority
  audienceRoles: AnnouncementAudienceRole[]
  createdBy: AnnouncementCreator
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type CreateAnnouncementPayload = {
  title: string
  message: string
  category: AnnouncementCategory
  priority: AnnouncementPriority
  audienceRoles: AnnouncementAudienceRole[]
}