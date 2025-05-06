import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 50,
    required: true
  },
  email: {
    type: String,
    min: 5,
    max: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  roleId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
    default:''
  },
  permissionEvaluation: {
    type:[String],
    default:[]
  }

}, {
  timestamps:true
})

const User = mongoose.model('user', userSchema, 'users')
export default User
