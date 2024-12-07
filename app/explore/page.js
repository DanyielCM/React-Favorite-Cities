'use client';

import CityCard from '@/components/city-card';
import { useInput } from '@/hooks/useInput';
import classes from './page.module.css';
import { useRef } from 'react';

export default function Explore() {
  const cityCardRef = useRef(null);

  const {
    value: cityNameValue,
    handleInputChange,
    handleInputBlur,
    hasError,
  } = useInput('', (value) => isNotEmpty(value));

  function isNotEmpty(value) {
    return value.trim() !== '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (hasError) {
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor='city-name'>Search your dream city</label>
        <div className={classes.formRow}>
          <input
            id='city-name'
            type='text'
            name='city-name'
            value={cityNameValue}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
          />
          <button
            onClick={() => cityCardRef.current?.fetchCityInfo(cityNameValue)}
            disabled={hasError}
            className={classes.searchButton}
          >
            Search City Info
          </button>
        </div>
        <div className={classes.error}>
          {hasError && <p>Please enter a valid input.</p>}
        </div>
      </form>
      <CityCard ref={cityCardRef} />
    </>
  );
}
