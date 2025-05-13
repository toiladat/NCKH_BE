
import User from '~/models/user.model'
import tryCatch from '~/utils/tryCatch'
import { paginationHelper } from '~/helper/pagination.helper'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Role from '~/models/roles'

//[GET]/admin/user/get-users
export const getUsers = tryCatch( async (req, res) => {
  const find ={}
  const pagination = await paginationHelper(req, req.params, find, 'users')

  const users = await User
    .find(find)
    .select('name email photoURL rating createdAt status')
    .populate({
      path:'roleId',
      select:'title'
    })
    // .limit(pagination.limitElement)
    // .skip(pagination.skipElement)

  const mappedUsers = users.map(user => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: user.createdAt,
    status: user.status,
    role: user.roleId?.title
  }))
  res.status(200).json({
    success: true,
    result: {
      usersData: mappedUsers,
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

//[POST] /admin/user/create-user
export const createUser = tryCatch( async (req, res) => {
  const { email, password, name, phone, address, role, criteria } = req.body

  const emailLowerCase = email.toLowerCase()
  const existUser = await User.findOne({ email: emailLowerCase })

  if (existUser)
    return res.status(400).json({
      success: false,
      message: 'User already exist'
    })
  const hashedPassword = await bcrypt.hash ( password, 12) // số lần hash
  const fullRole = await Role.findOne({
    title:role
  })

  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
    phone,
    address,
    roleId: fullRole._id,
    permissionEvaluation: criteria,
    createdBy: req.user.id
  })

  res.status(201).json({
    success:true,
    result:{
      name, email: user.email, password, criteria
    }
  })

})

//[PATCH] /adin/user/update-user
export const updateUser = tryCatch( async ( req, res) => {
  const { id, role, status } = req.body

  const updateFields = {}
  if (role) {
    const fullRole = await Role.findOne({
      title: role
    })
    updateFields.roleId = fullRole._id.toString()
  }
  if (status) updateFields.status = status
  await User.updateOne({
    _id: id
  }, {
    $set: updateFields
  })
  res.status(200).json({
    success:true,
    result: 'Cập nhật thành công'
  })
})