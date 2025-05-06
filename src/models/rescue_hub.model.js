import mongoose from 'mongoose'

const rescueHubSchema = new mongoose.Schema({
  contributters: {
    type: [String],
    default: []
  },
  supplies: {
    type: [String],
    default: []
  },
  description:{
    type:String,
    default:''
  },
  start_time: {
    type: Date,
    default: Date.now
  },
  end_time: {
    type: Date,
    default: () => Date.now() + 3 * 24 * 60 * 60 * 1000
  },
  location_start: {
    lng: { type: Number, default: null },
    lat: { type: Number, default: null },
    address:{ type: String, required:true }
  },
  location_end: {
    lng: { type: Number, default: null },
    lat: { type: Number, default: null },
    address:{ type: String, required:true }
  },
  images: {
    type:[String],
    default:[]
  },
  rating: {
    type: Number,
    default: 5
  },
  ratingCount: [
    {
      ratedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      userType: {
        type: String
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps:true
})

const rescueHub = mongoose.model('rescueHub', rescueHubSchema, 'rescue-hub')
export default rescueHub
