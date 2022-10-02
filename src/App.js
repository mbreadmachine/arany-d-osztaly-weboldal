import "./App.css";
import { Typography, Box } from "@mui/material";
import { NavBar } from "./components/NavBar";
import React from "react";
import { HomeWorkCard } from "./components/HomeWorkCard";
import { supabase } from "./supabase"

function App() {
  const [datesHomework, setDatesHomework ] = React.useState([])
  const [ date, setDate ] = React.useState(new Date().toISOString().slice(0, 10))
  

  const getSetDatesHomework = async () => {
    try {
      const { data, error } = await supabase.from('homework').select().eq("date", date)
      if (error) {
        throw(error.message)
      }
      setDatesHomework(data)

    } catch (err) {
      alert("hiba történt: " + err)
    }
  }

  React.useEffect(() => {
    getSetDatesHomework()
  }, [date])

  return (
    <div className="App">
      <NavBar title="Főoldal" />
      <br />
      <Typography variant="h4" align="center">
        Üdvözöllek az 5.d információs weboldalán!
      </Typography>
      <br />
      <Typography variant="h5" align="center">Add meg azt a dátumot, amikor szeretnéd látni a házi feladatot:</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="date" placeholder="Dátum" style={{ width: 200, height: 30 }} value={date} onChange={(e) => setDate(e.target.value) } />
        <Typography variant="h5" align="center">A {date} dátumi házi feladat:</Typography>
        <br />
        {datesHomework.length == 0 ? <Typography variant="subtitle" color="white">Nincs erre a napra házi, válassz új napot.</Typography> : <HomeWorkCard data={datesHomework} isSingle={true} /> }
        
      </Box>
    
    </div>
  );
}

export default App;
