import { Component } from 'react';

class Weather extends Component {
  render() {
    return (
        
        <>
            {
                this.props.weatherData.map((forecast, idx) => {
                    return <p key={idx}>Date: {forecast.date} Forecast: {forecast.description}</p>
                })
            }
            {/* <p>{this.props.dateData} {this.props.weatherData}.</p> */}
        </>
          
    )
}
}


export default Weather;