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
    rescueHubPonts.map(async (rescueHub) => {

      // lấy ra thông tin người up
      const userInfor = await User.findOne({ _id: rescueHub.createdBy }).select('name photoURL')
      // lấy ra ids người đánh giá nâng cao
      const validByIds = rescueHub?.ratingCount.filter(item => item.userType ==='Cơ quan chức năng' || item.userType ==='Tình nguyện viên')
      // lấy ra tên người đánh giá nâng cao
      const validByNames = await User.find({
        '_id': {
          $in: validByIds.map(item => item.ratedById)
        }
      }).select('name')

      //kết hợp tên và kiểu người đánh giá
      const validByUsers = validByIds.map( item => {
        const user = validByNames.find( user => user._id.toString() === item.ratedById.toString())
        return {
          ratedById: item.ratedById,
          userType: item.userType,
          name: user ? user.name : 'Người dùng chưa xác định'
        }
      })


      return {
        ...rescueHub._doc,
        userInfor,
        validByUsers: validByUsers
      }
    })
  )

  res.status(200).json({
    success: true,
    result: result
  })
})