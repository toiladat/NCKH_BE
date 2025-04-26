import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const authUser = async (req, res, next ) => {
  try {
    if (! req.headers.authorization) {
      res.status(404).json({
        success:false,
        message:'Please provide the token'
      })
      return
    }
    const token =req.headers.authorization.split(' ')[1]
    const googleToken = token.length > 1000
    if (googleToken) {
      const tiket = await client.verifyIdToken({
        idToken:token,
        audience:process.env.GOOGLE_CLIENT_ID
      })
      const payload = tiket.getPayload()

      // Gán user data xuống controller
      req.user={
        id:payload.sub,
        name:payload.name,
        photoURL:payload.picture
      }
    }
    else {
      // to do verify our custom jwt token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // Xác minh token
      const { id, name, photoURL } = decodedToken
      req.user = { id, name, photoURL }
    }
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({
      success:false,
      message:'Something is wrong with your authorization'
    })
  }
}
export default authUser