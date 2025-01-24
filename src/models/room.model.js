import mongoose from 'mongoose'

const roomSchema= mongoose.Schema({
  lng:{ type:Number, require:true },
  lat:{ type:Number, require:true },
  price:{ type:Number, min:0, max:50, default:0 },
  title:{ type:String, require:true, minLength:5, maxLength: 150 },
  description:{ type:String, require:true, minLength:10, maxLength:1000 },
  images:{
    type:[String]
  },
  userId:{ type: String, require:true }
}, {
  timestamps :true
}
)

const Room = mongoose.model('rooms', roomSchema)
export default Room