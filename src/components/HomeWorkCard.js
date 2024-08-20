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
import { HomeWork, PhotoLibrary, OpenInFull, Close } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const HomeWorkCard = (props) => {
  var [isOpen, setIsOpen] = React.useState(false);
  var [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    setDate(new Date(props.data.time));
  }, []);

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
          {props.data.date} napi házi feladat csatolmányai
          <IconButton
            onClick={() => setIsOpen(false)}
            autoFocus
            style={{ color: "white" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        {/*pics.pictures && pics.pictures.map((pic) => <p>{pic}</p>)*/}
        <DialogContent>
          <div style={{ marginTop: "20px" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent="center"
            >
              {props.data.orai ? props.data.orai.map((item) => (
                  <Grid item xs="auto">
                    <Card sx={{ width: "350px" }}>
                      <div
                        style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
                      >
                        <CardContent>
                          <img src={item.imgurl} alt={item.title} />
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.title}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="outlined"
                            startIcon={<OpenInFull />}
                            target="_blank"
                            href={item.imgurl}
                            style={{ width: "100%" }}
                          >
                            Megtekintés nagyobban
                          </Button>
                        </CardActions>
                      </div>
                    </Card>
                  </Grid>
                )) : (
                  <div sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h2">
                      Nincs órai? Hát legyen.
                    </Typography>
                  </div>
                )}
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
          marginBottom: "10px",
        }}
      >
        <CardHeader
          avatar={<HomeWork />}
          title={`Házi feladat (${props.data.user.name} által)`}
          subheader={`${props.data.date} (${date.toLocaleTimeString()})`}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            // dangerouslySetInnerHTML={{
            //   __html: formatHomework(e.homework),
            // }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.data.homework}</ReactMarkdown>
          </Typography>
        </CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            startIcon={<PhotoLibrary />}
            style={{ width: "90%", marginBottom: "20px" }}
            onClick={() => setIsOpen(true)}
          >
            Órai munka
          </Button>
        </div>
      </Card>
    </>
  );
};
