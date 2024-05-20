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

const useLogInUI = () => {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let [rememberMe, setRememberMe] = React.useState(true);
  let [password, setPassword] = React.useState("");
  let [cookies, setCookie, removeCookie] = useCookies();

  React.useEffect(() => {
    if (cookies["passwordHash"] === process.env.REACT_APP_CREATE_PASS_HASH) {
      setIsLoggedIn(true);
    }
  }, []);

  const forgetMe = () => {
    removeCookie("passwordHash");
    setIsLoggedIn(false);
  };

  const checkPassword = () => {
    if (password === "") {
      alert("Nem adtál meg semmit se!");
      return;
    }

    if (md5(password).toString() === process.env.REACT_APP_CREATE_PASS_HASH) {
      if (rememberMe) {
        setCookie("passwordHash", process.env.REACT_APP_CREATE_PASS_HASH);
      }
      setIsLoggedIn(true);
    } else {
      alert("Hibás jelszó!");
      setPassword("");
    }
  };
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
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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

  return [isLoggedIn, forgetMe, LogInUI];
};

export { useLogInUI };
