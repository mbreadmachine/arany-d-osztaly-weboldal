import "./App.css";
import { Typography, Box, Grid, IconButton, CircularProgress } from "@mui/material";
import { NavBar } from "./components/NavBar";
import React from "react";
import { HomeWorkCard } from "./components/HomeWorkCard";
import { supabase } from "./supabase";
import dayjs from "dayjs";
import { useSearchParams, Link } from "react-router-dom";
import history from "history/browser";
import { Add } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Main() {
  const [datesHomework, setDatesHomework] = React.useState([]);
  const [sparams, setSParams] = useSearchParams();
  const [date, setDate] = React.useState(() => {
    if (sparams.has("date") && dayjs(sparams.get("date")).isValid()) {
      return sparams.get("date");
    } else {
      return new Date().toISOString().slice(0, 10);
    }
  });
  const [loading, setLoading] = React.useState(false);

  const getSetDatesHomework = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("homework")
        .select("*, user(*)")
        .eq("date", date);
      if (error) {
        throw error.message;
      }
      setDatesHomework(data);
      setLoading(false);
    } catch (err) {
      toast.error("Hoppá, valami balul sült el. \n" + err);
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    history.push({ search: `?date=${date}` });
    setDate(date);
  };
  React.useEffect(() => {
    if (sparams.has("date") && dayjs(sparams.get("date")).isValid()) {
      setDate(sparams.get("date"));
    } else {
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [sparams]);

  React.useEffect(() => {
    getSetDatesHomework();
  }, [date]);

  return (
    <div className="App">
      <NavBar
        title="Főoldal"
        menuItems={[
          <Link to="/create">
            <IconButton style={{ color: "white" }}>
              <Add />
            </IconButton>
          </Link>,
        ]}
      />
      <br />
      {/* <marquee style={{"color": "orange"}}>FIGYELEM: Minden hét hétfőn, az adatbázisból törlődnek a képek. Ezért, csak a jelenlegi heti órai munkákat lehet megtekinteni. Elnézést, ha kellemetlenséget okoztam.</marquee> */}
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center">
            Üdvözöllek az 7.d információs weboldalán!
          </Typography>
          <br />
          <Typography variant="h5" align="center">
            Add meg azt a dátumot, amelyik napi házi feladatot szeretnéd látni:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DatePicker label="Dátum" value={dayjs(date)} onChange={(newDate) => handleDateChange(newDate.toISOString().slice(0, 10))} sx={{ marginTop: "10px"}}/>
            {/* <input
              type="date"
              placeholder="Dátum"
              style={{ width: 200, height: 30 }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" align="center">
              Házi feladat {date}-én/án:
            </Typography>
            <br />
            {loading ? (
              <CircularProgress />
            ) : datesHomework.length === 0 ? (
              <Typography variant="subtitle">
                Nincs erre a napra házi, válassz új napot.
              </Typography>
            ) : (
              <div sx={{ display: "flex", flexDirection: "column" }}>
                {datesHomework.map((homw) => (
                  <HomeWorkCard data={homw} />
                ))}
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
      {/* <NewsBottomSheet></NewsBottomSheet> */}
    </div>
  );
}

export default Main;
