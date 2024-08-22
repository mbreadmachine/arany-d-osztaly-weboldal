import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const DevTesting = () => {
  return (
    <div>
      <Typography>Fejlesztői tesztelés</Typography>
      <Link to="/">
        <Button type="primary">
          Vissza a főoldalra
        </Button>
      </Link>
    </div>
  );
};
