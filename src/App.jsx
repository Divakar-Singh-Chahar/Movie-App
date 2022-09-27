import { useEffect,useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com/?apikey=d3746e2d";

const movie1 = {
  Title: "Avengers: Infinity War",
  Year: "2018",
  imdbID: "tt4154756",
  Type: "movie",
  Poster: "N/A",
};

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchterm, setSearchterm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          value={searchterm}
          placeholder="Search for a movie"
          onChange={(e) => setSearchterm(e.target.value)}
        />
        <img src={SearchIcon} alt="search icon" onClick={() => searchMovies(searchterm)} />
      </div>
      {
        movies?.length > 0 
        ? (
        <div className="container">
        {movies.map((movie) =>(
          <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </div>
      ) : (
        <div className="empty">
        <h2>No movies found</h2>
        </div>
      )
      }
      
    </div>
  );
};

export default App;
