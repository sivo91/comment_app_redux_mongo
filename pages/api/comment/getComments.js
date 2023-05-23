

import db from "@/utils/db";
import Comment from "@/models/Comment";



const handler = async (req, res) => {

  await db.connect()

  if (req.method !== 'GET') {
    return 
  }
  
  const comments = await Comment.find({})
       .sort({ createdAt: -1 })

  if(!comments) {
    return res.status(200).json({
      message: 'Comment section is EMPTY!'
    })
  }

res.status(200).send({ comments })
}




export default handler