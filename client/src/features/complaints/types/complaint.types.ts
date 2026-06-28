export type ComplaintCategory =
  | 'academic'
  | 'hostel'
  | 'maintenance'
  | 'transport'
  | 'canteen'
  | 'other'

export type ComplaintPriority = 'low' | 'medium' | 'high'

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved'

export type ComplaintUser = {
  _id: string
  name: string
  email: string
  role: string
}

export type Complaint = {
  _id: string
  title: string
  description: string
  category: ComplaintCategory
  priority: ComplaintPriority
  status: ComplaintStatus
  createdBy: ComplaintUser
  responseNote?: string
  statusUpdatedBy?: ComplaintUser
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type CreateComplaintPayload = {
  title: string
  description: string
  category: ComplaintCategory
  priority: ComplaintPriority
}

export type UpdateComplaintStatusPayload = {
  status: ComplaintStatus
  responseNote?: string
}