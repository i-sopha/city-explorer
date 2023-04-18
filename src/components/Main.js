import React from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Image } from 'react-bootstrap'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      map: '',
      error: false,
      errorMsg: ''
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
  
      let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12&size=500x500`;
      let mapResponse = await axios.get(map)
      this.setState({ map: mapResponse.config.url })
  
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

      </>
    )
  }
}

export default Main;