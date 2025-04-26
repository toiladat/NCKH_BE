import User from '~/models/user.model'
import Role from '~/models/roles'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import tryCatch from '~/utils/tryCatch'
import needHelp from '~/models/need_help.model'
import rescueHub from '~/models/rescue_hub.model'
//[POST] user/register
export const register = tryCatch( async ( req, res ) => {
  const { name, email, password } = req.body
  if (password.length < 6 )
    return res.status(400).json({
      success:false,
      message:'Password must be 6 characters'
    })
  const emailLowerCase = email.toLowerCase()
  const existUser = await User.findOne({ email: emailLowerCase })

  if (existUser)
    return res.status(400).json({
      success: false,
      message: 'User already exist'
    })
  const hashedPassword = await bcrypt.hash ( password, 12) // số lần hash
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
    token
  })
  const { _id: id, photoURL } = user
  const token = jwt.sign(
    { id, name, photoURL }, // thông tin để mã hóa
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.status(201).json({
    success:true,
    result:{
      id, name, email: user.email, photoURL, token
    }
  })

})

//[POST] user/login
export const login = tryCatch( async( req, res ) => {
  const { email, password } = req.body
  const emailLowerCase= email.toLowerCase()
  const existUser =await User.findOne({ email:emailLowerCase })
  if (!existUser) {
    return res.status(404).json({
      success:false,
      message:'User does not exist'
    })
  }
  const correctPassword = await bcrypt.compare(password, existUser.password)
  if (!correctPassword) {
    return res.status(400).json({
      success:false,
      message:'Password is not correct'
    })
  }
  const { _id: id, name, photoURL } = existUser

  const token = jwt.sign( // Không lưu token mà dùng giá trị hash ra để compare
    { id, name, photoURL },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  res.status(200).json({
    success:true,
    result:{
      id, name, email: emailLowerCase, photoURL, token
    }
  })
})

//[PATCH] user/updateProfile
export const updateProfile = tryCatch(async (req, res ) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id, //find by id
    req.body, // update
    {
      new: true //return newest record
    }
  )
  const { _id: id, name, photoURL }= updateUser

  const token = jwt.sign(
    { id, name, photoURL },
    process.env.JWT_SECRET,
    { expiresIn:'1h' }
  )

  res.status(200).json({
    success:true,
    result:{
      name, photoURL, token
    }
  })
})

//[PATCH] user/evaluate-infor
export const evaluateInfor = tryCatch(async (req, res) => {

  const data = req.body

  const user = await User.findOne({
    _id: data.ratedById,
    status: 'active'
  }).select('roleId name')

  const role = await Role.findOne({
    _id: user.roleId
  }).select('title')


  let pointModel
  switch (data.type) {
  case 'needHelpPoint':
    pointModel = needHelp
    break
  case 'rescuehubPoint':
    pointModel = rescueHub
    break
  default:
    return res.status(400).json({
      success: false,
      message:'Loại điểm không hợp lệ'
    })
  }

  // Tìm point
  const point = await pointModel.findOne({ _id: data.pointId })

  // check da danh gia chua
  const existingRatingIndex = point.ratingCount.findIndex(
    item => item.ratedById.toString() === data.ratedById.toString()
  )
  if ( existingRatingIndex !==-1) {
  // Đã từng đánh giá → cập nhật lại điểm và userType nếu cần
    point.ratingCount[existingRatingIndex].score = data.ratePoint || point.rating
    point.ratingCount[existingRatingIndex].userType = role.title
  }
  else {
    point.ratingCount.push({
      ratedById:data.ratedById,
      score:data.ratePoint || point.rating,
      userType: role.title
    })
  }

  point.rating = point.ratingCount.reduce(
    (sum, item) => sum + item.score, 0
  ) / point.ratingCount.length
  point.rating = Math.round(point.rating * 10) / 10

  await point.save()

  res.status(200).json({
    success:true,
    result:{
      message:'ok'
    }
  })
})