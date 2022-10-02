import "./App.css";
import { Typography, Divider, Box } from "@mui/material";
import { NavBar } from "./components/NavBar";
import React from "react";
import { HomeWorkCard } from "./components/HomeWorkCard";
import { supabase } from "./supabase"

function App() {
  const [todaysHomework, setTodaysHomework ] = React.useState([])
  const today = new Date().toISOString().slice(0, 10)
  

  const getTodaysHomework = async () => {
    try {
      const { data, error } = await supabase.from('homework').select().eq("date", today)
      if (error) {
        throw(error.message)
      }
      setTodaysHomework(data)

    } catch (err) {
      alert("hiba történt: " + err)
    }
  }

  React.useEffect(() => {
    getTodaysHomework()
  }, [])

  return (
    <div className="App">
      <NavBar title="Főoldal" />
      <br />
      <Typography variant="h4" align="center">
        Üdvözöllek az 5.d információs weboldalán!
      </Typography>
      <br />
      <Typography variant="h5" align="center">Mai Házi Feladat:</Typography>
      <br />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <HomeWorkCard data={todaysHomework} />
      </Box>
    
    </div>
  );
}

export default App;
