
import User from '~/models/user.model'
import tryCatch from '~/utils/tryCatch'
import { paginationHelper } from '~/helper/pagination.helper'

//[GET]/admin/user/get-users
export const getUsers = tryCatch( async (req, res) => {
  const find ={}
  const pagination = await paginationHelper(req, req.params, find, 'rescueHubPoints')
  const users = await User
    .find(find)
    .select('name email photoURL rating createdAt status')
    .limit(pagination.limitElement)
    .skip(pagination.skipElement)

  res.status(200).json({
    success: true,
    result: {
      usersData: users,
      pageTotal:pagination.pageTotal,
      usertTotal: pagination.elementTotal
    }
  })
})

//[GET]/admin/user/get-user-by-month
export const getUsersByMonth = tryCatch( async (req, res) => {
  let { startDate, endDate } = req.params

  // Nếu không truyền tham số, mặc định lấy 5 tháng gần nhất
  const now = new Date()
  const fiveMonthsAgo = new Date()
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5)

  if (!startDate) startDate = fiveMonthsAgo.toISOString()
  if (!endDate) endDate = now.toISOString()

  const start = new Date(startDate)
  const end = new Date(endDate)

  const users = await User.find({
    createdAt: {
      $gte: start,
      $lte: end
    }
  })
  res.status(200).json({ success:true, result:users })
})