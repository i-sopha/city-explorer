import React from 'react';

class Movies extends React.Component {
  render() {
    return (
      <div className='movie-list'>
        {this.props.movies.length && this.props.movies.map((movie, idx) => {
          return (
            <div className='movie-details' key={idx}>
              <h2>{movie.title}</h2>
              <img src={`${movie.backdrop_path}`} alt='movie poster'/>
              <p>Overview: {movie.title}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Movies;
