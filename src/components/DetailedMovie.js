import React from 'react'

const DetailedMovie = ({movie, handleDeleteWatched}) => {
    return (
        <li >
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
                          <p>
                            <span>⭐️</span>
                            <span>{movie.imdbRating}</span>
                          </p>
                          <p>
                            <span>🌟</span>
                            <span>{movie.userRating}</span>
                          </p>
                          <p>
                            <span>⏳</span>
                            <span>{movie.runtime} min</span>
                          </p>
                          <button className='btn-delete' onClick={() => handleDeleteWatched(movie.imdbID)}>X</button>
          </div>              
      </li>
      );
}

export default DetailedMovie
