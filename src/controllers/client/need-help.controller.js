import needHelp from '~/models/need_help.model'
import tryCatch from '~/utils/tryCatch'
import User from '~/models/user.model'
//[POST] /need-help
export const createNeedHelp = tryCatch( async (req, res) => {
  const { id: userId }= req.user
  const newNeedHelp = new needHelp({
    ...req.body,
    userId:userId
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
      const userInfor = await User.findOne({ _id: needHelp.userId }).select('name photoURL')
      return {
        ...needHelp._doc,
        userInfor
      }
    })
  )

  res.status(200).json({
    success: true,
    result: result
  })
})