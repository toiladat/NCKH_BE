import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    photoURL: {
      type: String,
      default: ''
    },
    role_id: {
      type: String
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active'
    }
  },
  { timestamps: true }
)

const Admin = mongoose.model('admin', userSchema, 'admins')
export default Admin
