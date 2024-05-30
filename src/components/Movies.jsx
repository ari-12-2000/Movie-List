import React, { useEffect, useMemo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
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
    <Box className="p-2  w-full flex flex-col m-auto items-center max-w-2xl">
      <Typography
        className="p-4 w-full max-w-2xl bg-[#900C3F] text-white text-center uppercase"
        variant="h4"
      >
        Unleash the magic of cinema
      </Typography>
      
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
