import "./App.css";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import Filter from "./Filter";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=520f6e719afa6dc3b13a66ad74c35685&language=en-US&page=1"
    );

    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  return (
    <div className="App">
      <h1
        style={{
          textAlign: "center",
          fontFamily: "gilroy",
          fontSize: "3rem",
          textTransform: "uppercase",
          letterSpacing: "1.2px",
        }}
      >
        Cineflicks
      </h1>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <br />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((popularMovie) => {
            return <Movie key={popularMovie.id} movie={popularMovie} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
