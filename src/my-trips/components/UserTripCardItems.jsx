import React, { useEffect, useState } from 'react';
import placeholder from './placeholder.jpg'; // or from /public
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItems({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    
      useEffect(() => {
        if (trip?.userSelection?.location?.label) {
          GetPlaceImg();
        }
      }, [trip]);
    
      const GetPlaceImg = async () => {
        const data = {
          textQuery: trip.userSelection.location.label,
        };
    
        try {
          const resp = await GetPlaceDetails(data);
          const photos = resp?.data?.places?.[0]?.photos;
    
          if (photos && photos.length > 0) {
            const photoName = photos[0].name; // Use first photo
            const photoUrlResolved = PHOTO_REF_URL.replace('{NAME}', photoName);
            setPhotoUrl(photoUrlResolved);
          } else {
            console.warn("No photos available for this place.");
          }
        } catch (error) {
          console.error("Failed to fetch place details:", error);
        }
      };
  return (
    <Link to={'/view-trip/'+trip?.id}>  
    <div className="p-4 border shadow rounded-xl">
      <img 
        src={photoUrl?photoUrl:placeholder}
        alt="Trip"
        className="object-cover rounded-xl h-32 w-full mb-2"
      />
      <div className="text-sm text-gray-800">
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.budget} Budget</h2>

      
      
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItems;
