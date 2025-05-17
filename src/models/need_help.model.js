import mongoose from 'mongoose'

const needHelpSchema= mongoose.Schema({
  lng:{ type:Number, required:true },
  lat:{ type:Number, required:true },
  address:{ type: String, required:true },
  price:{ type:Number, min:0, max:50, default:0 },
  title:{ type:String, required:true, minLength:5, maxLength: 150 },
  description:{ type:String, required:true, minLength:10, maxLength:1000 },
  images:{
    type:[String]
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  rating:{
    type:Number,
    default:5
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
  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày sau
    expires: 0 // TTL sẽ xóa khi đến đúng thời điểm expireAt
  }
}, {
  timestamps :true
}
)

const needHelp = mongoose.model('needHelp', needHelpSchema, 'need-help')
export default needHelp