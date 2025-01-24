import Room from '~/models/room.model'
import tryCatch from './utils/tryCatch'
import User from '~/models/user.model'
import mongoose from 'mongoose'
//[POST] /room
export const createRoom = tryCatch( async (req, res) => {
  const { id: userId }= req.user
  const newRoom = new Room({
    ...req.body,
    userId:userId
  })
  await newRoom.save()
  res.status(201).json({
    success:true,
    result:newRoom
  })
})

//[GET] /room
export const getRooms = tryCatch( async ( req, res) => {
  const rooms = await Room.find()
  const result = await Promise.all(
    rooms.map(async (room) => {
      const userInfor = await User.findOne({ _id: room.userId }).select('name photoURL')
      return {
        ...room._doc,
        userInfor
      }
    })
  )

  res.status(200).json({
    success: true,
    result: result
  })
})