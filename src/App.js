import { useState } from "react";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Summery from "./components/Summery";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieList from "./components/WatchedMovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "2b58588c";  

export default function App() {
  const [ movies, setMovies ] = useState([]);
  const [ watched, setWatched ] = useState([]);
  const [ error, setError ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ query, setQuery ] = useState("inception");
  const [ selectedId, setSelectedId ] = useState(null);
  const tempQuery = "interstellar";

  function handleSelectedId(id) {
    setSelectedId(selectedId => selectedId === id ? null : id );
  }

  function handleCloseId(){
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched => [...watched, movie])

  }


  useEffect(() => {
    // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then(res => res.json()).then(data => setMovies(data.Search));
    async function fetchMovies() {
      try{
      setIsLoading(true);
      setError("");

      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

      if(!res.ok) throw new Error("Something went wrong with fetching movies");
      const data = await res.json();
      if(data.Response === "False") throw new Error("Movie not found!")

      console.log(data);

      setMovies(data.Search);
      }
      catch (err) {
        console.log(err.message);
        setError(err.message);
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


    fetchMovies();
  }, [ query ]);

  return (
    <> 
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar> 
      <Main> 
      <Box> 
        {/* {
          isLoading ? <Loader /> : <MovieList movies={movies} />
        } */}
        {
          isLoading && <Loader/>
        }  
        {
          !isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedId} />
        }
        {
          error && <ErrorMessage message={error}/>
        }
       
          
      </Box>
      <Box>
        {selectedId ?
          ( <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseId} onAddWatched={handleAddWatched}/> )
          :
          (<>
          <Summery watched={watched}/>
          <WatchedMovieList watched={watched}/>
          </>)
         } 
      </Box>
      </Main>
    </>
  );
}








  {/* <StarRating messages={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}/>
    <StarRating color="pink" size={25}/> 
    <StarRating color="pink"  size={50}/> 
    <StarRating maxRating={3} color="maroon" messages={['no', 'idk', 'ok']} />

    <StarRating maxRating={5} color="#fcc419" size={48} className="" messages={['Poor', 'Fair', 'Average', 'Good', 'Excellent']} />
*/}