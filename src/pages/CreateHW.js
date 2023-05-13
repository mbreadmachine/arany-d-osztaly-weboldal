import React from "react";
import { NavBar } from "../components/NavBar";
import { Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import md5 from "crypto-js/md5";

const CreateHW = () => {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const LogInUI = () => {
    let [password, setPassword] = React.useState("");

    const checkPassword = () => {
        if (password === ""){
            alert("Nem adtál meg semmit se!")
            return;
        } 
            

        if (md5(password).toString() === process.env.REACT_APP_CREATE_PASS_HASH) {
            setIsLoggedIn(true);
        } else {
            alert("Hibás jelszó!")
            setPassword("")
        }
    }

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
        <Button startIcon={<LoginIcon />} style={{ marginTop: "1%" }} onClick={checkPassword}>
          Bejelentkezés
        </Button>
      </div>
    );
  };

  const CreateUI = () => {
    return (
      <div>
        <p>Logged in!</p>
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
