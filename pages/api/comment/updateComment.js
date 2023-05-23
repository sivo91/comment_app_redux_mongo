

import db from "@/utils/db";
import Comment from "@/models/Comment";



const handler = async (req, res) => {

  await db.connect()

  if (req.method !== 'PUT') {
    return 
  }


const id = req.body.id

const like = await Comment.findById( id )

like.like += 1

await like.save()


res.status(200).send({message: 'success'})
}




export default handler