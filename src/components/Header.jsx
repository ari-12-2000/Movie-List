import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/favourites":
        setValue(1);
        break;
      default:
        setValue(false);
    }
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    const tabs = [
      <Tab key="movies" to="/" LinkComponent={NavLink} label="Movies" />,
      <Tab
        key="favourites"
        to="/favourites"
        LinkComponent={NavLink}
        label="Favourites"
      />,
    ];

    return tabs;
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }} className="px-4">
      <Toolbar>
        
          <Link to="/" className="text-sm md:text-base text-white mr-6">
            <MovieCreationIcon />
          </Link>
          <Typography className="text-white uppercase font-bold ">MOVIEPEDIA</Typography>

        <Box className="flex ml-auto ">
          <Tabs
            onChange={handleTabChange}
            value={value}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#CB0101", // Change the indicator color to red
              },
            }}
          >
            {renderTabs()}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
