


import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify'
import axios from "axios";







const Register = () => {

   const [name, setName] = useState('')
   const [email, setEmail ] = useState('')
   const [password, setPassword ] = useState('')
   const [confirm, setConfirm ] = useState('')
   const [validation, setValidation] = useState('')
   const [length, setLength] = useState('')
   const [loading, setLoading] = useState('')
   const [image, setImage] = useState('/mush.jpg')


  const data = {email, name, password, image}
 

const router = useRouter()

 useEffect(()=> {
   
   if(password.length < 4 || password.length > 12 ){
      setLength('red')
   } else {
      setLength('green')
   }
  
   if(validation !== password || password === '') {
     setConfirm('red')
   } else {
    setConfirm('green')
   }


 },[password, validation])  

 

const handleSubmit = async (e) => {
  e.preventDefault()


  if(!name) return toast.error('Invalid Name!')
  if(!email.includes('@') || !email.includes('.') || !email) return toast.error('Invalid Email!')
  if(!password || password.length < 3 || password.length > 12) return toast.error('Invalid Password!')


  const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
  
  try {
    setLoading(true)
    const res = await axios.post('/api/user/register', data, config)
    //console.log(res.data)

    toast.success(res.data.message)
    if(res.data.message === 'Register Success. Please Login!') {
       router.push('/login')
    }
    

    setName('')
    setEmail('')
    setPassword('')
    setValidation('')
    setLoading(false)
    
  } catch (error) {
    console.log(error)
    setLoading(false)
  }

}

  return (
   
    <>
    
        <div className="registerBox">
          <form  onSubmit={handleSubmit} >
           
             <h3 className="text-center mb-3">Sign Up</h3>

            <input onChange={(e) => setName(e.target.value)} 
                   type='text'
                   value={name}
                   placeholder="Name"
                   className='w-100 mt-2 px-2 py-1'/> 

            <input onChange={(e) => setEmail(e.target.value)} 
                   type='email'
                   value={email}
                   placeholder="Email"
                   className='w-100 mt-2 px-2 py-1'/>
          
            <input onChange={(e) => setPassword(e.target.value)} 
                   type='password' 
                   value={password}
                   placeholder="Password"
                   className='w-100 mt-2 px-2 py-1'></input>
           
            <input onChange={(e) => setValidation(e.target.value)}   
                   type='password' 
                   placeholder="Confirm Password"
                   className='w-100 mt-2 px-2 py-1'></input>
        
          <div className='mt-2'>
            {/* <p>
               <span className='mt-0 me-2'>
                        <FaCheck/>
                </span>
                Email
            </p> */}
            <p className='d-flex' style={{color:`${length}`}}>
                <span className='mt-0 me-2'>
                        <FaCheck/>
                </span> 
                Password: 4 to 12 characters
            </p>
            <p className='d-flex' style={{color:`${confirm}`, position: 'relative', top: '-15px'}}>
                <span className='mt-0 me-2'>
                        <FaCheck/>
                </span> 
                Confirmed
            </p>

          </div>
          
 
            {/* BUTTON */}
              <button className="btn btn-primary w-100 rounded-0"
                disabled={
                  confirm === 'red' ||
                  password.length < 4 || 
                  password.length > 12}
                
               type='submit' >
                {loading ? 'Processing': 'Sign Up'}
              </button>
       
       </form>
        </div>


    <style>{`

    .registerBox {
      position: relative;
      width: 100%;
      height: 80vh;
    }
    
     
     form {
        position:relative;
        top: 200px;
        width: 375px;
        margin: 0 auto;
        padding: 10px 20px;
        border-radius:5px;
      }
     
     .bold {
      font-weight: 500;
     }
    `}</style>
         
    </>
  )
}

export default Register