import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const MovieItem = ({ title, url, rating, handleFavourite, favourite }) => {
  return (
    <div className="m-6 w-full h-auto rounded-lg shadow-lg hover:shadow-xl overflow-hidden flex flex-col p-2">
      <div className="p-4 flex">
        <h5 className="text-xl font-bold">{title}</h5>
        <p className="text-gray-600 ml-auto">{rating} ⭐</p>
      </div>

      <div className="p-4 flex">
        <p className="font-bold">IMDB:</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
          {url}
        </a>
        <IconButton
          onClick={handleFavourite}
          className={`${location.pathname !== "/favourites" && favourite ? "bg-white" : "bg-gray-300 hover:bg-gray-400"} `}
          sx={{marginLeft:"auto"}}
        >
           {location.pathname === "/favourites" ? (
            <DeleteForeverIcon className="text-red-600"/>
          ) : (
            <FavoriteIcon className={favourite ? "text-red-600" : "text-gray-600"} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default MovieItem;
