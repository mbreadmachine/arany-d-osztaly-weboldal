import React from "react"
import {
    Typography
} from "@mui/material";

const useFileUpload = () => {
    const [files, setFiles] = React.useState([]);
    const [fileLabels , setFileLabels] = React.useState([]);

    const fileUploadComponent = () => (
        <div>
            <Typography variant="h6">
                This is the file upload component. This is a test.
            </Typography>
        </div>
    )

    return [ fileUploadComponent, files, fileLabels ]
}

export default useFileUpload