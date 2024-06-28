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
  // const printClassTimetable = (cardOptions, gdriveID) => {
  //   
  // cardOptions: 0 Show, 1 Download

  //   var timetable;
  //   switch (cardOptions) {
  //     case 0:
  //       timetable = window.open(
  //         "https://drive.google.com/uc?export=view&id=" + gdriveID,
  //         ""
  //       );
  //       break;
  //     case 1:
  //       timetable = window.open(
  //         "https://drive.google.com/uc?export=download&id=" + gdriveID,
  //         ""
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // return (
  //   <div className="Timetable">
  //     <NavBar title="Órarend" />
  //     <Box sx={{ width: 275, margin: "5px" }}>
  //       <Card variant="outlined">
  //         <CardContent>
  //           <Typography variant="h6" align="center">
  //             Angolos órarend
  //           </Typography>
  //         </CardContent>
  //         <CardActions>
  //           <Button
  //             variant="outlined"
  //             onClick={() =>
  //               printClassTimetable(1, process.env.REACT_APP_TIMETABLE_DRIVE_ID)
  //             }
  //           >
  //             Letöltés
  //           </Button>
  //           <Button
  //             variant="outlined"
  //             onClick={() =>
  //               printClassTimetable(0, process.env.REACT_APP_TIMETABLE_DRIVE_ID)
  //             }
  //           >
  //             Megtekintés
  //           </Button>
  //         </CardActions>
  //       </Card>
  //     </Box>
  //   </div>
  // );

  return (
    <div className="Timetable">
      <NavBar title="Órarend -- ÁTÉPÍTÉS ALATT"/>
      <UnderConstruction>
        <p style={{fontSize: "30px"}}><s>Bob, a mester-</s> Én mindig fejleszteni próbálom ezt a weboldalt. Ez egy fájdalmas dolog. Ha kell az órarend, kérd el Messengeren.</p>
      </UnderConstruction>
    </div>

  )
};

export default ClassTimeTablePage;
