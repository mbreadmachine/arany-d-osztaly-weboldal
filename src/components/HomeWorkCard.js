import React from "react";
import { Typography, CardContent, CardHeader, Card } from "@mui/material";
import { HomeWork } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const HomeWorkCard = (props) => {
  return (
    <>
      {props.data.map((e) => (
        <Card sx={{ minWidth: 345, minHeight: 300, maxWidth: 600 }}>
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {e.homework}
              </ReactMarkdown>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
