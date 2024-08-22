import "@mdxeditor/editor/style.css";

import React from "react";
import { NavBar } from "../components/NavBar";
import { Button, TextField, Grid, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
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

const CreateHW = () => {
  const [isLoggedIn, forgetMe, LogInUI, currentUser] = useLogInUI();

  const CreateUI = () => {
    const [nowDate, setNowDate] = React.useState(
      new Date().toISOString().slice(0, 10)
    );

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

    const saveHW = async () => {
      try {
        const { error } = await supabase.from("homework").insert({
          id: homework.id,
          date: homework.date,
          homework: homework.homework,
          orai: homework.orai,
          user: homework.user.id,
        });
        if (error) throw error.message;
        toast.success("Minden sikeresen mentve!");

        window.location.href = "/";
        return;
      } catch (err) {
        toast.error("Hoppá, valami balul sült el. \n" + err);
      }
    };

    return (
      <div>
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
              />
              <MDXEditor
                markdown={homework.homework}
                onChange={(value) =>
                  setHomework({ ...homework, homework: value })
                }
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
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              style={{ marginTop: "1%" }}
              fullWidth
              onClick={saveHW}
            >
              Mentés
            </Button>
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
      </div>
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
