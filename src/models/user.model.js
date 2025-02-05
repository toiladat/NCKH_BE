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
  rating: { type: Number, default: 5 }

})

const User = mongoose.model('user', userSchema, 'users')
export default User
