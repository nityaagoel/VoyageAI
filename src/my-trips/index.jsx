import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItems from './components/UserTripCardItems';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

 const GetUserTrips = async () => {
  const tripsRef = collection(db, 'AiTrips');
  const querySnapshot = await getDocs(tripsRef);
  
  const trips = [];
  setUserTrips([])
  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() });
  });

  setUserTrips(trips);
  setLoading(false);
};

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl mb-4'>My Trips</h2>

      {loading ? (
        <p>Loading trips...</p>
      ) : userTrips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
          {userTrips.map((trip) => (
            <UserTripCardItems key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
