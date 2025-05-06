import mongoose from 'mongoose'

// Định nghĩa một Schema cho các tiêu chí trong criteria
const criterionSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    level: {
      type: Number,
      default: 0,
      required:true
    }
  },
  { _id: false } // Để không tạo thêm id cho từng phần tử trong mảng
)

const regionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
    },
    code: { type: String, required: true, unique: true },
    needHelpPoint: {
      type: Number
    },
    rescueHubPoint: {
      type: Number
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    criteria: {
      type: [criterionSchema],
      default: [
        { type: 'fatalities', name: 'Tử vong / Mất tích', level: 0 },
        { type: 'injuries', name: 'Bị thương cần cấp cứu', level: 0 },
        { type: 'housingDamage', name: 'Nhà bị hư hỏng nặng', level: 0 },
        { type: 'essentialNeeds', name: 'Thiếu lương thực/nước/thuốc', level: 0 },
        { type: 'vulnerableGroups', name: 'Người dễ tổn thương', level: 0 },
        { type: 'accessibility', name: 'Mức độ cô lập', level: 0 }
      ]
    }
  },
  {
    timestamps: true
  }
)

const Region = mongoose.model('Region', regionSchema, 'regions')

export default Region
