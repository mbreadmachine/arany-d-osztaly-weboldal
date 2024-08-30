import React from "react";
import { Button, Typography, IconButton, Tooltip } from "@mui/material";
import { CloudUpload, Edit } from "@mui/icons-material";

const useFileUpload = () => {
  const [files, setFiles] = React.useState([]);
  const [fileLabels, setFileLabels] = React.useState([]);
  const uploader = React.useRef(null);

  const handleFileSelect = (event) => {
    let customFiles = Array.from(event.target.files);
    customFiles.forEach((v) => {
      v.url = URL.createObjectURL(v);
    });
    const updatedFiles = [...files, ...customFiles];
    setFiles(updatedFiles);
    const updatedFileLabels = updatedFiles.map((v) => v.name);
    setFileLabels(updatedFileLabels);
  };

  const renameFile = (index) => {
    let newFileName = prompt(
      `${fileLabels[index]} kép átnevezése`,
      fileLabels[index]
    );
    setFileLabels([
      ...fileLabels.slice(0, index),
      newFileName,
      ...fileLabels.slice(index + 1),
    ]);
  };

  const fileUploadComponent = () => (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", textAlign: "center" }}>
        <input
          type="file"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={handleFileSelect}
          ref={uploader}
          hidden
        />
        <Button
          variant="contained"
          onClick={() => uploader.current.click()}
          startIcon={<CloudUpload />}
          style={{ width: "100%" }}
        >
          Válassz ki képeket.
        </Button>
        <Typography variant="h6"><i>Csak képek. JPG, JPEG és PNG elfogadott.</i></Typography>
      </div>

      {files && files.length === 0 ? (
        <Typography variant="h6">
          Nem adtál még hozzá órait. Húzz felülre a fotóidat, vagy nyomj rá a
          gombra és válassz ki egy pár fotót.
        </Typography>
      ) : (
        <></>
      )}
      {files.map((file, index) => (
        <div key={index}>
          <p>
            {fileLabels[index]}, {index}
          </p>
          <img
            src={file.url}
            alt={fileLabels[index]}
            // style={{ width: "100px", height: "100px", aspectRatio: "16/9" }}
          />
          <Tooltip title="Szerkesztés">
            <IconButton onClick={() => renameFile(index)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </div>
  );

  return [fileUploadComponent, files, fileLabels];
};

export default useFileUpload;
