import React from 'react'
import SingleMovie from './SingleMovie';

const MovieList = ({movies, onSelectMovie}) => {
    return (
        <ul className="list list-movies">
                  {movies?.map((movie) => (
                    <SingleMovie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
                  ))}
                </ul>
      );
}

export default MovieList
