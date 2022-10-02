import React from "react";

import { Typography, CardContent, CardHeader, Card } from "@mui/material";

import { HomeWork } from "@mui/icons-material";

export const HomeWorkCard = (props) => {
  console.log(props.data)

  if (props.isSingle) {
    return (
      <>
        {props.data.map((e) => (
          <Card sx={{ width: 345, height: 300}}>
            <CardHeader
              avatar={<HomeWork />}
              title="Házi feladat"
              subheader={e.date}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: e.homework.replace("\n", "<br />")}}>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else {
    return (
      <>
          <Card sx={{ width: 345, height: 300}}>
            <CardHeader
              avatar={<HomeWork />}
              title="Házi feladat"
              subheader={props.data.date}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: props.data.homework.replace("\n", "<br />")}}>
              </Typography>
            </CardContent>
          </Card>
      </>
    )
  }


};
