import React from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import Weather from './Weather';
import Movies from './Movies';

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
      showWeather: false,
      moviesArr: []
    }
  }


  handleCityInput = (ev) => {
    this.setState({
      city: ev.target.value
    })
  }


  getCityData = async (ev) => {
    ev.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`
      let cityData = await axios.get(url)

      await this.getMovies();

      let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14&size=500x500`;
      let mapResponse = await axios.get(map)
      this.setState({ map: mapResponse.config.url })

      console.log(cityData.data[0])
      this.setState({
        cityData: cityData.data[0],
        error: false
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMsg: error.message
      })
    }
  }

  getWeatherData = async (event) => {
    event.preventDefault();

    try {

      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&searchQuery=${this.state.city}`;

      let weatherData = await axios.get(weatherUrl);
      this.setState({ forecasts: weatherData.data, showWeather: true, error: false });

      let serverUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`

      console.log('this is the url', serverUrl);
      let serverData = await axios.get(serverUrl)
      console.log(serverData)

      this.setState({
        forecasts: serverData.data,
        showWeather: true,
      })

    } catch (error) {
      console.log(error.message);
      this.setState({
        showWeather: false
      })
    }
  }

  getMovies = async () => {
    try {
      const MOVIES = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.moviesArr}`;
      const movieResponse = await axios.get(MOVIES);

      this.setState({ moviesArr: movieResponse.data })

    } catch (error) {
      console.error(error);
      console.log(this.getMovies);
    }
  }

  render() {
    return (
      <>
        <div className="center-container">
          <form onSubmit={this.getCityData}>
            <label> Enter in a City name: </label>
            <input type="text" onInput={this.handleCityInput} />
            <button type="submit">Explore!</button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
              this.state.error
                ? <Alert variant="danger\"><p>{this.state.errorMsg}</p></Alert>
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

          {this.state.showWeather && <Weather forecasts={this.state.forecasts} />}

          <Movies movies={this.state.moviesArr} searchQuery={this.state.searchQuery} />

        </div>



      </>
    )
  }
}

export default Main;
