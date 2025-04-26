import { paginationHelper } from '~/helper/pagination.helper'
import needHelp from '~/models/need_help.model'

import tryCatch from '~/utils/tryCatch'

//[GET] /admin/need-help-point/get-need-help-points
export const getNeedHelpPoints = tryCatch( async (req, res) => {
  const find ={}
  const pagination =await paginationHelper(req, req.params, find, 'needHelpPoints')
  const needHelpPoints = await needHelp
    .find(find)
    .select('lng lat')
    .limit(pagination.limitElement)
    .skip(pagination.skipElement)

  res.status(200).json({
    success: true,
    result: {
      pointsData: needHelpPoints,
      pageTotal:pagination.pageTotal,
      pointTotal: pagination.elementTotal
    }
  })
})

//[GET] /admin/need-help-point/get-need-help-points-by-month
export const getNeedHelpPointByMonth = tryCatch( async (req, res) => {

  let { startDate, endDate } = req.params

  // Nếu không truyền tham số, mặc định lấy 5 tháng gần nhất
  const now = new Date()
  const fiveMonthsAgo = new Date()
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5)

  if (!startDate) startDate = fiveMonthsAgo.toISOString()
  if (!endDate) endDate = now.toISOString()

  const start = new Date(startDate)
  const end = new Date(endDate)

  const needHelpPoints = await needHelp.find({
    createdAt: {
      $gte: start,
      $lte: end
    }
  }).select('lng lat')
  res.status(200).json({
    success: true,
    result: needHelpPoints
  })
})