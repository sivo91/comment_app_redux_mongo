import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaUserAlt, FaThumbsUp } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { BsCalendar2Date } from "react-icons/bs";
import { TfiCup } from "react-icons/tfi";
import Link from 'next/link';
import { Loading } from '@nextui-org/react';


const Comment = () => {

  const { user } = useSelector((state) => state.userAuth)
  const [comment, setComment] = useState('')
  const [load, setLoad] = useState(false)
  const [allComments, setAllComments] = useState([])
  const [totalCom, setTotalCom] = useState(0)
  const [visible, setVisible] = useState(2)
  const [maxCom, setMaxCom] = useState(2)
  
  /* console.log(user?.user?.email)
  console.log(user?.user?._id) */

  //const userEmail = user?.user?.email
  const userId = user?.user?._id
  const data = {userId, comment}

  // CALL MONGO
  const getComments = async () => {
    setLoad(true)
    const res = await fetch('/api/comment/getComments', {cache: 'no-cache'})
    const data = await res.json()
    
    setAllComments(data.comments)
    setTotalCom(data.comments.length)
    setLoad(false)
  } 


  useEffect(() =>{ 
    getComments() 
  }, [])


  // DATE FUNC
  const dateFuncion = (date) => {
    
//console.log(time) // 2023-05-21T04:55:14.482Z
const created = date.substring(0,10)
//console.log(created)

const yr = created.slice(0,4)  
//console.log(yr) // 2023

const d = created.slice(8,10)
//console.log(d) // 21

const m = created.slice(5,7)
//console.log(m) //05

const resDate = m + '-' + d + '-' + yr
return  resDate 
    
  } 

  // TIME FUNC
  const timeFunction = (time) => {
    const morning = 'am'
    const afternoon = 'pm'
    //console.log(time.substring(0,2))
    const hrs = time.substring(0,2)
    if(hrs > 12) {
      return time + afternoon
    } else {
      return time + morning
    }
  }

  // LIKE FUNC
  const handleLike = async (id) => {
     // console.log(id)

     try {
       await axios.put('/api/comment/updateComment', {id})
       getComments()
     } catch (error) {
       console.log(error)
     }

     
  }

  // SHOW MORE COMM.
  const showMore = () => {
    setVisible(prev => prev + 2)
    setMaxCom(maxCom + 2)
  }


  return (
    <>
 
      <h3 className='text-center mt-5 pt-5'>
        Who wins the World Championship?
      </h3>

      <h5 className='text-center'>
        To Add Comment please 
        <Link href={'/register'} style={{textDecoration: 'none'}}>
          <span className='ms-2'>Sign Up</span>
        </Link>
      </h5>

      <Link href={'https://full-world-cup-23.vercel.app/'} 
            style={{textDecoration: 'none'}}
            target='_blank'>
        <button className='btn btn-outline-dark rounded-1 vstack mx-auto mt-4'>
          Voting App
        </button>
      </Link>



       {
        load ? (
           <p className='text-center mt-5'> <Loading type="gradient" /></p>
        ) : (
             <div className="commentsBox">
                <p className='text-center'>Total Comments: {totalCom}</p>
                  {
                    allComments.slice(0,visible).map( item => (
                      <div className="card m-3 px-2" key={item._id}>
                        
                        <div className='d-flex mt-1'>
                          <FaUserAlt className='userIcon'/>
                          <p className='ms-2'>{item.userName}</p>
                        </div>

                        <div className='d-flex'>
                          <TfiCup className='commentIcon'/>
                          <p className='ms-2'>{item.comment}</p>
                        </div>



                        <div className='d-flex justify-content-between'>
                            
                            <div className='d-flex' // date + time   
                                  >
                              <BsCalendar2Date className='dateIcon'/>
                              <p className='ms-2'>
                                {dateFuncion(item.createdAt)} {''}
                                {timeFunction(item.time)}
                              </p>
                            </div>

                              <div className='d-flex'>
                                <FaThumbsUp className='likeIcon'
                                onClick={() => handleLike(item._id)}/>
                                <p className='ms-2'>{item.like}</p>
                              </div>

                        </div>
                        
                        
                      </div>
                    ) )
                  }  

          <button className='btn btn-dark rounded-1 vstack mx-auto '
                  onClick={showMore}
                  disabled={maxCom === totalCom ||
             maxCom - 1 === totalCom}>
              Load More
          </button>
       </div>
        )
       }


       <style>{`

       

        .likeIcon {
          cursor: pointer;
        }

        .userIcon, .commentIcon, .dateIcon, .likeIcon {
          position: relative;
          top: 4px;
        }

        .commentsBox {
          position: relative;
          width: 375px;
          margin: 30px auto 80px;
          padding: 5px;
          border-radius: 4px;
        }
        
         form {
          position: relative;
          width: 375px;
          margin: 0 auto;
         }
       
       `}</style>
    
    </>
  )
}

export default Comment