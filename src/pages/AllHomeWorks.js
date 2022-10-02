import React from "react";
import { HomeWorkCard } from "../components/HomeWorkCard";
import { NavBar } from "../components/NavBar";
import { supabase } from "../supabase";
import { Grid } from "@mui/material";

export const AllHomeWorks = () => {

    const [ allHomeworks, setAllHomeworks ] = React.useState([])

    const getAllHomeworks = async () => {
        try {
            const { data, error } = await supabase.from("homework").select()
            if (error) throw(error.message)
            setAllHomeworks(data)
        } catch (err) {
            alert("hiba: " + err)
        }
    }

    React.useEffect(() => {
        getAllHomeworks()
    }, [])
  return (
    <>
      <NavBar title="Összes házifeladat" />
      <Grid container spacing={2}>
            {allHomeworks.map((homework) => {
                <Grid item xs={4}>
                    {<HomeWorkCard data={homework} isSingle={false} key={homework.id} />}
                </Grid>
            })}
      </Grid>
    </>
  );
};
