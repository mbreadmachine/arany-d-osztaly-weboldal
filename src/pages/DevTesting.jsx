import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const DevTesting = () => {
  const thisDoesNotExist = () => {
    throw new Error("This does not exist");
  };

  return (
    <div>
      <Typography>Fejlesztői tesztelés</Typography>
      <Link to="/">
        <Button type="primary">
          Vissza a főoldalra
        </Button>
        <Button onClick={thisDoesNotExist}>
          Sentry error teszt
        </Button>
      </Link>
    </div>
  );
};
