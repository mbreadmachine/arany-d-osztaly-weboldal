import React from "react";
import { Button, Typography, IconButton, Tooltip } from "@mui/material";
import { CloudUpload, Edit, DeleteForever } from "@mui/icons-material";

const useFileUpload = () => {
  const [files, setFiles] = React.useState([]);
  const [fileLabels, setFileLabels] = React.useState([]);
  const [blobURLs, setBlobURLs] = React.useState([]);
  const uploader = React.useRef(null);

  const handleFileSelect = (event) => {
    let customFiles = Array.from(event.target.files);
    customFiles.forEach((v) => {
      blobURLs.push(URL.createObjectURL(v));
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
    if (
      newFileName == null ||
      newFileName === "" ||
      newFileName === fileLabels[index]
    ) {
      return;
    }
    setFileLabels([
      ...fileLabels.slice(0, index),
      newFileName,
      ...fileLabels.slice(index + 1),
    ]);
  };

  const deleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setFileLabels(fileLabels.filter((_, i) => i !== index));
    setBlobURLs(blobURLs.filter((_, i) => i !== index));
  };

  const fileUploadComponent = () => (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
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
        <Typography variant="h6">
          <i>Csak képek. JPG, JPEG és PNG elfogadott.</i>
        </Typography>
      </div>

      {files && files.length === 0 ? (
        <Typography variant="h6">
          Nem adtál még hozzá órait. Húzz felülre a fotóidat, vagy nyomj rá a
          gombra és válassz ki egy pár fotót.
        </Typography>
      ) : (
        <></>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          marginTop: "50px",
          width: "90%",
          margin: "0 auto",
          textWrap: "wrap",
        }}
      >
        {files.map((file, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
            key={index}
          >
            <img
              src={blobURLs[index]}
              alt={file.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginLeft: "10px",
                flex: 1,
              }}
            >
              <Typography variant="h5">{fileLabels[index]}</Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <Tooltip title="Átnevezés">
                  <IconButton onClick={() => renameFile(index)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Törlés" onClick={() => deleteFile(index)}>
                  <IconButton>
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return [fileUploadComponent, files, fileLabels, blobURLs];
};

export default useFileUpload;
