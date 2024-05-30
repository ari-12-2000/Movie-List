import React, { useEffect, useMemo } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { addFavouriteMovie, removeFavouriteMovie } from "../store/moviesSlice";

const Movies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies, status, favouriteMovies } = useSelector((state) => state.movies);

  const showMovies = useMemo(() => { 
    return movies.map((movie) => ({
      ...movie,
      favourite: favouriteMovies.some((favMovie) => favMovie.id === movie.id),
    }));
  }, [movies, favouriteMovies]);

  const handleFavourite = (movieId) => {
    const movie = showMovies.find((movie) => movie.id === movieId);
    if (movie.favourite) {
      dispatch(removeFavouriteMovie(movie));
    } else {
      dispatch(addFavouriteMovie(movie));
    }
  };

  useEffect(() => {
    if (status === "failed") {
      navigate("/error");
    }
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <Box className="flex justify-center items-center h-screen w-full">
        <CircularProgress />
      </Box>
    );
  }

  // Sort movies by rating from highest to lowest
  const sortedMovies = showMovies.sort((a, b) => b.rating - a.rating);

  return (
    <Box className="p-2 w-full flex flex-col items-center border-2">
      <Box
        className="bg-gradient-to-r from-blue-500 to-purple-700 text-white text-center p-8 rounded-lg mb-4 w-full md:w-3/5"
        sx={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <Typography variant="h4" mb={2}>
          Unleash the magic of cinema
        </Typography>
        <Typography variant="subtitle1" mb={4}>
          Discover the latest and greatest movies of all time.
        </Typography>
        <Button variant="contained" color="secondary">
          Explore Now
        </Button>
      </Box>
    
      {sortedMovies.map((movie) => (
        <MovieItem
          key={movie.id}
          title={movie.movie}
          rating={movie.rating}
          url={movie.imdb_url}
          handleFavourite={() => handleFavourite(movie.id)}
          favourite={movie.favourite}
        />
      ))}
    
    </Box>
  );
};

export default Movies;
