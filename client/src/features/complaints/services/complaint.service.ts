import api from '../../../api/axios'
import type {
  Complaint,
  CreateComplaintPayload,
  UpdateComplaintStatusPayload,
} from '../types/complaint.types'

type ComplaintListResponse = {
  success: boolean
  message: string
  data: {
    count: number
    complaints: Complaint[]
  }
}

type ComplaintSingleResponse = {
  success: boolean
  message: string
  data: {
    complaint: Complaint
  }
}

export const getComplaints = async (): Promise<Complaint[]> => {
  const response = await api.get<ComplaintListResponse>('/complaints')

  return response.data.data.complaints
}

export const createComplaint = async (
  payload: CreateComplaintPayload
): Promise<Complaint> => {
  const response = await api.post<ComplaintSingleResponse>(
    '/complaints',
    payload
  )

  return response.data.data.complaint
}

export const updateComplaintStatus = async (
  complaintId: string,
  payload: UpdateComplaintStatusPayload
): Promise<Complaint> => {
  const response = await api.patch<ComplaintSingleResponse>(
    `/complaints/${complaintId}/status`,
    payload
  )

  return response.data.data.complaint
}