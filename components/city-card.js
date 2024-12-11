'use client';

import Image from 'next/image';
import classes from './city-card.module.css';
import React, { useState, useEffect, use } from 'react';
import { calculateDistance } from '@/utils/distance-calc';
import Modal from './modal';
import Button from '@/UI/button';

const CityCard = React.forwardRef((props, ref) => {
  const [cityInfo, setCityInfo] = useState(null);
  const [cityDistance, setCityDistance] = useState('');
  const [userProgress, setUserProgress] = useState('');

  function handleShowModal() {
    setUserProgress('modal');
  }

  function handleHideModal() {
    setUserProgress('');
  }

  useEffect(() => {
    if (cityInfo) {
      navigator.geolocation.getCurrentPosition((position) => {
        const distance = calculateDistance(
          cityInfo.location.lat,
          cityInfo.location.lng,
          position.coords.latitude,
          position.coords.longitude
        );
        setCityDistance(distance.toFixed(2) + 'km');
      });
    }
  }, [cityInfo]);

  const fetchCityInfo = async (cityName) => {
    try {
      const response = await fetch(
        `/api/cities?city=${encodeURIComponent(cityName)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setCityInfo(data);
    } catch (error) {
      console.error('Error fetching city info:', error);
    }
  };

  React.useImperativeHandle(ref, () => ({
    fetchCityInfo,
  }));

  return (
    <>
      {cityInfo && (
        <>
          <div className={classes.container}>
            <div className={classes.card}>
              <div className={classes.background}>
                {cityInfo.photos.slice(0, 1).map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`City Photo ${index + 1}`}
                    // layout='intrinsic'
                    width={600}
                    height={500}
                    className={classes.image}
                  />
                ))}
                <h2>{cityInfo.name}</h2>
              </div>
              <div className={classes.front}>
                <div className={classes.textCtr}>
                  <h2>More Info</h2>
                  <p>Address: {cityInfo.address}</p>
                  <p>Distance from your location: {cityDistance}</p>
                  <Button onClick={handleShowModal}>See all photos</Button>
                </div>
              </div>
            </div>
          </div>

          <Modal
            className={classes.modal}
            open={userProgress === 'modal'}
            onClose={userProgress === 'modal' ? handleHideModal : undefined}
          >
            <div className={classes.modalRow}>
              <h2>{cityInfo.name}</h2>
              <Button onClick={handleHideModal}>Close</Button>
            </div>

            <div className={classes.gallery}>
              {cityInfo.photos.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`City Photo ${index + 1}`}
                  layout='intrinsic'
                  width={300}
                  height={300}
                  className={classes.imageGallery}
                />
              ))}
            </div>
          </Modal>
        </>
      )}
    </>
  );
});

CityCard.displayName = 'CityCard';

export default CityCard;

// const [showAllPhotos, setShowAllPhotos] = useState(false);

// const togglePhotoDisplay = () => {
//   setShowAllPhotos((prevState) => !prevState);
// };

// useEffect(() => {
//   setShowAllPhotos(false);
// }, [cityInfo]);

{
  /* <button className={classes.toggleButton} onClick={togglePhotoDisplay}>
  {showAllPhotos ? 'Show Less' : 'Show All Photos'}
</button>; */
}
{
  /* <div className={classes.photos}>
  {showAllPhotos
    ? cityInfo.photos.map((url, index) => (
        <Image
          key={index}
          src={url}
          alt={`City Photo ${index + 1}`}
          layout='intrinsic'
          width={600}
          height={500}
        />
      ))
    : cityInfo.photos
        .slice(0, 1)
        .map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`City Photo ${index + 1}`}
            layout='intrinsic'
            width={600}
            height={500}
          />
        ))}
</div>; */
}
{
  /* <Modal></Modal> */
}
{
  /* <button className={classes.toggleButton} onClick={openModal}>
            Show All Photos
          </button> */
}
