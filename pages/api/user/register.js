
import db from "@/utils/db";
import User from "@/models/User";
import {hash} from 'bcrypt'


const handler = async (req, res) => {

   await db.connect();
   
  if (req.method !== 'POST') {
    return 
  }

  const name = req.body.name
  const email = req.body.email
  const image = req.body.image
  const password = req.body.password

// console.log(name, email, password)

  const userExist = await User.findOne({ email })

  if(userExist) {
    return res.status(200).json({ message: "Email address exists!" })
  }

 
 const hashedPassword = await hash(password, 12)

  const newUser = new User({
    name,
    email,
    image,
    password : hashedPassword
  });

  const user = await newUser.save();

  await db.disconnect();

  res.status(201).send({
    message: 'Register Success. Please Login!',
    _id: user._id,
    name: user.name,
    image: user.image,
    email: user.email,
  });

  
} 

export default handler