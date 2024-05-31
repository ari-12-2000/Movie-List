import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useLocation } from "react-router-dom";

const MovieItem = ({ title, url, rating, handleFavourite, favourite }) => {
  const location = useLocation();

  const handleMovieClick = () => {
    window.open(url, "_blank","noopener,noreferrer");
  };

  return (
    <div
      className="m-6 w-full max-w-2xl h-auto rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col p-2 bg-gray-50 cursor-pointer"
      onClick={handleMovieClick}
    >
      <div className="p-4 flex bg-white rounded-t-lg">
        <h5 className="text-xl font-bold">{title}</h5>
        {rating && <p className="text-gray-600 ml-auto">{rating} ⭐</p>}
      </div>

      <div className="p-4 flex flex-col items-center md:flex-row bg-white rounded-b-lg">
        <p className="font-bold">IMDB:</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline ml-2"
          onClick={(e) => e.stopPropagation()} // Prevent opening the URL twice
        >
          {url}
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
            handleFavourite();
          }}
          className={`${
            location.pathname === "/" &&
            !favourite &&
            "bg-gray-300 hover:bg-gray-400"
          } rounded-full mt-2 md:mt-0 md:ml-auto p-1`}
          aria-label={
            location.pathname === "/favourites"
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {location.pathname === "/favourites" ? (
            <DeleteForeverIcon className="text-red-600" />
          ) : (
            <FavoriteIcon
              className={favourite ? "text-red-600" : "text-gray-600"}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
