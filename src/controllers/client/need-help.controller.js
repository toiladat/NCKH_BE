import needHelp from '~/models/need_help.model'
import tryCatch from '~/utils/tryCatch'
import User from '~/models/user.model'
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
export const getNeedHelps = tryCatch( async ( req, res) => {
  const needHelps = await needHelp.find()
  const result = await Promise.all(
    needHelps.map(async (needHelp) => {

      // lấy ra thông tin người up
      const userInfor = await User.findOne({ _id: needHelp.createdBy }).select('name photoURL')
      // lấy ra ids người đánh giá nâng cao
      const validByIds = needHelp?.ratingCount.filter(item => item.userType ==='Cơ quan chức năng' || item.userType ==='Tình nguyện viên')
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
        ...needHelp._doc,
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