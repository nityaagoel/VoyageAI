// import React from 'react';
// import HotelCardItem from './HotelCardItem';
// import { Link } from 'react-router-dom';

// function Hotels({ trip }) {
//   return (
//     <div>
//       <h2 className='font-bold text-xl my-7'>Hotel Recommendation</h2>
//       <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
//         {trip?.tripData?.hotelOptions?.map((hotel, index) => (
//           <Link
//             key={index}
//             to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//               hotel?.hotelName + ' ' + hotel?.hotelAddress
//             )}`}
//             target='_blank'
//           >
//             <HotelCardItem item={hotel} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Hotels;

import React from 'react';
import HotelCardItem from './HotelCardItem';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8">
      <h2 className='font-bold text-xl my-7'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotel?.hotelName + ' ' + hotel?.hotelAddress
            )}`}
            target='_blank'
          >
            <HotelCardItem item={hotel} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;