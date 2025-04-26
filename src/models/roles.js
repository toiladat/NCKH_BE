import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    permission: {
      type: [String],
      default: []
    }
  }
)

const Role = mongoose.model('Role', roleSchema, 'roles')
export default Role
