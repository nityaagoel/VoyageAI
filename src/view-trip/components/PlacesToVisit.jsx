import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg mt-10 mb-7'>Places to Visit</h2>
      <div>
        {trip.tripData && typeof trip.tripData.itinerary === 'object' ? (
          Object.entries(trip.tripData.itinerary).map(([day, info]) => (
            <div key={day} className='mt-5'>
              <h3 className='font-medium text-lg'>{day}</h3>
              <p className='font-medium text-sm text-orange-300'>{info.best_time_to_visit}</p>
              <div className='grid md:grid-cols-2 gap-5'>
                {Object.entries(info.places).map(([placeName, placeDetails]) => (
                  <div key={placeName}>
                    <div className='my-3'>
                      <PlaceCardItem place={placeDetails} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available</p>
        )}
      </div>
    </div>
  )
}

export default PlacesToVisit
