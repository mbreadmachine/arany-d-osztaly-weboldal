import React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import md5 from "crypto-js/md5";
import LoginIcon from "@mui/icons-material/Login";
import { useCookies } from "react-cookie";
import { supabase } from "../supabase";

const useLogInUI = () => {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let [rememberMe, setRememberMe] = React.useState(true);
  let [password, setPassword] = React.useState("");
  let [cookies, setCookie, removeCookie] = useCookies();
  let [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    pageLoadCheck();
  }, [cookies]);

  const pageLoadCheck = async () => {
    let { data, error } = await supabase.from("users").select().eq("secretKey", cookies["passwordHash"]);

    if (error) {
      console.error(error.message);
    }

    try {
      if (data[0].secretKey === cookies["passwordHash"]) {
        setIsLoggedIn(true);
        setCurrentUser(data[0]);
      }
    } catch {
      console.error("Nem valid a hash!");
    }

  }

  const forgetMe = () => {
    removeCookie("passwordHash");
    setIsLoggedIn(false);
  };

  const checkPassword = async () => {
    if (password === "") {
      alert("Nem adtál meg semmit se!");
      return;
    }

    let { data, error } = await supabase.from("users").select().eq("secretKey", md5(password).toString());

    if (error) {
      alert("Hiba történt a jelszó ellenőrzésekor: " + error.message);
      return
    }

    try {
      if (data[0].secretKey === md5(password).toString()) {
        if (rememberMe) {
          let newDate = new Date();
          newDate.setFullYear(newDate.getFullYear() + 1);
          setCookie("passwordHash", data[0].secretKey, {expires: newDate});
        }
        setPassword("");
        setCurrentUser(data[0]);
        setIsLoggedIn(true);
      }
    } catch {
      alert("Hibás jelszó!");
      setPassword("");
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const updateRememberMe = (e) => {
    setRememberMe(e.target.checked);
  }
  const LogInUI = () => {
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
        <FormGroup>
          <TextField
            label="Add meg a jelszót"
            value={password}
            onChange={updatePassword}
            type="password"
            autoComplete="current-password"
            autoFocus={true}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={updateRememberMe}
              />
            }
            label="Maradjak bejelentkezve"
            style={{ marginTop: "1%" }}
          />
          <Button
            startIcon={<LoginIcon />}
            style={{ marginTop: "1%" }}
            onClick={checkPassword}
          >
            Bejelentkezés
          </Button>
        </FormGroup>
      </div>
    );
  };

  return [isLoggedIn, forgetMe, LogInUI, currentUser];
};

export { useLogInUI };
