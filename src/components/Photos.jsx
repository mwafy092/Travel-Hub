import React, { useState, useEffect, useContext } from 'react';
import '../styles/Photo.scss';
import { CountryContext } from './CountryContext';
import Error from './assets/error.svg';
const Photos = () => {
    /**
     * photos component used to get photos related to country
     * context api used to retrieve data related to country
     * pixabay API used to get photos
     */

    //  context API
    const [country] = useContext(CountryContext);

    // state to save photos
    const [photos, setPhotos] = useState([]);

    // calling fetch api to get data related to photos
    const getPhotos = async () => {
        const API_KEY = `18025631-21fc69eb9242d4f0ccc554e3b`;
        const _country = (await country[0].country)
            ? await country[0].country
            : 'italy';
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${_country}&image_type=photo&orientation=vertical`;

        const response = await fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                // getting only three photos from all data
                let [photo1, photo2, photo3] = data.hits;
                let allPhotos = [photo1, photo2, photo3];
                setPhotos(allPhotos);
            });
    };

    // calling fetch api when country changed
    useEffect(() => {
        getPhotos();
    }, [country]);
    // error handling for no photos option
    if (!photos[0] || !photos[1] || !photos[2]) {
        return (
            <div className='error' style={{ textAlign: 'center' }}>
                <img src={Error} alt='' width='100px' />
                <p style={{ color: '#4EBA9A', fontWeight: '600' }}>
                    <i
                        className='fas fa-bomb'
                        style={{ fontSize: '2rem', margin: '1rem' }}></i>
                    no photos to show
                </p>
            </div>
        );
    }
    return (
        <React.Fragment>
            {photos.map((photo) => (
                <div className='photo animate5' key={photo.id}>
                    <p>{photo.user}</p>
                    <i className='fas fa-thumbtack'>
                        <span>{country[0].country}</span>
                    </i>
                    <img src={photo.largeImageURL} alt={photo.id} />
                </div>
            ))}
        </React.Fragment>
    );
};

export default Photos;
