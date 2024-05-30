import React, { useEffect } from "react";
import { removeFavouriteMovie } from "../store/moviesSlice";
import StarIcon from "@mui/icons-material/Star"; // Import StarIcon
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieItem from "./MovieItem";

const Favourites = () => {
  const { favouriteMovies, status } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromFavourites = (movieId) => {
    const movie = favouriteMovies.find((movie) => movie.id === movieId);
    dispatch(removeFavouriteMovie(movie));
  };

  useEffect(() => {
    if (status === "failed") {
      navigate("/error");
    }
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (favouriteMovies.length === 0) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h5" className="text-center">
          No favourite movies found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="p-4 w-full max-w-2xl rounded-lg flex flex-col items-center m-auto">
      <Typography className="flex items-center uppercase" variant="h4">
        <StarIcon className="mr-1" /> Favourites
      </Typography>
      {favouriteMovies.map((movie) => (
        <MovieItem
          key={movie.id}
          title={movie.movie}
          rating={movie.rating}
          url={movie.imdb_url}
          handleFavourite={() => removeFromFavourites(movie.id)}
          favourite={true}
        />
      ))}
    </Box>
  );
};

export default Favourites;
