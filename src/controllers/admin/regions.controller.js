import needHelp from '~/models/need_help.model'
import Region from '~/models/region.model'
import rescueHub from '~/models/rescue_hub.model'
import tryCatch from '~/utils/tryCatch'

export const getRegions = tryCatch(async (req, res) => {
  let regions = await Region.find().populate('updatedBy', 'name')
  const now = new Date()

  const result = await Promise.all(
    regions.map(async (region) => {
      const criteria = region.criteria || []
      const total = criteria.reduce((sum, c) => sum + c.level, 0)
      const averageLevel = criteria.length > 0 ? total / criteria.length : 0

      // Kiểm tra và reset nếu expiredAt đã qua
      if (!region.expiredAt || region.expiredAt <= now) {
        region.criteria = region.criteria.map(c => ({ ...c, level: 0 }))
        region.expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 ngày sau
        await region.save()
      }

      const helpPointCount = await needHelp.countDocuments({ address: region.name })
      const rescuePoint = await rescueHub.countDocuments({ 'location_end.address': region.name })

      return {
        ...region.toObject(),
        needHelpPointCount: helpPointCount,
        rescueHubPointCount: rescuePoint,
        averageLevel
      }
    })
  )

  // Sort descending by averageLevel
  result.sort((a, b) => b.averageLevel - a.averageLevel)

  res.status(200).json({
    success: true,
    result
  })
})
