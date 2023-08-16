import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Search, ExpandMore } from "@mui/icons-material";
import React from "react";
import { NavBar } from "../components/NavBar";
import { supabase } from "../supabase";

const ClassMoney = () => {
  const [currentSearch, setCurrentSearch] = React.useState("");
  const [savedSearch, setSavedSearch] = React.useState("");
  const [isLoadingKids, setIsLoadingKids] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearch = async () => {
    if (currentSearch === "") return setIsLoadingKids(false);
    try {
      const { data, error } = await supabase
        .from("classmoney")
        .select()
        .textSearch("child_name", currentSearch, {
          type: "websearch"
        });
      if (error) throw error;
      setSearchResults(data);
    } catch (err) {
      alert("HIBA: " + err.message);
    } finally {
      setSavedSearch(currentSearch)
      setCurrentSearch("");
      setIsLoadingKids(false);
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
            handleSearch();
          }}
          sx={{ backgroundColor: "white", marginBottom: "20px" }}
        >
          Keresés
        </LoadingButton>
        <div className="kidContainer">
        <Typography variant="h6" align="center">Keresés: "{savedSearch}"</Typography>
          {searchResults.length !== 0
            ? searchResults?.map((kid) => (
                <>
                  
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1a-content"
                    >
                      <Typography>{kid.child_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        <li>Január: {kid.reported_cash.january} Ft</li>
                        <li>Február: {kid.reported_cash.february} Ft</li>
                        <li>Március: {kid.reported_cash.march} Ft</li>
                        <li>Április: {kid.reported_cash.april} Ft</li>
                        <li>Május: {kid.reported_cash.may} Ft</li>
                        <li>Június: {kid.reported_cash.june} Ft</li>
                        <li>Szeptember: {kid.reported_cash.september} Ft</li>
                        <li>Október: {kid.reported_cash.october} Ft</li>
                        <li>November: {kid.reported_cash.november} Ft</li>
                        <li>December: {kid.reported_cash.december} Ft</li>
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default ClassMoney;
