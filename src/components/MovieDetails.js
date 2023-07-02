import React from 'react'
import { useEffect, useState } from 'react'
import StarRating from '../StarRating'
import Loader from './Loader';
import { useKey } from '../useKey';

const KEY = "2b58588c";  

const MovieDetails = ({selectedId, onCloseMovie, onAddWatched, watched}) => {
    const [ movie, setMovie ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ userRating, setUserRating ] = useState(0);

    const { Title : title,
        Year : year,
        Poster : poster,
        Runtime : runtime,
        imdbRating,
        Plot: plot,
        Released : released,
        Actors : actors,
        Director : director,
        Genre : genre 
    } = movie;
    console.log(title, year);     
    useEffect(function() {
        
        async function getMovieDetails() {

            setIsLoading(true);

            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            if(!res.ok) throw new Error("Something went wrong with fetching movies")
            const data = await res.json();
            if(data.Response === false) throw new Error("movie details not found");
            setMovie(data); 

            setIsLoading(false);    
        } 
        getMovieDetails();
    }, [selectedId]);

    function handleAdd() {
       const newWatchedMovie = {
         imdbID : selectedId,
         title,
         year,
         poster,
         imdbRating: Number(imdbRating),
         runtime : Number(runtime.split(' ' ).at(0)),
         userRating
       };

       onAddWatched(newWatchedMovie);
       onCloseMovie();
    }
    console.log(watched);
    const isWatched = watched.map( movie => movie.imdbID ).includes(selectedId)
    console.log(isWatched);
    const watchedUserRating = watched.find( movie => movie.imdbID === selectedId )?.userRating

    useEffect(function() {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return function() {
            document.title = "usePopcorn";
            console.log(`Clean up Effect for movie ${title}`);
        }
    }, [ title ]);
  
    useKey('Escape' , onCloseMovie)

    return (
    
        <div className="details">

        {
            isLoading ? <Loader/> : 
            <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
          <img src={poster} alt={`Poster of ${movie} movie`}/> 
          <div className="details-overview">
             <h2>{title}</h2>
             <p>{released} &bull; {runtime} </p>
             <p>{genre}</p>
             <p><span>⭐</span>{imdbRating} IMDb rating</p>
          </div>
        </header>

        <section>
            <div className="rating">
            { !isWatched ? (<>
                <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
            
            { userRating > 0 &&
                <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
            }
            </>) : (
            <p>You rated this movie {watchedUserRating} ⭐</p>
            )
            }
            </div>
            <p>
                <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
        </section>
            </>
        } 
        </div>)
}

export default MovieDetails
