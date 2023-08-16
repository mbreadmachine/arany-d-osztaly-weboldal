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
  const printClassTimetable = (ifPrint) => {
    var timetable = window.open("", "", "height=500, width=1000");
    timetable.document.write(`
    <div class="container">
      <h6>Angolos órarend</h6>
      <br />
      <table class="classtable">
        <thead>
          <tr>
            <th>Hétfő</th>
            <th>Kedd</th>
            <th>Szerda</th>
            <th>Csütörtök</th>
            <th>Péntek</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&nbsp;Magyar irodalom</td>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Környezet</td>
            <td>&nbsp;Természetismeret</td>
            <td>&nbsp;Matematika</td>
          </tr>
          <tr>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Nyelvtan</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;Osztályfőnöki</td>
            <td>&nbsp;Angol</td>
          </tr>
          <tr>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Etika</td>
            <td>&nbsp;Technika</td>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Testnevelés</td>
          </tr>
          <tr>
            <td>&nbsp;Digitális oktatás</td>
            <td>&nbsp;Irodalom</td>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Történelem</td>
            <td>&nbsp;Rajz</td>
          </tr>
          <tr>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;Történelem</td>
            <td>&nbsp;Ének</td>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Ének</td>
          </tr>
          <tr>
            <td>&nbsp;Nyelvtan</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>

        <tbody></tbody>
      </table>
    </div>
    <style>
      @import url(https://fonts.googleapis.com/css?family=Roboto);

      * {
        font-family: Roboto;
      }
      table,
      td {
        border: 2px solid black;
        text-align: center;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    </style>

    `);
    timetable.document.close();
    if(ifPrint) timetable.print();
  };
  return (
    <div className="Timetable">
      <NavBar title="Órarend" />
      <Box sx={{ width: 275, margin: "5px"  }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" align="center">
              Angolos órarend
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              onClick={() => printClassTimetable(true)}
            >
              Nyomtatás
            </Button>
            <Button
              variant="outlined"
              onClick={() => printClassTimetable(false)}
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
