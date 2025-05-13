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
        { type: 'injuries', name: 'Chấn thương nặng', level: 0 },
        { type: 'housingDamage', name: 'Thiệt hại nhà ở', level: 0 },
        { type: 'foodWater', name: 'Nhu yếu phẩm (đồ ăn / nước sạch)', level: 0 },
        { type: 'medicalSupplies', name: 'Vật dụng y tế', level: 0 },
        { type: 'vulnerableGroups', name: 'Nhóm dễ tổn thương', level: 0 },
        { type: 'accessibility', name: 'Khả năng tiếp cận (giao thông)', level: 0 },
        { type: 'floodDepth', name: 'Mức độ ngập lụt (m)', level: 0 },
        { type: 'landslideRate', name: 'Tốc độ sạt lở (điểm/giờ)', level: 0 },
        { type: 'agriculturalLoss', name: 'Thiệt hại mùa màng / chăn nuôi', level: 0 },
        { type: 'evacuationCapacity', name: 'Khả năng cảnh báo & sơ tán', level: 0 }
      ]
    },
    expiredAt: {
      type: Date,
      required: true
    }

  },
  {
    timestamps: true
  }
)

const Region = mongoose.model('Region', regionSchema, 'regions')

export default Region
