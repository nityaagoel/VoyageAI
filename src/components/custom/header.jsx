import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); // ✅ Setup hook
  const user = JSON.parse(localStorage.getItem('user'));

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

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
      window.location.reload(); // Optional: better UX is navigate directly
    });
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img
        src="/logo1.png"
        alt='Logo'
        className='h-20 w-auto'
      />
      
      <div className='flex items-center gap-3'>
        <Button className='bg-gradient-to-r from-[#382f98] to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-7 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out border-0 relative overflow-hidden group'
                onClick={() => navigate('/')}>
                About Us 
        </Button>
        <Button className='bg-gradient-to-r from-[#382f98] to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-7 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out border-0 relative overflow-hidden group'
                onClick={() => navigate('/create-trip')}>
                + Create Trip
        </Button>
        <div>
          {user ? (
            <div className='flex items-center gap-3'>
              <Button className='bg-gradient-to-r from-[#382f98] to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-7 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out border-0 relative overflow-hidden group'
                onClick={() => navigate('/my-trips')}>
                My Trips
              </Button>

              <Popover>
                <PopoverTrigger className='flex items-center'>
                  <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="./src/assets/logo1.png" className='mx-auto mb-4' />
                <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
                <p>Sign in to the App with Google Authentication Security</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center justify-center">
                  <FcGoogle className='h-5 w-5' />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;