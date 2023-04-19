import React from 'react';
import { Card, Button } from 'react-bootstrap';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { forecasts } = this.props;
        return (
            <div>
                {forecasts.map((forecast, index) => (
                    <Card key={`forecast-${index}`} style={{ marginBottom: '1rem' }}>
                        <Card.Header>
                            {forecast.date}
                            <Button
                                variant='link'
                                onClick={() =>
                                    this.setState((prevState) => ({
                                        [index]: !prevState[index],
                                    }))
                                }
                                style={{ marginLeft: '1rem' }}
                            >
                                +
                            </Button>
                        </Card.Header>
                        {this.state[index] && (
                            <Card.Body>
                                <Card.Text>
                                    Description: {forecast.description}
                                </Card.Text>
                                <Card.Text>\n                                    High Temperature: {forecast.maxTemp} °F
                                </Card.Text>
                                <Card.Text>
                                    Low Temperature: {forecast.minTemp} °F
                                </Card.Text>
                            </Card.Body>
                        )}
                    </Card>
                ))}
            </div>
        );
    }
}

export default Weather;
