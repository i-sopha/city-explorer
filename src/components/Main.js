import React from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import Weather from './Weather';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      map: '',
      error: false,
      errorMsg: '',
      forecasts: [],
      showWeather: false
    }
  }


  handleCityInput = (ev) =>{
    this.setState({
      city: ev.target.value
    })
  }


  getCityData = async (ev) => {
    ev.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`
      let cityData = await axios.get(url)
  
      let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14&size=500x500`;
      let mapResponse = await axios.get(map)
      this.setState({ map: mapResponse.config.url })

      // let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&searchQuery=${this.state.city}`;
      // let weatherData = await axios.get(weatherUrl);
      // this.setState({ forecasts: weatherData.data, showWeather: true, error: false });
  
      console.log(cityData.data[0])
      this.setState({
        cityData: cityData.data[0],
        error: false
      })
  
    } catch(error){
      this.setState({
        error: true,
        errorMsg: error.message
      })
    }
  }

  getWeatherData = async (event) => {
    event.preventDefault();

    try {
        let serverUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.cityName}`

        console.log('this is the url', serverUrl);
        let serverData = await axios.get(serverUrl)
        console.log(serverData)

        this.setState({
            weatherData: serverData.data,
            dateData: serverData.data,
            showWeather: true,
        })
        console.log('this is the serverdata.data', serverData.data);

    } catch (error) {
        console.log(error.message);
        this.setState({
            showWeather: false
        })
    }
}
  

  render() {
    return (
      <>
        <div className="center-container">
          <form onSubmit={this.getCityData}>
            <label> Enter in a City name: </label>
              <input type="text" onInput={this.handleCityInput}/>
            <button type="submit">Explore!</button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
              this.state.error
              ? <Alert variant="danger"><p>{this.state.errorMsg}</p></Alert>
              : <p>{this.state.cityData.display_name}</p>
            }
          </div>
       
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Card style={{ maxWidth: '500px', margin: '10px' }}>
              <Card.Text>

                <ul>
                  <li>City: {this.state.cityData.display_name}</li>
                  <li>Longitude: {this.state.cityData.lon}</li>
                  <li>Latitude: {this.state.cityData.lat}</li>
                </ul>

              </Card.Text>
            </Card>

          </div>
        
        
          <Image src={this.state.map} roundedCircle></Image>

        </div>

        {this.state.showWeather && <Weather forecasts={this.state.forecasts} />}

      </>
    )
  }
}

export default Main;
