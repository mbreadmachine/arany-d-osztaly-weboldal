import "./App.css"; 
import { Button, Typography } from "@mui/material";

function App() {

  const printClassTimetable = () => {
    var timetable = window.open('', '', 'height=500, width=1000');
    timetable.document.write(`
    <div class="container">
      <h6>Angolos órarend</h6>
      <br />
      <table className="classtable">
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
            <td>&nbsp;Angol</td>
            <td>&nbsp;Természetismeret</td>
            <td>&nbsp;Matematika</td>
          </tr>
          <tr>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Nyelvtan</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;Történelem</td>
            <td>&nbsp;Angol</td>
          </tr>
          <tr>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Etika</td>
            <td>&nbsp;Technika</td>
            <td>&nbsp;Magyar irodalom</td>
            <td>&nbsp;Testnevelés</td>
          </tr>
          <tr>
            <td>&nbsp;Digitális oktatás</td>
            <td>&nbsp;Természetismeret</td>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Magyar nyelvtan</td>
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
            <td>&nbsp;</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;Osztályfőnöki</td>
          </tr>
        </tbody>
      </table>
    </div>
    <style>
      @import url(https://fonts.googleapis.com/css?family=Roboto);

      * {
        font-family: Roboto;
      }
      table, td{
        border: 2px solid black;
        text-align: center;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    </style>
    `)
    timetable.document.close()
    timetable.print()
  }

  return (
    <div className="App">
      <Typography variant="h4">
        Üdvözöllek az 5.d információs weboldalán!
      </Typography>
      <Typography variant="h6">
        Ezen a weboldalon találhatsz fontos információkat az 5.d-ről. Jelenleg
        csak az órarend nyomtatható ki (lásd lent), de hamarosan lesz más is.
      </Typography>
      <br />
      
      <Typography variant="h6">Angolos órarend</Typography>
      <br />
      <table className="classtable">
        <thead>
          <tr>
            <th>Hétfő</th>
            <th>Kedd</th>
            <th>Szerda</th>
            <th>Csütörtök</th>
            <th>Péntek</th>
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          <tr>
            <td>&nbsp;Magyar irodalom</td>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Természetismeret</td>
            <td>&nbsp;Matematika</td>
          </tr>
          <tr>
            <td>&nbsp;Angol</td>
            <td>&nbsp;Nyelvtan</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;Történelem</td>
            <td>&nbsp;Angol</td>
          </tr>
          <tr>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Etika</td>
            <td>&nbsp;Technika</td>
            <td>&nbsp;Magyar irodalom</td>
            <td>&nbsp;Testnevelés</td>
          </tr>
          <tr>
            <td>&nbsp;Digitális oktatás</td>
            <td>&nbsp;Természetismeret</td>
            <td>&nbsp;Matematika</td>
            <td>&nbsp;Magyar nyelvtan</td>
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
            <td>&nbsp;</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;</td>
            <td>&nbsp;Testnevelés</td>
            <td>&nbsp;Osztályfőnöki</td>
          </tr>
        </tbody>
      </table>
      <br />
      <Button variant="outlined" onClick={printClassTimetable}>Nyomtatás</Button>
    </div>
  );
}

export default App;
