import mongoose from 'mongoose'

const informationSchema= mongoose.Schema({
  lng:{ type:Number, required:true },
  lat:{ type:Number, required:true },
  content:{ type:String, required:true, minLength:10, maxLength:1000 },
  images:{
    type:[String]
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps :true
}
)

const information = mongoose.model('information', informationSchema, 'informations')
export default information