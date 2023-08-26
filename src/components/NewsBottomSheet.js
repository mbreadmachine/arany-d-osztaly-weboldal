import React from "react";
import { Typography, Box, Fab, CircularProgress } from "@mui/material";
import StickyFooter from "react-sticky-footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { formatDistanceToNow } from "date-fns";
import { hu } from "date-fns/locale";
import { Newspaper, KeyboardArrowDown } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../supabase";

export const NewsBottomSheet = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  //   const sampleData = {
  //     data: [
  //       {
  //         id: "1",
  //         title: "Közelgő matematika teszt",
  //         content:
  //           "Az elkövetkező hetekben egy fontos matematika teszt lesz. Szükséges az összes modul áttekintése az sikeres eredmény érdekében.",
  //         date: "2022-03-14T12:00:00.000Z",
  //       },
  //       {
  //         id: "2",
  //         title: "Fizika házi feladat",
  //         content:
  //           "Ne felejtsd el elkészíteni a héten kiadott fizika házi feladatot. Az anyag a kinematika témakörére fog koncentrálni.",
  //         date: "2022-02-20T14:00:00.000Z",
  //       },
  //       {
  //         id: "3",
  //         title: "Irodalmi verseny",
  //         content:
  //           "Az iskolában jövő hónapban irodalmi versenyt rendeznek. Az előkészületek már folyamatban vannak.",
  //         date: "2021-12-10T10:30:00.000Z",
  //       },
  //       {
  //         id: "4",
  //         title: "Történelem vetélkedő",
  //         content:
  //           "Egy történelem vetélkedőt szerveznek a hónap végén. Az anyag a középkori Európa történelmét öleli fel.",
  //         date: "2023-01-25T13:45:00.000Z",
  //       },
  //       {
  //         id: "5",
  //         title: "Angol nyelvű előadás",
  //         content:
  //           "Jövő hét kedden angol nyelvű előadást tartanak a tanárok a modern irodalom témakörében.",
  //         date: "2023-02-28T16:00:00.000Z",
  //       },
  //     ],
  //   };

  const [isVisible, setIsVisible] = React.useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchedNews, setFetchedNews] = React.useState({});

  const getNews = async () => {
    try {
      setIsLoading(true);
      console.log("starting fetch")
      const { data, error } = await supabase.from("news").select();

      if (error) throw error;

      setFetchedNews(data);
      console.log("ended fetch successfully")
      
      setIsLoading(false);
    } catch (err) {
      alert("hiba történt: " + err);
    }
  };

  React.useEffect(() => {
    getNews();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          bottom: isVisible ? "10em" : "1em",
          right: 10,
          zIndex: 2,
        }}
      >
        <Fab color="primary" aria-label="add" onClick={toggleVisibility}>
          {isVisible ? <KeyboardArrowDown /> : <Newspaper />}
        </Fab>
      </Box>
      {isVisible && (
        <StickyFooter
          bottomThreshold={0}
          normalStyles={{
            backgroundColor: "rgb(0,0,0,0.3)",
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
          stickyStyles={{
            backgroundColor: "rgb(0,0,0,0.3)",
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {fetchedNews.map((news) => (
                <Box
                  key={news.id}
                  sx={{
                    borderRadius: 2,
                    marginBottom: 2,
                    marginLeft: 2,
                    marginRight: 2,
                    minHeight: "100px", // Set a minimum height
                    background:
                      "linear-gradient(0deg, #00BFFF 0%, #8A2BE2 100%)",
                  }}
                >
                  <Box sx={{ margin: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <Typography variant="h5">{news.title}</Typography>

                      <Typography
                        variant="caption"
                        sx={{ fontStyle: "italic", marginTop: 1 }}
                      >
                        {formatDistanceToNow(new Date(news.date), {
                          addSuffix: true,
                          includeSeconds: true,
                          locale: hu,
                        })}
                      </Typography>
                    </Box>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {news.content}
                    </ReactMarkdown>
                  </Box>
                </Box>
              ))}
            </Carousel>
          )}
        </StickyFooter>
      )}
    </Box>
  );
};
