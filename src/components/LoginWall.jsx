import React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography
} from "@mui/material";
import md5 from "crypto-js/md5";
import LoginIcon from "@mui/icons-material/Login";
import { useCookies } from "react-cookie";
import { supabase } from "../supabase";
import { toast } from "react-hot-toast";

const useLogInUI = () => {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let [rememberMe, setRememberMe] = React.useState(true);
  let [password, setPassword] = React.useState("");
  let [cookies, setCookie, removeCookie] = useCookies();
  let [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    pageLoadCheck();
  }, []);

  const pageLoadCheck = async () => {
    let { data, error } = await supabase
      .from("users")
      .select()
      .eq("secretKey", cookies["passwordHash"]);

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
  };

  const forgetMe = () => {
    removeCookie("passwordHash");
    setIsLoggedIn(false);
    toast("Legközelebb újra be kell jelentkezned.", { icon: "⚠️"})
  };

  const checkPassword = async (event) => {
    event.preventDefault();
    if (password === "") {
      toast.error("Be is kéne valamit írni, tudod?")
      return;
    }

    let { data, error } = await supabase
      .from("users")
      .select()
      .eq("secretKey", md5(password).toString());

    if (error) {
      toast.error("Hoppá, valami balul sült el. \n" + error.message);
      return;
    }

    try {
      if (data[0].secretKey === md5(password).toString()) {
        if (rememberMe) {
          let newDate = new Date();
          newDate.setFullYear(newDate.getFullYear() + 1);
          setCookie("passwordHash", data[0].secretKey, { expires: newDate });
        }
        setPassword("");
        setCurrentUser(data[0]);
        setIsLoggedIn(true);
        toast.success("Sikeres bejelentkezés!")
      }
    } catch {
      toast.error("Hibás jelszó.");
      setPassword("");
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const loginImage = React.useMemo(() => (
    <img src="/icons/login.png" alt="Windows XP login icon" style={{ width: "40px" }} />
  ), []);

  const LogInUI = () => {
    return (
      <form onSubmit={checkPassword}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {loginImage}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" style={{ marginTop: "1%" }}>
                Jelszóval védett oldal
              </Typography>
              <Typography variant="body1" style={{color: "gray"}}>Kérlek jelentkezz be.</Typography>
            </div>

          </div>
          <TextField
            label="Jelszó"
            value={password}
            onChange={updatePassword}
            type="password"
            autoComplete="current-password"
            autoFocus={true}
            style={{ marginTop: "10px" }}
          />
          <FormControlLabel
            control={
              <Checkbox checked={rememberMe} onChange={updateRememberMe} />
            }
            label="Maradjak bejelentkezve"
          />
          <Button
            startIcon={<LoginIcon />}
            type="submit"
          >
            Bejelentkezés
          </Button>
        </div>
      </form>
    );
  };

  return [isLoggedIn, forgetMe, LogInUI, currentUser];
};

export { useLogInUI };
