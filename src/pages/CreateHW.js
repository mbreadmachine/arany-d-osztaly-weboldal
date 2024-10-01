import "@mdxeditor/editor/style.css";

import React from "react";
import { NavBar } from "../components/NavBar";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import { Save, Edit, Close } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { HomeWorkCard } from "../components/HomeWorkCard";
import { supabase } from "../supabase";
import { useLogInUI } from "../components/LoginWall";
import {
  MDXEditor,
  headingsPlugin,
  toolbarPlugin,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import { listsPlugin } from "@mdxeditor/editor";
import { ListsToggle } from "@mdxeditor/editor";
import { UndoRedo } from "@mdxeditor/editor";
import i18n from "i18next";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor";
import { toast } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useFileUpload from "../components/FileUpload";
import { useNavigate } from "react-router-dom";
import encodeyBeGoodHeaderStuff from "../libs/encodeyBeGoodHeaderStuff";

const DialogIsolation = (props) => {
  const handleClose = () => props.setOpen(false);

  return (
    <>
      <Dialog open={props.open} fullScreen>
        <DialogTitle
          className="dialogTitle"
          style={{ backgroundColor: "#4661e7", color: "white" }}
        >
          <Typography variant="h6">Órai hozzáadása/szerkesztése</Typography>
          <IconButton onClick={handleClose} style={{ color: "white" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ marginTop: "10px" }}>
          {props.fileUploadComponent()}
        </DialogContent>
      </Dialog>
    </>
  );
};

const CreateHW = () => {
  const [isLoggedIn, forgetMe, LogInUI, currentUser] = useLogInUI();

  const CreateUI = () => {
    const [fileUploadComponent, files, fileLabels, blobURLs] = useFileUpload();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [nowDate, setNowDate] = React.useState(
      new Date().toISOString().slice(0, 10)
    );
    const [open, setOpen] = React.useState(false);

    const [homework, setHomework] = React.useState({
      id: uuidv4(),
      date: nowDate,
      homework: "",
      time: new Date(),
      orai: [],
      user:
        isLoggedIn && currentUser
          ? currentUser
          : { name: "Névtelen felhasználó", id: uuidv4() },
    });

    React.useEffect(() => {
      console.log("updating órai")
      let newOrai = [];
      files.forEach((file, index) => {
        newOrai.push({
          title: fileLabels[index],
          imgurl: blobURLs[index],
        });
      });
      setHomework({ ...homework, orai: newOrai });
    }, [files, fileLabels]);

    const handleUpdate = (v) => {
      setHomework({ ...homework, homework: v });
    };

    const handleSaveClick = () => {
      if (!homework.homework || homework.homework == "") {
        alert("Üres házit nehéz lesz kirakni. Írj be valamit!")
        return
      }
      let confirmed = window.confirm("Amit ide lentre írtál, az el lesz mentve. Ezen nem változtathatsz az OK gomb megnyomása után. Oké?");
      if (confirmed) uploadHW();
    }

    // * This is the upload mechanism
    const uploadHW = async () => {
      setIsLoading(true);

      let uploadedFiles = [];

      try {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];

          // Generate the new file name
          let newFileName = uuidv4().replace("-", "");

          let currentPath = `${homework.date}/${newFileName}`;

          // Upload file using Supabase storage
          const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(currentPath, file);
          if (uploadError) throw uploadError.message;

          let publicUrl =
            "https://jmuffvghssebyxkfujia.supabase.co/storage/v1/object/public/images/" +
            currentPath;

          // Store uploaded file info
          uploadedFiles.push({ title: fileLabels[index], imgurl: publicUrl });
          toast.success(`${file.name} feltöltve!`);
        }

        // Insert uploaded files metadata into the database
        const { error: dbError } = await supabase.from("homework").insert({
          id: homework.id,
          date: homework.date,
          homework: homework.homework,
          orai: uploadedFiles,
          user: homework.user.id,
        });
        if (dbError) throw dbError.message;

        const response = await fetch("https://ntfy.sh/aranyd-hazi-ertesites", {
          method: "POST",
          
          headers: {
            "Click": "https://aranyd.vercel.app/?date=" + homework.date,
            "Tags": "white_check_mark",
            "Title": encodeyBeGoodHeaderStuff("A házi ki lett rakva!")
          },
          body: `
          ${homework.user.name} kirakta a ${homework.date}-i házit
          Nyomj az értesítésre a házi feladat megtekintéséhez!
          Adatok:
            - Első sor: ${homework.homework}
          `
        })
        if (!response.ok) toast.error("Hiba történt az értesítés küldésekor, viszont minden más sikeres.: " + response.statusText);
        else toast.success("Értesítés elküldve!")

        toast.success("Minden kész.");

        // Redirect and stop loading
        navigate("/");
        setIsLoading(false);
      } catch (err) {
        toast.error("Hoppá, valami balul sült el. \n" + err);
        setIsLoading(false);
      }
    };

    return (
      <>
        <DialogIsolation open={open} setOpen={setOpen} fileUploadComponent={fileUploadComponent} />
        {/* Ez ide nagyon de nagyon muszály ez a whitespace */}

        <Grid container sx={{ mt: 2 }} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" textAlign="center">
              Add meg a dátumot, és kezdd el beírni a házikat alább!
            </Typography>
            <div
              style={{
                border: "2px solid black",
                padding: "2px",
                borderRadius: "10px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              <DatePicker
                label="Dátum"
                value={dayjs(homework.date).set("hour", 12)}
                onChange={(newDate) => 
                  setHomework({
                    ...homework,
                    date: newDate.toISOString().slice(0, 10),
                  })
                }
                sx={{ marginTop: "10px", marginBottom: "10px" }}
                disabled={isLoading}
              />
              <MDXEditor
                markdown={homework.homework}
                onChange={handleUpdate}
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <BlockTypeSelect />
                        <ListsToggle />
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                      </>
                    ),
                  }),
                ]}
                translation={(key, defaultValue, interpolations) => {
                  return i18n.t(key, defaultValue, interpolations);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "50px",
                marginTop: "1%",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Edit />}
                fullWidth
                onClick={() => setOpen(true)}
                disabled={isLoading}
              >
                Órai hozzáadása/szerkesztése
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                fullWidth
                onClick={handleSaveClick}
                disabled={isLoading}
              >
                Mentés
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" align="center">
              Teljesen működő előnézet:
            </Typography>
            <HomeWorkCard data={homework} />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <div className="CreateHW">
      <NavBar
        title={
          !isLoggedIn
            ? "Házi feladat kirakása - bejelentkezés"
            : `Házi feladat kirakása (${currentUser.name}-ként)`
        }
        menuItems={[
          isLoggedIn ? (
            <Button onClick={forgetMe} style={{ color: "white" }}>
              Kijelentkezés (és elfelejtés)
            </Button>
          ) : null,
        ]}
      />
      {!isLoggedIn ? <LogInUI /> : <CreateUI />}
    </div>
  );
};

export default CreateHW;
