import React from 'react'
import DetailedMovie from './DetailedMovie';

const WatchedMovieList = ({watched, handleDeleteWatched}) => {
    return (
        <ul className="list">
                    {watched.map((movie) => (
                      <DetailedMovie movie={movie} key={movie.imdbID} handleDeleteWatched={handleDeleteWatched}/>
                    ))}
                  </ul>
      );
}

export default WatchedMovieList
