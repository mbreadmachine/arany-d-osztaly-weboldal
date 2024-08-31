import React from "react";
import { NavBar } from "../components/NavBar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { UnderConstruction } from "../components/UnderConstruction";

const ClassTimeTablePage = () => {
  return (
    <div className="Timetable">
      <NavBar title="Órarend" />
      <Box sx={{ display: "flex", justifyContent: "center", margin: "5px" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" align="center">
              Angolos és németes órarend
            </Typography>
            <Typography variant="h4"><b>Az első kiadás angol és némettel együtt</b>!</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
            >
              <a href="https://smart-timetable.app/share.html?code=U99R54ZN">Interaktív verzió</a>
            </Button>
            <Button
              variant="outlined"
            >
              <a href="timetable.pdf">Offline, nyomtatható verzió</a>
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default ClassTimeTablePage;
