import React, {useEffect, useState } from 'react';import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { FcGoogle } from "react-icons/fc";  
import axios from 'axios';

function Header() {

  const user= JSON.parse(localStorage.getItem( 'user'));
  const [openDialog, setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }

  useEffect(()=>{
    console.log(user)
  },[])

  return (
    <div className='p-1 shadow-sm flex justify-between items-center px-3'>
      <img
        src='./src/assets/logo1.png'
        alt='Logo'
        className='h-20 w-auto' 
      />
      <div className='flex gap-3'> 
        <Button>About Us</Button> 
        <div>
        {user ?

        <div className='flex item-centre gap-5'>
          <Button varient="outline" className='rounded-full'>My Trips</Button>
          
          <Popover>
            <PopoverTrigger>
              <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
            </PopoverTrigger>
            <PopoverContent>
              <h2 className='cursor-pointer' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>
              </PopoverContent>
          </Popover>
        
        </div>
          : 
          <Button onClick={()=>setOpenDialog(true)} >Sign In</Button>
        }
        </div>
        <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
              <p>Sign in to the App with Google Authentication Security</p>
              <Button
                onClick={login}
                className="w-full mt-5 gap-4 items-center">
                <FcGoogle className='h-1 w-7' />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}

export default Header

