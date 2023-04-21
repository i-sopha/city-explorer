import React from 'react';
import Movie from './Movie.js';


class Movies extends React.Component {
  render() {
    return (
    <div className='movie-list'>
      {this.props.movies.length && this.props.movies.map((movies, idx) => {
        return <Movie key={idx} movies={movies} />
      })}
    </div>
    )
  }
}

export default Movies;