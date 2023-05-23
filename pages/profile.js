/* eslint-disable @next/next/no-img-element */


import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { userImage } from '@/reduxFile/userSlice';


const Profile = () => {

const { user, userImg } = useSelector((state) => state.userAuth)
//console.log(user)
const dispatch = useDispatch()


const [editForm, setEditForm] = useState(false)
const [name, setName] = useState(user?.user?.name)
const [email, setEmail] = useState(user?.user?.email)

const [born, setBorn] = useState(user?.user?.createdAt || '')

//console.log(born) // 2023-05-21T04:55:14.482Z
const created = born.substring(0,10)
//console.log(created)

const yr = created.slice(0,4)  
//console.log(yr) // 2023

const d = created.slice(8,10)
//console.log(d) // 21

const m = created.slice(5,7)
//console.log(m) //05

const resDate = m + '-' + d + '-' + yr
//console.log(resDate) 
 




const handleEdit = () => {
  setEditForm(!editForm)
  
  if(editForm === false) {
    setName(user?.user?.name)
  }
}

const handleEditImage = async (imgID) => {

  try {
      await axios.put('/api/user/profileEdit' , {email, imgID})
  } catch (error) {
    console.log(error)
    toast.error('Something wrong! Please try it later.')
  }
}



  return (
    <>
      
      <div className="profileBox">
          <h3 className='text-center mt-5 pt-5'>Profile</h3>

      <form >
          <p>Image Profile: </p> 
          <img src={userImg} className='imgMush' alt="img" />

         {/*  NEED REFACTORE, NOT NOW !!!! */}

          {
            editForm && (
              <>
                <p className='fw-semibold text-danger'>Select Profile Image:</p>
                <div className="my-2">

                  <img src={'/svk.png'}
                      className='setPImg1 border' 
                      onClick={() => [ handleEditImage('/svk.png'),
                                      dispatch(userImage('/svk.png'))] }
                      alt="img" />

                  <img src={'/cz.png'} 
                       onClick={() => [handleEditImage('/cz.png'),
                                       dispatch(userImage('/cz.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/ca.png'} 
                       onClick={() => [handleEditImage('/ca.png'),
                                       dispatch(userImage('/ca.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/fin.png'} 
                       onClick={() => [handleEditImage('/fin.png'),
                                       dispatch(userImage('/fin.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/swe.png'} 
                       onClick={() => [handleEditImage('/swe.png'),
                                       dispatch(userImage('/swe.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/swi.png'} 
                       onClick={() => [handleEditImage('/swi.png'),
                                       dispatch(userImage('/swi.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/usa.png'} 
                       onClick={() => [handleEditImage('/usa.png'),
                                       dispatch(userImage('/usa.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/ger.png'} 
                       onClick={() => [handleEditImage('/ger.png'),
                                       dispatch(userImage('/ger.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/nor.png'} 
                       onClick={() => [handleEditImage('/nor.png'),
                                       dispatch(userImage('/nor.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/fra.png'} 
                       onClick={() => [handleEditImage('/fra.png'),
                                       dispatch(userImage('/fra.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/aus.png'} 
                       onClick={() => [handleEditImage('/aus.png'),
                                       dispatch(userImage('/aus.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/dan.png'} 
                       onClick={() => [handleEditImage('/dan.png'),
                                       dispatch(userImage('/dan.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/hungary.png'} 
                       onClick={() => [handleEditImage('/hungary.png'),
                                       dispatch(userImage('/hungary.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/kaz.png'} 
                       onClick={() => [handleEditImage('/kaz.png'),
                                       dispatch(userImage('/kaz.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                  <img src={'/slovenia.png'} 
                       onClick={() => [handleEditImage('/slovenia.png'),
                                       dispatch(userImage('/slovenia.png'))]} 
                       className='setPImg1' 
                       alt="img" />
                       
                  <img src={'/lat.png'} 
                       onClick={() => [handleEditImage('/lat.png'),
                                       dispatch(userImage('/lat.png'))]} 
                       className='setPImg1' 
                       alt="img" />

                </div>
              </>
            )
          }
         <p >Name: {name}</p>
         <p >Email: {email}</p> 
         <p >Created: {resDate}</p> 
      </form>
 
      <button
         onClick={handleEdit}
         id='editBtn'
         className='btn btn-primary vstack mx-auto rounded-1 mt-3'>
        {editForm ? 'Close' : 'Edit'}
      </button>
      </div>


      <style>{`

     .profileBox {
          position: relative;
          width: 100%;
          height: 72vh;
     }
     
     
      .setPImg1  {
        position: relative;
        width: 40px;
        cursor: pointer;
        margin: 4px;
        border: 1px solid gray;
      }
     

      .imgMush {
        position: relative;
        width: 100px;
      }
       
       form {
        position:relative;
        width: 375px;
        margin: 0 auto;
       }
       
       .noBorder {
        border: 1px solid white;
        pointer-events:none;
       }



      `}</style>

    </>
  )
}

export default Profile