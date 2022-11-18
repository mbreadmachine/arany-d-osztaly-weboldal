import React from "react";

import { Typography, CardContent, CardHeader, Card } from "@mui/material";

import { HomeWork } from "@mui/icons-material";

import ReactMarkdown from "react-markdown";

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
              // dangerouslySetInnerHTML={{
              //   __html: formatHomework(e.homework),
              // }}
            >
              <ReactMarkdown>
                {e.homework}
              </ReactMarkdown>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
