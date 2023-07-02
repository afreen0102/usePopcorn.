import { useState, useEffect } from "react";

const KEY = "2b58588c";  


export function useMovies(query) {

    const [ movies, setMovies ] = useState([]);
    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {


        const controller = new AbortController();
        // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then(res => res.json()).then(data => setMovies(data.Search));
        async function fetchMovies() {
          try{
          setIsLoading(true);
          setError("");
    
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});
    
          if(!res.ok) throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if(data.Response === "False") throw new Error("Movie not found!")
    
          // console.log(data);
    
          setMovies(data.Search);
          setError("");
          }
          catch (err) {
            console.log(err.message);
    
            if(err.name !== "AbortError") {
            setError(err.message);
            }
          }
          finally{
            setIsLoading(false);
          }
        }
    
        if( query.length <= 3){
          setMovies([]);
          setError("");
          return;
        }
    
        // handleCloseId();
        fetchMovies();
    
        return function() {
          controller.abort();
        }
      }, [ query ]);

      return { movies, error, isLoading }
    
    

}