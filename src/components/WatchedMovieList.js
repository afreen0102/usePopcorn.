import React from 'react'
import DetailedMovie from './DetailedMovie';

const WatchedMovieList = ({watched}) => {
    return (
        <ul className="list">
                    {watched.map((movie) => (
                      <DetailedMovie movie={movie} key={movie.imdbID}/>
                    ))}
                  </ul>
      );
}

export default WatchedMovieList
