import needHelp from '~/models/need_help.model'
import tryCatch from '~/utils/tryCatch'
import User from '~/models/user.model'
import Role from '~/models/roles'
//[POST] /need-help
export const createNeedHelp = tryCatch( async (req, res) => {
  const { id: userId }= req.user
  const newNeedHelp = new needHelp({
    ...req.body,
    createdBy:userId
  })
  await newNeedHelp.save()
  res.status(201).json({
    success:true,
    result:newNeedHelp
  })
})

//[GET] /need-help
export const getNeedHelps = tryCatch(async (req, res) => {
  const allHelps = await needHelp.find().lean()

  const result = await Promise.all(
    allHelps.map(async (helpItem) => {
      // Lấy thông tin người tạo yêu cầu
      let userInfor = await User.findOne({ _id: helpItem.createdBy }).select('name photoURL roleId').lean()
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

      // Gắn level nếu có
      userInfor.level = level

      // Lọc danh sách đánh giá nâng cao
      const validByIds = Array.isArray(helpItem.ratingCount)
        ? helpItem.ratingCount.filter(item =>
          item.userType === 'Cơ quan chức năng' || item.userType === 'Tình nguyện viên'
        )
        : []

      const ratedIds = validByIds.map(item => item.ratedById)

      const validByNames = await User.find({ _id: { $in: ratedIds } }).select('name').lean()

      // Kết hợp tên với loại người đánh giá
      const validByUsers = validByIds.map(item => {
        const user = validByNames.find(u => u._id.toString() === item.ratedById.toString())
        return {
          ratedById: item.ratedById,
          userType: item.userType,
          name: user ? user.name : 'Người dùng chưa xác định'
        }
      })

      return {
        ...helpItem,
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
