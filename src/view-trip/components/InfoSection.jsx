import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Button } from '@/components/ui/button';
import { FaShare } from 'react-icons/fa6';

function InfoSection({ trip }) {
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
    <div className="max-w-xl mx-auto">
      <img
        className="h-[200px] sm:h-[280px] md:h-[340px] w-full object-cover rounded-xl"
        src={photoUrl || "/road-trip-vocation.jpg"} // fallback if API fails
        alt="Destination"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start mt-5 gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="p-2 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm font-medium">
              📆 {trip?.userSelection?.noOfDays} Day{trip?.userSelection?.noOfDays > 1 ? 's' : ''}
            </span>
            <span className="p-2 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm font-medium">
              💰 {trip?.userSelection?.budget} Budget
            </span>
            <span className="p-2 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm font-medium">
              👥 {trip?.userSelection?.traveler} Traveler{trip?.userSelection?.traveler > 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        {/* Share Button - properly aligned */}
        <div className="flex-shrink-0 self-start sm:self-center">
          <Button 
            size="lg" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <FaShare className="text-sm" />
            <span className="hidden sm:inline text-sm font-medium">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;