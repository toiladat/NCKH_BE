import mongoose from 'mongoose'

const rescueHubSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true
  },
  contributters: {
    type: [String],
    default: []
  },
  status: {
    type: Boolean,
    default: false
  },
  supplies: {
    type: [String],
    default: []
  },
  start_time: {
    type: Date,
    default: Date.now
  },
  end_time: {
    type: Date,
    default: () => Date.now() + 3 * 24 * 60 * 60 * 1000
  },
  target_address: {
    lng: { type: Number, default: null },
    lat: { type: Number, default: null }
  },
  storage_address: {
    lng: { type: Number, default: null },
    lat: { type: Number, default: null }
  },
  contact_info: {
    type: String,
    default: '' // Ví dụ, email hoặc số điện thoại để liên lạc
  }
}, {
  timestamps:true
})

const rescueHub = mongoose.model('rescueHub', rescueHubSchema, 'rescue-hub')
export default rescueHub
