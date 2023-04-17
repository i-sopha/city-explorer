import React from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMsg: ''
    }
  }


  handleCityInput = (ev) =>{
    this.setState({
      city: ev.target.value
    })
  }

  // TODO: render a map using the following URL example:
  // ** https://maps.locationiq.com/v3/staticmap?key=<YOUR KEY HERE>&center=<LAT>,<LON>&zoom=14

  getCityData = async (ev) => {
    ev.preventDefault();
    try {

      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`

      let cityData = await axios.get(url)

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


  render() {
    return (
      <>
        <h2>City Data</h2>
        <form onSubmit={this.getCityData}>
          <label> Enter in a City name:
            <input type="text" onInput={this.handleCityInput}/>
          </label>
          <button type="submit">Explore!</button>
        </form>

        {
          this.state.error
          ? <Alert variant="danger"><p>{this.state.errorMsg}</p></Alert>
          : <p>{this.state.cityData.display_name}</p>
        }

      </>
    )
  }
}

export default Main;