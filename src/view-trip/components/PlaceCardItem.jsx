import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && GetPlaceImg();
    }, [place])

    const GetPlaceImg = async () => {
        const data = {
            textQuery: place.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.geoCoordinates} target='_blank'>
                <div className='my-6 bg-white p-4 gap-4 border rounded-xl shadow-sm flex hover:scale-105 transition-all hover:shadow-lg cursor-pointer h-[220px] w-full'>
                    {/* Image container with fixed dimensions */}
                    <div className='flex-shrink-0'>
                        <img 
                            src={photoUrl ? photoUrl : '/road-trip-vocation.jpg'} 
                            className='w-[140px] h-[180px] rounded-xl object-cover' 
                            alt={place.placeName}
                        />
                    </div>
                    
                    {/* Content container that takes remaining space */}
                    <div className='flex-1 flex flex-col justify-between min-w-0 py-3 pr-0'>
                        <div className='space-y-2'>
                            <h2 className='font-semibold text-base text-orange-600'>{place.day}</h2>
                            <h2 className=' text-lg text-gray-900 line-clamp-1'>{place.placeName}</h2>
                            <p className='text-sm text-gray-700 leading-relaxed'
                               style={{
                                 display: '-webkit-box',
                                 WebkitLineClamp: 2,
                                 WebkitBoxOrient: 'vertical',
                                 overflow: 'hidden'
                               }}>
                               {place.placeDetails}
                            </p>
                        </div>
                        <div className='space-y-1 mt-2'>
                            <h2 className='text-blue-700 text-sm font-semibold'>{place.ticketPricing}</h2>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-sm text-yellow-600 font-semibold'>⭐{place.rating}</h2>
                                <Button size="sm" className="h-8 w-8 flex-shrink-0">
                                    <FaLocationDot className="text-sm" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}

export default PlaceCardItem