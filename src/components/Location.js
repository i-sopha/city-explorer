import React from 'react';
import Card from 'react-bootstrap/Card';

class Location extends React.Component {
  
  render() {
    return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Location: {this.props.location.display_name}</Card.Title>
        <Card.Text>Latitude: {this.props.location.lat}</Card.Text>
        <Card.Text>Longitude: {this.props.location.lon}</Card.Text>
      </Card.Body>
      <Card.Img src ={this.props.map} alt='map of selected city' />
    </Card>
    )
  }
}

export default Location;