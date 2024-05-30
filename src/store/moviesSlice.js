import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(apiUrl);
  
  return response.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    favouriteMovies: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addFavouriteMovie: (state, action) => {
      state.favouriteMovies.push(action.payload);
    },
    removeFavouriteMovie: (state, action) => {
      state.favouriteMovies = state.favouriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        
      });
  },
});

export const { addFavouriteMovie, removeFavouriteMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
