import React from "react";
import { NavBar } from "../components/NavBar";
import { Button, TextField, Grid, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { v4 as uuidv4 } from "uuid";
import { HomeWorkCard } from "../components/HomeWorkCard";
import { supabase } from "../supabase";
import { useLogInUI } from "../components/LoginWall";

const CreateHW = () => {
  const [isLoggedIn, forgetMe, LogInUI, currentUser] = useLogInUI();

  const CreateUI = () => {
    const [nowDate, setNowDate] = React.useState(
      new Date().toISOString().slice(0, 10)
    );

    const [homework, setHomework] = React.useState({
      id: uuidv4(),
      date: nowDate,
      homework: "",
      time: new Date(),
      orai: [],
      user:
        isLoggedIn && currentUser
          ? currentUser
          : { name: "Névtelen felhasználó", id: uuidv4() },
    });

    const saveHW = async () => {
      try {
        const { error } = await supabase.from("homework").insert({
          id: homework.id,
          date: homework.date,
          homework: homework.homework,
          orai: homework.orai,
          user: homework.user.id,
        });
        if (error) throw error.message;
        alert(
          "Mentve! Az OK gomb megnyomása után visszairányítalak a főoldalra."
        );
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
              value={homework.date}
              onChange={(e) =>
                setHomework({ ...homework, date: e.target.value })
              }
            />
            <TextField
              multiline
              rows="20"
              fullWidth
              onChange={(e) =>
                setHomework({ ...homework, homework: e.target.value })
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
            ? "Házi feladat kirakása - bejelentkezés"
            : `Házi feladat kirakása (${currentUser.name}-ként)`
        }
        menuItems={[
          isLoggedIn ? (
            <Button onClick={forgetMe} style={{ color: "white" }}>
              Kijelentkezés (és elfelejtés)
            </Button>
          ) : null,
        ]}
      />
      {!isLoggedIn ? <LogInUI /> : <CreateUI />}
    </div>
  );
};

export default CreateHW;
