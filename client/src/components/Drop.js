import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import img from "../assets/images/upload.png";

function Drop({ handleFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    handleFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{ border: "1px solid grey", borderRadius: "8px" }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p>Drag 'n' drop some files here, or click to select files</p>
          <img src={img} style={{ width: "100%", maxWidth: "150px" }} />
        </>
      )}
    </div>
  );
}

export default Drop;
