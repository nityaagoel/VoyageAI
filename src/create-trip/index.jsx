// import React, { useEffect, useState } from 'react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import { Input } from "@/components/ui/input";
// import { SelectBudgetOptions, SelectTravelersList, AI_PROMPT } from '@/constants/options';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { chatSession } from '@/service/AImodel';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from '@/components/ui/dialog';
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";

// function CreateTrip() {
//   const [place, setPlace] = useState();
//   const [formData, setFormData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }

//   useEffect(() => {
//     console.log(formData);
//   }, [formData])

//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error)
//   })

//   const GetUserProfile = (tokenInfo) => {
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo?.access_token}`,
//         Accept: 'Application/json'
//       }
//     }).then((resp) => {
//       console.log(resp);
//       localStorage.setItem('user', JSON.stringify(resp.data));
//       setOpenDialog(false);
//       OnGenerateTrip();
//     })
//   }

//   const OnGenerateTrip = async () => {
//     const user = localStorage.getItem('user')
//     if (!user) {
//       setOpenDialog(true)
//       return;
//     }
//     if (formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
//       toast("Please fill all details!")
//       return;
//     }
    
//     setLoading(true);
//     const FINAL_PROMPT = AI_PROMPT
//       .replace('{location}', formData?.location?.label)
//       .replace('{totalDays}', formData?.noOfDays)
//       .replace('{traveler}', formData?.traveler)
//       .replace('{budget}', formData?.budget)

//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     console.log(FINAL_PROMPT);
//     console.log("--",result?.response?.text());
//     setLoading(false);
//     SaveAiTrip(result?.response?.text());
//   }

//   const SaveAiTrip = async (TripData) => {
//     setLoading(true);
//     const user = JSON.parse(localStorage.getItem("user"));
//     const docId = Date.now().toString();
//     await setDoc(doc(db, "AiTrips", docId), {
//       userSelection: formData,
//       tripData: JSON.parse(TripData),
//       userEmail: user?.email,
//       id: docId
//     });
//     setLoading(false);
//     navigate('/view-trip/' + docId);
   
//   }

//   return (
//       <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//       <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
//       <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based n your preferences.</p>
//       <div className='mt-20 flex flex-col gap-9'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => { setPlace(v); handleInputChange('location', v) },
//             }}
//           />
//         </div>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>How many days are you planning trip?</h2>
//           <Input placeholder={'Ex.3'} type="number"
//             onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//           />
//         </div>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
//           <div className='grid grid-cols-3 gap-5 mt-5'>
//             {SelectBudgetOptions.map((item, index) => (
//               <div key={index} onClick={() => handleInputChange('budget', item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
//                     ${formData?.budget == item.title && 'shadow-lg border-black'}
//                   `}>
//                 <h2 className='text-4xl'>{item.icon}</h2>
//                 <h2 className='font-bold text-lg'>{item.title}</h2>
//                 <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
//           <div className='grid grid-cols-3 gap-5 mt-5'>
//             {SelectTravelersList.map((item, index) => (
//               <div key={index} onClick={() => handleInputChange('traveler', item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
//                   ${formData?.traveler == item.people && 'shadow-lg border-black'}
//                   `}>
//                 <h2 className='text-4xl'>{item.icon}</h2>
//                 <h2 className='font-bold text-lg'>{item.title}</h2>
//                 <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="my-10 flex justify-end ">
//         <Button onClick={OnGenerateTrip} disabled={loading} >
//           {loading ?
//             <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
//             : 'Generate Trip'}
//         </Button>
//       </div>

//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="/logo.svg" />
//               <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
//               <p>Sign in to the App with Google Authentication Security</p>
//               <Button
//                 onClick={login}
//                 className="w-full mt-5 gap-4 items-center">
//                 <FcGoogle className='h-1 w-7' />
//                 Sign in with Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
    
//   )
// }

// export default CreateTrip
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelersList, AI_PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

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
      OnGenerateTrip();
    })
  }

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user')
    if (!user) {
      setOpenDialog(true)
      return;
    }
    if (formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details!")
      return;
    }
    
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(FINAL_PROMPT);
    console.log("--",result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
   
  }

  return (
    <div className='relative min-h-screen'>
      {/* Enhanced background with geometric patterns */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100 -z-10'></div>
      
      {/* Travel-themed background elements */}
      <div className='absolute inset-0 opacity-15 -z-5'>
        <svg className='absolute top-10 left-10 w-32 h-32 text-blue-600 animate-float' fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
        <svg className='absolute top-32 right-20 w-24 h-24 text-purple-600 animate-float delay-1000' fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <svg className='absolute bottom-20 left-20 w-28 h-28 text-blue-500 animate-float delay-500' fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
        <svg className='absolute bottom-32 right-32 w-20 h-20 text-purple-500 animate-float delay-700' fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 6.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S13.38 9 12 9 9.5 7.88 9.5 6.5zM11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      </div>
      
      {/* Floating elements for modern touch */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30 blur-3xl animate-pulse'></div>
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl animate-pulse delay-1000'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-25 blur-3xl animate-pulse delay-2000'></div>
      
      {/* Grid pattern overlay */}
      <div className='absolute inset-0 opacity-[0.08] -z-5' style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>

      {/* Main Content */}
      <div className='relative z-10 px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-10 max-w-7xl mx-auto'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
        
        <div className='mt-20 flex flex-col gap-9'>
          <div>
            <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) },
              }}
            />
          </div>
          <div>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning trip?</h2>
            <Input placeholder={'Ex.3'} type="number"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>
          <div>
            <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index} onClick={() => handleInputChange('budget', item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300
                      ${formData?.budget == item.title && 'shadow-lg border-black'}
                    `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelersList.map((item, index) => (
                <div key={index} onClick={() => handleInputChange('traveler', item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg bg-white/80 backdrop-blur-sm transition-all duration-300
                    ${formData?.traveler == item.people && 'shadow-lg border-black'}
                    `}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button onClick={OnGenerateTrip} disabled={loading} className="bg-gradient-to-r from-[#382f98] to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
            {loading ?
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              : 'Generate Trip'}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent className="bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
                <p>Sign in to the App with Google Authentication Security</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 gap-4 items-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                  <FcGoogle className='h-7 w-7' />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subtle animated dots */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-bounce delay-300'></div>
        <div className='absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-bounce delay-700'></div>
        <div className='absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 animate-bounce delay-1000'></div>
        <div className='absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-40 animate-bounce delay-500'></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default CreateTrip