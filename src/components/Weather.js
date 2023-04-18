import React from 'react';



class Weather extends React.Component {
    render() {
        return (
            <>
                <p>On {this.props.dateData} it will be {this.props.weatherData}.</p>
            </>
        )
    }
}

export default Weather;