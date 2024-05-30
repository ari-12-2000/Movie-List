import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovies } from "./store/moviesSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=> {dispatch(fetchMovies())}, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
