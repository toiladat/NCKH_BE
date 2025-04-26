import needHelp from '~/models/need_help.model'
import rescueHub from '~/models/rescue_hub.model'
import User from '~/models/user.model'

export const paginationHelper =async (req, pagiDefault, find, criteria ) => {
  try {
    let elementTotal = 0
    switch (criteria) {
    case 'users':
      elementTotal = await User.countDocuments(find)
      break
    case 'needHelpPoints':
      elementTotal = await needHelp.countDocuments(find)
      break
    case 'rescueHubPoints':
      elementTotal = await rescueHub.countDocuments(find)
      break
    }
    const pagination = {
      currPage: pagiDefault?.page ? parseInt(pagiDefault.page):1,
      limitElement:pagiDefault?.limit ? parseInt(pagiDefault.limit) : 5
    }
    pagination.skipElement = (pagination.currPage - 1) * pagination.limitElement
    pagination.pageTotal = Math.ceil(elementTotal / pagination.limitElement)
    pagination.elementTotal=elementTotal
    return pagination
  }
  catch {
    return null
  }

}