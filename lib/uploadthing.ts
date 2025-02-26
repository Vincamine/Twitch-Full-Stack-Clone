import {
    generateUploadButton,
    generateUploadDropzone,
    generateUploader,
  } from "@uploadthing/react";
   
// import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
   

// export const { UploadButton, UploadDropzone, Uploader } =
//   generateComponents<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();