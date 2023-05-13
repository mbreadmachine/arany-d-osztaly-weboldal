import React from "react";
import { NavBar } from "../components/NavBar";
import { Button, TextField, Grid, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SaveIcon from "@mui/icons-material/Save";
import md5 from "crypto-js/md5";
import { v4 as uuidv4 } from 'uuid'
import { HomeWorkCard } from "../components/HomeWorkCard";
import {supabase} from "../supabase";
import { redirect } from "react-router-dom";

const CreateHW = () => {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const LogInUI = () => {
    let [password, setPassword] = React.useState("");

    const checkPassword = () => {
      if (password === "") {
        alert("Nem adtál meg semmit se!");
        return;
      }

      if (md5(password).toString() === process.env.REACT_APP_CREATE_PASS_HASH) {
        setIsLoggedIn(true);
      } else {
        alert("Hibás jelszó!");
        setPassword("");
      }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
        }}
      >
        <TextField
          label="Add meg a jelszót"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          startIcon={<LoginIcon />}
          style={{ marginTop: "1%" }}
          onClick={checkPassword}
        >
          Bejelentkezés
        </Button>
      </div>
    );
  };

  const CreateUI = () => {
    const [value, setValue] = React.useState("1");
    const [nowDate, setNowDate] = React.useState(
      new Date().toISOString().slice(0, 10)
    );

    const [homework, setHomework] = React.useState([
      {
        id: uuidv4(),
        date: nowDate,
        homework: "",
      },
    ]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const saveHW = async () => {
      try {
        const { error } = await supabase
        .from("homework")
        .insert(homework[0]);
        if (error) throw error.message;
        alert("Mentve! Az OK gomb megnyomása után visszairányítalak a főoldalra.");
        window.location.href = "/";
        return;
      } catch (err) {
        alert(err);
      }

    };

    return (
      <div>
        <Grid container sx={{ mt: 2 }} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" textAlign="center">
              Házi feladat adatok:
            </Typography>
            <input
              type="date"
              style={{ width: "100%", height: "30px", marginBottom: "1%" }}
              value={homework[0].date}
              onChange={(e) =>
                setHomework([{ ...homework[0], date: e.target.value }])
              }
            />
            <TextField
              multiline
              rows="20"
              fullWidth
              onChange={(e) =>
                setHomework([{ ...homework[0], homework: e.target.value }])
              }
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              style={{ marginTop: "1%" }}
              fullWidth
              onClick={saveHW}
            >
              Mentés
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <HomeWorkCard data={homework} />
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div className="CreateHW">
      <NavBar
        title={
          !isLoggedIn
            ? "Házi feladat készítése - bejelentkezés"
            : "Házi feladat készítése"
        }
      />
      {!isLoggedIn ? <LogInUI /> : <CreateUI />}
    </div>
  );
};

export default CreateHW;
