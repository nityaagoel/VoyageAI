import React, { useState ,useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodel';
import { SelectBudgetOptions, SelectTravelersList, AI_PROMPT } from '@/constants/options';
function CreateTrip() {
    const[place,setPlace]=useState();

    const[formData,setFormData] = useState();

    const handleInputChange = (name,value)=>{
        
        setFormData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(formData);
    },[formData])

    const OnGenerateTrip=async()=>{
        if(formData?.noOfDay>5 && !formData?.location || !formData?.budget || !formData?.traveller){
            toast("please fill all the details ")
            return; 
        }
        toast("Form generated.");
    
        const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(FINAL_PROMPT);
        console.log("--",result?.response?.text());
               
  
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10 text-left' >
        <h2 className='font-bold text-3xl'>Tell Us Your Travel Prefrences</h2>
        <p className='mt-3 text-grey-500 text-xl'> Just provide us with basic information and our travel planner will generate a customized itinerary based on your refrences     </p>
        <div className='mt-10 flex flex-col gap-1'>

        <div className="w-1/2">
            <h2 className='text-xl my-3 font-medium'>What is Your Destination ?</h2>
            <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                value: place,
                onChange: (v) => {
                    setPlace(v);
                    handleInputChange('location',v);
                }
                }}
            />
        </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>How Many Days Are You Planning Your Trip?</h2>
                <Input placeholder={'Ex.3'} type="number" 
                onChange={(e)=> handleInputChange('noOfDays',e.target.value)}
                className="w-1/2" />
                
            </div>

        </div>

        <div>
            <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item,index)=>(
                    <div key={index}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.budget==item.title&&'shadow-lg border-black'}
                        `}>
                        <h2 className='text-4xl'>{item.icon}</h2>
                        <h2 className='font-bold text-lg'>{item.title}</h2>
                        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className='text-xl font-medium my-10'>Who do you plan on travelling with on your next adventure ?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5 my-10'>
                {SelectTravelersList.map((item,index)=>(
                    <div key={index}
                        onClick={() => handleInputChange('traveller', item.people)}
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.traveller==item.people&&'shadow-lg border-black'}
                        `}>
                        <h2 className='text-4xl'>{item.icon}</h2>
                        <h2 className='font-bold text-lg'>{item.title}</h2>
                        <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                    </div>
                ))}
            </div>
        </div>
        <div className='my-10 justify-centre flex'>
            <Button onClick={OnGenerateTrip} >Generate Trip </Button>        

        </div>        
    </div>
  )
}

export default CreateTrip
