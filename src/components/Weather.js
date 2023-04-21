import React from 'react';
import DailyWeather from './DailyWeather.js';

class Weather extends React.Component {
  render () {
    return (
      <div className='weather-forecast'>
        {this.props.forecast.map( (weather, idx) => {
          return <DailyWeather key={idx} weather={weather} />
        })}
      </div>
    )
  }
}

export default Weather;