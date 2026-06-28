import api from '../../../api/axios'
import type {
  Announcement,
  CreateAnnouncementPayload,
} from '../types/announcement.types'

type AnnouncementListResponse = {
  success: boolean
  message: string
  data: {
    count: number
    announcements: Announcement[]
  }
}

type AnnouncementCreateResponse = {
  success: boolean
  message: string
  data: {
    announcement: Announcement
  }
}

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await api.get<AnnouncementListResponse>('/announcements')

  return response.data.data.announcements
}

export const createAnnouncement = async (
  payload: CreateAnnouncementPayload
): Promise<Announcement> => {
  const response = await api.post<AnnouncementCreateResponse>(
    '/announcements',
    payload
  )

  return response.data.data.announcement
}