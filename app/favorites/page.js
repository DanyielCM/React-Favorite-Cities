import { auth } from '@/configurations/auth';
import classes from './page.module.css';
import FavoriteCities from '@/components/favorite-cities';

export default async function Favorites() {
  const session = await auth();
  let favoriteCities = [];

  async function fetchLocationData() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/favorites?email=${encodeURIComponent(
          session?.user?.email
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to get data:', await response.text());
      } else {
        console.log('Data get successfully');
        return response.json();
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  if (session?.user) {
    const locations = await fetchLocationData();
      if (locations) {
        console.log('User data found:', locations);
        locations.forEach((location) => {
          favoriteCities.push(location);
        });
      } else {
        console.log('Custom message');
      }
  } else {
    console.log('Custom message');
  }


  return (
    <>
      <FavoriteCities favoriteCities={favoriteCities} session={session}></FavoriteCities>
    </>
  );
}
