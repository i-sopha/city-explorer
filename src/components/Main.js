import React from 'react';
import axios from 'axios';
import Form from './Form.js';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Movies from './Movies.js';
import Weather from './Weather.js';
import Location from './Location.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      map: '',
      forecastArr: [],
      moviesArr: [],
      errors: '',
      displayAlert: false
    }
  }

  getLocation = async (cityName) => {
    try {
      const LOCATION = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${cityName}&format=json`;
      const locationResponse = await axios.get(LOCATION);
  
      const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${locationResponse.data[0].lat},${locationResponse.data[0].lon}&zoom=10`;
      const mapResponse = await axios.get(MAP);
  
      this.setState({
        location: locationResponse.data[0],
        map: mapResponse.config.url,
        cityName
      });
    } catch (error) {
      this.setState({ errors: error.response.data.error, displayAlert: true });
    }
  };
  
  
  
    
  
  

  getWeather = async (lat, lon) => {
    try {
      const WEATHER = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;

      const weatherResponse = await axios.get(WEATHER);
      this.setState({ forecastArr: weatherResponse.data })
    } catch(error) {
      this.setState({errors: error.response.data.error, displayAlert: true})
    }
  }
  

  getMovies = async () => {
    try {
      const MOVIES = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`;


      const movieResponse = await axios.get(MOVIES);
      this.setState({ moviesArr: movieResponse.data })
    } catch(error) {
      console.error(error);
      console.log(this.getMovies);
    }
  }

  onChange = async (e) => {
    this.setState({ searchQuery: e.target.value})
  }

  submitLocation = async (e) => {
    e.preventDefault();
    this.setState({ cityName: this.state.searchQuery });
    await this.getLocation(this.state.searchQuery);
    this.getMovies();
    this.getWeather(this.state.location.lat, this.state.location.lon);
  }
  

  closeAlert = () => {
    this.setState({displayAlert: false});
  }

  render() {
    return (
    <main className="main">

      <Form submitLocation={this.submitLocation} onChange={this.onChange} />

      <Alert show={this.state.displayAlert} variant='danger'>
        <Alert.Heading>Oops! Somthing went wrong...</Alert.Heading>
        Error code {this.state.errors}: Error
        <Button variant='warning' onClick={this.closeAlert}>Close</Button>
      </Alert>

      <Location location={this.state.location} lat={this.state.lat} lon={this.state.lon} map={this.state.map}/>

      <Weather forecast={this.state.forecastArr} searchQuery={this.state.searchQuery} />
      
      <Movies movies={this.state.moviesArr} searchQuery={this.state.searchQuery}/>
    </main>
    )
  };
}

export default Main;