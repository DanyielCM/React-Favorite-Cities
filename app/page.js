'use client';

import React, { useEffect, useRef } from 'react';
import CityCard from '@/components/city-card';
import classes from './page.module.css';

export default function Home() {
  const cityCardRefs = useRef([]);

  const predefinedCities = [
    'New York',
    'Milan',
    'Paris',
    'Sydney',
    'Cape Town',
    'London',
    'Dubai',
    'Singapore',
    'Rome',
    'Bangkok',
    'Los Angeles',
    'San Francisco',
    'Hong Kong',
    'Istanbul',
    'Barcelona',
    'Berlin',
    'Amsterdam',
    'Moscow',
    'Shanghai',
    'Mumbai',
    'Toronto',
    'Bucharest',
    'Rio de Janeiro',
    'Buenos Aires',
    'Chicago',
    'Mexico City',
    'Vienna',
    'Cairo',
    'Beijing',
    'Melbourne',
  ];

  const getRandomCities = (count) => {
    return predefinedCities.sort(() => Math.random() - 0.5).slice(0, count);
  };

  useEffect(() => {
    const randomCities = getRandomCities(5);
    randomCities.forEach((city, index) => {
      cityCardRefs.current[index]?.fetchCityInfo(city);
    });
  }, []);

  return (
    <div className={classes.popularPlaces}>
      <h2 className={classes.title}>Discover popular places</h2>
      <div className={classes.cards}>
        {predefinedCities.map((city, index) => (
          <div key={index} className={classes.cardContainer}>
            <CityCard ref={(el) => (cityCardRefs.current[index] = el)} />
          </div>
        ))}
      </div>
    </div>
  );
}
