import React from "react";

import { Typography, CardContent, CardHeader, Card } from "@mui/material";

import { HomeWork } from "@mui/icons-material";

export const HomeWorkCard = (props) => {
  return (
    <>
      {props.data.map((e) => (
        <Card sx={{ width: 345, minHeight: 300 }}>
          <CardHeader
            avatar={<HomeWork />}
            title="Házi feladat"
            subheader={e.date}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{
                __html: e.homework.replaceAll("\n", "<br />"),
              }}
            ></Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
