import rescueHub from '~/models/rescue_hub.model'
import User from '~/models/user.model'
import tryCatch from '~/utils/tryCatch'
//[POST]/rescue-hub
export const createRescueHub = tryCatch( async (req, res ) => {
  const { id: userId }= req.user
  const newRescueHub = new rescueHub({
    ...req.body,
    createdBy: userId
  })
  await newRescueHub.save()
  res.status(201).json({
    success:true,
    result:newRescueHub
  })
})
//[GET] /rescue-hub
export const getRescueHubs = tryCatch( async (req, res) => {
  const rescueHubPonts =await rescueHub.find()

  const result = await Promise.all(
    rescueHubPonts.map(async (point) => {
      const userInfor = await User.findOne({ _id: point.createdBy }).select('-password')
      return {
        ...point._doc,
        userInfor
      }
    })
  )
  res.status(200).json({
    result: result,
    success:true
  })
})