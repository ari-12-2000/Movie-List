import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { Link, NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for controlling drawer
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if screen size is less than or equal to 600px

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
      <Tab key="movies" to="/" component={NavLink} label="Movies" />,
      <Tab
        key="favourites"
        to="/favourites"
        component={NavLink}
        label="Favourites"
      />,
    ];

    return tabs;
  };

  // Toggle drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }} className="px-4">
      <Toolbar>
        <Box className="flex items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }} // Hide the hamburger menu on medium screens and above
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="text-sm md:text-base text-white mr-2 md:mr-6">
            <MovieCreationIcon />
          </Link>
          <Typography className="text-white uppercase font-bold">
            MOVIEPEDIA
          </Typography>
        </Box>

        {/* Render tabs only if screen size is greater than 600px */}
        {isMobile ? (
          <Drawer
            anchor="left" // Start the Drawer from the left side
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{ width: 250 ,"& .Mui-selected": { backgroundColor: "grey", color: "white" }}}
          >
            <List>
              <ListItem
                button
                key="movies"
                component={NavLink}
                to="/"
                onClick={toggleDrawer}
                selected={location.pathname === "/"}
              >
                <ListItemText primary="Movies" />
              </ListItem>
              <ListItem
                button
                key="favourites"
                component={NavLink}
                to="/favourites"
                onClick={toggleDrawer}
                selected={location.pathname === "/favourites"}
              >
                <ListItemText primary="Favourites" />
              </ListItem>
            </List>
          </Drawer>
        ) : (
          <Box className="flex ml-auto">
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
