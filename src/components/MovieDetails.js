import React from 'react'
import { useEffect, useState } from 'react'
import StarRating from '../StarRating'
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';




const KEY = "2b58588c";  


const MovieDetails = ({selectedId, onCloseMovie}) => {
    const [ movie, setMovie ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError] = useState("")


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

    return (
    
        <div className="details">

        {
            isLoading ? <Loader/> : 
            <>
               <header>
          <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
          <img src={poster} alt={`Poster of ${movie} movie`}/> 
          <div className="details.overview">
             <h2>{title}</h2>
             <p>{released} &bull; {runtime} </p>
             <p>{genre}</p>
             <p><span>⭐</span>{imdbRating} IMDb rating</p>
          </div>
        </header>

        <section>
            <div className="rating">
            <StarRating maxRating={10} size={24}/>
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
