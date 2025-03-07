import User from '~/models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import tryCatch from '~/utils/tryCatch'
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