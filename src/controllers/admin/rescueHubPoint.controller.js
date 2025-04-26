import rescueHub from '~/models/rescue_hub.model'

import tryCatch from '~/utils/tryCatch'
import { paginationHelper } from '~/helper/pagination.helper'

//[GET] /admin/rescue-hub-point/get-rescue-hub-points
export const getRescueHubPoints = tryCatch( async (req, res) => {
  const find ={}
  const pagination =await paginationHelper(req, req.params, find, 'rescueHubPoints')
  const rescueHubPoints = await rescueHub
    .find(find)
    .select('location_start location_end createdBy')
    .limit(pagination.limitElement)
    .skip(pagination.skipElement)

  res.status(200).json({
    success: true,
    result: {
      pointsData: rescueHubPoints,
      pageTotal:pagination.pageTotal,
      pointTotal: pagination.elementTotal
    }
  })
})

//[GET] /admin/rescue-hub-point/get-rescue-hub-points-by-month
export const getRescueHubPointsByMonth = tryCatch( async (req, res) => {

  let { startDate, endDate } = req.params

  // Nếu không truyền tham số, mặc định lấy 5 tháng gần nhất
  const now = new Date()
  const fiveMonthsAgo = new Date()
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5)

  if (!startDate) startDate = fiveMonthsAgo.toISOString()
  if (!endDate) endDate = now.toISOString()

  const start = new Date(startDate)
  const end = new Date(endDate)

  const rescuehubpoints = await rescueHub.find({
    createdAt: {
      $gte: start,
      $lte: end
    }
  }).select('location_start location_end createdBy')
  res.status(200).json({
    success: true,
    result: rescuehubpoints
  })
})