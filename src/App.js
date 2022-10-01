import "./App.css"; 
import { Typography } from "@mui/material";
import { NavBar } from "./components/NavBar";

function App() {

  return (
    <div className="App">
      <NavBar title="Főoldal"/>
      <br />
      <Typography variant="h4" align="center">
        Üdvözöllek az 5.d információs weboldalán!
      </Typography>
    </div>
  );
}

export default App;
