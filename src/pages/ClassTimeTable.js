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

const ClassTimeTablePage = () => {
  const printClassTimetable = (cardOptions, gdriveID) => {
    // cardOptions: 0 Show, 1 Download

    var timetable;
    switch (cardOptions) {
      case 0:
        timetable = window.open(
          "https://drive.google.com/uc?export=view&id=" + gdriveID,
          ""
        );
        break;
      case 1:
        timetable = window.open(
          "https://drive.google.com/uc?export=download&id=" + gdriveID,
          ""
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className="Timetable">
      <NavBar title="Órarend" />
      <Box sx={{ width: 275, margin: "5px" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" align="center">
              Angolos órarend
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              onClick={() =>
                printClassTimetable(1, "1ebXMbQmNcboOkgJhdB1C3n7JUIwfg7JH")
              }
            >
              Letöltés
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                printClassTimetable(0, "1ebXMbQmNcboOkgJhdB1C3n7JUIwfg7JH")
              }
            >
              Megtekintés
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default ClassTimeTablePage;
