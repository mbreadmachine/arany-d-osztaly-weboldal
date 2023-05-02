import React from "react";
import {
  Typography,
  CardContent,
  CardHeader,
  Card,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  CardActions,
  IconButton,
} from "@mui/material";
import { HomeWork, PhotoLibrary, Visibility, Close } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const HomeWorkCard = (props) => {
  var [hw, setHw] = React.useState("");
  var [hwparms, setHwparms] = React.useState({});
  var [pics, setPics] = React.useState({});
  var [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    props.data.map((homw) => {
      try {
        setHw(homw.homework.split("$")[0]);
        setHwparms(homw);
        var lPics = { pictures: [] };
        homw.homework
          .split("$")[1]
          .split(";")
          .forEach((element) => {
            lPics.pictures.push(element.replaceAll("\n", ""));
          });

        setPics(lPics);

        console.log(lPics, pics);
      } catch {
        console.log("nem lehetett de mindegy :)");
      }
    });
  });

  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          className="dialogTitle"
          style={{ backgroundColor: "#4661e7", color: "white" }}
        >
          {hwparms.date} napi házi feladat csatolmányai
          <IconButton
            onClick={() => setIsOpen(false)}
            autoFocus
            style={{ color: "white" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        {/*pics.pictures && pics.pictures.map((pic) => <p>{pic}</p>)*/}
        <DialogContent style={{ backgroundColor: "#3c3c3c" }}>
          <div style={{ marginTop: "20px" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent="center"
            >
              {pics.pictures &&
                pics.pictures.map((pic) => (
                  <Grid item xs="auto">
                    <Card sx={{ width: "350px" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
                      >
                        <CardContent>
                          <img src={pic.split(":")[2]} />
                          <Typography variant="subtitle1" fontWeight="bold">
                            {pic.split(":")[0]}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="outlined"
                            startIcon={<Visibility />}
                            target="_blank"
                            href={pic.split(":")[2]}
                            style={{ width: "100%" }}
                          >
                            Megtekintés
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
      {/* Dialog end */}

      <Card
        sx={{
          minWidth: 345,
          minHeight: 300,
          maxWidth: "390px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <CardHeader
          avatar={<HomeWork />}
          title="Házi feladat"
          subheader={hwparms.date}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            // dangerouslySetInnerHTML={{
            //   __html: formatHomework(e.homework),
            // }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{hw}</ReactMarkdown>
          </Typography>
        </CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            startIcon={<PhotoLibrary />}
            style={{ width: "90%", marginBottom: "20px" }}
            onClick={() => setIsOpen(true)}
          >
            Csatolt képek
          </Button>
        </div>
      </Card>
    </>
  );
};
