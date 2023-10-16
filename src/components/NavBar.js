import React from "react";
import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  IconButton,
  Drawer,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Divider
} from "@mui/material";
import { Menu, Home, ViewTimeline, Launch } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const NavBar = (props) => {
  const [isNavOpen, setNavOpen] = React.useState(false);
  const pages = [
    { name: "Főoldal", icon: <Home />, path: "/" },
    { name: "Órarend", icon: <ViewTimeline />, path: "/timetable" },
    //{ name: "Osztálypénz", icon: <Payments />, path: "/money" }
  ];
  const accentColor = "#4661e7"; // #634427
  return (
    <>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: accentColor }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setNavOpen(true)}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              align="left" // right
              sx={{ flexGrow: 1 }}
            >
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={isNavOpen} onClose={() => setNavOpen(false)}>
        <Box
          sx={{ height: "100%", backgroundColor: accentColor, color: "white" }}
        >
          <Typography variant="h6" align="center" sx={{ position: "relative", bottom: "-10px" }}>6.d Információs weboldal</Typography>
          <br />
          <Divider />
          {pages.map((page) => (
            <Link to={page.path} className="link">
              <ListItem key={page.index} disablePadding sx={{ width: "300px" }}>
                <ListItemButton>
                  <ListItemIcon color="primary" sx={{ color: "white" }}>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider />
          <a href="http://www.aranyj-gyor.edu.hu" target="_blank" className="link">
              <ListItem disablePadding sx={{ width: "300px" }}>
                <ListItemButton>
                  <ListItemIcon color="primary" sx={{ color: "white" }}>
                    <Launch />
                  </ListItemIcon>
                  <ListItemText primary="HIVATALOS weboldal" />
                </ListItemButton>
              </ListItem>
            </a>
            <Link to="/privacy" className="link">
              <ListItem disablePadding sx={{ width: "300px" }}>
                <ListItemButton>
                  <ListItemIcon color="primary" sx={{ color: "white" }}>
                    <Launch />
                  </ListItemIcon>
                  <ListItemText primary="Az adatvédelemről" />
                </ListItemButton>
              </ListItem>
            </Link>
        </Box>
      </Drawer>
    </>
  );
};
