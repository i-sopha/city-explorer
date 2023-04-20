import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import Weather from './Weather';
import Movies from './Movies';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            cityData: [],
            serverData: [],
            movieData: [],
            showWeather: false,
            showMovie: false,
            error: false,
            errorMessage: '',
            mapUrl: '',
            weatherData: '',
            dateData: ''
        }
    }

    handleInput = (event) => {
        this.setState({
            cityName: event.target.value
        })
        console.log('this is the input handler', this.state.cityName);
    }

    //async/await handle our promises - call back from axios
    // try/catch - handle our errors - TRY resolves our successful promise and CATCH - handle our rejected promise

    getCityData = async (event) => {
        event.preventDefault();

        try {

            let cityDataURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.cityName}&format=json`


            let cityData = await axios.get(cityDataURL)

            let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=10`

            this.getWeatherData(cityData.data[0].lat, cityData.data[0].lon);
            this.getMovieData(this.state.cityName);

            this.setState({
                cityData: cityData.data[0],
                error: false,
                mapUrl: mapUrl
            })
            console.log(cityData.data[0]);

        } catch (error) {
            //TODO set state with the error boolean and error message
            this.setState({
                error: true,
                errorMessage: error.message,
                showWeather: false
            })
        }

    }

    getWeatherData = async (lat, lon) => {
        // event.preventDefault();

        try {
            let serverUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`

            console.log('this is the url', serverUrl);
            let serverData = await axios.get(serverUrl)
            // console.log(serverData)

            this.setState({
                weatherData: serverData.data,
                dateData: serverData.data,
                showWeather: true,
            })
            console.log('serverdata.data>>>', serverData.data);

        } catch (error) {
            console.log(error.message);
            this.setState({
                showWeather: false
            })
        }
    }

    getMovieData = async (city) => {
      try {
         let movieUrl = `${process.env.REACT_APP_SERVER}/movies?city=${this.state.cityName}`;
         let movieData = await axios.get(movieUrl);
   
         console.log(movieData.data);
   
         this.setState({
            movieData: movieData.data,
            showMovie: true,
         })
      } catch (error) {
         this.setState({
            error: true,
            errorMsg: "Oops There Was An Error",
            showMovie: false,
         })
      }
   }
   




    render() {
        return (
            <>
                <Container >
                    <Row>
                        <Col>
                            <Form onSubmit={this.getCityData}>
                                <Form.Label> Enter A City Name:</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Enter A City" 
                                onInput={this.handleInput}
                                style={{ width: "40%" }}
                                />

                                <Button type="submit">Explore!</Button>

                            </Form>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {this.state.error ? (
                                <div className="text-center mx-auto">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorMessage}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center mx-auto">
                                    <p>{this.state.cityData.display_name}</p>
                                    <p>{this.state.cityData.lat}</p>
                                    <p>{this.state.cityData.lon}</p>
                                </div>

                            )}
                            {
                                this.state.showWeather 
                                    ? <Weather weatherData={this.state.weatherData} dateData={this.state.dateData} />
                                    : <></>
                            }

                            {
                                this.state.showMovie
                                    ? <Movies movieData={this.state.movieData} />
                                    : <></>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">

                        <Image src={this.state.mapUrl} style={{ borderRadius: "50%" }} />

                        </Col>
                    </Row>
                </Container>


            </>
        )
    }
}



export default Main;