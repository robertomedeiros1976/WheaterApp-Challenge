'use client'
import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocations';
import { fetchCurrentWeather, fetchForecast } from '../lib/weatherApi';
import { DailyForecastMap, ForecastList, CurrentWheaterData, WheaterData, ForecastDayCard } from '@/types';
import DayForecast from '@/components/DayForecast';
import CurrentWheater from '@/components/CurrentWheater';
import { days } from '@/lib/utils';

import "./page.module.css";
import "../styles/global.scss";
import SearchForecast from '@/components/SearchForecast';

export default function Home() {
  const { location, error: geoError, isLoading: geoLoading } = useGeolocation();
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWheaterData | null>(null);
  const [forecastData, setForecastData] = useState<WheaterData | null>(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');  
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);


  // --- Efeito para Carregar Previsão por Geolocalização e Preencher o Campo de Pesquisa ---
  useEffect(() => {    
    if (location && !geoError && !currentWeatherData) {
      const fetchInitialWeather = async () => {
        setLoadingWeather(true);
        setWeatherError(null);
        try {
          const current = await fetchCurrentWeather(`lat=${location.lat}&lon=${location.lon}&units=metric`);
          setCurrentWeatherData(current);
          setCity(current.name);          
          setSearchCity(current.name);
          const forecast = await fetchForecast(`lat=${location.lat}&lon=${location.lon}&units=metric`);
          setForecastData(forecast);
        } catch (err) {
          setWeatherError('Could not retrieve weather data for your current location.');
          console.error('Error fetching initial weather by coords:', err);
        } finally {
          setLoadingWeather(false);
        }
      };
      fetchInitialWeather();
    }
  }, [location, geoError]);


  // --- Efeito para Carregar Previsão por Pesquisa de Cidade ou Mudança de Unidade ---
  useEffect(() => {    
    if (searchCity && currentWeatherData && searchCity !== city) { 
                                                          
      fetchWeatherDataByCity(searchCity);
    } else if (searchCity && !currentWeatherData) { 
        fetchWeatherDataByCity(searchCity);
    } else if (location && searchCity === city && currentWeatherData) {        
        fetchWeatherDataByCoords(location.lat, location.lon);
    }
  }, [searchCity, city, location]); 

/*
  // Fetch weather based on geolocation
  useEffect(() => {
    if (location && !city) { // Only fetch by geo if no city is explicitly set
      fetchWeatherDataByCoords(location.lat, location.lon);
    }
  }, [location, city]);

  // Fetch weather based on city search
  useEffect(() => {
    if (searchCity) {
      fetchWeatherDataByCity(searchCity);
    }
  }, [searchCity]); // Refetch if unit changes

  useEffect(() => {
    if (searchCity !== city) {
      setSearchCity(city);
    }
  }, [city])
*/
  const fetchWeatherDataByCoords = async (lat: number, lon: number) => {
    setLoadingWeather(true);
    setWeatherError(null);
    try {
      debugger;
      const current = await fetchCurrentWeather(`lat=${lat}&lon=${lon}&units=metric`);
      setCurrentWeatherData(current);
      setCity(current.name); // Set the city name based on geo      
      const forecast = await fetchForecast(`lat=${lat}&lon=${lon}&units=metric`);
      setForecastData(forecast);
    } catch (err) {
      setWeatherError(`Could not retrieve weather data for your location. ${err}`);
    } finally {
      setLoadingWeather(false);
    }
  };

  const fetchWeatherDataByCity = async (cityName: string) => {
    setLoadingWeather(true);
    setWeatherError(null);
    try {
      const current = await fetchCurrentWeather(`q=${cityName}&units=metric`);
      setCurrentWeatherData(current);
      setCity(current.name);
      debugger;
      const forecast = await fetchForecast(`q=${cityName}&units=metric`);
      setForecastData(forecast);
    } catch (err) {
      setWeatherError(`Could not retrieve weather data for "${cityName}". Please check the city name. ${err}`);
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCity) {
      fetchWeatherDataByCity(searchCity);
    }
  };
  

  const aggregateDailyTemperatures = (data: WheaterData | null) => {
    const grouped = data?.list.reduce<Record<string, ForecastDayCard>>((acc, item) => {
      const date = new Date(item.dt * 1000);
      const keyDate = date.toLocaleDateString();
      const dayOfWeek = date.getDay();

      if(!acc[keyDate]) {
        acc[keyDate] = {
          day:  days[dayOfWeek],
          icon: item.weather[0].icon,
          tempMax: Math.round(item.main.temp_max),
          tempMin: Math.round(item.main.temp_min),
        }
      } else {
        acc[keyDate].tempMin = Math.round(Math.min(acc[keyDate].tempMin, item.main.temp_min));
        acc[keyDate].tempMax = Math.round(Math.max(acc[keyDate].tempMax, item.main.temp_max));
      }

      return acc;
    }, {});

    return Object.values(grouped || []);
  }


  const groupedData = aggregateDailyTemperatures(forecastData);

  return (
    <div className='container-fluid bg-primary text-white py-4' style={
      {
        backgroundImage: "url('blue-sky.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',        
      }
    }>

      <SearchForecast searchCity={searchCity} onCityChange={handleCityChange} onSubmit={handleSubmit} />

      {geoLoading && <p>Getting your location...</p>}
      {geoError && <p style={{ color: 'red' }}>Error getting location: {geoError}</p>}

      {loadingWeather && <p>Loading weather data...</p>}
      {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}

      {currentWeatherData && (
         <CurrentWheater data={currentWeatherData} city={city} />
       )}

      {forecastData && (
        <div className='row justify-content-center mt-4'>
          {groupedData.map((item: ForecastDayCard, index: number) => {

            return (
              <DayForecast  key={index} data={item} />
            )
          })}
        </div>         
      )}
    </div>    
    // <div className="weather-app-container">
    //   <h1>Weather App</h1>

    //   <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
    //     <input
    //       type="text"
    //       placeholder="Enter city"
    //       value={searchCity}
    //       onChange={handleCityChange}
    //       style={{ padding: '8px', marginRight: '10px' }}
    //     />
    //     <button type="submit" style={{ padding: '8px 12px' }}>Search</button>
    //   </form>

    //   {geoLoading && <p>Getting your location...</p>}
    //   {geoError && <p style={{ color: 'red' }}>Error getting location: {geoError}</p>}

    //   {loadingWeather && <p>Loading weather data...</p>}
    //   {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}


    // </div>
  );
}