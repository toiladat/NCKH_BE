import mongoose from 'mongoose'

const regionSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
    },
    Rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    Criteria1: {
      type: {
        name: { type: String, required: true },
        impactLevel: { type: Number, min: 1, max: 5, required: true }
      }
    },
    Criteria2: {
      type: {
        name: { type: String, required: true },
        impactLevel: { type: Number, min: 1, max: 5, required: true }
      }
    },
    Criteria3: {
      type: {
        name: { type: String, required: true },
        impactLevel: { type: Number, min: 1, max: 5, required: true }
      }
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
)

const Region = mongoose.model('Region', regionSchema, 'regions')

export default Region