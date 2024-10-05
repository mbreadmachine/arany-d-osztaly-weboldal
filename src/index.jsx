import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import ClassTimeTablePage from "./pages/ClassTimeTable";
import CreateHW from "./pages/CreateHW";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { DevTesting } from "./pages/DevTesting";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Sentry from "@sentry/react";
import "dayjs/locale/hu";
import "@mdxeditor/editor/style.css";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/timetable",
    element: <ClassTimeTablePage />,
  },
  {
    path: "/create",
    element: <CreateHW />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/devtesting",
    element: <DevTesting />,
  },
]);

Sentry.init({
  dsn: "https://845c708beb971ee233d03afa6dfc1a5a@o4507892479033344.ingest.de.sentry.io/4507892685537360",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", "https://aranyd.vercel.app"],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

i18n.use(initReactI18next).init({
  resources: {
    hu: {
      translation: {
        frontmatterEditor: {
          title: "Edit document frontmatter",
          key: "Key",
          value: "Value",
          addEntry: "Add entry",
        },
        dialogControls: {
          save: "Save",
          cancel: "Cancel",
        },
        uploadImage: {
          uploadInstructions: "Upload an image from your device:",
          addViaUrlInstructions: "Or add an image from an URL:",
          autoCompletePlaceholder: "Select or paste an image src",
          alt: "Alt:",
          title: "Title:",
        },
        imageEditor: {
          editImage: "Edit image",
        },
        createLink: {
          url: "URL",
          urlPlaceholder: "Válassz ki vagy illessz be egy URL-t",
          title: "Cím",
          saveTooltip: "URL beállítása",
          cancelTooltip: "Módosítás visszavonása",
        },
        linkPreview: {
          open: "{{url}} megnyitása új ablakban",
          edit: "Link URL-jének szerkesztése",
          copyToClipboard: "Másolás vágólapra",
          copied: "Másolva!",
          remove: "Link eltávolítása",
        },
        table: {
          deleteTable: "Delete table",
          columnMenu: "Column menu",
          textAlignment: "Text alignment",
          alignLeft: "Align left",
          alignCenter: "Align center",
          alignRight: "Align right",
          insertColumnLeft: "Insert a column to the left of this one",
          insertColumnRight: "Insert a column to the right of this one",
          deleteColumn: "Delete this column",
          rowMenu: "Row menu",
          insertRowAbove: "Insert a row above this one",
          insertRowBelow: "Insert a row below this one",
          deleteRow: "Delete this row",
        },
        toolbar: {
          blockTypes: {
            paragraph: "Bekezdés",
            quote: "Idézet",
            heading: "Címsor {{level}}. szintje",
          },
          blockTypeSelect: {
            selectBlockTypeTooltip: "Válaszd ki a betű méretét",
            placeholder: "Betűméret",
          },
          toggleGroup: "toggle group",
          removeBold: "Félkövér eltávolítása",
          bold: "Félkövér",
          removeItalic: "Dőlt eltávolítása",
          italic: "Dőlt",
          underline: "Aláhúzás",
          removeUnderline: "Aláhúzás eltávolítása",
          removeInlineCode: "Remove code format",
          inlineCode: "Inline code format",
          link: "Link létrehozása",
          richText: "Rich text",
          diffMode: "Diff mode",
          source: "Source mode",
          admonition: "Insert Admonition",
          codeBlock: "Insert Code Block",
          editFrontmatter: "Edit frontmatter",
          insertFrontmatter: "Insert frontmatter",
          image: "Insert image",
          insertSandpack: "Insert Sandpack",
          table: "Insert Table",
          thematicBreak: "Insert thematic break",
          bulletedList: "Listázás",
          numberedList: "Számozás",
          checkList: "Pipázás",
          deleteSandpack: "Delete this code block",
          undo: "Visszavonás {{shortcut}}",
          redo: "Újracsinálás {{shortcut}}",
        },
        admonitions: {
          note: "Note",
          tip: "Tip",
          danger: "Danger",
          info: "Info",
          caution: "Caution",
          changeType: "Select admonition type",
          placeholder: "Admonition type",
        },
        codeBlock: {
          language: "Code block language",
          selectLanguage: "Select code block language",
        },
        contentArea: {
          editableMarkdown: "szerkeszthető markdown",
        },
      },
    },
  },
  lng: "hu",
  fallbackLng: "hu",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hu">
        <Toaster position="top-center" />
        <CssBaseline />
        <RouterProvider router={mainRouter} />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
