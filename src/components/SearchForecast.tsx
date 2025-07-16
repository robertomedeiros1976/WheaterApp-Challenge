// components/CitySearchForm.tsx
import React from 'react';

import '../styles/global.scss';

// Definindo as props que o componente receberá
interface SearchForecastProps {
  searchCity: string;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
}

const SearchForecast: React.FC<SearchForecastProps> = ({
  searchCity,
  onCityChange,
  onSubmit, 
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-8">
          <form className='row g-4' onSubmit={onSubmit}>
            <div className='col-auto'>
              <label className='visually-hidden'>City</label>
              <input 
                type='text' 
                className='form-control' 
                id='cityText' 
                placeholder='Search City' 
                value={searchCity} 
                onChange={onCityChange} 
              />
            </div>
            <div className='col-auto'>
              <button type='submit' className='btn btn-primary mb-3'>Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForecast;