import { Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import { Search } from "@mui/icons-material";
import React from "react";
import { NavBar } from "../components/NavBar";
import { supabase } from "../supabase";

const ClassMoney = () => {
  const [ currentSearch, setCurrentSearch ] = React.useState("");
  const [ isLoadingKids, setIsLoadingKids ] = React.useState(false)
  const [ searchResults, setSearchResults ] = React.useState({})

  const handleSearch = () => {
    if (currentSearch === "") return setIsLoadingKids(false)
    try {
      const { data, error } = supabase.from("classmoney").select().textSearch("child_name", currentSearch)
      if (error) throw error
      setSearchResults(data)
      
      setTimeout(() => {
        console.log(searchResults, "from local")
        console.log(data, "from sup")
      }, 1000)
      
    } catch (err) {
      alert("HIBA: " + err.message)
    } finally {
      setCurrentSearch("")
      setIsLoadingKids(false)
    }
  };

  return (
    <>
      <NavBar title="Osztálypénz" />
      <div className="ClassMoney">
        <input
          className="searchBox"
          placeholder="Gyerek neve...."
          onChange={(e) => setCurrentSearch(e.target.value)}
          value={currentSearch}
        />
        <LoadingButton
          loading={isLoadingKids}
          loadingPosition="end"
          color="primary"
          endIcon={<Search />}
          variant="outlined"
          onClick={() => {
            setIsLoadingKids(true);
            handleSearch()
          }}
          sx={{ backgroundColor: "white", marginBottom: "20px", }}
        >
          Keresés
        </LoadingButton>
        <div className="kidContainer">
          {currentSearch !== "" ? (
            currentSearch
          ) : (
            <Typography variant="h6" align="center">
              Nem írtad be a keresett gyerek nevét! Írd be, hogy megláthasd,
              mennyi pénzt adtál be!
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassMoney;
