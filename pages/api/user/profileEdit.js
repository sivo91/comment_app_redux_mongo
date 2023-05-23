
import db from "@/utils/db"
import User from "@/models/User"


const handler = async (req, res) => {

  const img = req.body.imgID
  const email = req.body.email
  //console.log(img, email)

  await db.connect()
  
  const user = await User.findOne({ email })

  user.image = img

  await user.save()
  await db.disconnect()

 res.status(200).json({ message: 'success '})

}

export default handler