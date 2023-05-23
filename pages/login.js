import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userInside } from '@/reduxFile/userSlice';



const Login = () => {

   const dispatch = useDispatch()
   
   const [email, setEmail ] = useState('')
   const [password, setPassword ] = useState('')
   const [loading, setLoading] = useState(false)
   const router = useRouter()

  const data = { email, password }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!email.includes('@') || !email.includes('.') || !email) return toast.error('Invalid Email!')
    if(!password || password.length < 3 || password.length > 12) return toast.error('Invalid Password!')
 
   const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
  
  try {
    
    setLoading(true)
    const res = await axios.post('/api/user/login', data, config)
    //console.log(res.data)

    dispatch(userInside(res.data))
    if (typeof window !== "undefined") {
    window.localStorage.setItem('auth', JSON.stringify(res.data))
    }

    toast.success(res.data.message)
    router.push('/comment')

    setEmail('')
    setPassword('')

    setLoading(false)
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    setLoading(false)
  }

}



  return (
    <>
      <div className="formBox">

        <form  onSubmit={handleSubmit}>

            <h3 className='text-center mb-3'>Log In</h3>

              <input type="email" 
                     placeholder='Email'
                     className='w-100  px-2 py-1'
                     value={email}
                     onChange={e => setEmail(e.target.value)}/>

              
                <input type="password"
                     placeholder='Password'
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className='w-100 mt-2 px-2 py-1' /> 

             
              <button className='btn btn-primary w-100 rounded-1 mt-3'
                      disabled={email === '' || password === ''}
                      type='submit'>
                {loading ? 'Processing' : 'Log In'}
              </button>  

              {/* <Link href={'/forgotPassword'} 
                    style={{textDecoration: 'none'}}>
               Forgot password?
              </Link> */}
            
       </form>
       <p className='text-center mt-2'>Don&apos;t have account? 
                 <Link href='/register' 
                       className='ms-2'
                       style={{textDecoration: 'none'}}>
                    Sign Up
                 </Link> 
        </p>

      </div>
    
    <style>{`

      .btnview {
        position: relative;
        width: 40px;
        height: 36px;
        background: white;
        border: .5px solid gray;
        top: 7.5px;
      }
      
      .formBox {
        position:relative;
        width: 375px;
        height: 77vh;
        margin: 0 auto;
        top: 200px;
      }
 
     
      .textOr {
        position: relative;
        top:-40px!important;
        padding: 10px;
        width: 36px;
        background-color: white;
        margin: 0 auto;
      }
      
      .user-icon {
        font-size: 40px;
        background-color: #e3e3e3;
        border-radius: 50%;
        padding:15px;
        color:#303030;
      }
    `}</style>

     
    </>
  )
}  

 export default Login 