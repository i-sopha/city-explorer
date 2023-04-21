import React from 'react';


class Movie extends React.Component {
  render() {
    return (
    <div className='movie-details'>
      <h2>{this.props.movies.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w154/${this.props.movies.image_url}`} alt='movie poster'/>
      <p>Overview: {this.props.movies.overview}</p>
      <p>Popularity: {this.props.movies.popularity}</p>
      <p>Released On:{this.props.movies.releasedOn}</p>
    </div>
    )
  }
}

export default Movie;