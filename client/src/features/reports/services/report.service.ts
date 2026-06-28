import api from '../../../api/axios'
import type { OverviewReport } from '../types/report.types'

type OverviewReportResponse = {
  success: boolean
  message: string
  data: OverviewReport
}

export const getOverviewReport = async (): Promise<OverviewReport> => {
  const response = await api.get<OverviewReportResponse>('/reports/overview')

  return response.data.data
}