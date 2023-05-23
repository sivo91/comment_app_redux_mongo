

import db from "@/utils/db";
import Comment from "@/models/Comment";
import User from "@/models/User";




const handler = async (req, res) => {

  await db.connect()

  if (req.method !== 'POST') {
    return 
  }
  
   const userId = req.body.userId
   const comment = req.body.comment
 
   //console.log(userId, comment)

   const user = await User.findById( userId )
   //console.log(user.name)
    const newComment = new Comment({
      comment,
      user,
      userName: user.name,
      like: 0,
      time: new Date().getHours() + ':' + new Date().getMinutes()
   })

   await newComment.save()
    

   await db.disconnect();
 
   res.status(201).send({message: 'Comment Created!'})
}


export default handler