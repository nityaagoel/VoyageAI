import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (item?.hotelName) {
      GetPlaceImg();
    }
  }, [item]);

  const GetPlaceImg = async () => {
    try {
      const data = {
        textQuery: item?.hotelName,
      };
      const resp = await GetPlaceDetails(data);

      const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoName) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo for hotel:", error);
    }
  };

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          item?.hotelName + ', ' + item?.hotelAddress
        )}`}
        target='_blank'
      >
        <div className='hover:scale-105 transition-all cursor-pointer'>
          <img
            src={photoUrl || '/road-trip-vacation.jpg'}
            className='rounded-xl h-[180px] w-full object-cover'
            alt={item?.hotelName}
          />
          <div className='my-3 py-2'>
            <h2 className='font-medium'>{item?.hotelName}</h2>
            <h2 className='text-xs text-gray-500'>📍 {item?.hotelAddress}</h2>
            <h2 className='text-sm'>💰 {item?.price}</h2>
            <h2 className='text-sm'>⭐ {item?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
