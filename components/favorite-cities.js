'use client';

import React, { useEffect, useRef } from 'react';
import CityCard from '@/components/city-card';
import classes from './random-cities.module.css';

export default function FavoriteCities({ favoriteCities, session }) {
  const cityCardRefs = useRef([]);

  useEffect(() => {
    favoriteCities.forEach((city, index) => {
      cityCardRefs.current[index]?.fetchCityInfo(city);
    });
  }, [favoriteCities]);

  return (
    <>
      {session && (
        <div className={classes.popularPlaces}>
          <h2 className={classes.title}>Your favorite cities</h2>
          <div className={classes.cards}>
            {favoriteCities.map((city, index) => (
              <div key={index} className={classes.cardContainer}>
                <CityCard
                  favoriteCities={favoriteCities}
                  session={session}
                  ref={(el) => (cityCardRefs.current[index] = el)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
