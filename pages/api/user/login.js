
import db from "@/utils/db";
import User from "@/models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const handler = async (req, res) => {
  let token = ''
  await db.connect();

  if (req.method !== 'POST') {
    return 
  }

  const email = req.body.email
  const password = req.body.password
  //console.log(email, password)

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: "Invalid credentials" })
  }
 
  // compare login password with database password
  const doMatch = await bcrypt.compare(password, user.password)


  // give me token
  if (doMatch) {
      token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h" , // '1d', or '1w'
    }) 
   
  }
 
  // password from login dont match with password from database
  if (!doMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    } 

   res.status(200).send({ token, user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt
   },
   message: "Login Successful",
  })
}

export default handler