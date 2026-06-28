import api from '../../../api/axios'
import type {
  AITimetablePreviewData,
  GenerateAITimetablePayload,
  SaveAITimetablePayload,
  SaveAITimetableResponseData,
} from '../types/aiTimetable.types'

type AITimetablePreviewResponse = {
  success: boolean
  message: string
  data: AITimetablePreviewData
}

type SaveAITimetableResponse = {
  success: boolean
  message: string
  data: SaveAITimetableResponseData
}

export const generateAITimetablePreview = async (
  payload: GenerateAITimetablePayload
): Promise<AITimetablePreviewData> => {
  const response = await api.post<AITimetablePreviewResponse>(
    '/ai-timetable/generate-preview',
    payload
  )

  return response.data.data
}

export const saveAITimetablePreview = async (
  payload: SaveAITimetablePayload
): Promise<SaveAITimetableResponseData> => {
  const response = await api.post<SaveAITimetableResponse>(
    '/ai-timetable/save',
    payload
  )

  return response.data.data
}