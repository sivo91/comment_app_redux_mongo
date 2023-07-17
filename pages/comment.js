/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaUserAlt, FaThumbsUp } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { TfiCup } from "react-icons/tfi";
import { Loading } from '@nextui-org/react';
import { TfiEmail } from "react-icons/tfi";


const Comment = () => {

  const { user } = useSelector((state) => state.userAuth)
  const [comment, setComment] = useState('')
  const [load, setLoad] = useState(false)
  const [allComments, setAllComments] = useState([])
  const [totalCom, setTotalCom] = useState(0)
  const [visible, setVisible] = useState(2)
  const [maxCom, setMaxCom] = useState(2)

  
  const userId = user?.user?._id
  const userEmail = user?.user?.email
  const data = {userId, comment, userEmail}

  // CALL MONGO TO SHOW ALL COMMENTS
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

  // ADD NEW COMM + CALL MONGO
  const handleSubmit = async (e) => {
     e.preventDefault()

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      if(comment === '') return toast.error('Please add comment!')

     try {
       setLoad(true)
       const res = await axios.post('/api/comment/addComment', data, config)
      
       toast.success(res.data.message)
       setComment('')
       setLoad(false)
       getComments()
       
     } catch (error) {
       console.log(error)
       setLoad(false)
     }
  }

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
      <h3 className='text-center mt-5 pt-5'>Who wins the World Championship?</h3>

       
       <form onSubmit={handleSubmit}>
          
          <input type="text"
                 value={comment}
                 placeholder='Your Team'
                 className='w-100 px-2 py-1'
                 onChange={e => setComment(e.target.value)} />
    
          <button className='btn btn-primary mt-2 vstack mx-auto rounded-1 w-100' 
          type='submit'>
            Add comment
          </button>
        
       </form>

       
       
        {
          load ? (
             <p className='text-center mt-5'> <Loading type="gradient" /></p>
          ) : (
            <div className="commentsBox">
        <p className='text-center mt-3'>Total Comments: {totalCom}</p>
           {
            allComments.slice(0,visible).map( item => (
              <div className="card m-3 px-2" key={item._id}>

                 
                <div className='d-flex mt-1 justify-content-between'>
                      <div className='d-flex'>
                        <FaUserAlt className='userIcon'/>
                        <p className='ms-2'>{item.userName}</p>
                      </div>
                      <div className='d-flex'>
                        <TfiEmail className='emailIcon'/>
                        <p className='ms-2'>{item.userEmail}</p>
                      </div>
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


        .userIcon, .commentIcon, .dateIcon, .likeIcon, .emailIcon {
          position: relative;
          top: 4px;
        }

        .commentsBox {
          position: relative;
          width: 375px;
          margin: 30px auto 60px;
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
