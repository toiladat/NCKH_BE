import Admin from '~/models/admin'
import tryCatch from '~/utils/tryCatch'


//[GET]/admin/account/get-admins
export const getAdmins = tryCatch( async (req, res) => {

  const admins = await Admin.find({
    status:'active'
  }).sort({ _id: -1 })
  res.status(200).json({ success:true, result:admins })
})

