/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { userLogOut } from '@/reduxFile/userSlice';
import { toast } from 'react-toastify';


const Navbar = () => {

const { user, userImg  } = useSelector((state) => state.userAuth)

//console.log(user)


const router = useRouter()
const dispatch = useDispatch()

const handleLogOut = () => {

 if (typeof window !== "undefined") {
    window.localStorage.removeItem('auth')
  }

 dispatch(userLogOut(null))

 toast.success('Sign Out!')
  
 router.push('/')
}


  return (
    <>
     <nav>

      <Link href={'/'} style={{textDecoration: 'none'}}>
         <h3 className='link'>Comment App</h3>
       </Link>
      
  
       <div className="btn-group">

         {
          user !== null &&  (
              <button type="button" className="btn btn-secondary dropdown-toggle my-2 rounded-1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* <FiUser className='userIcon'/> */} {user?.user?.name} &nbsp;
              </button>
          )  
         }

         {
          user === null && (
            <Link href={'/login'}>
              <button type="button" className="btn btn-secondary login"
                 style={{textDecoration: 'none'}} >
                  Log In
              </button>
            </Link>
          )
         }
        
           {
             user !== null && ( 
                <>
                   <ul className="dropdown-menu ps-2">
                    <div className="imgProfileBox">
                      <img src={userImg} className='imgProfile' alt="img" />
                    </div>
                    <li>
                      <Link href={'/'}
                            className='my-2'
                            style={{textDecoration: 'none', color: 'black'}}>
                        Home
                      </Link>  
                    </li>

                    <li>
                      <Link href={'/profile'}
                            className='my-2'
                            style={{textDecoration: 'none', color: 'black'}}>
                        User Profile
                      </Link>  
                    </li>
                    <li>
                      <Link href={'/comment'}
                            className='my-2'
                            style={{textDecoration: 'none', color: 'black'}}>
                        New Comment
                      </Link>  
                    </li>
                    <li>
                      <Link href={'https://full-world-cup-23.vercel.app/'}
                            target='_blank'
                            className='my-2'
                            style={{textDecoration: 'none', color: 'black'}}>
                        Voting App
                      </Link>  
                    </li>
                    
                    
                    <li>
                      <Link href={'/'}
                            className='my-2'
                            onClick={ () => handleLogOut()}
                            style={{textDecoration: 'none', color: 'black'}}>
                        Sign Out
                      </Link>  
                    
                    </li>
                  </ul>
                </>
              ) 
           }

        </div>

        
     </nav>

     <style>{`

     .imgProfileBox {
      position: relative;
      width: 100px;
      height: 50px;
      overflow: hidden;
      border: 1px solid gray;
      border-radius: 7px;
     }

     .imgProfile {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
     }

     .login {
      position: relative;
      top: 7px;
      border-radius: 3px;
     }

     .userIcon {
      position: relative;
      top: -2px;
     }

     
     nav {
        position: fixed;
        width: 98%;
        left: 1%;
        top: 6px;
        height: 55px;
        background: #0b1142;
        border: 1px solid white;
        border-radius: 6px;
        z-index: 500;
        display: flex;
        justify-content: space-between;
        padding: 0 25px;
        box-shadow: 1px 1px 11px gray;
       }

      
       .link {
        text-decoration: none;
        color: white;
        position: relative;
        padding-top: 9px;
        margin-left: 15px;
       }
       .link:hover {
        transition: all .4s;
        color: #ababab;
       }
       .active-link {
        color: white;
       }
      
     `}</style>
    </>
  )
}

export default Navbar