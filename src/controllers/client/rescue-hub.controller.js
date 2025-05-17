import rescueHub from '~/models/rescue_hub.model'
import Role from '~/models/roles'
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
export const getRescueHubs = tryCatch(async (req, res) => {
  const hubList = await rescueHub.find().lean()

  const result = await Promise.all(
    hubList.map(async (hubItem) => {
      // Lấy thông tin người tạo
      let userInfor = await User.findOne({ _id: hubItem.createdBy }).select('name photoURL roleId').lean()
      let level = null

      if (userInfor) {
        const role = await Role.findOne({ _id: userInfor.roleId }).lean()
        level = role?.level || null
      } else {
        userInfor = {
          name: 'Người dùng không tồn tại',
          photoURL: '',
          roleId: null
        }
      }

      userInfor.level = level

      // Lọc đánh giá nâng cao
      const validByIds = Array.isArray(hubItem.ratingCount)
        ? hubItem.ratingCount.filter(item =>
          item.userType === 'Cơ quan chức năng' || item.userType === 'Tình nguyện viên'
        )
        : []

      const ratedIds = validByIds.map(item => item.ratedById)

      const validByNames = await User.find({ _id: { $in: ratedIds } }).select('name photoURL').lean()

      // Kết hợp tên và kiểu người đánh giá
      const validByUsers = validByIds.map(item => {
        const user = validByNames.find(u => u._id.toString() === item.ratedById.toString())
        return {
          ratedById: item.ratedById,
          userType: item.userType,
          name: user ? user.name : 'Người dùng chưa xác định',
          photoURL : user.photoURL
        }
      })

      return {
        ...hubItem,
        userInfor,
        validByUsers
      }
    })
  )

  res.status(200).json({
    success: true,
    result
  })
})
