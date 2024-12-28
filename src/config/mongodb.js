import mongoose from 'mongoose'

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT)
    console.log('Kết nối database thành công!')
  } catch (error) {
    console.log(error);
    console.log('Kết nối database thất bại!')
  }
}